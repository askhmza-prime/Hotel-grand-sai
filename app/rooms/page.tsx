"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ROOMS = [
  {
    id: "super-deluxe",
    title: "Super Deluxe",
    price: "₹4,500",
    badge: "Most Popular",
    img: "https://picsum.photos/id/164/800/500",
    desc: "King-size bed, panoramic city view, 55″ OLED TV, minibar, and a marble rain-shower bathroom.",
    features: ["King-size bed", "City view", "Rain shower", "55″ OLED TV", "Minibar", "Free Wi-Fi"],
  },
  {
    id: "deluxe",
    title: "Deluxe Room",
    price: "₹3,200",
    badge: null,
    img: "https://picsum.photos/id/175/800/500",
    desc: "Spacious double or twin room with premium linen, ergonomic workspace, and hot-water shower.",
    features: ["Double/Twin bed", "Work desk", "Hot shower", "43″ Smart TV", "Tea maker", "Free Wi-Fi"],
  },
  {
    id: "suite",
    title: "Grand Suite",
    price: "₹6,500",
    badge: "Premium",
    img: "https://picsum.photos/id/201/800/500",
    desc: "Private living room, walk-in wardrobe, jacuzzi bath, and dedicated butler service.",
    features: ["Separate living area", "Jacuzzi bath", "Walk-in wardrobe", "Butler service", "Premium bar", "65″ OLED TV"],
  },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function RoomCard({ room, index }: { room: typeof ROOMS[0]; index: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className="bg-white overflow-hidden shadow-md group hover:shadow-[0_8px_40px_rgba(212,175,119,0.22)] transition-all duration-500"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.65s ${index * 130}ms, transform 0.65s ${index * 130}ms, box-shadow 0.3s` }}
    >
      <div className="relative h-60 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={room.img} alt={room.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        {room.badge && (
          <span className="absolute top-4 right-4 bg-[#D4AF77] text-[#1a0a0a] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1">{room.badge}</span>
        )}
      </div>
      <div className="p-7">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-xl font-bold text-[#1a0a0a]" style={{ fontFamily: "Georgia, serif" }}>{room.title}</h2>
          <span className="text-2xl font-bold text-[#800000]">{room.price}<span className="text-xs text-[#1a0a0a]/40 ml-1">/ night</span></span>
        </div>
        <p className="text-[#1a0a0a]/58 text-sm leading-relaxed mb-5">{room.desc}</p>
        <ul className="grid grid-cols-2 gap-1.5 mb-6">
          {room.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-[#1a0a0a]/60 text-xs">
              <span className="text-[#D4AF77] text-[10px]">✦</span>{f}
            </li>
          ))}
        </ul>
        <button className="w-full py-3 border border-[#D4AF77] text-[#800000] text-sm tracking-[0.14em] uppercase font-semibold hover:bg-[#D4AF77] hover:text-[#1a0a0a] transition-all duration-300">
          Book This Room
        </button>
      </div>
    </div>
  );
}

export default function RoomsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <>
      <Navbar />
      <main className="bg-[#faf6ef] min-h-screen">
        {/* Hero */}
        <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/id/1015/1920/600" alt="Rooms" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a]/90 via-[#1a0a0a]/50 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-12 w-full" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.9s, transform 0.9s" }}>
            <p className="text-[#D4AF77] text-xs tracking-[0.4em] uppercase mb-2">Curated Accommodations</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#f5f0e8]" style={{ fontFamily: "Georgia, serif" }}>Rooms & Suites</h1>
          </div>
        </section>

        {/* Cards */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-[#1a0a0a]/55 text-sm leading-relaxed max-w-xl mx-auto mb-16">
              Every room at Hotel Grand Sai blends warmth with refinement — so whether you're here for one night or a week, you feel at home.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ROOMS.map((room, i) => <RoomCard key={room.id} room={room} index={i} />)}
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="bg-[#1a0a0a] py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[["Check-in", "12:00 Noon"], ["Check-out", "11:00 AM"], ["Breakfast", "Included"], ["Pets", "Not allowed"]].map(([label, value]) => (
              <div key={label}>
                <p className="text-[#D4AF77] text-xs tracking-[0.3em] uppercase mb-1">{label}</p>
                <p className="text-[#f5f0e8]/70 text-sm font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Banquet CTA */}
        <section className="py-16 px-6 text-center">
          <p className="text-[#D4AF77] text-xs tracking-[0.4em] uppercase mb-3">Planning an event?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a0a0a] mb-5" style={{ fontFamily: "Georgia, serif" }}>Explore Our Banquet Halls</h2>
          <Link href="/banquet" className="inline-block px-10 py-4 bg-[#D4AF77] text-[#1a0a0a] text-sm tracking-[0.18em] uppercase font-semibold hover:bg-[#ffd700] transition-colors duration-300">
            View Banquet Options
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
