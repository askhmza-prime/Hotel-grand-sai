"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Particle type ───
interface Particle {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
}

// ─── Data ───
const ROOMS = [
  {
    title: "Super Deluxe",
    price: "₹4,500",
    badge: "Most Popular",
    img: "https://picsum.photos/id/164/600/400",
    desc: "King-size bed, panoramic city view, 55″ OLED TV, minibar, and a marble rain-shower bathroom.",
  },
  {
    title: "Deluxe Room",
    price: "₹3,200",
    badge: null,
    img: "https://picsum.photos/id/175/600/400",
    desc: "Spacious double or twin room with premium linen, ergonomic workspace, and hot-water shower.",
  },
  {
    title: "Grand Suite",
    price: "₹6,500",
    badge: "Premium",
    img: "https://picsum.photos/id/201/600/400",
    desc: "Private living room, walk-in wardrobe, jacuzzi bath, and dedicated butler service.",
  },
];

const WHY_US = [
  { icon: "✦", title: "Prime Location",     desc: "Heart of Moradabad, minutes from the railway station and brass market." },
  { icon: "✦", title: "Banquet Excellence", desc: "3 grand halls for weddings, conferences, and milestone celebrations." },
  { icon: "✦", title: "Lazeer Dining",      desc: "Authentic Awadhi cuisine and continental favourites — open all day." },
  { icon: "✦", title: "24/7 Concierge",     desc: "Dedicated staff to arrange sightseeing, transport, and every request." },
];

