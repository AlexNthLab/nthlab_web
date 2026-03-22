'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// ── 辅助 Hook：进入视口时触发动画 ──────────────────────────────────────────
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

// ── 数据 ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: '⏱',
    title: '混合逻辑时钟 HLC',
    desc: '多 Agent 并发任务流在网络抖动中始终保持因果一致性。绝不出现"指令乱序"。',
  },
  {
    icon: '📝',
    title: 'WAL 预写日志',
    desc: '每一步操作落盘再执行。断电、崩溃、中断——恢复后从断点继续，零数据丢失。',
  },
  {
    icon: '📸',
    title: 'Epoch 快照',
    desc: '定时为整个 Agent 世界状态存档。任意时刻回滚，审计、复现一键完成。',
  },
  {
    icon: '🔒',
    title: 'SafeExec 沙箱',
    desc: '代码在隔离环境执行，危险操作自动拦截。安全边界不依赖模型自律。',
  },
  {
    icon: '🔗',
    title: '因果缝合器',
    desc: '跨 Agent 的任务链条自动追踪因果关系。每个结果都有可溯源的完整推导路径。',
  },
  {
    icon: '🧠',
    title: '三层记忆架构',
    desc: 'L1 热记忆毫秒响应，L2 温记忆跨会话持久，L3 冷记忆向量检索——永不遗忘。',
  },
];

const PROBLEMS = [
  { stat: '73%', label: '的 AI 任务因幻觉失败', sub: '概率性输出，无法预测结果' },
  { stat: '∞', label: '的人工复核成本', sub: '每次都要检查 AI 有没有"发疯"' },
  { stat: '0', label: '的审计可追溯性', sub: '出错了不知道哪步出的问题' },
];

const STEPS = [
  { n: '01', title: '接收任务', desc: 'Agent 收到指令，HLC 时钟打标，因果链开始记录。' },
  { n: '02', title: 'WAL 预写', desc: '操作计划写入日志，确认落盘后才执行，中断可恢复。' },
  { n: '03', title: '沙箱执行', desc: 'SafeExec 隔离运行，危险操作自动拦截，结果验证后写出。' },
  { n: '04', title: 'Epoch 存档', desc: '本轮状态快照，随时可回滚审计，结果 100% 可复现。' },
];

