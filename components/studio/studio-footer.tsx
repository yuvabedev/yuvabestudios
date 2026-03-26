import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Product Engineering", href: "#services" },
    { label: "AI-Native Apps", href: "#services" },
    { label: "Digital Marketing", href: "#services" },
  ],
  Company: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/yuvabestudios" },
  { label: "Twitter / X", href: "https://twitter.com/yuvabestudios" },
  { label: "Instagram", href: "https://instagram.com/yuvabestudios" },
];

export function StudioFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:px-10 md:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto]">

          {/* Brand column */}
          <div className="flex flex-col gap-6 max-w-sm">
            <Link href="/" className="inline-flex shrink-0 items-center">
              <Image
                src="/logo.svg"
                alt="Yuvabe Studios"
                width={140}
                height={36}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-body-md text-slate-500">
              AI-first strategy, design, engineering, and growth marketing for startups that want to move fast and build right.
            </p>
            <Link
              href="#contact"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--purple-500)] px-5 py-2.5 text-label-md text-white transition-colors hover:bg-[var(--color-action-primary-hover)]"
            >
              Get in touch
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            {Object.entries(footerLinks).map(([group, items]) => (
              <div key={group} className="flex flex-col gap-4">
                <span className="text-label-sm uppercase tracking-widest text-slate-400">
                  {group}
                </span>
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-label-md text-slate-700 transition-colors hover:text-brand"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="h-px bg-slate-200" />
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-10">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-slate-400">
            © {new Date().getFullYear()} Yuvabe Studios. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-slate-400 transition-colors hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}