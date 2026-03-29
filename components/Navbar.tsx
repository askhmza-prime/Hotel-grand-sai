"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Nav links — update hrefs if you add more pages ──
const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Rooms",      href: "/rooms" },
  { label: "Banquet",    href: "/banquet" },
  { label: "Restaurant", href: "/#restaurant" },
  { label: "Contact",    href: "/#contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();

  // Change navbar background after scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1a0a0a]/96 backdrop-blur-md shadow-[0_2px_30px_rgba(212,175,119,0.12)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">

        {/* ── Logo ── */}
        <Link href="/" className="flex flex-col leading-tight group">
          <span
            className="text-lg tracking-[0.18em] uppercase font-bold text-[#D4AF77] group-hover:text-[#ffd700] transition-colors duration-300"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Hotel Grand Sai
          </span>
          <span className="text-[10px] tracking-[0.3em] text-[#D4AF77]/50 uppercase">
            Moradabad · Est. 2001
          </span>
        </Link>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`relative text-sm tracking-[0.12em] uppercase transition-colors duration-300 group ${
                    active ? "text-[#D4AF77]" : "text-[#f5f0e8]/70 hover:text-[#D4AF77]"
                  }`}
                >
                  {label}
                  {/* Gold underline — active or hover */}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-[#D4AF77] transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}

          {/* Book Now CTA */}
          <li>
            <Link
              href="/rooms"
              className="ml-2 px-5 py-2 border border-[#D4AF77] text-[#D4AF77] text-sm tracking-[0.12em] uppercase hover:bg-[#D4AF77] hover:text-[#1a0a0a] transition-all duration-300"
            >
              Book Now
            </Link>
          </li>
        </ul>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden text-[#D4AF77] text-2xl leading-none"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* ── Mobile dropdown — floats in from top ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-[#1a0a0a]/98 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-5 py-7">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-[#f5f0e8]/75 text-sm tracking-[0.15em] uppercase hover:text-[#D4AF77] transition-colors duration-300"
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/rooms"
              className="px-8 py-2.5 border border-[#D4AF77] text-[#D4AF77] text-sm uppercase tracking-widest hover:bg-[#D4AF77] hover:text-[#1a0a0a] transition-all duration-300"
            >
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
