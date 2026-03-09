"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const fragranceOptions = [
  { name: "Aloe & Mint", mood: "Cool and naturally fresh", accent: "#2dd4bf" },
  { name: "Ocean Breeze", mood: "Crisp and airy clean", accent: "#38bdf8" },
  { name: "Citrus Burst", mood: "Bright and energetic", accent: "#fbbf24" },
  { name: "Lavender Calm", mood: "Soft and relaxing", accent: "#a78bfa" },
];

const whyChoose = [
  { icon: "star",    title: "Instant Freshness",     desc: "Stay clean and refreshed without taking a bath." },
  { icon: "drop",    title: "No Water Needed",        desc: "Designed for situations where bathing facilities are unavailable." },
  { icon: "bag",     title: "Travel Friendly",        desc: "Easy to carry in bags, backpacks, or luggage." },
  { icon: "clock",   title: "Time Saving",            desc: "Feel refreshed in just a few minutes." },
  { icon: "shield",  title: "Hygienic & Convenient",  desc: "Individually packed wipes ensure cleanliness and easy use anywhere." },
];

function WhyIcon({ name }) {
  if (name === "star") return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="currentColor"/>
    </svg>
  );
  if (name === "drop") return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C12 2 4 10 4 15a8 8 0 0016 0C20 10 12 2 12 2z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
  if (name === "bag") return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
  if (name === "clock") return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.14 9 11.35C17.25 22.14 21 17.25 21 12V7L12 2z" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const specs = [
  { label: "Size", value: "30 cm × 40 cm — Full body use" },
  { label: "Formula", value: "Alcohol-free & pH balanced" },
  { label: "Tested", value: "Dermatologically tested" },
  { label: "Skin Safe", value: "Suitable for sensitive skin" },
];

const perfectFor = [
  "Travelers", "Commuters", "Backpackers", "Pilgrimages",
  "Long Journeys", "Trekking & Camping", "Road Trips",
];

const howToUse = [
  { step: "01", title: "Open the Pack", desc: "Remove the wipe from the individual sealed packet." },
  { step: "02", title: "Activate the Foam", desc: "Lightly sprinkle a few drops of water on the cleansing side and rub gently to create foam." },
  { step: "03", title: "Clean Your Skin", desc: "Use the foaming side to wipe away sweat, dirt, and odor from your body." },
  { step: "04", title: "Dry Instantly", desc: "Flip the wipe and use the soft towel side to dry your skin." },
  { step: "05", title: "Dispose Responsibly", desc: "Dispose of the used wipe properly after use." },
];

export default function Home() {
  const [status, setStatus] = useState("idle");
  const [selectedVote, setSelectedVote] = useState("");

  useEffect(() => {
    const storedVote = window.localStorage.getItem("ongo-vote");
    if (storedVote) setSelectedVote(storedVote);
  }, []);

  const submitVote = async (type) => {
    if (selectedVote) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("Vote failed");
      setSelectedVote(type);
      window.localStorage.setItem("ongo-vote", type);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* ── Sticky Header ── */}
      <header className="site-header">
        <div className="header-inner">
          <div className="header-logo">
            <Image src="/ongo.png" alt="OnGo" width={110} height={48} className="nav-logo-img" priority />
          </div>
          <nav className="header-nav" aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#how-to-use">How to Use</a>
          </nav>
          <a href="#vote" className="btn btn-primary btn-sm">Vote Now</a>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-card">
            <h1>Stay Fresh<br />Anytime, Anywhere.</h1>

            <div className="vote-buttons">
              <button
                className="btn btn-primary"
                onClick={() => submitVote("interested")}
                disabled={Boolean(selectedVote) || status === "loading"}
              >
                I'm Interested
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => submitVote("notInterested")}
                disabled={Boolean(selectedVote) || status === "loading"}
              >
                Not for Me
              </button>
            </div>
            {selectedVote && (
              <p className="vote-status">Thanks for your response! We'll keep you posted.</p>
            )}
          </div>
        </section>

        {/* ── About ── */}
        <section className="section glass-card" id="about">
          <p className="eyebrow-section">About the Product</p>
          <h2>OnGo Instant Bath Wipes</h2>
          <p>
            Designed for travelers, trekkers, and anyone on the move who needs quick and effective
            personal hygiene without access to a shower. Each wipe is dual-sided — one side produces
            a gentle cleansing foam, while the other acts as a soft towel to dry your skin.
          </p>
          <div className="spec-grid">
            {specs.map((s) => (
              <div className="spec-item" key={s.label}>
                <span className="spec-label">{s.label}</span>
                <span className="spec-value">{s.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── How to Use ── */}
        <section className="section glass-card" id="how-to-use">
          <p className="eyebrow-section">How to Use</p>
          <h2>5 Simple Steps</h2>
          <div className="steps">
            {howToUse.map((s) => (
              <article className="step" key={s.step}>
                <span className="step-num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Why Choose ── */}
        <section className="section glass-card">
          <p className="eyebrow-section">Why Choose OnGo</p>
          <h2>Built for People on the Move</h2>
          <div className="why-grid">
            {whyChoose.map((w) => (
              <article className="why-card" key={w.title}>
                <div className="why-icon"><WhyIcon name={w.icon} /></div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Fragrance ── */}
        <section className="section glass-card">
          <p className="eyebrow-section">Fragrance Options</p>
          <h2>Choose Your Scent</h2>
          <div className="fragrance-grid">
            {fragranceOptions.map((option) => (
              <article
                className="fragrance-card"
                key={option.name}
                style={{ "--accent": option.accent }}
              >
                <span className="frag-dot" />
                <h3>{option.name}</h3>
                <p>{option.mood}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Ingredients ── */}
        <section className="section glass-card">
          <p className="eyebrow-section">What's Inside</p>
          <h2>Ingredients</h2>
          <div className="ingredient-grid">
            {["Aloe Vera Extract","Purified Water (Aqua)","Tea Tree Oil","Glycerin","Vitamin E","Mild Cleansing Agents","Natural Fragrance"].map((i) => (
              <span className="ingredient-tag" key={i}>{i}</span>
            ))}
          </div>
        </section>

        {/* ── Perfect For ── */}
        <section className="section glass-card">
          <p className="eyebrow-section">Perfect For</p>
          <h2>Wherever You Go</h2>
          <ul className="feature-list">
            {perfectFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* ── CTA ── */}
        <section className="section cta" id="vote">
          <p className="eyebrow-section">Share Your Interest</p>
          <h2>Ready to Stay Fresh?</h2>
          <p>
            Join travelers who trust OnGo for instant freshness on the go. Let us know if
            this is something you'd love to have!
          </p>
          <div className="vote-buttons">
            <button
              className="btn btn-primary"
              onClick={() => submitVote("interested")}
              disabled={Boolean(selectedVote) || status === "loading"}
            >
              I'm Interested
            </button>
            <button
              className="btn btn-outline"
              onClick={() => submitVote("notInterested")}
              disabled={Boolean(selectedVote) || status === "loading"}
            >
              Not for Me
            </button>
          </div>
          {selectedVote && (
            <p className="vote-status">Thanks for your response! We'll keep you posted.</p>
          )}
        </section>

        <footer>
          <p>© 2026 OnGo Instant Bath Wipes. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
