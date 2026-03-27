"use client";

import { useEffect, useState, useRef } from "react";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface Particle {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const NAV_LINKS = ["Rooms", "Banquets", "Restaurant", "About", "Contact"];

const ROOMS = [
  {
    title: "Super Deluxe",
    price: "₹4,999",
    suffix: "/night",
    desc: "Spacious king-bed room with city view, premium linen, 55\" OLED TV, and marble bath.",
    img: "https://picsum.photos/id/164/600/400",
    badge: "Most Popular",
  },
  {
    title: "Deluxe Room",
    price: "₹2,999",
    suffix: "/night",
    desc: "Comfortable double or twin setup with warm décor, rain shower, and high-speed Wi-Fi.",
    img: "https://picsum.photos/id/175/600/400",
    badge: null,
  },
  {
    title: "Grand Suite",
    price: "₹8,499",
    suffix: "/night",
    desc: "Our finest — a private living area, walk-in wardrobe, jacuzzi, and personalised butler service.",
    img: "https://picsum.photos/id/201/600/400",
    badge: "Premium",
  },
];

const WHY_US = [
  { icon: "✦", title: "Prime Location", desc: "Heart of Moradabad, minutes from the railway station and brass market." },
  { icon: "✦", title: "Banquet Excellence", desc: "3 grand halls for weddings, conferences, and milestone celebrations." },
  { icon: "✦", title: "Lazeer Dining", desc: "Authentic Awadhi cuisine and continental favourites — open all day." },
  { icon: "✦", title: "24 / 7 Concierge", desc: "Dedicated staff to arrange sightseeing, transport, and every request." },
];

// ─────────────────────────────────────────────
// HOOK — detect if element is in viewport
// ─────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
function Navbar({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1a0a0a]/95 backdrop-blur-md shadow-[0_2px_30px_rgba(184,134,11,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex flex-col leading-tight">
          <span
            className="text-xl tracking-[0.18em] uppercase font-bold"
            style={{ color: "#c9a84c", fontFamily: "'Georgia', serif" }}
          >
            Hotel Grand Sai
          </span>
          <span className="text-[10px] tracking-[0.3em] text-[#c9a84c]/60 uppercase">
            Moradabad • Est. 2001
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="relative text-[#f5f0e8]/80 text-sm tracking-[0.12em] uppercase hover:text-[#c9a84c] transition-colors duration-300 group"
              >
                {link}
                {/* gold underline slide */}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c9a84c] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
          <li>
            <button className="ml-4 px-5 py-2 border border-[#c9a84c] text-[#c9a84c] text-sm tracking-[0.12em] uppercase hover:bg-[#c9a84c] hover:text-[#1a0a0a] transition-all duration-300">
              Book Now
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#c9a84c] text-2xl"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-[#1a0a0a]/98`}
      >
        <ul className="flex flex-col items-center gap-5 py-6">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-[#f5f0e8]/80 text-sm tracking-[0.15em] uppercase hover:text-[#c9a84c] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <button className="px-6 py-2 border border-[#c9a84c] text-[#c9a84c] text-sm uppercase tracking-widest hover:bg-[#c9a84c] hover:text-[#1a0a0a] transition-all duration-300">
              Book Now
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// GOLD PARTICLES (CSS only, no canvas/library)
// ─────────────────────────────────────────────
function GoldParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate deterministic-feeling particles client-side only
    const generated: Particle[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${((i * 37 + 11) % 97)}%`,
      top: `${((i * 53 + 7) % 95)}%`,
      size: `${2 + (i % 4)}px`,
      delay: `${(i * 0.4) % 6}s`,
      duration: `${4 + (i % 5)}s`,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full opacity-0"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: "radial-gradient(circle, #ffd700 0%, #c9a84c 60%, transparent 100%)",
            animation: `floatGold ${p.duration} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}

      {/* keyframes injected as a style tag */}
      <style>{`
        @keyframes floatGold {
          0%   { transform: translateY(0px) scale(1);   opacity: 0; }
          20%  { opacity: 0.7; }
          50%  { transform: translateY(-22px) scale(1.3); opacity: 0.5; }
          80%  { opacity: 0.2; }
          100% { transform: translateY(-45px) scale(0.8); opacity: 0; }
        }
        @keyframes doorReveal {
          0%   { clip-path: inset(0 50% 0 50%); opacity: 0; }
          60%  { opacity: 1; }
          100% { clip-path: inset(0 0% 0 0%); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes goldShimmer {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(48px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function Hero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Small delay so the animation feels intentional
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/id/1015/1920/1080"
          alt="Hotel Grand Sai exterior"
          className="w-full h-full object-cover"
        />
        {/* Dark maroon overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a]/80 via-[#2d0d0d]/60 to-[#1a0a0a]/90" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(26,10,10,0.8)_100%)]" />
      </div>

      {/* Gold particles */}
      <GoldParticles />

      {/* Decorative horizontal gold lines */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
      <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />

      {/* Hero content — door opening reveal */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          animation: revealed ? "doorReveal 1.4s cubic-bezier(0.22,0.61,0.36,1) forwards" : "none",
          clipPath: revealed ? undefined : "inset(0 50% 0 50%)",
          opacity: revealed ? undefined : 0,
        }}
      >
        {/* Ornament */}
        <div
          className="flex items-center justify-center gap-4 mb-6"
          style={{ animation: "fadeUp 1s 0.8s both" }}
        >
          <span className="h-px w-16 bg-[#c9a84c]/60" />
          <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase">Moradabad's Finest</span>
          <span className="h-px w-16 bg-[#c9a84c]/60" />
        </div>

        {/* Main heading */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#f5f0e8] mb-4 leading-tight"
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            textShadow: "0 2px 40px rgba(201,168,76,0.25)",
            animation: "fadeUp 1s 1s both",
          }}
        >
          Welcome to
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #c9a84c, #ffd700, #c9a84c, #b8860b)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "goldShimmer 4s ease infinite, fadeUp 1s 1.1s both",
            }}
          >
            Hotel Grand Sai
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="text-[#f5f0e8]/70 text-base md:text-xl tracking-[0.15em] uppercase mb-10"
          style={{ animation: "fadeUp 1s 1.3s both" }}
        >
          Luxury Stays&nbsp;•&nbsp;Banquets&nbsp;•&nbsp;Weddings&nbsp;•&nbsp;Moradabad
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animation: "fadeUp 1s 1.5s both" }}
        >
          <button className="group relative px-10 py-4 bg-[#c9a84c] text-[#1a0a0a] font-semibold text-sm tracking-[0.18em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.5)]">
            <span className="relative z-10">Book Your Stay</span>
            <span className="absolute inset-0 bg-[#ffd700] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <a
            href="#banquets"
            className="px-10 py-4 border border-[#f5f0e8]/40 text-[#f5f0e8]/80 font-semibold text-sm tracking-[0.18em] uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
          >
            Banquet Inquiry
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        style={{ animation: "fadeUp 1s 2s both" }}
      >
        <span className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#c9a84c] to-transparent animate-pulse" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SECTION WRAPPER — float-in animation
// ─────────────────────────────────────────────
function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView();

  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </section>
  );
}

// ─────────────────────────────────────────────
// SECTION TITLE
// ─────────────────────────────────────────────
function SectionTitle({ sub, title }: { sub: string; title: string }) {
  return (
    <div className="text-center mb-14">
      <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">{sub}</p>
      <h2
        className="text-3xl md:text-5xl text-[#1a0a0a] font-bold"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3 mt-5">
        <span className="h-px w-12 bg-[#c9a84c]/40" />
        <span className="text-[#c9a84c] text-lg">✦</span>
        <span className="h-px w-12 bg-[#c9a84c]/40" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOMS SECTION
// ─────────────────────────────────────────────
function RoomsSection() {
  return (
    <Section id="rooms" className="py-24 px-6 bg-[#faf6ef]">
      <div className="max-w-7xl mx-auto">
        <SectionTitle sub="Curated Accommodations" title="Our Rooms & Suites" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROOMS.map((room, i) => (
            <RoomCard key={room.title} room={room} delay={i * 120} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function RoomCard({
  room,
  delay,
}: {
  room: (typeof ROOMS)[0];
  delay: number;
}) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className="group bg-white overflow-hidden shadow-md hover:shadow-[0_8px_40px_rgba(201,168,76,0.2)] transition-all duration-500"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ${delay}ms, transform 0.6s ${delay}ms, box-shadow 0.3s`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={room.img}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Overlay tint on hover */}
        <div className="absolute inset-0 bg-[#1a0a0a]/0 group-hover:bg-[#1a0a0a]/20 transition-all duration-500" />
        {room.badge && (
          <span className="absolute top-4 right-4 bg-[#c9a84c] text-[#1a0a0a] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1">
            {room.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-7">
        <h3
          className="text-xl text-[#1a0a0a] font-bold mb-1"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {room.title}
        </h3>
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-2xl font-bold text-[#8b1a1a]">{room.price}</span>
          <span className="text-sm text-[#1a0a0a]/40">{room.suffix}</span>
        </div>
        <p className="text-[#1a0a0a]/60 text-sm leading-relaxed mb-6">{room.desc}</p>
        <button className="w-full py-3 border border-[#c9a84c] text-[#8b1a1a] text-sm tracking-[0.12em] uppercase font-semibold hover:bg-[#c9a84c] hover:text-[#1a0a0a] transition-all duration-300">
          Book This Room
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// BANQUETS SECTION
// ─────────────────────────────────────────────
function BanquetsSection() {
  return (
    <Section
      id="banquets"
      className="py-0 relative overflow-hidden"
    >
      <div className="relative min-h-[70vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/id/326/1920/900"
            alt="Grand banquet hall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a0a]/95 via-[#2d0d0d]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="max-w-lg">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">
              Celebrations & Milestones
            </p>
            <h2
              className="text-4xl md:text-6xl text-[#f5f0e8] font-bold leading-tight mb-6"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Grand Banquets
              <br />& Dream Weddings
            </h2>
            <p className="text-[#f5f0e8]/65 text-base leading-relaxed mb-4">
              Three magnificently appointed halls — accommodating 50 to 800 guests.
              From intimate Mehndis to grand Baraat receptions, every detail is curated
              to perfection by our dedicated events team.
            </p>
            <ul className="space-y-2 mb-8">
              {["Customised décor & lighting", "In-house catering — veg & non-veg", "Full AV & sound systems", "Dedicated wedding coordinator"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-[#f5f0e8]/70 text-sm">
                  <span className="text-[#c9a84c] text-xs">✦</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="group relative px-10 py-4 bg-[#c9a84c] text-[#1a0a0a] font-semibold text-sm tracking-[0.18em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]">
              <span className="relative z-10">Send Inquiry</span>
              <span className="absolute inset-0 bg-[#ffd700] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────
// RESTAURANT SECTION
// ─────────────────────────────────────────────
function RestaurantSection() {
  return (
    <Section id="restaurant" className="py-24 px-6 bg-[#1a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div className="relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/id/431/800/550"
              alt="Lazeer Restaurant"
              className="w-full h-80 lg:h-[440px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1a0a0a] to-transparent" />
            {/* Gold frame accent */}
            <div className="absolute inset-4 border border-[#c9a84c]/20 pointer-events-none" />
          </div>

          {/* Text */}
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">
              In-House Dining
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#f5f0e8] font-bold mb-5 leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Lazeer
              <br />
              Restaurant
            </h2>
            <p className="text-[#f5f0e8]/55 leading-relaxed mb-6">
              Named after the Persian word for "rare jewel," Lazeer celebrates the richness
              of Awadhi cuisine alongside thoughtfully crafted continental and Chinese dishes.
              Open for breakfast, lunch, and dinner — every meal is an occasion.
            </p>
            <div className="flex gap-8 mb-8">
              {[["7 AM", "Open From"], ["11 PM", "Close At"], ["100+", "Covers"]].map(([val, label]) => (
                <div key={label}>
                  <p
                    className="text-2xl font-bold text-[#c9a84c]"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {val}
                  </p>
                  <p className="text-[#f5f0e8]/40 text-xs tracking-widest uppercase">{label}</p>
                </div>
              ))}
            </div>
            <button className="px-8 py-3 border border-[#c9a84c] text-[#c9a84c] text-sm tracking-[0.15em] uppercase hover:bg-[#c9a84c] hover:text-[#1a0a0a] transition-all duration-300">
              View Menu
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────
// WHY US SECTION
// ─────────────────────────────────────────────
function WhyUsSection() {
  return (
    <Section id="about" className="py-24 px-6 bg-[#faf6ef]">
      <div className="max-w-7xl mx-auto">
        <SectionTitle sub="Our Promise" title="Why Choose Grand Sai" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_US.map((item, i) => {
            const { ref, inView } = useInView();
            return (
              <div
                key={item.title}
                ref={ref}
                className="text-center p-8 border border-[#c9a84c]/15 hover:border-[#c9a84c]/50 hover:shadow-[0_4px_30px_rgba(201,168,76,0.12)] transition-all duration-500 bg-white group"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity 0.5s ${i * 100}ms, transform 0.5s ${i * 100}ms`,
                }}
              >
                <div className="text-[#c9a84c] text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3
                  className="text-[#1a0a0a] font-bold text-lg mb-3"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#1a0a0a]/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────
// MAP SECTION
// ─────────────────────────────────────────────
function MapSection() {
  return (
    <Section id="contact" className="py-24 px-6 bg-[#1a0a0a]">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          sub="Find Us"
          title="Our Location"
        />
        {/* Override title color for dark bg */}
        <style>{`.map-title { color: #f5f0e8 !important; }`}</style>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Info */}
          <div className="space-y-8">
            {[
              { label: "Address", value: "Civil Lines, Moradabad, Uttar Pradesh — 244001" },
              { label: "Phone", value: "+91 98765 43210" },
              { label: "Email", value: "reservations@hotelgrandsai.com" },
              { label: "Check-in / Out", value: "12:00 Noon / 11:00 AM" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-1">{item.label}</p>
                <p className="text-[#f5f0e8]/70 text-sm leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Map embed (placeholder) */}
          <div className="lg:col-span-2 h-72 lg:h-96 bg-[#2d1a0d] border border-[#c9a84c]/20 relative overflow-hidden">
            <iframe
              title="Hotel Grand Sai Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55991.94!2d78.77!3d28.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390afef8b08da3ad%3A0x4d0d8e0f4a5a0b0c!2sMoradabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(30%) sepia(20%)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 border-4 border-[#c9a84c]/10 pointer-events-none" />
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0d0505] border-t border-[#c9a84c]/10 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <span
            className="text-[#c9a84c] tracking-[0.2em] uppercase font-bold"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Hotel Grand Sai
          </span>
          <span className="text-[#f5f0e8]/30 text-xs tracking-wider mt-1">
            Moradabad, Uttar Pradesh
          </span>
        </div>
        <p className="text-[#f5f0e8]/20 text-xs tracking-wider text-center">
          © {new Date().getFullYear()} Hotel Grand Sai. All rights reserved.
          <br className="md:hidden" />
          {" "}Crafted with care by{" "}
          <span className="text-[#c9a84c]/60">HMZA Digital</span>
        </p>
        <div className="flex gap-6">
          {["Facebook", "Instagram", "WhatsApp"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-[#f5f0e8]/30 text-xs tracking-widest uppercase hover:text-[#c9a84c] transition-colors duration-300"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-[#faf6ef] overflow-x-hidden">
      <Navbar scrolled={scrolled} />
      <Hero />
      <RoomsSection />
      <BanquetsSection />
      <RestaurantSection />
      <WhyUsSection />
      <MapSection />
      <Footer />
    </main>
  );
}
