import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d0505] border-t border-[#D4AF77]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-2">
          <p className="text-[#D4AF77] text-xl tracking-[0.2em] uppercase font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Hotel Grand Sai
          </p>
          <p className="text-[#f5f0e8]/30 text-xs tracking-widest mb-5">Moradabad, Uttar Pradesh</p>
          <p className="text-[#f5f0e8]/45 text-sm leading-relaxed max-w-xs mb-6">
            Moradabad's premier destination for luxury stays, grand weddings, corporate events, and authentic dining since 2001.
          </p>
          <div className="space-y-2">
            {[
              { icon: "📍", text: "Civil Lines, Moradabad — 244001" },
              { icon: "📞", text: "+91 98765 43210" },
              { icon: "✉️", text: "reservations@hotelgrandsai.com" },
            ].map(({ icon, text }) => (
              <p key={text} className="flex items-start gap-2 text-[#f5f0e8]/45 text-sm">
                <span>{icon}</span><span>{text}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-[#D4AF77] text-xs tracking-[0.3em] uppercase mb-5 font-semibold">Quick Links</p>
          <ul className="space-y-3">
            {[
              { label: "Home",       href: "/" },
              { label: "Rooms",      href: "/rooms" },
              { label: "Banquet",    href: "/banquet" },
              { label: "Restaurant", href: "/#restaurant" },
              { label: "Contact",    href: "/#contact" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-[#f5f0e8]/40 text-sm hover:text-[#D4AF77] transition-colors duration-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <p className="text-[#D4AF77] text-xs tracking-[0.3em] uppercase mb-5 font-semibold">Our Services</p>
          <ul className="space-y-3">
            {["Super Deluxe Room", "Deluxe Room", "Grand Suite", "Wedding Banquet", "Corporate Events"].map((s) => (
              <li key={s}>
                <Link href={s.includes("Banquet") || s.includes("Events") ? "/banquet" : "/rooms"} className="text-[#f5f0e8]/40 text-sm hover:text-[#D4AF77] transition-colors duration-300">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF77]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[#f5f0e8]/20 text-xs tracking-wider">© {year} Hotel Grand Sai. All rights reserved.</p>
        <div className="flex gap-6">
          {["Facebook", "Instagram", "WhatsApp"].map((s) => (
            <a key={s} href="#" className="text-[#f5f0e8]/25 text-xs tracking-widest uppercase hover:text-[#D4AF77] transition-colors duration-300">{s}</a>
          ))}
        </div>
        <p className="text-[#f5f0e8]/15 text-xs">Crafted by <span className="text-[#D4AF77]/40">HMZA Digital</span></p>
      </div>
    </footer>
  );
}
