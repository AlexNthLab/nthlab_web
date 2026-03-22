'use client';

import { useState } from 'react';
import Image from 'next/image';

type Section = 'home' | 'products' | 'services' | 'solutions' | 'pricing' | 'developers';

export default function NthLabWebsiteChinese() {
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
    ['产品', 'products'],
    ['服务', 'services'],
    ['解决方案', 'solutions'],
    ['定价', 'pricing'],
    ['开发者', 'developers'],
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
          <a href="/en" className={`hidden sm:block text-xs tracking-[0.05em] uppercase ${T.sub} border ${T.border} px-2.5 py-1 hover:border-current transition-colors`}>
            EN
          </a>
          <button onClick={() => go('pricing')}
            className={`hidden sm:block px-4 py-1.5 ${T.accentBtn} text-xs tracking-[0.1em] uppercase hover:opacity-90 transition-opacity`}>
            立即开始
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
        AP Protocol v3.3 · 正式发布
      </div>

      <h1 className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] text-center mb-4 animate-fade-in-delay-1 ${T.text}`}>
        N<sup className="text-xl md:text-3xl">ᵗʰ</sup> LAB
      </h1>
      <p className={`text-xl md:text-2xl text-center font-light mb-2 animate-fade-in-delay-2 ${T.text}`}>
        拒绝概率，拥抱确定
      </p>
      <p className={`text-sm md:text-base text-center mb-1 animate-fade-in-delay-2 ${T.sub}`}>
        一个决策者，一支专属参谋部
      </p>
      <p className={`text-sm md:text-base text-center italic mb-10 animate-fade-in-delay-2 ${T.sub}`}>
        The Deterministic Framework
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-delay-3">
        <button onClick={() => go('products')}
          className={`px-8 py-3 ${T.accentBg} border ${T.accentBdr} ${T.accent} text-xs tracking-[0.15em] uppercase hover:opacity-80 transition-opacity`}>
          了解产品
        </button>
        <button onClick={() => go('services')}
          className={`px-8 py-3 border ${T.border} ${T.sub} text-xs tracking-[0.15em] uppercase hover:text-current hover:border-current transition-colors`}>
          企业服务
        </button>
        <button onClick={() => go('pricing')}
          className={`px-8 py-3 ${T.accentBtn} text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity`}>
          立即开始
        </button>
      </div>

      <div className={`w-px h-10 ${T.divider} mb-12`} />

      {/* 三大核心能力 */}
      <div className="max-w-5xl w-full mb-16 animate-fade-in-delay-3">
        <p className={`text-center text-xs tracking-[0.3em] uppercase ${T.sub} mb-8`}>核心能力</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { key: '因果序', desc: '混合逻辑时钟（HLC）确保多 Agent 任务在分布式环境中始终保持因果一致性，消除并发竞态风险，数据全程本地处理。' },
            { key: '原子性', desc: 'WAL 预写日志与三阶段原子提交，任意时刻的崩溃或中断均可完整还原，文件系统永远保持一致状态，绝不留残片。' },
            { key: '低侵入', desc: '不修改原有系统，不获取系统级提权。嵌入式便携沙箱让 AI 在受控局部运行时工作，数据私有专属，从不外传。' },
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

      {/* 产品 & 服务速览 */}
      <div className="max-w-5xl w-full animate-fade-in-delay-3">
        <p className={`text-center text-xs tracking-[0.3em] uppercase ${T.sub} mb-8`}>产品与服务</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {([
            { name: 'Nth Agent',     tag: '免费',   desc: '本地 AI 助手，数据不出本机',       sec: 'products', hi: false },
            { name: 'Nth IM Pro',    tag: '免费',   desc: '移动端任务监控与一键审批',         sec: 'products', hi: false },
            { name: 'Nth Agent Pro', tag: '企业版', desc: '完整 AP 协议 + Multi-Agent 编排',  sec: 'products', hi: true  },
            { name: '定制服务',      tag: '企业',   desc: '行业软件智能化 + AI 模型代训',     sec: 'services', hi: false },
          ] as { name: string; tag: string; desc: string; sec: Section; hi: boolean }[]).map(c => (
            <button key={c.name} onClick={() => go(c.sec)}
              className={`p-5 border text-left transition-all duration-500 hover:-translate-y-0.5 ${
                c.hi ? `border-2 ${T.accentBdr}` : `${T.border} ${T.hborder}`
              }`}>
              <div className={`text-xs tracking-[0.1em] uppercase mb-3 ${c.hi ? T.accent : T.sub}`}>{c.tag}</div>
              <div className={`font-light text-base ${T.text} mb-1.5`}>{c.name}</div>
              <div className={`text-xs ${T.sub}`}>{c.desc}</div>
              <div className={`mt-4 text-xs tracking-[0.05em] ${c.hi ? T.accent : T.sub}`}>了解详情 →</div>
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
        <h2 className={`text-3xl md:text-4xl font-light tracking-wide mb-2 ${T.text}`}>产品矩阵</h2>
        <p className={`text-sm ${T.sub} mb-3`}>覆盖从个人到企业的全场景 AI 需求，共享同一套确定性执行内核</p>
        <div className={`w-16 h-px ${T.divider} mb-12`} />

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Nth Agent */}
          <div className={`border ${T.border} ${T.hborder} transition-all duration-500`}>
            <div className={`p-6 border-b ${T.border}`}>
              <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-1`}>免费</div>
              <h3 className={`text-xl font-light ${T.text} mb-3`}>Nth Agent</h3>
              <p className={`text-sm ${T.sub} leading-relaxed`}>
                本地优先的 AI 桌面助手。自然语言完成文件处理、文档翻译、代码分析等日常任务，
                全部数据留在本机，支持接入主流 LLM 服务商。
              </p>
            </div>
            <div className="p-6">
              <ul className={`text-sm ${T.sub} space-y-2.5 mb-8`}>
                {[
                  '自然语言文件操作（读/写/翻译/摘要）',
                  '本地写入安全防护，操作自动备份',
                  '支持 Claude、DeepSeek 等主流模型',
                  'PDF / Word / 扫描件 OCR 翻译',
                  'Windows 桌面原生应用',
                ].map(f => <li key={f} className="flex items-start gap-2"><Tick /><span>{f}</span></li>)}
              </ul>
              <div className={`text-xl font-light ${T.text} mb-1`}>免费</div>
              <div className={`text-xs ${T.sub} mb-5`}>永久免费，无功能限制</div>
              <button className={`w-full py-3 border ${T.border} text-xs tracking-[0.1em] uppercase ${T.sub} hover:text-current hover:border-current transition-colors`}>
                立即下载
              </button>
            </div>
          </div>

          {/* Nth IM Pro */}
          <div className={`border ${T.border} ${T.hborder} transition-all duration-500`}>
            <div className={`p-6 border-b ${T.border}`}>
              <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-1`}>免费</div>
              <h3 className={`text-xl font-light ${T.text} mb-3`}>Nth IM Pro</h3>
              <p className={`text-sm ${T.sub} leading-relaxed`}>
                随时随地掌控 AI 任务的移动指挥台。iOS & Android 双端，实时推送任务状态，
                支持关键操作的移动端一键审批。
              </p>
            </div>
            <div className="p-6">
              <ul className={`text-sm ${T.sub} space-y-2.5 mb-8`}>
                {[
                  'iOS & Android 原生应用',
                  '实时任务进度与状态监控',
                  '关键操作移动端一键审批',
                  '多 Agent 并行任务总览面板',
                  '自定义 AI 服务商接入（BYOK）',
                  'Nth Agent Pro 深度集成',
                ].map(f => <li key={f} className="flex items-start gap-2"><Tick /><span>{f}</span></li>)}
              </ul>
              <div className={`text-xl font-light ${T.text} mb-1`}>免费</div>
              <div className={`text-xs ${T.sub} mb-5`}>App Store / Google Play</div>
              <button className={`w-full py-3 border ${T.border} text-xs tracking-[0.1em] uppercase ${T.sub} hover:text-current hover:border-current transition-colors`}>
                下载 App
              </button>
            </div>
          </div>

          {/* Nth Agent Pro */}
          <div className={`border-2 ${T.accentBdr} relative transition-all duration-500`}>
            <div className={`absolute -top-3 left-6 px-3 py-1 ${T.accentBg} ${T.accent} text-xs tracking-[0.1em] uppercase border ${T.accentBdr}`}>
              推荐
            </div>
            <div className={`p-6 border-b ${T.border}`}>
              <div className={`text-xs tracking-[0.2em] uppercase ${T.accent} mb-1`}>企业版</div>
              <h3 className={`text-xl font-light ${T.text} mb-3`}>Nth Agent Pro</h3>
              <p className={`text-sm ${T.sub} leading-relaxed`}>
                企业级确定性 AI 工作站。完整实现 AP Protocol v3.3，支持多 Agent 并发编排、
                全量审计日志、操作隔离沙箱与移动审批闭环。
              </p>
            </div>
            <div className="p-6">
              <ul className={`text-sm ${T.sub} space-y-2.5 mb-8`}>
                {[
                  '完整 AP Protocol v3.3 执行引擎',
                  'Multi-Agent 并发编排与调度',
                  '不可篡改操作审计日志',
                  '操作级隔离沙箱（Shadow Root）',
                  '三层安全规则引擎（L1/L2/L3）',
                  'Nth IM Pro 移动审批闭环',
                  '企业私有化部署支持',
                  '7×24 专属技术支持',
                ].map(f => <li key={f} className="flex items-start gap-2"><Tick /><span>{f}</span></li>)}
              </ul>
              <div className="flex items-baseline gap-1 mb-1">
                <span className={`text-xl font-light ${T.text}`}>¥4,999</span>
                <span className={`text-xs ${T.sub}`}>/节点/年</span>
              </div>
              <div className={`text-xs ${T.sub} mb-5`}>含全年技术支持和版本更新</div>
              <button onClick={() => go('pricing')}
                className={`w-full py-3 ${T.accentBtn} text-xs tracking-[0.1em] uppercase hover:opacity-90 transition-opacity`}>
                预约演示
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
        <h2 className={`text-3xl md:text-4xl font-light tracking-wide mb-2 ${T.text}`}>专业服务</h2>
        <p className={`text-sm ${T.sub} mb-3`}>超越产品边界，从行业系统智能化改造到专属 AI 模型训练，端到端交付</p>
        <div className={`w-16 h-px ${T.divider} mb-12`} />

        {/* 服务一 */}
        <div className={`border ${T.border} ${T.hborder} transition-all duration-500 mb-8`}>
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-10">
              <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-2`}>服务一</div>
              <h3 className={`text-2xl md:text-3xl font-light ${T.text} mb-1`}>行业软件</h3>
              <h3 className={`text-2xl md:text-3xl font-light ${T.accent} mb-6`}>智能化定制升级</h3>
              <p className={`text-sm ${T.sub} leading-relaxed mb-8`}>
                您的 ERP、MES、CRM、OA 系统积累了宝贵数据——我们为它们接入 AI 决策能力，
                无需重写原有代码，不改变现有数据权限边界，让存量系统焕发新生。
              </p>
              <div className="space-y-3 mb-8">
                {([
                  ['非侵入式接入', '通过标准化适配层，现有系统零改动即可接入 AI 能力'],
                  ['数据完全自主', '所有操作数据留在您的内网，不上传任何外部服务器'],
                  ['决策可审计',   '每一条 AI 建议都有完整的推理链路和操作日志'],
                  ['快速交付',     '典型项目 4–8 周交付可用 MVP，快速验证价值'],
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
              <a href="mailto:contact@nthlab.ai?subject=行业软件智能化咨询&body=您好，我希望了解行业软件智能化定制升级服务。%0A%0A公司：%0A行业：%0A需求简述："
                className={`inline-block px-6 py-3 ${T.accentBtn} text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity`}>
                获取定制方案
              </a>
            </div>
            <div className={`p-8 lg:p-10 border-t lg:border-t-0 lg:border-l ${T.border}`}>
              <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-6`}>适用行业场景</div>
              <div className="space-y-5">
                {[
                  { icon: '🏭', name: '制造业',   desc: 'MES 智能排产优化、设备预测性维护、质检报告自动分析' },
                  { icon: '🏦', name: '金融行业', desc: '风控决策 AI 辅助、合规文件自动审查、智能客户分流' },
                  { icon: '🏥', name: '医疗健康', desc: '病历摘要生成、辅助诊断报告、医保核查自动化' },
                  { icon: '⚖️', name: '法律合规', desc: '合同条款智能审查、法规变更影响分析、案例检索辅助' },
                  { icon: '🏗️', name: '工程建设', desc: '项目文档智能归档、安全隐患 AI 识别、进度报告自动生成' },
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

        {/* 服务二 */}
        <div className={`border ${T.border} ${T.hborder} transition-all duration-500 mb-12`}>
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-10">
              <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-2`}>服务二</div>
              <h3 className={`text-2xl md:text-3xl font-light ${T.text} mb-1`}>专业 AI 模型</h3>
              <h3 className={`text-2xl md:text-3xl font-light ${T.accent} mb-6`}>代为训练服务</h3>
              <p className={`text-sm ${T.sub} leading-relaxed mb-8`}>
                您的企业积累了多年的领域数据——这是构建专属 AI 模型最宝贵的资产。
                我们提供端到端的模型训练托管服务：数据清洗、微调训练、量化评估到私有化部署，
                数据全程不离开您的掌控。
              </p>
              <div className="space-y-3 mb-8">
                {([
                  ['数据不出内网', '训练全程在您的服务器或指定私有环境执行'],
                  ['领域专属优化', '针对您的业务场景深度微调，并非通用基础模型'],
                  ['量化评估交付', '提供基准测试报告，用数据证明模型实际效果'],
                  ['私有化部署',   '模型最终部署在您的基础设施，完全自主可控'],
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
              <a href="mailto:contact@nthlab.ai?subject=AI模型训练咨询&body=您好，我希望了解专业 AI 模型训练服务。%0A%0A公司：%0A行业：%0A数据规模大致描述：%0A目标能力描述："
                className={`inline-block px-6 py-3 ${T.accentBtn} text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity`}>
                咨询训练方案
              </a>
            </div>
            <div className={`p-8 lg:p-10 border-t lg:border-t-0 lg:border-l ${T.border}`}>
              <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-6`}>服务交付流程</div>
              <div className="space-y-4">
                {[
                  { step: '01', title: '需求评估', desc: '分析业务场景、现有数据质量与规模、目标模型能力指标' },
                  { step: '02', title: '数据工程', desc: '数据清洗、标注、增强，构建高质量训练语料集' },
                  { step: '03', title: '模型训练', desc: '选择基础模型、执行微调、迭代优化，全程在您的环境运行' },
                  { step: '04', title: '评估报告', desc: '多维度基准测试，量化准确率、召回率等核心指标' },
                  { step: '05', title: '私有部署', desc: '完整部署包交付、本地推理服务搭建、持续维护支持' },
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

        {/* 为什么选择 Nth */}
        <p className={`text-center text-xs tracking-[0.3em] uppercase ${T.sub} mb-6`}>为什么选择 Nᵗʰ Lab</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🔐', t: '安全优先',   d: '所有方案默认数据留本地，无外传风险，符合等保、GDPR 等合规要求' },
            { icon: '📋', t: '全程可审计', d: '每个 AI 决策都留有完整的推理路径和操作日志，满足监管溯源要求' },
            { icon: '🔄', t: '一键可回滚', d: '任何 AI 操作支持一键撤销，告别"AI 改错了怎么办"的焦虑' },
            { icon: '🔌', t: '低侵入接入', d: '无需重构现有系统，通过标准接口注入 AI 能力，改造风险最低' },
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
        <h2 className={`text-3xl md:text-4xl font-light tracking-wide mb-2 ${T.text}`}>行业解决方案</h2>
        <p className={`text-sm ${T.sub} mb-3`}>确定性 AI 在多个行业已有成功验证，以下是典型应用场景</p>
        <div className={`w-16 h-px ${T.divider} mb-12`} />

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: '🔌', t: '不改原系统，AI 做增量',   d: '通过适配层接入现有软件，原有数据流和权限体系保持不变，AI 只做智能增强层，改造风险为零。' },
            { icon: '🏠', t: '数据不出内网，合规无忧', d: '支持完全私有化部署，所有 AI 推理在本地执行，数据零上传，满足金融、医疗等强监管行业要求。' },
            { icon: '📊', t: '确定性保证，有据可查',   d: '每一步 AI 操作都有完整的操作日志和因果链记录，出了问题可追溯，做了操作可回滚。' },
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
              industry: '制造业', icon: '🏭',
              challenge: '大量历史生产数据沉睡在 MES/ERP，人工分析效率低、易出错',
              solution: 'AI 接入生产调度和质检系统，自动分析产线异常、生成维护工单、优化排产方案，操作全程可追溯',
              results: ['生产报告生成时间 ↓ 80%', '设备预防性维护准确率 ↑', '操作记录 100% 可追溯'],
            },
            {
              industry: '金融合规', icon: '🏦',
              challenge: '合规审查文件量庞大，人工审核速度跟不上监管要求，漏检风险高',
              solution: 'AI 辅助合规审查，自动标记风险条款、比对监管规则库，人工仅需复核 AI 标记项，效率数倍提升',
              results: ['合规审查效率 ↑ 5x', '规则覆盖率 ↑ 40%', '每条建议均有法规依据'],
            },
            {
              industry: '医疗机构', icon: '🏥',
              challenge: '病历文书工作量大、结构化程度低，医生耗费大量时间在非诊疗工作',
              solution: 'AI 辅助病历摘要、医嘱生成和出院小结，严格遵循医院数据安全规范，决策附带完整依据',
              results: ['文书时间减少 60%', '数据 100% 留在本院', '建议附完整推理链路'],
            },
          ].map(sol => (
            <div key={sol.industry} className={`border ${T.border} ${T.hborder} transition-all duration-500`}>
              <div className={`p-5 border-b ${T.border}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{sol.icon}</span>
                  <h3 className={`font-medium ${T.text}`}>{sol.industry}</h3>
                </div>
                <p className={`text-xs ${T.sub} italic`}>痛点：{sol.challenge}</p>
              </div>
              <div className="p-5">
                <div className={`text-xs tracking-[0.1em] uppercase ${T.sub} mb-2`}>解决方案</div>
                <p className={`text-sm ${T.sub} leading-relaxed mb-4`}>{sol.solution}</p>
                <div className={`text-xs tracking-[0.1em] uppercase ${T.sub} mb-2`}>典型效果</div>
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
          <p className={`text-sm ${T.sub} mb-6`}>找不到您的行业？联系我们获取定制化方案</p>
          <a href="mailto:contact@nthlab.ai?subject=方案咨询&body=您好，我希望了解针对我们行业的 AI 解决方案。%0A%0A公司：%0A行业："
            className={`inline-block px-8 py-3 ${T.accentBtn} text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity`}>
            预约方案咨询
          </a>
        </div>
      </div>
    </section>
  );

  /* ──────────────────────────────── Pricing ───────────────────────────── */
  const Pricing = () => (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-light tracking-wide mb-2 ${T.text}`}>定价方案</h2>
        <p className={`text-sm ${T.sub} mb-3`}>透明定价，无隐藏收费，企业版含 30 天免费试用</p>
        <div className={`w-16 h-px ${T.divider} mb-12`} />

        <div className="grid md:grid-cols-3 gap-8 mb-8">

          {/* 社区免费版 */}
          <div className={`border ${T.border} ${T.hborder} transition-all duration-500`}>
            <div className="p-6">
              <div className={`text-xs tracking-[0.2em] uppercase opacity-50 mb-1`}>Community</div>
              <h3 className={`text-xl font-light ${T.text} mb-2`}>社区免费版</h3>
              <p className={`text-xs ${T.sub} mb-6`}>开发者、极客、个人用户</p>
              <div className={`text-2xl font-light ${T.text} mb-6`}>免费</div>
              <ul className={`text-sm ${T.sub} space-y-3 mb-8`}>
                {['Nth Agent 桌面应用', 'Nth IM Pro 移动应用', 'HLC 因果一致性调度', 'PACR 冲突仲裁协议', '基础写入安全防护', '社区支持'].map(f => (
                  <li key={f} className="flex items-start gap-2"><Tick /><span>{f}</span></li>
                ))}
              </ul>
              <button className={`w-full py-3 border ${T.border} text-xs tracking-[0.1em] uppercase ${T.sub} hover:text-current hover:border-current transition-colors`}>
                免费下载
              </button>
            </div>
          </div>

          {/* 企业专业版 */}
          <div className={`border-2 ${T.accentBdr} relative transition-all duration-500`}>
            <div className={`absolute -top-3 left-6 px-3 py-1 ${T.accentBg} ${T.accent} text-xs tracking-[0.1em] uppercase border ${T.accentBdr}`}>
              最受欢迎
            </div>
            <div className="p-6">
              <div className={`text-xs tracking-[0.2em] uppercase ${T.accent} mb-1`}>Enterprise</div>
              <h3 className={`text-xl font-light ${T.text} mb-2`}>企业专业版</h3>
              <p className={`text-xs ${T.sub} mb-6`}>中小企业、研发团队</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-2xl font-light ${T.text}`}>¥4,999</span>
                <span className={`text-xs ${T.sub}`}>/节点/年</span>
              </div>
              <ul className={`text-sm ${T.sub} space-y-3 mb-8`}>
                {[
                  '包含免费版全部功能',
                  'Nth Agent Pro 企业工作站',
                  '完整 AP Protocol v3.3',
                  'Multi-Agent 编排引擎',
                  '不可篡改操作审计日志',
                  'Shadow Root 操作隔离',
                  '移动端审批闭环',
                  '7×24 专属技术支持',
                ].map(f => <li key={f} className="flex items-start gap-2"><Tick /><span>{f}</span></li>)}
              </ul>
              <a href="mailto:contact@nthlab.ai?subject=企业版咨询&body=您好，我希望了解 Nth Agent Pro 企业版。%0A%0A公司：%0A联系人：%0A节点数量：%0A业务场景："
                className={`block w-full py-3 ${T.accentBtn} text-xs tracking-[0.1em] uppercase text-center hover:opacity-90 transition-opacity`}>
                预约演示
              </a>
            </div>
          </div>

          {/* 行业定制版 */}
          <div className={`border ${T.border} ${T.hborder} transition-all duration-500`}>
            <div className="p-6">
              <div className={`text-xs tracking-[0.2em] uppercase opacity-50 mb-1`}>Industry Custom</div>
              <h3 className={`text-xl font-light ${T.text} mb-2`}>行业定制版</h3>
              <p className={`text-xs ${T.sub} mb-6`}>行业企业、管理软件厂商</p>
              <div className={`text-2xl font-light ${T.text} mb-6`}>项目制</div>
              <ul className={`text-sm ${T.sub} space-y-3 mb-8`}>
                {[
                  '包含企业版全部功能',
                  '行业软件智能化定制改造',
                  '专属 AI 模型训练与部署',
                  '完全私有化本地部署',
                  '定制安全规则与审计策略',
                  '专属客户成功经理',
                  '源代码授权（可选）',
                ].map(f => <li key={f} className="flex items-start gap-2"><Tick /><span>{f}</span></li>)}
              </ul>
              <a href="mailto:contact@nthlab.ai?subject=行业定制版咨询&body=您好，我希望了解行业定制版服务。%0A%0A公司：%0A行业：%0A需求简述："
                className={`block w-full py-3 border ${T.border} text-xs tracking-[0.1em] uppercase ${T.sub} text-center hover:text-current hover:border-current transition-colors`}>
                联系销售
              </a>
            </div>
          </div>
        </div>

        <p className={`text-center text-xs ${T.sub} tracking-wide`}>
          所有版本均支持本地部署，数据不上传 · 企业版含 30 天免费试用 · contact@nthlab.ai
        </p>
      </div>
    </section>
  );

  /* ────────────────────────────── Developers ──────────────────────────── */
  const Developers = () => (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-light tracking-wide mb-2 ${T.text}`}>开发者中心</h2>
        <p className={`text-sm ${T.sub} mb-3`}>开放 SDK、完整文档与开源仓库，构建确定性 AI 应用的一切工具</p>
        <div className={`w-16 h-px ${T.divider} mb-12`} />

        {/* 白皮书 */}
        <div className={`p-6 border ${T.border} ${T.hborder} transition-all duration-500 flex flex-col md:flex-row items-center gap-6 mb-10`}>
          <div className={`w-20 h-28 ${T.cardBg} border ${T.border} flex items-center justify-center flex-shrink-0`}>
            <span className={`text-3xl ${T.accent}`}>📄</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-2`}>技术白皮书</div>
            <h3 className={`text-lg font-light ${T.text} mb-2`}>NthLab 技术白皮书 v1.0</h3>
            <p className={`text-sm ${T.sub} leading-relaxed`}>
              AP 协议如何解决多 AI 协同问题，安全执行框架如何保证操作安全，
              因果一致性调度如何做到确定性。适合架构师和高级工程师深度了解。
            </p>
          </div>
          <button className={`px-6 py-3 ${T.accentBtn} text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity whitespace-nowrap`}>
            下载 PDF
          </button>
        </div>

        {/* 开源仓库 */}
        <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-4`}>开源仓库</div>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {[
            { icon: '📱', name: 'Nth IM 移动端', lang: 'React Native', desc: 'iOS & Android 双端客户端完整源码，支持深度定制和私有化部署。', href: 'https://github.com/nthlab/nth-im', repo: 'github.com/nthlab/nth-im' },
            { icon: '🔌', name: 'AP 协议 SDK',   lang: 'Python / TypeScript', desc: '完整的 AP 协议客户端，支持 HLC、AtomicWriter、Epoch 等核心模块接入。', href: 'https://github.com/nthlab/ap-sdk', repo: 'github.com/nthlab/ap-sdk' },
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

        {/* 快速接入示例 */}
        <div className={`text-xs tracking-[0.2em] uppercase ${T.sub} mb-4`}>快速接入示例</div>
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

# 原子写保护 — 任何中断都能完整恢复
writer = AtomicWriter(workspace="./output")
with writer.begin_transaction() as tx:
    tx.write("report.docx", content)
    tx.commit()   # 三阶段提交，绝不留残片

# Epoch 任务持久化 — 断线也不丢进度
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
