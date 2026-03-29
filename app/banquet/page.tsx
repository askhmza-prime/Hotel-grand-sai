"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HALLS = [
  {
    name: "The Durbar Hall",
    capacity: "Up to 800 guests",
    area: "12,000 sq ft",
    img: "https://picsum.photos/id/326/800/500",
    desc: "Our grandest space — ideal for large wedding receptions, baraats, and gala dinners. Features a dedicated stage, state-of-the-art AV, and chandelier ceiling.",
    tags: ["Wedding Reception", "Baraat", "Gala Dinner"],
  },
  {
    name: "Sai Crystal Hall",
    capacity: "Up to 350 guests",
    area: "6,500 sq ft",
    img: "https://picsum.photos/id/431/800/500",
    desc: "Elegant mid-size hall for engagement ceremonies, birthday milestones, and corporate award nights.",
    tags: ["Engagement", "Birthday", "Corporate"],
  },
  {
    name: "The Courtyard",
    capacity: "Up to 150 guests",
    area: "3,200 sq ft",
    img: "https://picsum.photos/id/225/800/500",
    desc: "Open-air garden setting with fairy lights — perfect for mehndis, sangeets, and intimate celebrations.",
    tags: ["Mehndi", "Sangeet", "Intimate"],
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

function HallCard({ hall, index }: { hall: typeof HALLS[0]; index: number }) {
  const { ref, inView } = useInView();
  const isEven = index % 2 === 0;
  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-md group hover:shadow-[0_8px_48px_rgba(212,175,119,0.18)] transition-all duration-500`}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.7s ${index * 140}ms, transform 0.7s ${index * 140}ms` }}
    >
      <div className={`relative h-72 lg:h-auto overflow-hidden ${isEven ? "" : "lg:order-2"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hall.img} alt={hall.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className={`bg-white p-10 flex flex-col justify-center ${isEven ? "" : "lg:order-1"}`}>
        <div className="flex flex-wrap gap-2 mb-5">
          {hall.tags.map((t) => (
            <span key={t} className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-[#D4AF77]/40 text-[#800000]">{t}</span>
          ))}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a0a0a] mb-3" style={{ fontFamily: "Georgia, serif" }}>{hall.name}</h2>
        <p className="text-[#1a0a0a]/55 text-sm leading-relaxed mb-6">{hall.desc}</p>
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
        <a href="#inquiry" className="inline-block text-center py-3 px-8 border border-[#D4AF77] text-[#800000] text-sm tracking-[0.14em] uppercase font-semibold hover:bg-[#D4AF77] hover:text-[#1a0a0a] transition-all duration-300 self-start">
          Enquire About This Hall
        </a>
      </div>
    </div>
  );
}

function InquiryForm() {
  const { ref, inView } = useInView();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", event: "Wedding", guests: "", date: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <section id="inquiry" className="py-24 px-6 bg-[#faf6ef]">
      <div ref={ref} className="max-w-3xl mx-auto transition-all duration-700" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)" }}>
        <div className="text-center mb-12">
          <p className="text-[#D4AF77] text-xs tracking-[0.4em] uppercase mb-3">Get in Touch</p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a0a0a]" style={{ fontFamily: "Georgia, serif" }}>Book a Banquet</h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-px w-12 bg-[#D4AF77]/40" /><span className="text-[#D4AF77]">✦</span><span className="h-px w-12 bg-[#D4AF77]/40" />
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-16 border border-[#D4AF77]/30 bg-white">
            <p className="text-[#D4AF77] text-4xl mb-4">✦</p>
            <h3 className="text-2xl font-bold text-[#1a0a0a] mb-3" style={{ fontFamily: "Georgia, serif" }}>Thank You!</h3>
            <p className="text-[#1a0a0a]/55 text-sm">We've received your enquiry. Our events team will call you within 24 hours.</p>
          </div>
        ) : (
          <div className="bg-white shadow-md p-8 md:p-12 border border-[#D4AF77]/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: "name",  label: "Full Name *",       placeholder: "Rahul Sharma",         type: "text" },
                { name: "phone", label: "Phone Number *",    placeholder: "+91 98765 43210",      type: "text" },
                { name: "email", label: "Email Address",     placeholder: "rahul@example.com",    type: "email" },
                { name: "guests",label: "Expected Guests *", placeholder: "e.g. 300",             type: "text" },
                { name: "date",  label: "Preferred Date",    placeholder: "",                     type: "date" },
              ].map(({ name, label, placeholder, type }) => (
                <div key={name}>
                  <label className="block text-xs tracking-[0.2em] uppercase text-[#1a0a0a]/50 mb-2">{label}</label>
                  <input name={name} type={type} value={form[name as keyof typeof form]} onChange={handleChange} placeholder={placeholder}
                    className="w-full border border-[#D4AF77]/25 px-4 py-3 text-sm text-[#1a0a0a] placeholder-[#1a0a0a]/30 focus:outline-none focus:border-[#D4AF77] transition-colors bg-transparent" />
                </div>
              ))}

              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-[#1a0a0a]/50 mb-2">Event Type *</label>
                <select name="event" value={form.event} onChange={handleChange} className="w-full border border-[#D4AF77]/25 px-4 py-3 text-sm text-[#1a0a0a] focus:outline-none focus:border-[#D4AF77] transition-colors bg-white">
                  {["Wedding", "Engagement", "Birthday", "Corporate Event", "Mehndi / Sangeet", "Other"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs tracking-[0.2em] uppercase text-[#1a0a0a]/50 mb-2">Additional Requirements</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Décor preferences, catering requirements, etc."
                  className="w-full border border-[#D4AF77]/25 px-4 py-3 text-sm text-[#1a0a0a] placeholder-[#1a0a0a]/30 focus:outline-none focus:border-[#D4AF77] transition-colors bg-transparent resize-none" />
              </div>
            </div>

            <button onClick={() => setSubmitted(true)} className="mt-8 w-full py-4 bg-[#D4AF77] text-[#1a0a0a] font-semibold text-sm tracking-[0.2em] uppercase hover:bg-[#ffd700] transition-colors duration-300">
              Send Enquiry
            </button>
            <p className="text-center text-[#1a0a0a]/30 text-xs mt-4">We respond within 24 hours · No booking fee to enquire</p>
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
        {/* Hero */}
        <section className="relative h-80 md:h-[28rem] flex items-end overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/id/326/1920/700" alt="Banquet hall" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a]/92 via-[#1a0a0a]/55 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-14 w-full" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.9s, transform 0.9s" }}>
            <p className="text-[#D4AF77] text-xs tracking-[0.4em] uppercase mb-2">Celebrations & Milestones</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#f5f0e8]" style={{ fontFamily: "Georgia, serif" }}>Banquets &<br />Weddings</h1>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#1a0a0a] py-10 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[["3", "Banquet Halls"], ["800+", "Max Guests"], ["500+", "Events Hosted"], ["100%", "Custom Décor"]].map(([value, label]) => (
              <div key={label}>
                <p className="text-3xl font-bold text-[#D4AF77] mb-1" style={{ fontFamily: "Georgia, serif" }}>{value}</p>
                <p className="text-[#f5f0e8]/40 text-xs tracking-[0.25em] uppercase">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hall cards */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-10">
            {HALLS.map((hall, i) => <HallCard key={hall.name} hall={hall} index={i} />)}
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-6 bg-[#1a0a0a]">
          <div className="max-w-7xl mx-auto text-center mb-10">
            <p className="text-[#D4AF77] text-xs tracking-[0.4em] uppercase mb-2">What We Provide</p>
            <h2 className="text-3xl font-bold text-[#f5f0e8]" style={{ fontFamily: "Georgia, serif" }}>Everything Included</h2>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {[["🌸","Custom Décor"],["🍽️","In-house Catering"],["🎵","AV & Sound"],["💡","Lighting Design"],["📸","Photo Spaces"],["🧑‍💼","Event Coordinator"]].map(([icon, label]) => (
              <div key={label} className="flex flex-col items-center gap-3 p-5 border border-[#D4AF77]/12 hover:border-[#D4AF77]/40 transition-colors duration-300">
                <span className="text-2xl">{icon}</span>
                <p className="text-[#f5f0e8]/55 text-xs tracking-[0.15em] uppercase text-center">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <InquiryForm />
      </main>
      <Footer />
    </>
  );
}