// ── 主组件 ───────────────────────────────────────────────────────────────────
export default function NthLabWebsiteChinese() {
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

      {/* ── 导航栏 ──────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800' : ''
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Nth Lab" width={32} height={32} className="rounded" />
            <span className="text-sm font-semibold tracking-widest uppercase">Nᵗʰ Lab</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[['产品', '#features'], ['原理', '#how-it-works'], ['文档', 'https://docs.nthlab.ai']].map(([label, href]) => (
              <a key={label} href={href}
                className="text-sm tracking-wide text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                {label}
              </a>
            ))}
            <a href="https://github.com/AlexNthLab"
              className="text-sm px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full hover:border-cyan-400 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
              GitHub
            </a>
            <a href="/en"
              className="text-xs text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              EN
            </a>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}
            aria-label="菜单">
            <span className="block w-5 h-px bg-current mb-1" />
            <span className="block w-5 h-px bg-current mb-1" />
            <span className="block w-5 h-px bg-current" />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 px-6 py-4 flex flex-col gap-4">
            {[['产品', '#features'], ['原理', '#how-it-works'], ['文档', 'https://docs.nthlab.ai'], ['GitHub', 'https://github.com/AlexNthLab']].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-700 dark:text-gray-300">
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto text-center" ref={hero.ref}>
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-600 dark:text-cyan-400 text-xs tracking-widest uppercase mb-8 transition-all duration-700 ${hero.inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Nth Agent Pro · 确定性 AI 框架
        </div>

        {/* Headline */}
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6 transition-all duration-700 delay-100 ${hero.inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          拒绝概率
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
            拥抱确定
          </span>
        </h1>

        {/* Subheadline */}
        <p className={`text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${hero.inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          第一个用工程手段保证 AI 行为确定性的框架。<br />
          HLC 因果时钟 · WAL 日志 · SafeExec 沙箱 · Epoch 快照。<br />
          让 AI 从<strong>概率性猜测</strong>变成<strong>可验证的执行器</strong>。
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${hero.inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <a href="https://github.com/AlexNthLab"
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full hover:scale-105 transition-transform duration-200">
            开始使用 →
          </a>
          <a href="#how-it-works"
            className="px-8 py-3 border border-gray-300 dark:border-gray-700 text-sm font-semibold rounded-full hover:border-cyan-400 dark:hover:border-cyan-400 transition-colors duration-200">
            了解原理
          </a>
        </div>

        {/* Stats */}
        <div className={`mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto transition-all duration-700 delay-500 ${hero.inView ? 'opacity-100' : 'opacity-0'}`}>
          {[['100%', '操作可追溯'], ['0', '数据丢失'], ['∞', '回滚能力']].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-500">{val}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 问题：AI 时代的困境 ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-950" ref={problems.ref}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${problems.inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">现实困境</p>
            <h2 className="text-3xl md:text-5xl font-bold">
              现有 AI 工具，<br />
              <span className="text-gray-400">让你无法放心交出控制权</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROBLEMS.map(({ stat, label, sub }, i) => (
              <div key={i} className={`p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-all duration-700 ${problems.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-4xl font-bold text-red-500 mb-2">{stat}</div>
                <div className="text-base font-semibold mb-1">{label}</div>
                <div className="text-sm text-gray-500 dark:text-gray-500">{sub}</div>
              </div>
            ))}
          </div>

          <div className={`mt-12 p-8 rounded-2xl bg-black dark:bg-white text-white dark:text-black transition-all duration-700 delay-300 ${problems.inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg md:text-2xl font-bold text-center">
              "你的 AI 助手很聪明，但它能保证每次执行结果一致吗？"
            </p>
            <p className="text-center text-gray-400 dark:text-gray-600 mt-3 text-sm">
              Nᵗʰ Lab 的答案是：<span className="text-cyan-400 dark:text-cyan-600 font-semibold">可以。通过工程手段，不依赖模型的运气。</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 核心功能 ─────────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6" ref={features.ref}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${features.inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">核心能力</p>
            <h2 className="text-3xl md:text-5xl font-bold">
              六层确定性防护
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              每一层都是可验证的工程保证，而不是「提示词祈祷」。
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

      {/* ── 工作原理 ─────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 bg-gray-50 dark:bg-gray-950" ref={howItWorks.ref}>
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${howItWorks.inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">工作原理</p>
            <h2 className="text-3xl md:text-5xl font-bold">每个任务的四步确定性执行</h2>
          </div>

          <div className="relative">
            {/* 竖线连接 */}
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

      {/* ── 对比：普通 AI vs Nth Agent Pro ─────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">普通 AI 助手 vs Nth Agent Pro</h2>
          </div>
          <div className="grid grid-cols-2 gap-px bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden">
            {/* 表头 */}
            <div className="bg-gray-100 dark:bg-gray-900 p-6 text-center">
              <p className="text-sm font-semibold text-gray-500">普通 AI 助手</p>
            </div>
            <div className="bg-cyan-400/10 p-6 text-center">
              <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Nth Agent Pro</p>
            </div>
            {/* 对比行 */}
            {[
              ['输出结果随机', '输出结果确定'],
              ['出错难以定位', '每步可追溯审计'],
              ['崩溃则全部重来', '断点续传，零丢失'],
              ['信任模型的"自律"', '工程级安全边界'],
              ['无法回滚', '任意 Epoch 回滚'],
              ['黑盒执行', '因果链全程透明'],
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

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-black dark:bg-white text-white dark:text-black" ref={cta.ref}>
        <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${cta.inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 mb-6">
            开始使用
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            让 AI 真正为你打工<br />
            <span className="text-cyan-400 dark:text-cyan-600">而不是猜测你的意图</span>
          </h2>
          <p className="text-gray-400 dark:text-gray-600 mb-10 max-w-lg mx-auto">
            Nth Agent Pro 开源免费。在你的机器上运行，数据不离开本地，完全属于你。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/AlexNthLab"
              className="px-8 py-4 bg-white dark:bg-black text-black dark:text-white text-sm font-bold rounded-full hover:scale-105 transition-transform duration-200">
              GitHub 开始 →
            </a>
            <a href="/en"
              className="px-8 py-4 border border-gray-600 dark:border-gray-400 text-sm font-semibold rounded-full hover:border-white dark:hover:border-black transition-colors duration-200">
              English Version
            </a>
          </div>
          <p className="mt-8 text-xs text-gray-600 dark:text-gray-500">
            MIT 协议 · 本地运行 · 零数据上传
          </p>
        </div>
      </section>

    </div>
  );
}
