'use client';

import { useState } from 'react';
import Image from 'next/image';

type Section = 'home' | 'products' | 'services' | 'solutions' | 'pricing' | 'developers';

export default function NthLabWebsiteEnglish() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [active, setActive] = useState<Section>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const d = theme === 'dark';
  const T = {
    bg:        d ? 'bg-black'              : 'bg-white',
    text:      d ? 'text-white'            : 'text-black',
    sub:       d ? 'text-gray-400'         : 'text-gray-500',
    border:    d ? 'border-gray-800'       : 'border-gray-200',
    hborder:   d ? 'hover:border-gray-600' : 'hover:border-gray-400',
    divider:   d ? 'bg-gray-800'           : 'bg-gray-200',
    cardBg:    d ? 'bg-zinc-950'           : 'bg-gray-50',
    codeBg:    d ? 'bg-zinc-950'           : 'bg-gray-100',
    fill:      d ? 'bg-white'             : 'bg-black',
    accent:    d ? 'text-cyan-400'         : 'text-cyan-600',
    accentBg:  d ? 'bg-cyan-400/10'        : 'bg-cyan-100',
    accentBdr: d ? 'border-cyan-400'       : 'border-cyan-600',
    accentBtn: d ? 'bg-cyan-400 text-black': 'bg-cyan-600 text-white',
  };

  const go = (s: Section) => {
    setActive(s);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const NAV: [string, Section][] = [
    ['Products',   'products'],
    ['Services',   'services'],
    ['Solutions',  'solutions'],
    ['Pricing',    'pricing'],
    ['Developers', 'developers'],
  ];

  const Tick = () => <span className={`${T.accent} flex-shrink-0`}>✓</span>;

  /* ─────────────────────────────── Navbar ─────────────────────────────── */
  const Navbar = () => (
    <nav className={`fixed top-0 inset-x-0 z-50 ${T.bg}/95 backdrop-blur-md border-b ${T.border} transition-colors duration-700`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <button onClick={() => go('home')} className="text-base font-light tracking-[0.2em] hover:opacity-70 transition-opacity">
          N<sup className="text-xs">ᵗʰ</sup> LAB
        </button>

        <div className="hidden md:flex items-center gap-7">
          {NAV.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}
              className={`text-xs tracking-[0.1em] uppercase transition-colors ${active === id ? T.text : T.sub} hover:text-current`}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="/" className={`hidden sm:block text-xs tracking-[0.05em] uppercase ${T.sub} border ${T.border} px-2.5 py-1 hover:border-current transition-colors`}>
            中文
          </a>
          <button onClick={() => go('pricing')}
            className={`hidden sm:block px-4 py-1.5 ${T.accentBtn} text-xs tracking-[0.1em] uppercase hover:opacity-90 transition-opacity`}>
            Get Started
          </button>
          <button onClick={() => setTheme(d ? 'light' : 'dark')}
            className={`w-8 h-8 rounded-full border ${T.border} flex items-center justify-center hover:scale-110 transition-all duration-300`}>
            <div className={`w-2 h-2 rounded-full ${T.fill}`} />
          </button>
          <button className={`md:hidden ${T.sub}`} onClick={() => setMobileOpen(v => !v)}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={`md:hidden border-t ${T.border} px-6 py-4 space-y-4`}>
          {NAV.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}
              className={`block w-full text-left text-xs tracking-[0.1em] uppercase ${T.sub} hover:text-current transition-colors`}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );

  /* ──────────────────────────────── Home ───────────────────────────────── */
  const Home = () => (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-20">

      <div className="animate-fade-in-delay-1 mb-6">
        <div className="relative w-16 h-16">
          <Image src="/logo.png" alt="Nᵗʰ Lab" fill className="object-contain rounded-xl" priority />
        </div>
      </div>

      <div className={`inline-flex items-center gap-2 px-4 py-1.5 ${T.accentBg} border ${T.accentBdr} ${T.accent} text-xs tracking-[0.08em] uppercase mb-8 animate-fade-in-delay-1`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        AP Protocol v3.3 · Now Available
      </div>

      <h1 className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] text-center mb-4 animate-fade-in-delay-1 ${T.text}`}>
        N<sup className="text-xl md:text-3xl">ᵗʰ</sup> LAB
      </h1>
      <p className={`text-xl md:text-2xl text-center font-light mb-2 animate-fade-in-delay-2 ${T.text}`}>
        Reject Probability. Embrace Certainty.
      </p>
      <p className={`text-sm md:text-base text-center mb-1 animate-fade-in-delay-2 ${T.sub}`}>
        One Decision-Maker. A Dedicated Team of AI Advisors.
      </p>
      <p className={`text-sm md:text-base text-center italic mb-10 animate-fade-in-delay-2 ${T.sub}`}>
        The Deterministic Framework
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-delay-3">
        <button onClick={() => go('products')}
          className={`px-8 py-3 ${T.accentBg} border ${T.accentBdr} ${T.accent} text-xs tracking-[0.15em] uppercase hover:opacity-80 transition-opacity`}>
          Explore Products
        </button>
        <button onClick={() => go('services')}
          className={`px-8 py-3 border ${T.border} ${T.sub} text-xs tracking-[0.15em] uppercase hover:text-current hover:border-current transition-colors`}>
          Enterprise Services
        </button>
        <button onClick={() => go('pricing')}
          className={`px-8 py-3 ${T.accentBtn} text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity`}>
          Get Started
        </button>
      </div>

      <div className={`w-px h-10 ${T.divider} mb-12`} />

      {/* Core pillars */}
      <div className="max-w-5xl w-full mb-16 animate-fade-in-delay-3">
        <p className={`text-center text-xs tracking-[0.3em] uppercase ${T.sub} mb-8`}>Core Capabilities</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { key: 'Causal Order',  desc: 'Hybrid Logical Clocks (HLC) ensure causal consistency across all multi-agent task flows, eliminating race conditions in distributed environments. Data stays local at all times.' },
            { key: 'Atomicity',     desc: 'WAL write-ahead logging with three-phase atomic commits. Any crash or interruption can be fully recovered. The filesystem always stays consistent — no partial writes, ever.' },
            { key: 'Low Intrusion', desc: 'No system modifications, no elevated privileges. An embedded portable sandbox keeps AI operating in a controlled local runtime. Your data remains private and never leaves your infrastructure.' },
          ].map(f => (
            <div key={f.key} className={`p-6 md:p-8 border ${T.border} ${T.hborder} transition-all duration-500`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-sm ${T.fill}`} />
                <span className={`text-xs tracking-[0.2em] uppercase ${T.sub}`}>{f.key}</span>
              </div>
              <p className={`text-sm ${T.sub} leading-relaxed`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product preview */}
      <div className="max-w-5xl w-full animate-fade-in-delay-3">
        <p className={`text-center text-xs tracking-[0.3em] uppercase ${T.sub} mb-8`}>Products & Services</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {([
            { name: 'Nth Agent',     tag: 'Free',       desc: 'Local AI assistant, data never leaves your device',  sec: 'products', hi: false },
            { name: 'Nth IM Pro',    tag: 'Free',       desc: 'Mobile command center for task monitoring & approval', sec: 'products', hi: false },
            { name: 'Nth Agent Pro', tag: 'Enterprise', desc: 'Full AP Protocol + Multi-Agent orchestration',        sec: 'products', hi: true  },
            { name: 'Custom',        tag: 'Enterprise', desc: 'AI upgrade for industry software + model training',    sec: 'services', hi: false },
          ] as { name: string; tag: string; desc: string; sec: Section; hi: boolean }[]).map(c => (
            <button key={c.name} onClick={() => go(c.sec)}
              className={`p-5 border text-left transition-all duration-500 hover:-translate-y-0.5 ${
                c.hi ? `border-2 ${T.accentBdr}` : `${T.border} ${T.hborder}`
              }`}>
              <div className={`text-xs tracking-[0.1em] uppercase mb-3 ${c.hi ? T.accent : T.sub}`}>{c.tag}</div>
              <div className={`font-light text-base ${T.text} mb-1.5`}>{c.name}</div>
              <div className={`text-xs ${T.sub}`}>{c.desc}</div>
              <div className={`mt-4 text-xs tracking-[0.05em] ${c.hi ? T.accent : T.sub}`}>Learn more →</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );

  /* ─────────────────────────────── Products ───────────────────────────── */
  const Products = () => (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-light tracking-wide mb-2 ${T.text}`}>Product Line</h2>
        <p className={`text-sm ${T.sub} mb-3`}>Covering every AI use case from individual to enterprise, all sharing one deterministic execution core</p>
        <div className={`w-16 h-px ${T.divider} mb-12`} />

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Nth Agent */}
          <div className={`border ${T.border} ${T.hborder} transition-all duration-500`}>
            <div className={`p-6 border-b ${T.border}`}>
              <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-1`}>Free</div>
              <h3 className={`text-xl font-light ${T.text} mb-3`}>Nth Agent</h3>
              <p className={`text-sm ${T.sub} leading-relaxed`}>
                A local-first AI desktop assistant. Handle file operations, document translation,
                and code analysis in natural language — all data stays on your machine.
              </p>
            </div>
            <div className="p-6">
              <ul className={`text-sm ${T.sub} space-y-2.5 mb-8`}>
                {[
                  'Natural language file operations (read/write/translate/summarize)',
                  'Local write protection with automatic backups',
                  'Supports Claude, DeepSeek, and other major LLMs',
                  'PDF / Word / scanned OCR translation',
                  'Windows native desktop application',
                ].map(f => <li key={f} className="flex items-start gap-2"><Tick /><span>{f}</span></li>)}
              </ul>
              <div className={`text-xl font-light ${T.text} mb-1`}>Free</div>
              <div className={`text-xs ${T.sub} mb-5`}>Forever free, no feature restrictions</div>
              <button className={`w-full py-3 border ${T.border} text-xs tracking-[0.1em] uppercase ${T.sub} hover:text-current hover:border-current transition-colors`}>
                Download Now
              </button>
            </div>
          </div>

          {/* Nth IM Pro */}
          <div className={`border ${T.border} ${T.hborder} transition-all duration-500`}>
            <div className={`p-6 border-b ${T.border}`}>
              <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-1`}>Free</div>
              <h3 className={`text-xl font-light ${T.text} mb-3`}>Nth IM Pro</h3>
              <p className={`text-sm ${T.sub} leading-relaxed`}>
                A mobile command center for your AI tasks. iOS & Android, real-time task push notifications,
                and one-tap mobile approvals for critical operations.
              </p>
            </div>
            <div className="p-6">
              <ul className={`text-sm ${T.sub} space-y-2.5 mb-8`}>
                {[
                  'iOS & Android native applications',
                  'Real-time task progress & status monitoring',
                  'One-tap mobile approval for critical operations',
                  'Multi-agent parallel task overview panel',
                  'Bring Your Own Key (BYOK) AI provider support',
                  'Deep integration with Nth Agent Pro',
                ].map(f => <li key={f} className="flex items-start gap-2"><Tick /><span>{f}</span></li>)}
              </ul>
              <div className={`text-xl font-light ${T.text} mb-1`}>Free</div>
              <div className={`text-xs ${T.sub} mb-5`}>App Store / Google Play</div>
              <button className={`w-full py-3 border ${T.border} text-xs tracking-[0.1em] uppercase ${T.sub} hover:text-current hover:border-current transition-colors`}>
                Download App
              </button>
            </div>
          </div>

          {/* Nth Agent Pro */}
          <div className={`border-2 ${T.accentBdr} relative transition-all duration-500`}>
            <div className={`absolute -top-3 left-6 px-3 py-1 ${T.accentBg} ${T.accent} text-xs tracking-[0.1em] uppercase border ${T.accentBdr}`}>
              Recommended
            </div>
            <div className={`p-6 border-b ${T.border}`}>
              <div className={`text-xs tracking-[0.2em] uppercase ${T.accent} mb-1`}>Enterprise</div>
              <h3 className={`text-xl font-light ${T.text} mb-3`}>Nth Agent Pro</h3>
              <p className={`text-sm ${T.sub} leading-relaxed`}>
                Enterprise-grade deterministic AI workstation. Full AP Protocol v3.3 with multi-agent
                orchestration, immutable audit logs, operation isolation sandbox, and mobile approval loop.
              </p>
            </div>
            <div className="p-6">
              <ul className={`text-sm ${T.sub} space-y-2.5 mb-8`}>
                {[
                  'Full AP Protocol v3.3 execution engine',
                  'Multi-agent concurrent orchestration',
                  'Immutable operation audit log',
                  'Operation-level isolation sandbox (Shadow Root)',
                  'Three-tier safety rules engine (L1/L2/L3)',
                  'Nth IM Pro mobile approval loop',
                  'Enterprise private deployment support',
                  '24/7 dedicated technical support',
                ].map(f => <li key={f} className="flex items-start gap-2"><Tick /><span>{f}</span></li>)}
              </ul>
              <div className="flex items-baseline gap-1 mb-1">
                <span className={`text-xl font-light ${T.text}`}>$699</span>
                <span className={`text-xs ${T.sub}`}>/node/year</span>
              </div>
              <div className={`text-xs ${T.sub} mb-5`}>Includes full-year support and updates</div>
              <button onClick={() => go('pricing')}
                className={`w-full py-3 ${T.accentBtn} text-xs tracking-[0.1em] uppercase hover:opacity-90 transition-opacity`}>
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  /* ─────────────────────────────── Services ───────────────────────────── */
  const Services = () => (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-light tracking-wide mb-2 ${T.text}`}>Professional Services</h2>
        <p className={`text-sm ${T.sub} mb-3`}>Beyond products — end-to-end delivery from industry software AI upgrades to custom model training</p>
        <div className={`w-16 h-px ${T.divider} mb-12`} />

        {/* Service 1 */}
        <div className={`border ${T.border} ${T.hborder} transition-all duration-500 mb-8`}>
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-10">
              <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-2`}>Service One</div>
              <h3 className={`text-2xl md:text-3xl font-light ${T.text} mb-1`}>Industry Software</h3>
              <h3 className={`text-2xl md:text-3xl font-light ${T.accent} mb-6`}>AI Intelligence Upgrade</h3>
              <p className={`text-sm ${T.sub} leading-relaxed mb-8`}>
                Your ERP, MES, CRM, and OA systems hold years of valuable data — but lack AI intelligence.
                We inject AI decision-making capability without rewriting your existing code or changing
                your data permission boundaries. Give your legacy systems new life.
              </p>
              <div className="space-y-3 mb-8">
                {([
                  ['Non-Invasive Integration', 'Via a standardized adapter layer — zero changes to your existing system'],
                  ['Full Data Sovereignty',    'All operation data stays on your intranet, never uploaded externally'],
                  ['Auditable Decisions',      'Every AI recommendation carries a complete reasoning chain and operation log'],
                  ['Fast Delivery',            'Typical projects deliver a working MVP in 4–8 weeks'],
                ] as [string, string][]).map(([t, dc]) => (
                  <div key={t} className={`flex items-start gap-3 p-3 ${T.cardBg} border ${T.border}`}>
                    <Tick />
                    <div>
                      <div className={`text-sm font-medium ${T.text}`}>{t}</div>
                      <div className={`text-xs ${T.sub} mt-0.5`}>{dc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="mailto:contact@nthlab.ai?subject=Industry AI Upgrade Inquiry&body=Hello, I would like to learn about your industry software AI upgrade service.%0A%0ACompany:%0AIndustry:%0ARequirements:"
                className={`inline-block px-6 py-3 ${T.accentBtn} text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity`}>
                Request Custom Proposal
              </a>
            </div>
            <div className={`p-8 lg:p-10 border-t lg:border-t-0 lg:border-l ${T.border}`}>
              <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-6`}>Industry Applications</div>
              <div className="space-y-5">
                {[
                  { icon: '🏭', name: 'Manufacturing',    desc: 'MES smart scheduling, predictive maintenance, automated quality inspection analysis' },
                  { icon: '🏦', name: 'Finance & Banking', desc: 'AI-assisted risk control, automated compliance review, intelligent customer routing' },
                  { icon: '🏥', name: 'Healthcare',        desc: 'Clinical note summarization, diagnostic report assistance, insurance claim automation' },
                  { icon: '⚖️', name: 'Legal & Compliance',desc: 'Contract clause analysis, regulatory change impact assessment, case research assistance' },
                  { icon: '🏗️', name: 'Engineering',       desc: 'Smart document archiving, AI safety hazard detection, automated progress reporting' },
                ].map(item => (
                  <div key={item.name} className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <div className={`text-sm font-medium ${T.text}`}>{item.name}</div>
                      <div className={`text-xs ${T.sub} mt-0.5 leading-relaxed`}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Service 2 */}
        <div className={`border ${T.border} ${T.hborder} transition-all duration-500 mb-12`}>
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-10">
              <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-2`}>Service Two</div>
              <h3 className={`text-2xl md:text-3xl font-light ${T.text} mb-1`}>Custom AI Model</h3>
              <h3 className={`text-2xl md:text-3xl font-light ${T.accent} mb-6`}>Training Service</h3>
              <p className={`text-sm ${T.sub} leading-relaxed mb-8`}>
                Your enterprise has accumulated years of domain-specific data — the most valuable asset
                for building a proprietary AI model. We provide end-to-end managed model training:
                data engineering, fine-tuning, quantitative evaluation, and private deployment.
                Your data never leaves your control.
              </p>
              <div className="space-y-3 mb-8">
                {([
                  ['Data Never Leaves',    'Training runs entirely on your servers or designated private environment'],
                  ['Domain-Specific',      'Deep fine-tuning for your business scenarios, not a generic base model'],
                  ['Quantified Delivery',  'Benchmark reports provided — we prove model performance with data'],
                  ['Private Deployment',   'Final model deployed on your own infrastructure, fully autonomous'],
                ] as [string, string][]).map(([t, dc]) => (
                  <div key={t} className={`flex items-start gap-3 p-3 ${T.cardBg} border ${T.border}`}>
                    <Tick />
                    <div>
                      <div className={`text-sm font-medium ${T.text}`}>{t}</div>
                      <div className={`text-xs ${T.sub} mt-0.5`}>{dc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="mailto:contact@nthlab.ai?subject=AI Model Training Inquiry&body=Hello, I would like to learn about your custom AI model training service.%0A%0ACompany:%0AIndustry:%0AData scale description:%0ATarget capability:"
                className={`inline-block px-6 py-3 ${T.accentBtn} text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity`}>
                Inquire About Training
              </a>
            </div>
            <div className={`p-8 lg:p-10 border-t lg:border-t-0 lg:border-l ${T.border}`}>
              <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-6`}>Delivery Process</div>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Requirements Assessment', desc: 'Analyze business scenarios, data quality and scale, and target model capability metrics' },
                  { step: '02', title: 'Data Engineering',        desc: 'Data cleaning, annotation, augmentation — building a high-quality training corpus' },
                  { step: '03', title: 'Model Training',          desc: 'Select base model, execute fine-tuning, iterate optimization — all runs in your environment' },
                  { step: '04', title: 'Evaluation Report',       desc: 'Multi-dimensional benchmarks quantifying accuracy, recall, and key performance metrics' },
                  { step: '05', title: 'Private Deployment',      desc: 'Full deployment package delivery, local inference service setup, ongoing maintenance support' },
                ].map(item => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className={`text-xs font-mono ${T.accent} ${T.accentBg} px-2 py-1 flex-shrink-0 mt-0.5`}>{item.step}</span>
                    <div>
                      <div className={`text-sm font-medium ${T.text}`}>{item.title}</div>
                      <div className={`text-xs ${T.sub} mt-0.5 leading-relaxed`}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Nth */}
        <p className={`text-center text-xs tracking-[0.3em] uppercase ${T.sub} mb-6`}>Why Choose Nᵗʰ Lab</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🔐', t: 'Security First',    d: 'All solutions default to local data storage. No external transmission risk. Compliant with GDPR, SOC 2, and industry regulations.' },
            { icon: '📋', t: 'Fully Auditable',   d: 'Every AI decision has a complete reasoning path and operation log. Meets all regulatory traceability requirements.' },
            { icon: '🔄', t: 'One-Click Rollback', d: 'Any AI operation can be reversed with a single click. Eliminate the anxiety of "what if the AI made a mistake?"' },
            { icon: '🔌', t: 'Low-Intrusion',     d: 'No system rewrites needed. Inject AI capability through standard interfaces with minimal integration risk.' },
          ].map(item => (
            <div key={item.t} className={`p-5 border ${T.border} ${T.hborder} text-center transition-all duration-500`}>
              <div className="text-2xl mb-3">{item.icon}</div>
              <div className={`text-sm font-medium ${T.text} mb-2`}>{item.t}</div>
              <div className={`text-xs ${T.sub} leading-relaxed`}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ────────────────────────────── Solutions ───────────────────────────── */
  const Solutions = () => (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-light tracking-wide mb-2 ${T.text}`}>Solutions</h2>
        <p className={`text-sm ${T.sub} mb-3`}>Deterministic AI validated across multiple industries — typical deployment scenarios below</p>
        <div className={`w-16 h-px ${T.divider} mb-12`} />

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: '🔌', t: 'No System Replacement',   d: 'Connect to existing software via an adapter layer. Original data flows and permission structures remain unchanged — AI is purely additive, zero migration risk.' },
            { icon: '🏠', t: 'Data Stays On-Premise',   d: 'Full private deployment supported. All AI inference runs locally. Zero data upload. Meets compliance requirements for finance, healthcare, and other regulated industries.' },
            { icon: '📊', t: 'Deterministic Guarantee', d: 'Every AI operation has a complete audit log and causal chain. Problems are traceable. Actions are reversible. Enterprise-grade trustworthy AI.' },
          ].map(v => (
            <div key={v.t} className={`p-6 border ${T.border} ${T.hborder} transition-all duration-500`}>
              <div className="text-2xl mb-3">{v.icon}</div>
              <h3 className={`font-medium ${T.text} text-sm mb-2`}>{v.t}</h3>
              <p className={`text-xs ${T.sub} leading-relaxed`}>{v.d}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              industry: 'Manufacturing', icon: '🏭',
              challenge: 'Years of production data locked in MES/ERP systems, manual analysis is slow and error-prone',
              solution: 'AI connected to production scheduling and QC systems. Auto-analyzes line anomalies, generates work orders, optimizes scheduling — all operations fully traceable',
              results: ['Production report time ↓ 80%', 'Predictive maintenance accuracy ↑', 'Operations 100% traceable'],
            },
            {
              industry: 'Financial Compliance', icon: '🏦',
              challenge: 'Massive compliance document volume, manual review speed cannot keep up with regulatory requirements',
              solution: 'AI-assisted compliance review auto-flags risk clauses, cross-references regulatory rule databases. Human reviewers only verify AI-flagged items',
              results: ['Compliance efficiency ↑ 5x', 'Rule coverage ↑ 40%', 'Every finding cites a regulation'],
            },
            {
              industry: 'Healthcare', icon: '🏥',
              challenge: 'High clinical documentation workload with low structure, physicians spend excessive time on non-clinical tasks',
              solution: 'AI assists with clinical note summarization, order generation, and discharge summaries. Strict hospital data security compliance. All recommendations include reasoning chains',
              results: ['Documentation time ↓ 60%', 'Data 100% on-premise', 'Every suggestion includes full reasoning'],
            },
          ].map(sol => (
            <div key={sol.industry} className={`border ${T.border} ${T.hborder} transition-all duration-500`}>
              <div className={`p-5 border-b ${T.border}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{sol.icon}</span>
                  <h3 className={`font-medium ${T.text}`}>{sol.industry}</h3>
                </div>
                <p className={`text-xs ${T.sub} italic`}>Challenge: {sol.challenge}</p>
              </div>
              <div className="p-5">
                <div className={`text-xs tracking-[0.1em] uppercase ${T.sub} mb-2`}>Solution</div>
                <p className={`text-sm ${T.sub} leading-relaxed mb-4`}>{sol.solution}</p>
                <div className={`text-xs tracking-[0.1em] uppercase ${T.sub} mb-2`}>Typical Outcomes</div>
                <ul className="space-y-1.5">
                  {sol.results.map(r => (
                    <li key={r} className={`flex items-center gap-2 text-xs ${T.accent}`}>
                      <span className="w-1 h-1 rounded-full bg-current flex-shrink-0" />{r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className={`text-sm ${T.sub} mb-6`}>Don&apos;t see your industry? Contact us for a tailored solution.</p>
          <a href="mailto:contact@nthlab.ai?subject=Solution Inquiry&body=Hello, I would like to discuss an AI solution for our industry.%0A%0ACompany:%0AIndustry:"
            className={`inline-block px-8 py-3 ${T.accentBtn} text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity`}>
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  );

  /* ──────────────────────────────── Pricing ───────────────────────────── */
  const Pricing = () => (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-light tracking-wide mb-2 ${T.text}`}>Pricing</h2>
        <p className={`text-sm ${T.sub} mb-3`}>Transparent pricing, no hidden fees. Enterprise includes 30-day free trial.</p>
        <div className={`w-16 h-px ${T.divider} mb-12`} />

        <div className="grid md:grid-cols-3 gap-8 mb-8">

          {/* Community Free */}
          <div className={`border ${T.border} ${T.hborder} transition-all duration-500`}>
            <div className="p-6">
              <div className={`text-xs tracking-[0.2em] uppercase opacity-50 mb-1`}>Community</div>
              <h3 className={`text-xl font-light ${T.text} mb-2`}>Community Free</h3>
              <p className={`text-xs ${T.sub} mb-6`}>Developers, enthusiasts, individual users</p>
              <div className={`text-2xl font-light ${T.text} mb-6`}>Free</div>
              <ul className={`text-sm ${T.sub} space-y-3 mb-8`}>
                {['Nth Agent desktop app', 'Nth IM Pro mobile app', 'HLC causal consistency scheduling', 'PACR conflict arbitration protocol', 'Basic write safety protection', 'Community support'].map(f => (
                  <li key={f} className="flex items-start gap-2"><Tick /><span>{f}</span></li>
                ))}
              </ul>
              <button className={`w-full py-3 border ${T.border} text-xs tracking-[0.1em] uppercase ${T.sub} hover:text-current hover:border-current transition-colors`}>
                Download Free
              </button>
            </div>
          </div>

          {/* Enterprise Pro */}
          <div className={`border-2 ${T.accentBdr} relative transition-all duration-500`}>
            <div className={`absolute -top-3 left-6 px-3 py-1 ${T.accentBg} ${T.accent} text-xs tracking-[0.1em] uppercase border ${T.accentBdr}`}>
              Most Popular
            </div>
            <div className="p-6">
              <div className={`text-xs tracking-[0.2em] uppercase ${T.accent} mb-1`}>Enterprise</div>
              <h3 className={`text-xl font-light ${T.text} mb-2`}>Enterprise Pro</h3>
              <p className={`text-xs ${T.sub} mb-6`}>SMBs, engineering teams</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-2xl font-light ${T.text}`}>$699</span>
                <span className={`text-xs ${T.sub}`}>/node/year</span>
              </div>
              <ul className={`text-sm ${T.sub} space-y-3 mb-8`}>
                {[
                  'Everything in Community',
                  'Nth Agent Pro enterprise workstation',
                  'Full AP Protocol v3.3',
                  'Multi-Agent orchestration engine',
                  'Immutable operation audit log',
                  'Shadow Root operation isolation',
                  'Mobile approval loop',
                  '24/7 dedicated technical support',
                ].map(f => <li key={f} className="flex items-start gap-2"><Tick /><span>{f}</span></li>)}
              </ul>
              <a href="mailto:contact@nthlab.ai?subject=Enterprise Pro Inquiry&body=Hello, I would like to learn about Nth Agent Pro Enterprise.%0A%0ACompany:%0AContact:%0ANode count:%0AUse case:"
                className={`block w-full py-3 ${T.accentBtn} text-xs tracking-[0.1em] uppercase text-center hover:opacity-90 transition-opacity`}>
                Book a Demo
              </a>
            </div>
          </div>

          {/* Industry Custom */}
          <div className={`border ${T.border} ${T.hborder} transition-all duration-500`}>
            <div className="p-6">
              <div className={`text-xs tracking-[0.2em] uppercase opacity-50 mb-1`}>Industry Custom</div>
              <h3 className={`text-xl font-light ${T.text} mb-2`}>Industry Custom</h3>
              <p className={`text-xs ${T.sub} mb-6`}>Large enterprises, ISVs</p>
              <div className={`text-2xl font-light ${T.text} mb-6`}>Custom</div>
              <ul className={`text-sm ${T.sub} space-y-3 mb-8`}>
                {[
                  'Everything in Enterprise',
                  'Industry software AI upgrade',
                  'Custom AI model training & deployment',
                  'Full on-premise private deployment',
                  'Custom security rules & audit policies',
                  'Dedicated customer success manager',
                  'Source code license (optional)',
                ].map(f => <li key={f} className="flex items-start gap-2"><Tick /><span>{f}</span></li>)}
              </ul>
              <a href="mailto:contact@nthlab.ai?subject=Industry Custom Inquiry&body=Hello, I would like to learn about your industry custom services.%0A%0ACompany:%0AIndustry:%0ARequirements:"
                className={`block w-full py-3 border ${T.border} text-xs tracking-[0.1em] uppercase ${T.sub} text-center hover:text-current hover:border-current transition-colors`}>
                Contact Sales
              </a>
            </div>
          </div>
        </div>

        <p className={`text-center text-xs ${T.sub} tracking-wide`}>
          All tiers support local deployment, data never uploaded · Enterprise includes 30-day free trial · contact@nthlab.ai
        </p>
      </div>
    </section>
  );

  /* ────────────────────────────── Developers ──────────────────────────── */
  const Developers = () => (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-light tracking-wide mb-2 ${T.text}`}>Developer Hub</h2>
        <p className={`text-sm ${T.sub} mb-3`}>Open SDK, complete documentation, and open-source repositories — everything you need to build deterministic AI apps</p>
        <div className={`w-16 h-px ${T.divider} mb-12`} />

        {/* Whitepaper */}
        <div className={`p-6 border ${T.border} ${T.hborder} transition-all duration-500 flex flex-col md:flex-row items-center gap-6 mb-10`}>
          <div className={`w-20 h-28 ${T.cardBg} border ${T.border} flex items-center justify-center flex-shrink-0`}>
            <span className={`text-3xl ${T.accent}`}>📄</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-2`}>Technical Whitepaper</div>
            <h3 className={`text-lg font-light ${T.text} mb-2`}>NthLab Technical Whitepaper v1.0</h3>
            <p className={`text-sm ${T.sub} leading-relaxed`}>
              How AP Protocol solves multi-agent coordination, how the safety execution framework ensures operational security,
              and how causal consistency scheduling achieves determinism. Ideal for architects and senior engineers.
            </p>
          </div>
          <button className={`px-6 py-3 ${T.accentBtn} text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity whitespace-nowrap`}>
            Download PDF
          </button>
        </div>

        {/* Open source */}
        <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-4`}>Open Source</div>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {[
            { icon: '📱', name: 'Nth IM Mobile',  lang: 'React Native', desc: 'Complete iOS & Android client source code. Supports deep customization and private deployment.', href: 'https://github.com/nthlab/nth-im', repo: 'github.com/nthlab/nth-im' },
            { icon: '🔌', name: 'AP Protocol SDK', lang: 'Python / TypeScript', desc: 'Full AP Protocol client with HLC, AtomicWriter, and Epoch core module support.', href: 'https://github.com/nthlab/ap-sdk', repo: 'github.com/nthlab/ap-sdk' },
          ].map(repo => (
            <a key={repo.name} href={repo.href} target="_blank" rel="noopener noreferrer"
              className={`p-5 border ${T.border} ${T.hborder} transition-all duration-500 block`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{repo.icon}</span>
                <div>
                  <div className={`text-sm font-medium ${T.text}`}>{repo.name}</div>
                  <div className={`text-xs ${T.sub}`}>{repo.lang}</div>
                </div>
              </div>
              <p className={`text-xs ${T.sub} leading-relaxed mb-3`}>{repo.desc}</p>
              <div className={`text-xs ${T.accent} font-mono`}>{repo.repo} →</div>
            </a>
          ))}
        </div>

        {/* Quick start */}
        <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-4`}>Quick Start</div>
        <div className={`border ${T.border} overflow-hidden`}>
          <div className={`px-4 py-2 border-b ${T.border} ${T.cardBg} flex items-center gap-2`}>
            <div className="flex gap-1.5">
              {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map(c => (
                <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
              ))}
            </div>
            <span className={`text-xs ${T.sub} font-mono`}>quickstart.py</span>
          </div>
          <div className={`p-6 ${T.codeBg} font-mono text-xs sm:text-sm overflow-x-auto`}>
            <pre className={`${T.sub} leading-relaxed`}>{`from nth_agent_pro import AtomicWriter, Epoch

# Atomic write protection — fully recoverable from any crash
writer = AtomicWriter(workspace="./output")
with writer.begin_transaction() as tx:
    tx.write("report.docx", content)
    tx.commit()   # Three-phase commit, zero partial writes

# Epoch task persistence — no progress lost on disconnect
epoch = Epoch(task_id="report-gen-001")
epoch.checkpoint(step="draft_complete", data=draft)`}</pre>
          </div>
        </div>
      </div>
    </section>
  );

  /* ─────────────────────────────── Router ─────────────────────────────── */
  const renderSection = () => {
    switch (active) {
      case 'home':       return <Home />;
      case 'products':   return <Products />;
      case 'services':   return <Services />;
      case 'solutions':  return <Solutions />;
      case 'pricing':    return <Pricing />;
      case 'developers': return <Developers />;
    }
  };

  return (
    <div className={`min-h-screen ${T.bg} ${T.text} transition-colors duration-700`}>
      <Navbar />
      <main className="pt-16">{renderSection()}</main>
    </div>
  );
}
