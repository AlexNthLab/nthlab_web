'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// ── Intersection Observer Hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Data ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: '⏱',
    title: 'Hybrid Logical Clock',
    desc: 'Multi-agent task streams maintain causal consistency through network instability. No more out-of-order instructions.',
  },
  {
    icon: '📝',
    title: 'Write-Ahead Log (WAL)',
    desc: 'Every operation is journaled before execution. Power failure, crash, or interruption — resume from the exact breakpoint, zero data loss.',
  },
  {
    icon: '📸',
    title: 'Epoch Snapshots',
    desc: 'Full agent world-state archived at every epoch. Roll back to any point in time. Audit and reproduce results with one command.',
  },
  {
    icon: '🔒',
    title: 'SafeExec Sandbox',
    desc: 'Code runs in isolated environments. Dangerous operations are intercepted by the framework — not dependent on model self-discipline.',
  },
  {
    icon: '🔗',
    title: 'Causal Stitcher',
    desc: 'Cross-agent task chains track causal relationships automatically. Every result has a fully auditable derivation path.',
  },
  {
    icon: '🧠',
    title: 'Three-Layer Memory',
    desc: 'L1 hot memory for millisecond recall, L2 warm memory for cross-session persistence, L3 cold memory for vector retrieval. Never forgets.',
  },
];

const PROBLEMS = [
  { stat: '73%', label: 'of AI tasks fail due to hallucination', sub: 'Probabilistic output — unpredictable results' },
  { stat: '∞', label: 'manual review overhead', sub: 'Every run requires checking if AI "went rogue"' },
  { stat: '0', label: 'audit traceability', sub: 'When it fails, you can\'t tell which step broke' },
];

