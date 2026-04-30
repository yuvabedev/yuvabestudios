const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

function getEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var ${name}.`);
  }
  return value;
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

async function main() {
  const [mode, key, payloadPath] = process.argv.slice(2);
  if (!mode || !key || (mode === "write" && !payloadPath)) {
    console.error("Usage:");
    console.error("  node content-doc.js read <homepage|about|case_studies>");
    console.error("  node content-doc.js write <homepage|about|case_studies> <payload.json>");
    process.exit(1);
  }

  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false } });

  if (mode === "read") {
    const { data, error } = await supabase
      .from("content_documents")
      .select("payload")
      .eq("key", key)
      .maybeSingle();

    if (error) throw error;
    console.log(JSON.stringify(data?.payload ?? null, null, 2));
    return;
  }

  if (mode === "write") {
    const payload = readJson(path.resolve(payloadPath));
    const { error } = await supabase
      .from("content_documents")
      .upsert({ key, payload }, { onConflict: "key" });

    if (error) throw error;
    console.log(`Wrote content_documents.${key}`);
    return;
  }

  console.error(`Unknown mode: ${mode}`);
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
