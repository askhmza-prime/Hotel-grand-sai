"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Banquet hall data ──
const HALLS = [
  {
    name:     "The Durbar Hall",
    capacity: "Up to 800 guests",
    area:     "12,000 sq ft",
    img:      "https://picsum.photos/id/326/800/500",
    desc:     "Our grandest space — ideal for large wedding receptions, baraats, and gala dinners. Features a dedicated stage, state-of-the-art AV, and chandelier ceiling.",
    tags:     ["Wedding Reception", "Baraat", "Gala Dinner"],
  },
  {
    name:     "Sai Crystal Hall",
    capacity: "Up to 350 guests",
    area:     "6,500 sq ft",
    img:      "https://picsum.photos/id/431/800/500",
    desc:     "Elegant mid-size hall perfect for engagement ceremonies, birthday milestones, and corporate award nights. Crystal lighting and warm ivory draping included.",
    tags:     ["Engagement", "Birthday", "Corporate"],
  },
  {
    name:     "The Courtyard",
    capacity: "Up to 150 guests",
    area:     "3,200 sq ft",
    img:      "https://picsum.photos/id/225/800/500",
    desc:     "An open-air garden setting with fairy lights and landscaped greenery — ideal for mehndis, sangeets, kitty parties, and intimate celebrations.",
    tags:     ["Mehndi", "Sangeet", "Intimate Dining"],
  },
];