const STEPS = [
  { n: '01', title: 'Task Received', desc: 'Agent receives instruction. HLC clock stamps it, causal chain begins recording.' },
  { n: '02', title: 'WAL Pre-Write', desc: 'Operation plan journaled before execution. Interruptions are fully recoverable.' },
  { n: '03', title: 'SafeExec Run', desc: 'Sandboxed execution with automatic hazard interception. Results verified before writing out.' },
  { n: '04', title: 'Epoch Archive', desc: 'State snapshot stored. Roll back, audit, or reproduce any run — deterministically.' },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function NthLabWebsiteEnglish() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hero = useInView(0.1);
  const problems = useInView(0.1);
  const features = useInView(0.1);
  const howItWorks = useInView(0.1);
  const cta = useInView(0.1);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans">

      {/* ── Navigation ────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800' : ''
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/en" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Nth Lab" width={32} height={32} className="rounded" />
            <span className="text-sm font-semibold tracking-widest uppercase">Nᵗʰ Lab</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {[['Product', '#features'], ['How It Works', '#how-it-works'], ['Docs', 'https://docs.nthlab.ai']].map(([label, href]) => (
              <a key={label} href={href}
                className="text-sm tracking-wide text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                {label}
              </a>
            ))}
            <a href="https://github.com/AlexNthLab"
              className="text-sm px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full hover:border-cyan-400 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
              GitHub
            </a>
            <a href="/"
              className="text-xs text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              中文
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className="block w-5 h-px bg-current mb-1" />
            <span className="block w-5 h-px bg-current mb-1" />
            <span className="block w-5 h-px bg-current" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 px-6 py-4 flex flex-col gap-4">
            {[['Product', '#features'], ['How It Works', '#how-it-works'], ['GitHub', 'https://github.com/AlexNthLab'], ['中文', '/']].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-700 dark:text-gray-300">
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto text-center" ref={hero.ref}>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-600 dark:text-cyan-400 text-xs tracking-widest uppercase mb-8 transition-all duration-700 ${hero.inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Nth Agent Pro · Deterministic AI Framework
        </div>

        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6 transition-all duration-700 delay-100 ${hero.inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          Reject Probability.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
            Embrace Certainty.
          </span>
        </h1>

        <p className={`text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${hero.inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          The first framework that guarantees AI behavior through engineering, not prayer.<br />
          HLC causality · WAL journaling · SafeExec sandbox · Epoch snapshots.<br />
          Transform AI from <strong>probabilistic guessing</strong> into <strong>verifiable execution</strong>.
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${hero.inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <a href="https://github.com/AlexNthLab"
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full hover:scale-105 transition-transform duration-200">
            Get Started →
          </a>
          <a href="#how-it-works"
            className="px-8 py-3 border border-gray-300 dark:border-gray-700 text-sm font-semibold rounded-full hover:border-cyan-400 dark:hover:border-cyan-400 transition-colors duration-200">
            See How It Works
          </a>
        </div>

        <div className={`mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto transition-all duration-700 delay-500 ${hero.inView ? 'opacity-100' : 'opacity-0'}`}>
          {[['100%', 'Traceable ops'], ['0', 'Data loss'], ['∞', 'Rollback power']].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-500">{val}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Problem ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-950" ref={problems.ref}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${problems.inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">The Problem</p>
            <h2 className="text-3xl md:text-5xl font-bold">
              Current AI tools<br />
              <span className="text-gray-400">can't be trusted with real autonomy</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROBLEMS.map(({ stat, label, sub }, i) => (
              <div key={i}
                className={`p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-all duration-700 ${problems.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-4xl font-bold text-red-500 mb-2">{stat}</div>
                <div className="text-base font-semibold mb-1">{label}</div>
                <div className="text-sm text-gray-500 dark:text-gray-500">{sub}</div>
              </div>
            ))}
          </div>

          <div className={`mt-12 p-8 rounded-2xl bg-black dark:bg-white text-white dark:text-black transition-all duration-700 delay-300 ${problems.inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg md:text-2xl font-bold text-center">
              "Your AI assistant is smart. But can it guarantee consistent results every single time?"
            </p>
            <p className="text-center text-gray-400 dark:text-gray-600 mt-3 text-sm">
              Nᵗʰ Lab's answer is: <span className="text-cyan-400 dark:text-cyan-600 font-semibold">Yes. Through engineering — not luck.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6" ref={features.ref}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${features.inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">Core Capabilities</p>
            <h2 className="text-3xl md:text-5xl font-bold">Six layers of determinism</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Each layer is an engineering guarantee — not a "prompt and pray" strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon, title, desc }, i) => (
              <div key={i}
                className={`group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-cyan-400/50 dark:hover:border-cyan-400/50 bg-white dark:bg-black hover:bg-cyan-400/5 transition-all duration-300 ${features.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-base font-bold mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 bg-gray-50 dark:bg-gray-950" ref={howItWorks.ref}>
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${howItWorks.inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">How It Works</p>
            <h2 className="text-3xl md:text-5xl font-bold">Four-step deterministic execution</h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-10 bottom-10 w-px bg-gradient-to-b from-cyan-400/50 to-transparent hidden md:block" />
            <div className="space-y-8">
              {STEPS.map(({ n, title, desc }, i) => (
                <div key={i}
                  className={`flex gap-6 items-start transition-all duration-700 ${howItWorks.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                  style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl border-2 border-cyan-400/50 bg-cyan-400/10 flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">{n}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-bold mb-1">{title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Standard AI vs. Nth Agent Pro</h2>
          </div>
          <div className="grid grid-cols-2 gap-px bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-900 p-6 text-center">
              <p className="text-sm font-semibold text-gray-500">Standard AI Agents</p>
            </div>
            <div className="bg-cyan-400/10 p-6 text-center">
              <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Nth Agent Pro</p>
            </div>
            {[
              ['Non-deterministic output', 'Deterministic, reproducible output'],
              ['Failures hard to diagnose', 'Every step auditable'],
              ['Full restart on crash', 'Resume from exact breakpoint'],
              ['Trust model self-discipline', 'Engineering-enforced safety boundary'],
              ['No rollback', 'Roll back to any Epoch'],
              ['Black-box execution', 'Full causal chain transparency'],
            ].map(([bad, good], i) => (
              <React.Fragment key={i}>
                <div className="bg-white dark:bg-black p-5 flex items-center gap-3">
                  <span className="text-red-400 text-lg">✗</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{bad}</span>
                </div>
                <div className="bg-white dark:bg-black p-5 flex items-center gap-3 border-l border-gray-200 dark:border-gray-800">
                  <span className="text-cyan-500 text-lg">✓</span>
                  <span className="text-sm font-medium">{good}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-black dark:bg-white text-white dark:text-black" ref={cta.ref}>
        <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${cta.inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 mb-6">
            Get Started
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Make AI work for you.<br />
            <span className="text-cyan-400 dark:text-cyan-600">Not guess at your intent.</span>
          </h2>
          <p className="text-gray-400 dark:text-gray-600 mb-10 max-w-lg mx-auto">
            Nth Agent Pro is open source and free. Runs on your machine. Data never leaves your device.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/AlexNthLab"
              className="px-8 py-4 bg-white dark:bg-black text-black dark:text-white text-sm font-bold rounded-full hover:scale-105 transition-transform duration-200">
              View on GitHub →
            </a>
            <a href="/"
              className="px-8 py-4 border border-gray-600 dark:border-gray-400 text-sm font-semibold rounded-full hover:border-white dark:hover:border-black transition-colors duration-200">
              中文版本
            </a>
          </div>
          <p className="mt-8 text-xs text-gray-600 dark:text-gray-500">
            MIT License · Local-first · Zero data upload
          </p>
        </div>
      </section>

    </div>
  );
}