// ─── Scroll-triggered visibility hook ───
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Gold floating particles (CSS only) ───
function GoldParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const p: Particle[] = Array.from({ length: 28 }, (_, i) => ({
      id:       i,
      left:     `${((i * 37 + 11) % 97)}%`,
      top:      `${((i * 53 + 7)  % 95)}%`,
      size:     `${2 + (i % 4)}px`,
      delay:    `${(i * 0.4) % 6}s`,
      duration: `${4 + (i % 5)}s`,
    }));
    setParticles(p);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left, top: p.top, width: p.size, height: p.size,
            background: "radial-gradient(circle, #ffd700 0%, #D4AF77 60%, transparent 100%)",
            animation: `floatGold ${p.duration} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatGold {
          0%   { transform: translateY(0)    scale(1);   opacity: 0; }
          20%  { opacity: 0.7; }
          50%  { transform: translateY(-22px) scale(1.3); opacity: 0.5; }
          80%  { opacity: 0.2; }
          100% { transform: translateY(-45px) scale(0.8); opacity: 0; }
        }
        @keyframes doorReveal {
          0%   { clip-path: inset(0 50% 0 50%); opacity: 0; }
          60%  { opacity: 1; }
          100% { clip-path: inset(0 0% 0 0%);  opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes goldShimmer {
          0%, 100% { background-position: 0%   50%; }
          50%       { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

// ─── Hero ───
function Hero() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setRevealed(true), 200); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://picsum.photos/id/1015/1920/1080" alt="Hotel Grand Sai" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a]/80 via-[#2d0d0d]/60 to-[#1a0a0a]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(26,10,10,0.8)_100%)]" />
      </div>

      <GoldParticles />

      {/* Decorative lines */}
      <div className="absolute top-1/4    left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/30 to-transparent" />
      <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/20 to-transparent" />

      {/* Content — door reveal */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          animation:  revealed ? "doorReveal 1.4s cubic-bezier(0.22,0.61,0.36,1) forwards" : "none",
          clipPath:   revealed ? undefined : "inset(0 50% 0 50%)",
          opacity:    revealed ? undefined : 0,
        }}
      >
        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-6" style={{ animation: "fadeUp 1s 0.8s both" }}>
          <span className="h-px w-16 bg-[#D4AF77]/60" />
          <span className="text-[#D4AF77] text-xs tracking-[0.4em] uppercase">Moradabad's Finest</span>
          <span className="h-px w-16 bg-[#D4AF77]/60" />
        </div>

        {/* Heading */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#f5f0e8] mb-4 leading-tight"
          style={{ fontFamily: "Georgia, serif", textShadow: "0 2px 40px rgba(212,175,119,0.25)", animation: "fadeUp 1s 1s both" }}
        >
          Welcome to
          <br />
          <span style={{
            background: "linear-gradient(90deg,#D4AF77,#ffd700,#D4AF77,#b8860b)",
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "goldShimmer 4s ease infinite, fadeUp 1s 1.1s both",
          }}>
            Hotel Grand Sai
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-[#f5f0e8]/70 text-base md:text-xl tracking-[0.15em] uppercase mb-10" style={{ animation: "fadeUp 1s 1.3s both" }}>
          Luxury Stays&nbsp;•&nbsp;Banquets&nbsp;•&nbsp;Weddings&nbsp;•&nbsp;Moradabad
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animation: "fadeUp 1s 1.5s both" }}>
          <Link href="/rooms" className="group relative px-10 py-4 bg-[#D4AF77] text-[#1a0a0a] font-semibold text-sm tracking-[0.18em] uppercase overflow-hidden hover:shadow-[0_0_30px_rgba(212,175,119,0.5)] transition-shadow duration-300">
            <span className="relative z-10">Book Your Stay</span>
            <span className="absolute inset-0 bg-[#ffd700] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
          <Link href="/banquet" className="px-10 py-4 border border-[#f5f0e8]/40 text-[#f5f0e8]/80 font-semibold text-sm tracking-[0.18em] uppercase hover:border-[#D4AF77] hover:text-[#D4AF77] transition-all duration-300">
            Banquet Inquiry
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50" style={{ animation: "fadeUp 1s 2s both" }}>
        <span className="text-[#D4AF77] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#D4AF77] to-transparent animate-pulse" />
      </div>
    </section>
  );
}

// ─── Section wrapper ───
function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
    >
      {children}
    </section>
  );
}

// ─── Section title ───
function SectionTitle({ sub, title, dark = false }: { sub: string; title: string; dark?: boolean }) {
  return (
    <div className="text-center mb-14">
      <p className="text-[#D4AF77] text-xs tracking-[0.4em] uppercase mb-3">{sub}</p>
      <h2 className={`text-3xl md:text-5xl font-bold ${dark ? "text-[#f5f0e8]" : "text-[#1a0a0a]"}`} style={{ fontFamily: "Georgia, serif" }}>
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3 mt-5">
        <span className="h-px w-12 bg-[#D4AF77]/40" />
        <span className="text-[#D4AF77] text-lg">✦</span>
        <span className="h-px w-12 bg-[#D4AF77]/40" />
      </div>
    </div>
  );
}

// ─── Rooms section ───
function RoomsSection() {
  return (
    <Section id="rooms" className="py-24 px-6 bg-[#faf6ef]">
      <div className="max-w-7xl mx-auto">
        <SectionTitle sub="Curated Accommodations" title="Our Rooms & Suites" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROOMS.map((room, i) => {
            const { ref, inView } = useInView();
            return (
              <div
                key={room.title}
                ref={ref}
                className="bg-white overflow-hidden shadow-md group hover:shadow-[0_8px_40px_rgba(212,175,119,0.2)] transition-all duration-500"
                style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.6s ${i * 120}ms, transform 0.6s ${i * 120}ms, box-shadow 0.3s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={room.img} alt={room.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {room.badge && (
                    <span className="absolute top-4 right-4 bg-[#D4AF77] text-[#1a0a0a] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1">{room.badge}</span>
                  )}
                </div>
                <div className="p-7">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#1a0a0a]" style={{ fontFamily: "Georgia, serif" }}>{room.title}</h3>
                    <span className="text-2xl font-bold text-[#800000]">{room.price}<span className="text-xs text-[#1a0a0a]/40 ml-1">/ night</span></span>
                  </div>
                  <p className="text-[#1a0a0a]/60 text-sm leading-relaxed mb-6">{room.desc}</p>
                  <Link href="/rooms" className="block text-center w-full py-3 border border-[#D4AF77] text-[#800000] text-sm tracking-[0.12em] uppercase font-semibold hover:bg-[#D4AF77] hover:text-[#1a0a0a] transition-all duration-300">
                    Book This Room
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─── Banquets section ───
function BanquetsSection() {
  return (
    <Section id="banquets" className="py-0 relative overflow-hidden">
      <div className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/id/326/1920/900" alt="Grand banquet hall" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a0a]/95 via-[#2d0d0d]/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="max-w-lg">
            <p className="text-[#D4AF77] text-xs tracking-[0.4em] uppercase mb-4">Celebrations & Milestones</p>
            <h2 className="text-4xl md:text-6xl text-[#f5f0e8] font-bold leading-tight mb-6" style={{ fontFamily: "Georgia, serif" }}>
              Grand Banquets<br />& Dream Weddings
            </h2>
            <p className="text-[#f5f0e8]/65 text-base leading-relaxed mb-8">
              Three magnificently appointed halls accommodating 50 to 800 guests. From intimate Mehndis to grand Baraat receptions, every detail is curated to perfection.
            </p>
            <ul className="space-y-2 mb-8">
              {["Customised décor & lighting", "In-house catering — veg & non-veg", "Full AV & sound systems", "Dedicated wedding coordinator"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-[#f5f0e8]/70 text-sm">
                  <span className="text-[#D4AF77] text-xs">✦</span>{f}
                </li>
              ))}
            </ul>
            <Link href="/banquet" className="group relative inline-block px-10 py-4 bg-[#D4AF77] text-[#1a0a0a] font-semibold text-sm tracking-[0.18em] uppercase overflow-hidden hover:shadow-[0_0_30px_rgba(212,175,119,0.4)] transition-shadow duration-300">
              <span className="relative z-10">Send Inquiry</span>
              <span className="absolute inset-0 bg-[#ffd700] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Restaurant section ───
function RestaurantSection() {
  return (
    <Section id="restaurant" className="py-24 px-6 bg-[#1a0a0a]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/id/431/800/550" alt="Lazeer Restaurant" className="w-full h-80 lg:h-[440px] object-cover" />
          <div className="absolute inset-4 border border-[#D4AF77]/20 pointer-events-none" />
        </div>
        <div>
          <p className="text-[#D4AF77] text-xs tracking-[0.4em] uppercase mb-4">In-House Dining</p>
          <h2 className="text-4xl md:text-5xl text-[#f5f0e8] font-bold mb-5 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
            Lazeer<br />Restaurant
          </h2>
          <p className="text-[#f5f0e8]/55 leading-relaxed mb-6">
            Named after the Persian word for "rare jewel," Lazeer celebrates the richness of Awadhi cuisine alongside crafted continental and Chinese dishes. Open for breakfast, lunch, and dinner.
          </p>
          <div className="flex gap-8 mb-8">
            {[["7 AM", "Opens At"], ["11 PM", "Closes At"], ["100+", "Covers"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold text-[#D4AF77]" style={{ fontFamily: "Georgia, serif" }}>{val}</p>
                <p className="text-[#f5f0e8]/40 text-xs tracking-widest uppercase">{label}</p>
              </div>
            ))}
          </div>
          <button className="px-8 py-3 border border-[#D4AF77] text-[#D4AF77] text-sm tracking-[0.15em] uppercase hover:bg-[#D4AF77] hover:text-[#1a0a0a] transition-all duration-300">
            View Menu
          </button>
        </div>
      </div>
    </Section>
  );
}

// ─── Why Us ───
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
                className="text-center p-8 border border-[#D4AF77]/15 hover:border-[#D4AF77]/50 hover:shadow-[0_4px_30px_rgba(212,175,119,0.12)] transition-all duration-500 bg-white group"
                style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.5s ${i * 100}ms, transform 0.5s ${i * 100}ms` }}
              >
                <div className="text-[#D4AF77] text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-[#1a0a0a] font-bold text-lg mb-3" style={{ fontFamily: "Georgia, serif" }}>{item.title}</h3>
                <p className="text-[#1a0a0a]/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─── Map ───
function MapSection() {
  return (
    <Section id="contact" className="py-24 px-6 bg-[#1a0a0a]">
      <div className="max-w-7xl mx-auto">
        <SectionTitle sub="Find Us" title="Our Location" dark />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="space-y-8">
            {[
              { label: "Address",       value: "Civil Lines, Moradabad, UP — 244001" },
              { label: "Phone",         value: "+91 98765 43210" },
              { label: "Email",         value: "reservations@hotelgrandsai.com" },
              { label: "Check-in/Out",  value: "12:00 Noon / 11:00 AM" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[#D4AF77] text-xs tracking-[0.3em] uppercase mb-1">{label}</p>
                <p className="text-[#f5f0e8]/70 text-sm leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 h-72 lg:h-96 border border-[#D4AF77]/20 overflow-hidden">
            <iframe
              title="Hotel Grand Sai Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55991.94!2d78.77!3d28.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390afef8b08da3ad%3A0x4d0d8e0f4a5a0b0c!2sMoradabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(30%) sepia(20%)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Root page ───
export default function Home() {
  return (
    <main className="bg-[#faf6ef] overflow-x-hidden">
      <Navbar />
      <Hero />
      <RoomsSection />
      <Footer />
    </main>
  );
}