// ── Scroll-triggered visibility hook ──
function useInView(threshold = 0.12) {
  const ref  = useRef<HTMLDivElement>(null);
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

// ── Hall card ──
function HallCard({ hall, index }: { hall: typeof HALLS[0]; index: number }) {
  const { ref, inView } = useInView();
  const delay = index * 140;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden shadow-md group hover:shadow-[0_8px_48px_rgba(212,175,119,0.18)] transition-all duration-500 ${
        isEven ? "" : "lg:grid-flow-dense"
      }`}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ${delay}ms, transform 0.7s ${delay}ms`,
      }}
    >
      {/* Image */}
      <div className={`relative h-72 lg:h-auto overflow-hidden ${isEven ? "" : "lg:order-2"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hall.img}
          alt={hall.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[#1a0a0a]/20 group-hover:bg-[#1a0a0a]/10 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className={`bg-white p-10 flex flex-col justify-center ${isEven ? "" : "lg:order-1"}`}>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {hall.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-[#D4AF77]/40 text-[#800000]"
            >
              {t}
            </span>
          ))}
        </div>

        <h2
          className="text-2xl md:text-3xl font-bold text-[#1a0a0a] mb-3"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {hall.name}
        </h2>

        <p className="text-[#1a0a0a]/55 text-sm leading-relaxed mb-6">{hall.desc}</p>

        {/* Stats */}
        <div className="flex gap-8 mb-7">
          <div>
            <p className="text-[#D4AF77] text-xs tracking-[0.25em] uppercase mb-0.5">Capacity</p>
            <p className="text-[#1a0a0a] font-semibold text-sm">{hall.capacity}</p>
          </div>
          <div>
            <p className="text-[#D4AF77] text-xs tracking-[0.25em] uppercase mb-0.5">Area</p>
            <p className="text-[#1a0a0a] font-semibold text-sm">{hall.area}</p>
          </div>
        </div>

        <a
          href="#inquiry"
          className="inline-block text-center py-3 px-8 border border-[#D4AF77] text-[#800000] text-sm tracking-[0.14em] uppercase font-semibold hover:bg-[#D4AF77] hover:text-[#1a0a0a] transition-all duration-300 self-start"
        >
          Enquire About This Hall
        </a>
      </div>
    </div>
  );
}

// ── Inquiry form ──
function InquiryForm() {
  const { ref, inView } = useInView();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", event: "Wedding", guests: "", date: "", message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    // TODO: Connect to Supabase or Resend here
    console.log("Inquiry submitted:", form);
    setSubmitted(true);
  }

  return (
    <section id="inquiry" className="py-24 px-6 bg-[#faf6ef]">
      <div
        ref={ref}
        className="max-w-3xl mx-auto transition-all duration-700"
        style={{
          opacity:   inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(32px)",
        }}
      >
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[#D4AF77] text-xs tracking-[0.4em] uppercase mb-3">Get in Touch</p>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#1a0a0a]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Book a Banquet
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-px w-12 bg-[#D4AF77]/40" />
            <span className="text-[#D4AF77]">✦</span>
            <span className="h-px w-12 bg-[#D4AF77]/40" />
          </div>
        </div>

        {submitted ? (
          // Success state
          <div className="text-center py-16 border border-[#D4AF77]/30 bg-white">
            <p className="text-[#D4AF77] text-4xl mb-4">✦</p>
            <h3
              className="text-2xl font-bold text-[#1a0a0a] mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Thank You!
            </h3>
            <p className="text-[#1a0a0a]/55 text-sm">
              We've received your enquiry. Our events team will call you within 24 hours.
            </p>
          </div>
        ) : (
          // Form
          <div className="bg-white shadow-md p-8 md:p-12 border border-[#D4AF77]/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Name */}
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#1a0a0a]/50 mb-2">
                  Full Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Rahul Sharma"
                  className="w-full border border-[#D4AF77]/25 px-4 py-3 text-sm text-[#1a0a0a] placeholder-[#1a0a0a]/30 focus:outline-none focus:border-[#D4AF77] transition-colors duration-200 bg-transparent"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#1a0a0a]/50 mb-2">
                  Phone Number *
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full border border-[#D4AF77]/25 px-4 py-3 text-sm text-[#1a0a0a] placeholder-[#1a0a0a]/30 focus:outline-none focus:border-[#D4AF77] transition-colors duration-200 bg-transparent"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#1a0a0a]/50 mb-2">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                  className="w-full border border-[#D4AF77]/25 px-4 py-3 text-sm text-[#1a0a0a] placeholder-[#1a0a0a]/30 focus:outline-none focus:border-[#D4AF77] transition-colors duration-200 bg-transparent"
                />
              </div>

              {/* Event type */}
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#1a0a0a]/50 mb-2">
                  Event Type *
                </label>
                <select
                  name="event"
                  value={form.event}
                  onChange={handleChange}
                  className="w-full border border-[#D4AF77]/25 px-4 py-3 text-sm text-[#1a0a0a] focus:outline-none focus:border-[#D4AF77] transition-colors duration-200 bg-white"
                >
                  {["Wedding", "Engagement", "Birthday", "Corporate Event", "Mehndi / Sangeet", "Other"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Guest count */}
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#1a0a0a]/50 mb-2">
                  Expected Guests *
                </label>
                <input
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  placeholder="e.g. 300"
                  className="w-full border border-[#D4AF77]/25 px-4 py-3 text-sm text-[#1a0a0a] placeholder-[#1a0a0a]/30 focus:outline-none focus:border-[#D4AF77] transition-colors duration-200 bg-transparent"
                />
              </div>

              {/* Event date */}
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#1a0a0a]/50 mb-2">
                  Preferred Date
                </label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border border-[#D4AF77]/25 px-4 py-3 text-sm text-[#1a0a0a] focus:outline-none focus:border-[#D4AF77] transition-colors duration-200 bg-transparent"
                />
              </div>

              {/* Message — full width */}
              <div className="sm:col-span-2">
                <label className="block text-xs tracking-[0.2em] uppercase text-[#1a0a0a]/50 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your dream event — décor preferences, catering requirements, etc."
                  className="w-full border border-[#D4AF77]/25 px-4 py-3 text-sm text-[#1a0a0a] placeholder-[#1a0a0a]/30 focus:outline-none focus:border-[#D4AF77] transition-colors duration-200 bg-transparent resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="mt-8 w-full py-4 bg-[#D4AF77] text-[#1a0a0a] font-semibold text-sm tracking-[0.2em] uppercase hover:bg-[#ffd700] transition-colors duration-300"
            >
              Send Enquiry
            </button>

            <p className="text-center text-[#1a0a0a]/30 text-xs mt-4 tracking-wide">
              We respond within 24 hours · No booking fee to enquire
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function BanquetPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <>
      <Navbar />

      <main className="bg-[#faf6ef] min-h-screen">

        {/* ── Hero banner ── */}
        <section className="relative h-80 md:h-[28rem] flex items-end overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/id/326/1920/700"
            alt="Grand banquet hall"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a]/92 via-[#1a0a0a]/55 to-transparent" />

          <div
            className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-14 w-full"
            style={{
              opacity:    mounted ? 1 : 0,
              transform:  mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s, transform 0.9s",
            }}
          >
            <p className="text-[#D4AF77] text-xs tracking-[0.4em] uppercase mb-2">
              Celebrations & Milestones
            </p>
            <h1
              className="text-4xl md:text-6xl font-bold text-[#f5f0e8]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Banquets &
              <br />
              Weddings
            </h1>
          </div>
        </section>

        {/* ── Intro strip ── */}
        <section className="bg-[#1a0a0a] py-10 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "3",     label: "Banquet Halls" },
              { value: "800+",  label: "Max Guests" },
              { value: "500+",  label: "Events Hosted" },
              { value: "100%",  label: "Custom Décor" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p
                  className="text-3xl font-bold text-[#D4AF77] mb-1"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {value}
                </p>
                <p className="text-[#f5f0e8]/40 text-xs tracking-[0.25em] uppercase">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Hall cards ── */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-10">
            {HALLS.map((hall, i) => (
              <HallCard key={hall.name} hall={hall} index={i} />
            ))}
          </div>
        </section>

        {/* ── Services highlight ── */}
        <section className="py-16 px-6 bg-[#1a0a0a]">
          <div className="max-w-7xl mx-auto text-center mb-10">
            <p className="text-[#D4AF77] text-xs tracking-[0.4em] uppercase mb-2">What We Provide</p>
            <h2
              className="text-3xl font-bold text-[#f5f0e8]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Everything Included
            </h2>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {[
              { icon: "🌸", label: "Custom Décor" },
              { icon: "🍽️", label: "In-house Catering" },
              { icon: "🎵", label: "AV & Sound" },
              { icon: "💡", label: "Lighting Design" },
              { icon: "📸", label: "Photo Spaces" },
              { icon: "🧑‍💼", label: "Event Coordinator" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 p-5 border border-[#D4AF77]/12 hover:border-[#D4AF77]/40 transition-colors duration-300"
              >
                <span className="text-2xl">{icon}</span>
                <p className="text-[#f5f0e8]/55 text-xs tracking-[0.15em] uppercase text-center">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Inquiry form ── */}
        <InquiryForm />

      </main>

      <Footer />
    </>
  );
}
