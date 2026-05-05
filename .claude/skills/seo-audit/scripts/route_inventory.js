#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(process.argv[2] || process.cwd());
const appDir = path.join(projectRoot, "app");

function exists(targetPath) {
  return fs.existsSync(targetPath);
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function walkFiles(startDir, predicate, results = []) {
  if (!exists(startDir)) {
    return results;
  }

  for (const entry of fs.readdirSync(startDir, { withFileTypes: true })) {
    const nextPath = path.join(startDir, entry.name);

    if (entry.isDirectory()) {
      walkFiles(nextPath, predicate, results);
      continue;
    }

    if (predicate(nextPath)) {
      results.push(nextPath);
    }
  }

  return results;
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function appPathToRoute(relativePath) {
  const withoutApp = relativePath.replace(/^app[\\/]/, "");
  const routeDir = withoutApp
    .replace(/^page\.(t|j)sx?$/, "")
    .replace(/[\\/]page\.(t|j)sx?$/, "");

  if (!routeDir) {
    return "/";
  }

  return `/${toPosix(routeDir)}`;
}

function hasUseClient(source) {
  return /^\s*["']use client["'];/m.test(source);
}

function findMarker(source, pattern) {
  return pattern.test(source);
}

function readJsonPackageJson(rootDir) {
  const packageJsonPath = path.join(rootDir, "package.json");
  const raw = readFileSafe(packageJsonPath);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function detectFramework(rootDir) {
  const packageJson = readJsonPackageJson(rootDir);
  const dependencies = {
    ...(packageJson?.dependencies || {}),
    ...(packageJson?.devDependencies || {}),
  };

  if (dependencies.next) {
    return {
      framework: "nextjs",
      nextVersion: dependencies.next,
      appRouter: exists(path.join(rootDir, "app")),
    };
  }

  return {
    framework: "unknown",
    nextVersion: null,
    appRouter: exists(path.join(rootDir, "app")),
  };
}

function parseImports(source) {
  const matches = source.matchAll(
    /import\s+(?:type\s+)?(?:[\w*\s{},]+?\s+from\s+)?["']([^"']+)["']/g,
  );

  return [...matches].map((match) => match[1]);
}

function resolveImport(importPath, fromFile, rootDir) {
  const baseCandidates = [];

  if (importPath.startsWith("@/")) {
    baseCandidates.push(path.join(rootDir, importPath.slice(2)));
  } else if (importPath.startsWith(".")) {
    baseCandidates.push(path.resolve(path.dirname(fromFile), importPath));
  } else {
    return null;
  }

  const suffixes = [
    "",
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    path.sep + "index.ts",
    path.sep + "index.tsx",
    path.sep + "index.js",
    path.sep + "index.jsx",
  ];

  for (const candidate of baseCandidates) {
    for (const suffix of suffixes) {
      const resolved = `${candidate}${suffix}`;
      if (exists(resolved)) {
        return resolved;
      }
    }
  }

  return null;
}

function classifyRendering(source) {
  const forceDynamic = /export\s+const\s+dynamic\s*=\s*["']force-dynamic["']/.test(
    source,
  );
  const forceStatic = /export\s+const\s+dynamic\s*=\s*["']force-static["']/.test(
    source,
  );
  const hasGenerateStaticParams = /export\s+async?\s+function\s+generateStaticParams/.test(
    source,
  );
  const hasRevalidate = /export\s+const\s+revalidate\s*=/.test(source);

  if (forceDynamic) {
    return "dynamic-server";
  }

  if (forceStatic || hasGenerateStaticParams) {
    return "static-prerendered";
  }

  if (hasRevalidate) {
    return "revalidated";
  }

  return "server-default";
}

function collectClientBoundaries(pageFile, source, rootDir) {
  const importedFiles = parseImports(source)
    .map((entry) => resolveImport(entry, pageFile, rootDir))
    .filter(Boolean);

  return importedFiles
    .map((filePath) => {
      const fileSource = readFileSafe(filePath);
      if (!fileSource || !hasUseClient(fileSource)) {
        return null;
      }

      return toPosix(path.relative(rootDir, filePath));
    })
    .filter(Boolean);
}

function collectMetadataFiles(rootDir) {
  const appFiles = exists(appDir)
    ? walkFiles(
        appDir,
        (filePath) =>
          /(robots|sitemap|manifest|opengraph-image|twitter-image)\.(ts|tsx|js|jsx|xml|txt|webmanifest|png|jpg|jpeg|webp)$/i.test(
            filePath,
          ),
      )
    : [];
  const publicFiles = exists(path.join(rootDir, "public"))
    ? walkFiles(
        path.join(rootDir, "public"),
        (filePath) =>
          /(robots\.txt|sitemap\.xml|manifest\.webmanifest|manifest\.json|og-image\.(png|jpg|jpeg|webp)|twitter-image\.(png|jpg|jpeg|webp))$/i.test(
            filePath,
          ),
      )
    : [];

  return [...appFiles, ...publicFiles]
    .map((filePath) => toPosix(path.relative(rootDir, filePath)))
    .sort();
}

function collectRoutes(rootDir) {
  if (!exists(appDir)) {
    return [];
  }

  const pageFiles = walkFiles(appDir, (filePath) => /[\\/]page\.(t|j)sx?$/.test(filePath));

  return pageFiles
    .map((pageFile) => {
      const relativePath = toPosix(path.relative(rootDir, pageFile));
      const source = readFileSafe(pageFile) || "";

      return {
        route: appPathToRoute(relativePath),
        pageFile: relativePath,
        routeComponentType: hasUseClient(source) ? "client" : "server",
        renderModeGuess: classifyRendering(source),
        hasMetadataExport: findMarker(
          source,
          /export\s+const\s+metadata\s*[:=]/,
        ),
        hasGenerateMetadata: findMarker(
          source,
          /export\s+async?\s+function\s+generateMetadata/,
        ),
        hasGenerateStaticParams: findMarker(
          source,
          /export\s+async?\s+function\s+generateStaticParams/,
        ),
        hasRevalidate: findMarker(source, /export\s+const\s+revalidate\s*=/),
        dynamicMarker:
          source.match(/export\s+const\s+dynamic\s*=\s*["']([^"']+)["']/)?.[1] ||
          null,
        hasJsonLd: findMarker(
          source,
          /application\/ld\+json|dangerouslySetInnerHTML/,
        ),
        clientBoundaries: collectClientBoundaries(pageFile, source, rootDir),
      };
    })
    .sort((left, right) => left.route.localeCompare(right.route));
}

function main() {
  const framework = detectFramework(projectRoot);
  const routes = collectRoutes(projectRoot);
  const metadataFiles = collectMetadataFiles(projectRoot);

  const summary = {
    framework,
    routeCount: routes.length,
    metadataFiles,
    missingRecommendedArtifacts: {
      robots:
        !metadataFiles.some((filePath) => /(^app\/robots\.|^public\/robots\.txt$)/.test(filePath)),
      sitemap:
        !metadataFiles.some((filePath) => /(^app\/sitemap\.|^public\/sitemap\.xml$)/.test(filePath)),
      openGraphImage: !metadataFiles.some((filePath) =>
        /(opengraph-image|og-image)/.test(filePath),
      ),
      twitterImage: !metadataFiles.some((filePath) => /twitter-image/.test(filePath)),
    },
  };

  process.stdout.write(
    `${JSON.stringify({ summary, routes }, null, 2)}\n`,
  );
}

main();
