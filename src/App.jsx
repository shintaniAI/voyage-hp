import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle, Menu, X, ChevronDown, ArrowRight,
  Users, TrendingUp, Zap, BarChart3, Target,
  Clock, CheckCircle2, Phone, Settings, Sparkles,
  BookOpen, Palette, PenTool, LineChart,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const HERO_CHATS = [
  { co: "BREAKING DOWN", cl: "#DC2626", m1: "次回イベントのご案内🔥", m2: "参加したい！", m3: "チケット優先枠をご用意しました🎫" },
  { co: "REAL VALUE", cl: "#2563EB", m1: "本日の対談配信のお知らせ📺", m2: "楽しみにしてます！", m3: "22時からスタートです✨" },
  { co: "Expert Partners", cl: "#059669", m1: "面談日程のご案内です📅", m2: "確認します！", m3: "下記よりご希望日をお選びください🗓" },
  { co: "T CLINIC", cl: "#DB2777", m1: "ご予約ありがとうございます✨", m2: "変更できますか？", m3: "はい、こちらから変更可能です💊" },
  { co: "HERO'ZZ", cl: "#D97706", m1: "本日のレッスン情報📚", m2: "参加します！", m3: "ご予約確定しました🎉" },
  { co: "BUZZ SHIP", cl: "#7C3AED", m1: "新キャンペーンのお知らせ🎯", m2: "詳しく知りたい！", m3: "こちらの特別ページをご覧ください✨" },
  { co: "V CLINIC", cl: "#EA580C", m1: "カウンセリングのご案内💝", m2: "予約したいです", m3: "ご希望日をお選びください📋" },
  { co: "New me", cl: "#0891B2", m1: "新メニューのお知らせ🌸", m2: "興味あります！", m3: "詳細はこちらからご確認ください✨" },
  { co: "VOYAGE", cl: "#06C755", m1: "無料相談のご予約完了です✅", m2: "ありがとうございます！", m3: "当日はZoomでお待ちしております🙌" },
  { co: "ポスティングHD", cl: "#4F46E5", m1: "資料請求ありがとうございます📄", m2: "確認しました！", m3: "担当よりご連絡いたします📞" },
];

const CLIENTS = [
  { name: "REAL VALUE", cat: "ビジネス番組", desc: "LINE完結で視聴者エンゲージメントとイベント集客を最大化", accent: "#E63946", logo: "/client-realvalue.png", scale: 1.15 },
  { name: "BREAKING DOWN", cat: "格闘エンタメ", desc: "大規模イベント集客とファンエンゲージメントをLINE基盤で構築", accent: "#1D3557", logo: "/client-breakingdown.png", scale: 1.15 },
  { name: "LAST CALL", cat: "エンタメ", desc: "大型キャスティング×LINE集客で話題性と動員数を最大化", accent: "#1a1a1a", logo: "/client-lastcall.png", scale: 1.08 },
  { name: "HERO'ZZ", cat: "スクール", desc: "プッシュ配信施策により短期間で5,000万円超の売上を創出", accent: "#E76F51", logo: "/client-herozz-banner.png", scale: 1.08 },
  { name: "V CLINIC", cat: "美容クリニック", desc: "予約管理の自動化と顧客体験の向上をLINEで実現", accent: "#C5A882", logo: "/client-vclinic.png", scale: 1.08 },
  { name: "AI+", cat: "テクノロジー", desc: "AI活用サービスのユーザー獲得とリテンションをLINEで最適化", accent: "#111", logo: "/client-aiplus.png", fill: true },
  { name: "REAL VALUE ACADEMIA", cat: "教育", desc: "オンラインスクールの集客・受講生管理をLINEで一元化", accent: "#1a1a1a", logo: "/client-realvalue-academia.png", scale: 1.5 },
  { name: "WEIN CAREER", cat: "人材", desc: "中卒・高卒採用に特化した人材紹介をLINEで効率化", accent: "#E53935", logo: "/client-weincareer.png" },
  { name: "Expert Partners", cat: "人材", desc: "オウンドメディア×LINEで面談予約率を4%→25%に改善", accent: "#2A3E6C", logo: "/client-expertpartners.png" },
  { name: "BUZZ SHIP", cat: "デジタルマーケティング", desc: "既存リストの最適化により広告費を抑制しながら月商を大幅増", accent: "#1a1a1a", logo: "/client-buzzship.png", scale: 0.75 },
];

const PAINS = [
  { icon: Users, img: "/pain-recruit-cost.png", tag: "採用", keyword: "応募の質が上がらない", text: "求人媒体やエージェントに毎年多額の費用を払っているが、母集団の質が低く面接辞退も多い。", statNum: "50万円〜", statLabel: "1人あたり採用コスト" },
  { icon: Target, img: "/pain-turnover.png", tag: "採用", keyword: "従業員が定着しない", text: "企業文化への理解が浅いまま採用に至り、入社後のミスマッチで早期離職が繰り返される。", statNum: "30%", statLabel: "半年以内の離職率" },
  { icon: Phone, img: "/pain-dropout.png", tag: "採用", keyword: "面談前に離脱される", text: "せっかく応募があっても、メールや電話が繋がらず、面談前に候補者がいなくなる。", statNum: "4%", statLabel: "面談到達率" },
  { icon: TrendingUp, img: "/pain-no-repeat.png", tag: "集客", keyword: "リピート・成約に繋がらない", text: "SNS広告やWeb広告で新規獲得はできているが、一度きりで終わり再来店・再購入に至らない。", statNum: "80%", statLabel: "が初回で離脱" },
  { icon: Settings, img: "/pain-what-to-send.png", tag: "集客", keyword: "何を配信すればいいかわからない", text: "LINE公式アカウントを作ったものの、何を送れば効果的なのか分からず放置してしまう。", statNum: "60%", statLabel: "が運用を停止" },
];

const LINE_STATS = [
  { num: "9,700", unit: "万人", label: "日本人口の8割に届く", sub: "YouTube・Xを超える国内最大のプラットフォーム。あなたの顧客は、すでにLINEの中にいます。", img: "/market-users-v2.png" },
  { num: "80", unit: "%", label: "LINEの開封率", sub: "配信当日に80%が開封。メールの4倍以上の到達力で確実に届く。", img: "/market-openrate-v2.png" },
  { num: "99.2", unit: "%", label: "学生のLINE利用率", sub: "電話に出ない若者もLINEなら即レス。採用の最強タッチポイント。", img: "/line-students.png" },
  { num: "∞", unit: "", label: "資産としての価値", sub: "集めた友だちは自社資産として残り続け、コストを下げ続ける。", img: "/line-asset.png" },
];

const CASES = [
  { num: "01", name: "Expert Partners様", cat: "人材マッチング事業", challenge: "リード獲得後の歩留まり低下", metric: "面談予約率", before: "4%", after: "25%", desc: "オウンドメディアとLINEの連携により機会損失を最小化。", img: "/case-ep.png" },
  { num: "02", name: "HERO'ZZ様", cat: "スクール事業", challenge: "受講生への効率的なアプローチ", metric: "売上", before: "—", after: "5,000万円超", desc: "プッシュ配信施策により短期間で爆発的な成果を実現。", img: "/case-herozz.png" },
  { num: "03", name: "マーケ博士様", cat: "SNSマーケティング事業", challenge: "ユーザーとの効率的なコミュニケーション", metric: "成約率", before: "—", after: "大幅改善", desc: "LINE診断コンテンツとセグメント配信で個別最適化を実現。", img: "/case-marke.png" },
];

const VOICES = [
  { avatar: "/avatar-voice-1.png", color: "#2A9D8F", role: "人材マッチング企業 / 代表", quote: "単なるシステム提供ではなく、『候補者がなぜ離脱するのか』という心理に基づいた設計を提案してくれた。", result: "応募から面談予約まで完全自動化。面談予約率は従来比30%改善。採用単価も大幅改善。" },
  { avatar: "/avatar-voice-2.png", color: "#E76F51", role: "EC事業 / マーケティング責任者", quote: "広告で集客はできているが、LINEの登録から購入への動線が弱く、リピーターに繋がっていなかった。", result: "LTV重視のシナリオ設計により配信のたびに売上が積み上がる構造に。ブロック率も激減。" },
];

/* Person silhouette avatar */
const PersonAvatar = ({ color, gender, size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" className="shrink-0">
    <circle cx="28" cy="28" r="28" fill={color} opacity=".12" />
    <circle cx="28" cy="21" r={gender === "f" ? 8.5 : 8} fill={color} opacity=".6" />
    {gender === "f" ? (
      <>
        <path d="M28 12c-5.5 0-9 3.5-9 8.5 0 0 .5-4 9-4s9 4 9 4c0-5-3.5-8.5-9-8.5z" fill={color} opacity=".4" />
        <ellipse cx="28" cy="42" rx="14" ry="10" fill={color} opacity=".5" />
      </>
    ) : (
      <>
        <rect x="19" y="13" width="18" height="5" rx="2.5" fill={color} opacity=".3" />
        <ellipse cx="28" cy="42" rx="13" ry="10" fill={color} opacity=".5" />
      </>
    )}
  </svg>
);

const STRENGTHS = [
  { img: "/strength-strategy.png", ja: "戦略的バックアップ", desc: "大型IP運営を含む200社超の運用データから導き出した『成功の型』を、貴社に合わせてカスタマイズ。" },
  { img: "/strength-team-v2.png", ja: "専門家集団", desc: "戦略・運用・クリエイティブの3名のプロが専任チームを組成。事業KPIの達成にコミット。" },
  { img: "/strength-data.png", ja: "データドリブン運用", desc: "すべての施策を数値で検証。200社超のデータベースから最適パターンを提案しPDCAを高速回転。" },
];

const FLOW_RECRUIT = [
  { ja: "ヒアリング・戦略設計", sub: "第一歩はここから！", desc: "採用課題をヒアリングし、ターゲット人材に響くLINEシナリオの全体設計を行います。" },
  { ja: "アカウント構築", sub: "プロの手でゼロから構築！", desc: "応募者向けのリッチメニュー・自動応答・日程調整シナリオを約1〜2ヶ月で構築。" },
  { ja: "テスト運用", sub: "本番前の最終確認！", desc: "実環境でシナリオの動作を確認。応募者体験を最適化し、万全の状態に仕上げます。" },
  { ja: "本番運用開始", sub: "いよいよスタート！", desc: "専任チームが選考歩留まりや面談予約率をモニタリング。定例会で改善提案を行います。" },
];

const FLOW_SALES = [
  { ja: "ヒアリング・戦略設計", sub: "第一歩はここから！", desc: "集客課題をヒアリングし、友だち追加〜CV(購買・予約)までのシナリオを設計します。" },
  { ja: "アカウント構築", sub: "プロの手でゼロから構築！", desc: "セグメント配信・ステップ配信・リッチメニューを約1〜2ヶ月で構築。" },
  { ja: "テスト運用", sub: "本番前の最終確認！", desc: "実環境でメッセージの反応率を検証。開封率・クリック率を最適化します。" },
  { ja: "本番運用開始", sub: "いよいよスタート！", desc: "専任チームがLTV・リピート率をモニタリング。配信施策の改善を継続的に行います。" },
];

const FAQ_ITEMS = [
  { q: "アカウントの立ち上げから依頼できますか？", a: "はい、初期設定から認証申請、戦略設計まで一貫して対応可能です。" },
  { q: "既存の運用を引き継ぐことは可能ですか？", a: "可能です。現状のデータを分析し、ボトルネックを解消するリニューアルプランをご提案します。" },
  { q: "対応可能な業種は？", a: "業種を問わず対応可能です。美容、教育、採用、EC/D2Cなど多岐にわたる実績があります。" },
  { q: "LINEのセキュリティ・プライバシーが不安です。", a: "LINE公式アカウントはLINE社が提供するビジネス向け正規サービスです。個人情報保護法に準拠した運用体制で万全を期しています。" },
];

const LACADEMIA = [
  { img: "/icon-line-setup.png", title: "公式LINEアカウント開設・運用", desc: "目的に合わせた最適なアカウント設計と日常運用をフルサポート。" },
  { img: "/icon-lstep.png", title: "Lステップ構築・運用", desc: "高度なシナリオ自動化で、顧客体験と運用効率を同時に向上。" },
  { img: "/icon-scenario.png", title: "企画・シナリオ設計", desc: "ユーザー心理に基づいた配信シナリオで離脱防止とCV最大化。" },
  { img: "/icon-webdesign.png", title: "WEBデザイン", desc: "リッチメニューやLPなど、ブランドに合った高品質クリエイティブ。" },
  { img: "/icon-copywriting.png", title: "コピーライティング・記事作成", desc: "行動を促す文章設計で開封率・クリック率を引き上げます。" },
  { img: "/icon-analytics.png", title: "アカウント分析・改善", desc: "数値に基づく定期分析と、成果直結の改善施策を提案。" },
];

/* ═══════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════ */
const useInView = (th = 0.12) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: th });
    obs.observe(el); return () => obs.disconnect();
  }, [th]);
  return [ref, v];
};

const useCountUp = (end, dur = 2000) => {
  const [val, setVal] = useState(0);
  const [ref, vis] = useInView(0.3);
  const ran = useRef(false);
  useEffect(() => {
    if (!vis || ran.current) return; ran.current = true;
    const t0 = performance.now();
    const tick = (now) => { const p = Math.min((now - t0) / dur, 1); setVal(Math.round(end * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [vis, end, dur]);
  return [ref, val];
};

/* ── Scroll-driven progress (0→1) for an element ── */
const useScrollProgress = (ref, opts = {}) => {
  const { start = 0.8, end = 0.2 } = opts;
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref?.current; if (!el) return;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const wh = window.innerHeight;
      setP(Math.max(0, Math.min(1, (wh * start - r.top) / (wh * (start - end)))));
    };
    window.addEventListener("scroll", tick, { passive: true });
    tick();
    return () => window.removeEventListener("scroll", tick);
  }, [ref, start, end]);
  return p;
};

/* ── Parallax offset ── */
const useParallax = (ref, speed = 0.3) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const el = ref?.current; if (!el) return;
    const tick = () => setOffset(el.getBoundingClientRect().top * speed);
    window.addEventListener("scroll", tick, { passive: true });
    tick();
    return () => window.removeEventListener("scroll", tick);
  }, [ref, speed]);
  return offset;
};

/* ── Scroll progress bar (right edge) ── */
const ScrollProgressBar = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const tick = () => { const h = document.documentElement.scrollHeight - window.innerHeight; setP(h > 0 ? window.scrollY / h : 0); };
    window.addEventListener("scroll", tick, { passive: true });
    return () => window.removeEventListener("scroll", tick);
  }, []);
  return <div className="fixed top-0 right-0 w-[3px] h-full z-[100] pointer-events-none"><div className="w-full bg-[#06C755] rounded-full transition-[height] duration-100" style={{ height: `${p * 100}%` }} /></div>;
};

/* ═══════════════════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════════════════ */
const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
  const [ref, vis] = useInView(0.06);
  const transforms = {
    up: `translateY(${vis ? 0 : 28}px)`,
    down: `translateY(${vis ? 0 : -28}px)`,
    left: `translateX(${vis ? 0 : -40}px)`,
    right: `translateX(${vis ? 0 : 40}px)`,
    scale: `scale(${vis ? 1 : 0.9})`,
    none: "none",
  };
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${vis ? "opacity-100" : "opacity-0"} ${className}`}
      style={{ transitionDelay: `${delay}ms`, transform: transforms[direction] || transforms.up }}>
      {children}
    </div>
  );
};

/* ── Character-by-character text reveal ── */
const TextRevealChar = ({ text, className = "", delay = 0 }) => {
  const [ref, vis] = useInView(0.2);
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block transition-all duration-500" style={{
          transitionDelay: `${delay + i * 40}ms`,
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0) rotate(0)" : "translateY(16px) rotate(4deg)",
          filter: vis ? "blur(0)" : "blur(3px)",
        }}>{ch === " " ? "\u00A0" : ch}</span>
      ))}
    </span>
  );
};

/* ── Horizontal scrolling text band ── */
const MarqueeBand = ({ texts, logos, dark = false }) => (
  <div className={`overflow-hidden py-4 md:py-5 ${dark ? "bg-[#111]" : "bg-[#06C755]"} relative`}>
    <div className="flex items-center w-max animate-marquee-x">
      {[...(logos || []), ...(logos || []), ...(logos || []), ...(logos || []),
        ...(texts || []).map(t => ({ text: t })), ...(texts || []).map(t => ({ text: t })), ...(texts || []).map(t => ({ text: t })), ...(texts || []).map(t => ({ text: t }))
      ].map((item, i) => (
        item.src
          ? <img key={i} src={item.src} alt={item.alt || ""} className={`shrink-0 mx-8 md:mx-12 h-[24px] md:h-[32px] w-auto object-contain rounded ${dark ? "opacity-40 brightness-0 invert" : "opacity-60"}`} />
          : <span key={i} className={`shrink-0 mx-6 md:mx-10 text-[16px] md:text-[20px] font-black tracking-wider whitespace-nowrap ${dark ? "text-white/15" : "text-white/25"}`}>
              {item.text || item}
            </span>
      ))}
      </div>
    </div>
  );

/* ── Number counter with clip animation ── */
const AnimatedNumber = ({ value, suffix, label }) => {
  const [ref, val] = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="overflow-hidden">
        <div className="font-en text-[36px] md:text-[50px] font-extrabold text-white leading-none tabular-nums" style={{ animation: "count-in .8s ease-out" }}>
          {val}<span className="text-[14px] text-[#06C755] ml-1 font-bold">{suffix}</span>
            </div>
          </div>
      <p className="text-[10px] text-white/40 font-semibold mt-2">{label}</p>
            </div>
  );
};

const LineBtn = ({ children, large }) => (
  <a href="#contact" className={`btn-ripple inline-flex items-center gap-2.5 bg-[#06C755] text-white font-bold rounded-full shadow-[0_4px_20px_rgba(6,199,85,.25)] hover:shadow-[0_8px_32px_rgba(6,199,85,.35)] hover:-translate-y-0.5 transition-all duration-300 ${large ? "px-9 py-4 text-[15px]" : "px-6 py-3 text-[13px]"}`}>
    <img src="/line-icon.png" alt="" className="w-5 h-5 rounded-md" />
    {children || "LINEで相談する"}
  </a>
);

/* ── Reusable wave SVG ── */
const WaveSvg = ({ fill = "#fff", flip = false }) => (
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={`w-full block ${flip ? "rotate-180" : ""}`} style={{ height: "clamp(32px, 4vw, 60px)" }}>
    <path d="M0,40 C360,70 720,0 1080,30 C1260,45 1380,55 1440,40 L1440,60 L0,60 Z" fill={fill} />
  </svg>
);

/* ── Section heading with underline ── */
const SectionHead = ({ tag, children, sub, white }) => (
  <div className="text-center mb-8 md:mb-10">
    {tag && <span className={`section-tag mb-3 inline-block ${white ? "!bg-white/15 !text-white" : ""}`}>{tag}</span>}
    <h2 className={`text-[24px] md:text-[34px] font-black leading-[1.45] heading-line ${white ? "text-white after:bg-white" : "text-black"}`}>{children}</h2>
    {sub && <p className={`text-[14px] leading-[1.9] mt-5 max-w-[500px] mx-auto ${white ? "text-white/60" : "text-black/40"}`}>{sub}</p>}
          </div>
);

/* ── Tall iPhone Mockup ── */
const TallPhone = ({ name, color, msgs, scale = 1, className = "" }) => {
  const [m1, m2, m3] = msgs || ["お知らせです✨", "ありがとう！", "ご確認ください📋"];
  const w = 110 * scale;
  const h = w * 2.16;
  const r = w * 0.22;
  const bezel = w * 0.025;
  return (
    <div className={`shrink-0 ${className}`} style={{ width: w, height: h, filter: `drop-shadow(0 ${4*scale}px ${16*scale}px rgba(0,0,0,.12))` }}>
      <div className="w-full h-full relative" style={{ borderRadius: r, background: "#1a1a1a", padding: bezel }}>
        <div className="w-full h-full overflow-hidden flex flex-col" style={{ borderRadius: r - bezel, background: "#fff" }}>
          <div className="flex items-center justify-center shrink-0" style={{ height: w * 0.15, background: "#fff" }}>
            <div style={{ width: w * 0.24, height: w * 0.065, background: "#1a1a1a", borderRadius: 999 }} />
              </div>
          <div className="shrink-0 flex items-center gap-1 px-2" style={{ height: w * 0.14, background: color || "#06C755" }}>
            <div className="rounded-full bg-white/30 flex items-center justify-center shrink-0" style={{ width: w * 0.085, height: w * 0.085 }}>
              <span className="text-white font-bold" style={{ fontSize: w * 0.04 }}>{(name || "V").charAt(0)}</span>
              </div>
            <span className="text-white font-bold truncate" style={{ fontSize: w * 0.058 }}>{name}</span>
            </div>
          <div className="flex-1 flex flex-col justify-center gap-1.5 px-1.5" style={{ background: "#E8ECF0", padding: `${w*0.04}px ${w*0.035}px` }}>
            <div className="flex items-end gap-0.5">
              <div className="rounded-full shrink-0" style={{ width: w*0.06, height: w*0.06, background: `${color}30` }} />
              <div className="rounded-lg rounded-bl-sm px-1.5 py-1 bg-white shadow-[0_0.5px_1px_rgba(0,0,0,.05)]" style={{ maxWidth: "82%", borderRadius: `${w*0.04}px ${w*0.04}px ${w*0.04}px ${w*0.01}px` }}>
                <p style={{ fontSize: w * 0.05, lineHeight: 1.5, color: "#1a1a1a" }}>{m1}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="px-1.5 py-1" style={{ maxWidth: "75%", borderRadius: `${w*0.04}px ${w*0.04}px ${w*0.01}px ${w*0.04}px`, background: color || "#06C755" }}>
                <p style={{ fontSize: w * 0.05, lineHeight: 1.5, color: "#fff" }}>{m2}</p>
              </div>
            </div>
            <div className="flex items-end gap-0.5">
              <div className="rounded-full shrink-0" style={{ width: w*0.06, height: w*0.06, background: `${color}30` }} />
              <div className="bg-white shadow-[0_0.5px_1px_rgba(0,0,0,.05)]" style={{ maxWidth: "85%", borderRadius: `${w*0.04}px ${w*0.04}px ${w*0.04}px ${w*0.01}px`, padding: `${w*0.01}px ${w*0.035}px` }}>
                <p style={{ fontSize: w * 0.05, lineHeight: 1.5, color: "#1a1a1a" }}>{m3}</p>
              </div>
              </div>
            </div>
          <div className="shrink-0 bg-white border-t border-black/5 flex items-center px-1.5 gap-1" style={{ height: w * 0.1 }}>
            <div className="rounded-full bg-[#007AFF] flex items-center justify-center" style={{ width: w*0.06, height: w*0.06 }}>
              <span className="text-white" style={{ fontSize: w*0.035 }}>+</span>
          </div>
            <div className="flex-1 bg-[#F2F2F7] rounded-full" style={{ height: w * 0.05 }} />
          </div>
          <div className="shrink-0 bg-white flex items-center justify-center" style={{ height: w * 0.06 }}>
            <div className="bg-black/15 rounded-full" style={{ width: w * 0.28, height: w * 0.025 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════════════════ */
const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  const links = [{ l: "導入実績", h: "#works" }, { l: "サービス", h: "#service" }, { l: "成果事例", h: "#results" }, { l: "会社概要", h: "#about" }, { l: "お問合せ", h: "#contact" }];

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 bg-white ${scrolled ? "shadow-[0_1px_0_rgba(0,0,0,.06)]" : ""}`}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <a href="#" className="relative z-10">
            <img src="/logo-horizontal.png" alt="VOYAGE" className="h-[32px] md:h-[38px] w-auto transition-all duration-500 bg-white rounded px-1.5 py-0.5" />
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {links.map(n => <a key={n.l} href={n.h} className="text-[12px] font-semibold tracking-wide transition-colors text-black/50 hover:text-black">{n.l}</a>)}
            <LineBtn>無料相談</LineBtn>
          </nav>
          <button onClick={() => setOpen(true)} className="lg:hidden"><Menu size={22} className="text-black" /></button>
        </div>
      </header>
      <div className={`fixed inset-0 bg-white z-[60] transition-all duration-500 flex flex-col ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="flex justify-end p-5"><button onClick={() => setOpen(false)}><X size={22} className="text-black" /></button></div>
        <nav className="flex-1 flex flex-col items-center justify-center gap-7">
          {links.map(n => <a key={n.l} href={n.h} onClick={() => setOpen(false)} className="text-lg font-bold text-black/70">{n.l}</a>)}
          <div className="mt-4" onClick={() => setOpen(false)}><LineBtn large>LINEで相談する</LineBtn></div>
        </nav>
      </div>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);
  const show = () => `transition-all duration-[1000ms] ease-out ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;
  const [r1, c1] = useCountUp(200);
  const [r2, c2] = useCountUp(25);
  const [r3, c3] = useCountUp(5000);
  const heroRef = useRef(null);
  const bgY = useParallax(heroRef, 0.2);

  /* Creative images — displayed as cards in alternating up/down scrolling columns */
  const creatives = [
    "/creative-1.png",
    "/creative-2.png",
    "/creative-3.png",
    "/creative-4.png",
    "/creative-5.png",
    "/creative-6.png",
    "/creative-7.png",
    "/creative-8.png",
    "/creative-9.png",
    "/creative-10.png",
    "/creative-11.png",
    "/creative-12.png",
    "/creative-13.png",
    "/creative-14.png",
  ];
  /* Build columns: each column gets a mix of images */
  const cols = [
    [creatives[0], creatives[5], creatives[12], creatives[3]],
    [creatives[10], creatives[2], creatives[7], creatives[13]],
    [creatives[6], creatives[11], creatives[1], creatives[8]],
    [creatives[13], creatives[9], creatives[5], creatives[0]],
    [creatives[8], creatives[4], creatives[12], creatives[6]],
    [creatives[1], creatives[7], creatives[11], creatives[2]],
  ];

  return (
    <section ref={heroRef} className="relative flex flex-col justify-center overflow-hidden bg-white">
      <div className="absolute top-[-20%] right-[-10%] w-[50%] aspect-square rounded-full bg-[#06C755]/[.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-8%] w-[35%] aspect-square rounded-full bg-[#06C755]/[.03] blur-[100px] pointer-events-none" />

      {/* Alternating up/down scrolling creative columns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-0 w-[55%] bottom-[-15%] flex gap-3 md:gap-4" style={{ transform: "rotate(-8deg)", transformOrigin: "top right" }}>
          {cols.map((col, ci) => {
            const doubled = [...col, ...col];
            const speed = 28 + ci * 3;
            const direction = ci % 2 === 0 ? "scroll-up" : "scroll-down";
            return (
              <div key={ci} className="flex flex-col gap-3 md:gap-4 shrink-0" style={{ width: "clamp(100px, 14vw, 160px)", animation: `${direction} ${speed}s linear infinite`, animationDelay: `${ci * -4}s` }}>
                {doubled.map((src, si) => (
                  <div key={si} className="shrink-0 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.08)]">
                    <img src={src} alt="" className="w-full h-auto block" />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      {/* Fade overlays for text readability */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white via-white/80 to-white/0" style={{ width: "55%" }} />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent to-white/40" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-transparent to-white" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 md:px-8 w-full pt-20 pb-8 md:pt-24 md:pb-10">
        <div className="max-w-[660px]">
          <div className={show()} style={{ transitionDelay: "400ms" }}>
            <p className="text-[13px] md:text-[15px] font-bold text-[#06C755] tracking-[.08em] uppercase mb-3">
              <TextRevealChar text="LINEマーケティングの" delay={500} />
            </p>
            <h1 className="text-black leading-[1.3]">
              <span className="block text-[26px] md:text-[38px] lg:text-[44px] font-bold text-black/80">
                <TextRevealChar text="戦略設計から運用・分析まで" delay={900} />
              </span>
              <span className="block text-[34px] md:text-[52px] lg:text-[62px] font-black mt-1">
                <TextRevealChar text="すべて代行します。" delay={1400} />
              </span>
            </h1>
          </div>
          <div className={show()} style={{ transitionDelay: "600ms" }}>
            <p className="text-black/50 text-[13px] md:text-[15px] leading-[2] mt-5 max-w-[520px]">
              <span className="text-black/80 font-black text-[20px] md:text-[24px]">採用も、集客も。</span><br />200アカウント以上のご支援から得た知見で、<br className="hidden md:block" />
              企業の「採用」と「売上」を最大化するLINEソリューション。
            </p>
          </div>
          <div className={show()} style={{ transitionDelay: "800ms" }}>
            <div className="mt-7 flex items-center gap-5 flex-wrap">
              <LineBtn large>ご相談・お問合せ（無料）</LineBtn>
              <img src="/badge-200.png" alt="運用実績200社以上" className="h-[70px] md:h-[80px] w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,.08)]" loading="lazy" />
            </div>
          </div>
        </div>
        <div className={show()} style={{ transitionDelay: "1000ms" }}>
          <div className="mt-8 md:mt-10 flex flex-wrap gap-8 md:gap-14 border-t border-black/[.06] pt-6">
            {[
              { ref: r1, val: c1, suf: "社超", label: "導入実績" },
              { ref: r2, val: c2, suf: "%", label: "採用面談率" },
              { ref: r3, val: c3, suf: "万円超", label: "売上貢献" },
            ].map((s, i) => (
              <div key={i} ref={s.ref} className="overflow-hidden">
                <div className="font-en text-[34px] md:text-[46px] font-extrabold text-black leading-none tabular-nums" style={{ animation: s.val > 0 ? `count-in .6s ease-out ${i * 0.15}s both` : "none" }}>
                  {s.val}<span className="text-[14px] text-[#06C755] ml-1 font-bold">{s.suf}</span>
                </div>
                <p className="text-[10px] text-black/35 font-semibold mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   CLIENT SHOWCASE — white bg
   ═══════════════════════════════════════════════════════════ */
const ClientShowcase = () => {
  const ClientCard = ({ c }) => (
    <div className="shrink-0 mx-2 group">
      <div className="relative rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,.10)] transition-all duration-500">
        {c.logo ? (
          <div className="w-[360px] md:w-[440px] h-[200px] md:h-[250px] overflow-hidden bg-white flex items-center justify-center">
            <img src={c.logo} alt={c.name} className={`w-full h-full ${c.fill ? "object-cover" : "object-contain"} group-hover:scale-105 transition-transform duration-500`} style={c.scale ? { transform: `scale(${c.scale})` } : undefined} />
          </div>
        ) : (
          <div className="w-[360px] md:w-[440px] h-[200px] md:h-[250px] flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent}cc)` }}>
            <span className="text-white font-black font-en text-[22px] md:text-[28px] tracking-wide text-center px-6">{c.name}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="works" className="py-14 md:py-20 overflow-hidden bg-white relative">
      <div className="absolute top-[5%] right-[-3%] w-[15%] aspect-square rounded-full bg-[#06C755]/[.03] pointer-events-none animate-drift-y" />
      <div className="absolute bottom-[10%] left-[-4%] w-[12%] aspect-square rounded-full bg-[#06C755]/[.04] pointer-events-none animate-drift-x" />
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 mb-8">
        <Reveal>
          <SectionHead>LINE運用の実績多数</SectionHead>
        </Reveal>
      </div>
      <div className="overflow-hidden">
        <div className="flex w-max animate-card-left pause-on-hover py-4">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <ClientCard key={`a${i}`} c={c} chat={HERO_CHATS[i % HERO_CHATS.length]} />
          ))}
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 mt-5 text-center">
        <Reveal>
          <a href="#results" className="inline-flex items-center gap-2.5 text-[15px] md:text-[16px] font-bold text-[#06C755] hover:underline">
            成果事例を見る <ArrowRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAIN POINTS — checklist format
   ═══════════════════════════════════════════════════════════ */
const PainPoints = () => (
  <section className="relative bg-[#e8f5e9] pt-8 pb-16 md:pt-10 md:pb-20 overflow-hidden">
    <WaveSvg fill="#e8f5e9" />
    <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10">
      <Reveal>
        <SectionHead>こんなお悩みはありませんか？</SectionHead>
      </Reveal>

      <div className="space-y-4 md:space-y-5 mt-6">
        {PAINS.map((pain, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="relative overflow-hidden rounded-2xl py-7 md:py-9 px-6 md:px-10" style={{ minHeight: "140px" }}>
              {/* Background illustration — full width, seamlessly blended */}
              <div
                className="absolute pointer-events-none select-none"
                style={{
                  [i % 2 === 0 ? "right" : "left"]: "-20px",
                  top: "-20%",
                  bottom: "-20%",
                  width: "clamp(300px, 45%, 500px)",
                  mask: `radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, rgba(0,0,0,.4) 50%, transparent 70%)`,
                  WebkitMask: `radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, rgba(0,0,0,.4) 50%, transparent 70%)`,
                }}
              >
                <img
                  src={pain.img}
                  alt=""
                  className="w-full h-full object-contain"
                  style={{ opacity: 1, mixBlendMode: "multiply", filter: "contrast(1.1) saturate(0.4) sepia(0.1) hue-rotate(80deg)" }}
                />
              </div>
              {/* Text content */}
              <div className="relative z-10 max-w-[550px]" style={{ marginLeft: i % 2 === 0 ? 0 : "auto", marginRight: i % 2 === 0 ? "auto" : 0 }}>
                <div className="flex items-center gap-3 mb-2">
                  <pain.icon size={20} className="text-[#06C755] shrink-0" />
                  <h3 className="text-[22px] md:text-[28px] font-black text-black leading-[1.35]">{pain.keyword}</h3>
                </div>
                <p className="text-[13px] md:text-[15px] text-black/50 leading-[1.9] max-w-[480px]">{pain.text}</p>
                {pain.statNum && (
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-en text-[26px] md:text-[32px] font-black text-[#c62828] leading-none">{pain.statNum}</span>
                    <span className="text-[11px] md:text-[12px] font-bold text-black/35">{pain.statLabel}</span>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   GREEN BANNER
   ═══════════════════════════════════════════════════════════ */
const GreenBanner = ({ children }) => (
  <div className="bg-[#06C755] py-6 md:py-7 text-center relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-10">
      <div className="absolute top-0 right-0 w-[50%] h-full bg-white rounded-full blur-[80px] translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[40%] h-full bg-white rounded-full blur-[60px] -translate-x-1/4 animate-drift-x" />
    </div>
    <div className="absolute inset-0 dot-pattern-dark pointer-events-none opacity-15" />
    <div className="absolute top-[30%] left-[5%] w-1.5 h-1.5 rounded-full bg-white/25 pointer-events-none animate-float-a" />
    <div className="absolute top-[40%] right-[8%] w-2 h-2 rounded-full bg-white/15 pointer-events-none animate-float-b" />
    <p className="text-white text-[17px] md:text-[22px] font-bold leading-[1.6] px-5 relative z-10">{children}</p>
  </div>
);

/* ── Chevron Section Divider (LP style) ── */
const ChevronDivider = ({ headline, sub, body }) => (
  <div className="relative">
    {/* Top chevron pointing down */}
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: "clamp(28px, 4vw, 56px)", marginBottom: -1 }}>
      <path d="M0,0 L720,60 L1440,0 L1440,0 L0,0 Z" fill="#e8f5e9" />
      <path d="M0,0 L720,60 L1440,0 L1440,60 L720,60 L0,60 Z" fill="#06C755" />
    </svg>
    {/* Main body */}
    <div className="relative overflow-hidden bg-[#06C755]">
      {/* Decorative */}
      <div className="absolute inset-0 dot-pattern-dark pointer-events-none opacity-10" />
      <div className="absolute top-[-20%] right-[-10%] w-[40%] aspect-square rounded-full bg-white/[.06] blur-[60px] pointer-events-none animate-drift-x" />
      <div className="absolute bottom-[-15%] left-[-8%] w-[30%] aspect-square rounded-full bg-white/[.05] blur-[50px] pointer-events-none animate-drift-y" />


      <div className="max-w-[640px] mx-auto px-5 md:px-8 py-10 md:py-14 text-center relative z-10">
        {sub && <p className="text-white/80 text-[20px] md:text-[26px] font-bold mb-4">{sub}</p>}
        <h2 className="text-[30px] md:text-[44px] font-black text-white leading-[1.4] mb-5">
          {headline}
        </h2>
        {body && (
          <Reveal delay={100}>
            <p className="text-[13px] md:text-[15px] text-white/75 leading-[2] max-w-[500px] mx-auto mt-5">{body}</p>
          </Reveal>
        )}
      </div>
    </div>
    {/* Bottom chevron pointing down */}
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: "clamp(28px, 4vw, 56px)", marginTop: -1 }}>
      <path d="M0,0 L1440,0 L720,60 Z" fill="#06C755" />
      <path d="M0,60 L720,60 L1440,60 L1440,0 L720,60 L0,0 Z" fill="#e8f5e9" />
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   MARKET DATA — CSS infographic cards
   ═══════════════════════════════════════════════════════════ */
const MARKET_ITEMS = [
  { num: "9,700", unit: "万人", pct: 80, tag: "USERS", title: "日本人口の8割に届く", desc: "YouTube・Xを超える国内最大のプラットフォーム。あなたの顧客は、すでにLINEの中にいます。", compare: [{ label: "LINE", value: 80 }, { label: "YouTube", value: 58 }, { label: "X", value: 37 }] },
  { num: "80", unit: "%", pct: 80, tag: "OPEN RATE", title: "配信当日の開封率", desc: "メルマガの平均開封率15〜20%と比べて圧倒的。メッセージは顧客のポケットに直接届きます。", compare: [{ label: "LINE", value: 80 }, { label: "メルマガ", value: 18 }] },
  { num: "99.2", unit: "%", pct: 99, tag: "STUDENTS", title: "学生のLINE利用率", desc: "電話に出ない若者もLINEなら即レス。新卒採用における最強のタッチポイント。", compare: [{ label: "LINE", value: 99 }, { label: "電話", value: 42 }, { label: "メール", value: 30 }] },
  { num: "∞", unit: "", pct: 100, tag: "ASSET", title: "友だち＝自社資産", desc: "Web広告と異なり、集めた友だちは「自社資産」として残り続け、採用・販促コストを中長期的に下げ続けます。", compare: null },
];

const BarChart = ({ items }) => (
  <div className="space-y-3 mt-4 w-full">
    {items.map((item, i) => (
      <div key={i} className="flex items-center gap-3">
        <span className="text-[12px] font-bold text-black/50 w-[60px] text-right shrink-0">{item.label}</span>
        <div className="flex-1 h-[22px] bg-black/[.06] rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${item.value}%`,
              background: i === 0 ? "linear-gradient(90deg, #06C755, #38d9a9)" : "#ccc",
              transitionDelay: `${i * 200}ms`,
            }}
          />
          <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold ${i === 0 ? "text-white" : "text-black/40"}`}>{item.value}%</span>
      </div>
      </div>
    ))}
    </div>
  );

const CircleRing = ({ pct }) => {
  const r = 54, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 128 128" className="w-[60px] md:w-[72px] shrink-0">
      <circle cx="64" cy="64" r={r} fill="none" stroke="#e8f5e9" strokeWidth="10" />
      <circle cx="64" cy="64" r={r} fill="none" stroke="#06C755" strokeWidth="10"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
        transform="rotate(-90 64 64)" className="transition-all duration-1000" />
    </svg>
  );
};

const MarketData = () => (
  <section className="py-14 md:py-20 bg-[#e8f5e9] relative overflow-hidden">
    <div className="max-w-[960px] mx-auto px-5 md:px-8 relative z-10">
      <Reveal>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[24px] md:text-[34px] font-black leading-[1.45] text-black">
            なぜ今、<span className="text-[#06C755] text-[32px] md:text-[46px]">LINE</span>なのか
          </h2>
        </div>
      </Reveal>

      {/* --- Item 1: Hero number + bar chart --- */}
      <Reveal>
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-5 md:mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="shrink-0">
              <div className="flex items-baseline gap-1">
                <span className="font-en text-[56px] md:text-[72px] font-black text-[#06C755] leading-none">9,700</span>
                <span className="text-[18px] md:text-[22px] font-bold text-black/50">万人</span>
              </div>
              <p className="text-[18px] md:text-[20px] font-black text-black mt-1">日本人口の8割に届く</p>
            </div>
            <div className="flex-1 w-full">
              <p className="text-[13px] text-black/45 leading-[1.7] mb-4">YouTube・Xを超える国内最大のプラットフォーム。あなたの顧客は、すでにLINEの中にいます。</p>
              <BarChart items={[{ label: "LINE", value: 80 }, { label: "YouTube", value: 58 }, { label: "X", value: 37 }]} />
            </div>
          </div>
        </div>
      </Reveal>

      {/* --- Item 2 & 3: Side by side cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-6">
        <Reveal delay={60}>
          <div className="bg-white rounded-2xl p-6 md:p-7 h-full">
            <span className="text-[9px] font-bold text-[#06C755]/50 tracking-[.2em] font-en block mb-2">OPEN RATE</span>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="font-en text-[48px] md:text-[56px] font-black text-[#06C755] leading-none">80</span>
              <span className="text-[18px] font-bold text-black/50">%</span>
            </div>
            <h3 className="text-[16px] md:text-[18px] font-black text-black mb-2">配信当日の開封率</h3>
            <p className="text-[12px] md:text-[13px] text-black/45 leading-[1.7] mb-4">メルマガの平均開封率15〜20%と比べて圧倒的。メッセージは顧客のポケットに直接届きます。</p>
            <BarChart items={[{ label: "LINE", value: 80 }, { label: "メルマガ", value: 18 }]} />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="bg-white rounded-2xl p-6 md:p-7 h-full">
            <span className="text-[9px] font-bold text-[#06C755]/50 tracking-[.2em] font-en block mb-2">STUDENTS</span>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="font-en text-[48px] md:text-[56px] font-black text-[#06C755] leading-none">99.2</span>
              <span className="text-[18px] font-bold text-black/50">%</span>
            </div>
            <h3 className="text-[16px] md:text-[18px] font-black text-black mb-2">学生のLINE利用率</h3>
            <p className="text-[12px] md:text-[13px] text-black/45 leading-[1.7] mb-4">電話に出ない若者もLINEなら即レス。新卒採用における最強のタッチポイント。</p>
            <BarChart items={[{ label: "LINE", value: 99 }, { label: "電話", value: 42 }, { label: "メール", value: 30 }]} />
          </div>
        </Reveal>
      </div>

      {/* --- Item 4: LINE asset message --- */}
      <Reveal delay={180}>
        <div className="bg-white rounded-2xl p-8 md:p-12 relative overflow-hidden text-center">
          <h3 className="text-[26px] md:text-[36px] lg:text-[42px] font-black text-black leading-[1.4]">
            <span className="text-[#06C755]">LINE</span>はずっと残り続ける<br className="hidden md:block" /><span className="text-[#06C755]">資産</span>です。
          </h3>
          <p className="text-[13px] md:text-[15px] text-black/40 mt-4 max-w-[480px] mx-auto leading-[1.9]">広告は止めれば流入ゼロ。<br />LINEリストは蓄積し続け、配信のたびに売上へ直結します。</p>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   YOUTUBE — light green bg
   ═══════════════════════════════════════════════════════════ */
const YouTubeSection = () => (
  <section className="relative bg-[#e8f5e9] pt-6 pb-14 md:pt-8 md:pb-16 overflow-hidden">
    <div className="max-w-[800px] mx-auto px-5 md:px-8 relative z-10">
      <Reveal>
        <div className="text-center mb-6">
          <span className="text-[20px] md:text-[28px] font-black text-[#06C755] tracking-wider font-en mb-3 inline-block">MEDIA</span>
          <p className="text-[16px] md:text-[18px] font-bold text-black">代表 千葉瑛太が語るLINEを活用した採用支援</p>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <div className="rounded-2xl overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,.10)]">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe src="https://www.youtube.com/embed/qOIuvPrF2TY" title="VOYAGE" className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   BACKSTAGE GROUP
   ═══════════════════════════════════════════════════════════ */
const BackstageGroup = () => {
  const [rA, cA] = useCountUp(180);
  const [rB, cB] = useCountUp(5);
  const wrapRef = useRef(null);
  const progress = useScrollProgress(wrapRef, { start: 1.0, end: 0.0 });
  const imgScale = 1 + progress * 0.1;
  const overlayAlpha = 0.2 + progress * 0.35;

  return (
    <section id="about" className="bg-white relative overflow-hidden">
      {/* Image — full width, scroll-linked zoom, clipped by overflow-hidden */}
      <div ref={wrapRef} className="relative w-full overflow-hidden">
        <img
          src="/backstage-v2.png" alt="BACKSTAGE Group"
          className="w-full h-auto block will-change-transform transition-transform duration-100"
          loading="lazy"
          style={{ transform: `scale(${imgScale})` }}
        />
      </div>

      {/* Content below image */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-10 md:pt-14 pb-10 md:pb-14 relative z-10">
        <Reveal>
          <h2 className="text-[26px] md:text-[42px] font-black leading-[1.35] text-black text-center mb-6">
            国内No.1のIP創出力を誇る<br /><span className="relative inline-block"><span className="relative z-10">採用・マーケティング</span><span className="absolute left-0 bottom-[2px] w-full h-[10px] md:h-[14px] bg-[#06C755]/20 rounded-sm -z-0" /></span>の<span className="relative inline-block"><span className="relative z-10">実行部隊</span><span className="absolute left-0 bottom-[2px] w-full h-[10px] md:h-[14px] bg-[#06C755]/30 rounded-sm -z-0" /></span>。
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex justify-center gap-10 md:gap-16 mb-10">
            <div className="text-center" ref={rA}>
              <div className="font-en text-[32px] md:text-[48px] font-black text-[#06C755] leading-none tabular-nums">
                {cA}<span className="text-[14px] text-black/40 ml-1 font-bold">億円超</span>
              </div>
              <p className="text-[11px] text-black/35 font-semibold mt-2">累計資金調達額</p>
            </div>
            <div className="w-px bg-black/10 self-stretch" />
            <div className="text-center" ref={rB}>
              <div className="font-en text-[32px] md:text-[48px] font-black text-[#06C755] leading-none tabular-nums">
                {cB}<span className="text-[14px] text-black/40 ml-1 font-bold">億回超</span>
              </div>
              <p className="text-[11px] text-black/35 font-semibold mt-2">月間動画再生数</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="bg-[#f7faf7] rounded-2xl p-6 md:p-8">
            <h3 className="text-[18px] md:text-[22px] font-black text-black text-center leading-[1.5] mb-2">
              グループの「認知」を、貴社の<span className="text-[#06C755]">「採用」</span>と<span className="text-[#06C755]">「売上」</span>に変える。
            </h3>
            <p className="text-black/40 text-[13px] leading-[1.9] text-center max-w-[460px] mx-auto mb-6">
              「感覚」ではなく「データ」に基づきLINE上で確実な成果への導線を構築。この運用ノウハウを、貴社の事業成長に活かします。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-[700px] mx-auto">
              {[
                { ja: "採用支援", keyword: "採用コストを削減し、\n定着率を改善", desc: "LINEのシナリオ設計で「志望度」へと変換。選考歩留まり改善とカルチャーマッチした人材の確実な採用を実現。" },
                { ja: "集客・売上支援", keyword: "売上に直結する\nリスト資産を構築", desc: "「フロー」を「ストック」へ。ユーザーをLINEで見込み客リスト化。LTV向上・優良顧客育成を実現。" },
              ].map((v, i) => (
                <div key={i} className={`px-6 md:px-8 py-5 ${i === 0 ? "md:border-r border-b md:border-b-0 border-[#06C755]/10" : ""}`}>
                  <span className="text-[12px] font-bold text-[#06C755] tracking-wide">{v.ja}</span>
                  <p className="text-[18px] md:text-[20px] font-black text-black leading-[1.5] mt-2 mb-3 whitespace-pre-line">{v.keyword}</p>
                  <p className="text-[12px] md:text-[13px] text-black/40 leading-[1.8]">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   LEADERSHIP
   ═══════════════════════════════════════════════════════════ */
const Leadership = () => (
  <section className="relative bg-[#e8f5e9] pt-8 pb-8 md:pt-10 md:pb-10 overflow-hidden">
    <WaveSvg fill="#e8f5e9" />
    {/* Decorative */}
    <div className="absolute top-[15%] right-[-3%] w-[100px] md:w-[180px] aspect-square rounded-full bg-[#06C755]/[.08] blur-[40px] pointer-events-none animate-pulse-glow" />
    <div className="absolute bottom-[20%] left-[-5%] w-[80px] md:w-[140px] aspect-square rounded-full bg-[#06C755]/[.06] blur-[30px] pointer-events-none animate-drift-x" />
    <div className="absolute inset-0 dot-pattern pointer-events-none opacity-30" />
    <div className="relative z-10">
      <div className="max-w-[1100px] mx-auto px-5 md:px-8">
            <Reveal>
          <SectionHead>経営陣</SectionHead>
        </Reveal>
                  </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Chiba */}
        <Reveal delay={100} direction="left">
          <div className="relative overflow-hidden bg-gradient-to-t from-black/60 via-black/10 to-transparent h-[420px] md:h-[520px] group">
            <img src="/ceo-chiba-v3.png" alt="千葉 瑛太" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" style={{ objectPosition: "center 10%" }} loading="lazy" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
              <p className="text-[11px] md:text-[12px] text-[#06C755] font-bold mb-1">代表取締役</p>
              <h3 className="text-[22px] md:text-[26px] font-black text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,.3)]">千葉 瑛太</h3>
              <p className="text-[12px] md:text-[13px] text-white/85 leading-[1.9] drop-shadow-[0_1px_4px_rgba(0,0,0,.2)]">累計200社以上の支援実績を持ち、年間数億円規模のマーケティング予算を統括。グループの事業成長を採用支援の側面から牽引。</p>
                </div>
              </div>
            </Reveal>
        {/* Mizoguchi */}
        <Reveal delay={200} direction="right">
          <div className="relative overflow-hidden bg-gradient-to-t from-black/60 via-black/10 to-transparent h-[420px] md:h-[520px] group">
            <img src="/ceo-mizoguchi-v3.png" alt="溝口 勇児" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" style={{ objectPosition: "center 20%" }} loading="lazy" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
              <p className="text-[11px] md:text-[12px] text-[#06C755] font-bold mb-1">監修 / 共同代表</p>
              <h3 className="text-[22px] md:text-[26px] font-black text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,.3)]">溝口 勇児</h3>
              <p className="text-[12px] md:text-[13px] text-white/85 leading-[1.9] drop-shadow-[0_1px_4px_rgba(0,0,0,.2)]">BACKSTAGE Inc. 代表取締役 / VOYAGE 取締役会長。FiNC創業者。累計180億円超の資金調達を実現。</p>
            </div>
              </div>
            </Reveal>
          </div>
        </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   SERVICE — white bg
   ═══════════════════════════════════════════════════════════ */
const Service = () => (
  <section id="service" className="py-14 md:py-20 bg-white relative overflow-hidden">
    <div className="absolute top-[10%] left-[-5%] w-[25%] aspect-square rounded-full bg-[#06C755]/[.03] pointer-events-none animate-drift-y" />
    <div className="absolute bottom-[5%] right-[-6%] w-[20%] aspect-square rounded-full bg-[#06C755]/[.04] pointer-events-none animate-drift-x" />
    <div className="absolute top-[30%] right-[4%] w-2.5 h-2.5 rounded-full bg-[#06C755]/20 pointer-events-none animate-float-b" />
    <div className="absolute top-[60%] left-[6%] w-3 h-3 rounded-full bg-[#06C755]/15 pointer-events-none animate-float-a" />
    <div className="absolute bottom-[25%] right-[10%] w-2 h-2 rounded-full bg-[#06C755]/25 pointer-events-none animate-drift-y" />
    <div className="absolute inset-0 dot-pattern-white pointer-events-none" />
    <div className="max-w-[1000px] mx-auto px-5 md:px-8 relative z-10">
      <Reveal>
        <SectionHead>
          サービス内容
        </SectionHead>
      </Reveal>

          <Reveal>
        <div className="mb-12 md:mb-14">
          <div className="text-center mb-6">
            <p className="text-[11px] text-black/30 font-bold mb-2">採用DXソリューション</p>
            <img src="/logo-riquel.png" alt="リクエル" className="h-[100px] md:h-[160px] w-auto mx-auto" loading="lazy" />
              </div>
          <p className="text-[14px] text-black/45 leading-[1.9] max-w-[600px] mx-auto text-center mb-8">
            月間9,700万人が利用するLINEを基盤に、エントリーから内定承諾までを自動化・最適化。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              { ja: "即時性", desc: "開封率80%の到達力で候補者との接点を維持し選考離脱を防止。" },
              { ja: "自動化", desc: "日程調整・Q&A対応をシステム化し採用担当者の工数を大幅圧縮。" },
              { ja: "可視化", desc: "スコアリングで候補者の志望度を定量化。データに基づく意思決定。" },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="pl-5 md:pl-6 border-l-2 border-[#06C755]/30 h-full">
                  <span className="text-[11px] font-bold text-[#06C755]/50 font-en tracking-wider">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="text-[17px] md:text-[18px] font-black text-black mt-1 mb-2">{f.ja}</h4>
                  <p className="text-[13px] text-black/45 leading-[1.85]">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
              </div>
            </Reveal>

      <Reveal>
        <div>
          <div className="text-center mb-6">
            <p className="text-[11px] text-black/30 font-bold mb-2">実践型LINEマーケティングスクール</p>
            <img src="/logo-lacademia.png" alt="L-ACADEMIA" className="h-[60px] md:h-[90px] w-auto mx-auto object-contain" loading="lazy" />
                  </div>
          <p className="text-[14px] text-black/45 leading-[1.9] max-w-[600px] mx-auto text-center mb-8">
            200アカウント以上で培った実証済みの勝ちパターンを実践型カリキュラム化。
          </p>
          <div className="bg-[#f7faf7] rounded-2xl px-6 md:px-8 py-6 md:py-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {LACADEMIA.map((s, i) => (
                <Reveal key={i} delay={i * 40}>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#06C755] mt-[7px] shrink-0" />
                    <div>
                      <h4 className="text-[14px] font-bold text-black mb-0.5">{s.title}</h4>
                      <p className="text-[12px] text-black/40 leading-[1.7]">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
              </div>
            </Reveal>
          </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   CTA BANNER
   ═══════════════════════════════════════════════════════════ */
const CTABanner = () => (
  <div className="relative">
    {/* Top chevron */}
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: "clamp(28px, 4vw, 56px)", marginBottom: -1 }}>
      <path d="M0,0 L720,60 L1440,0 L1440,0 L0,0 Z" fill="#fff" />
      <path d="M0,0 L720,60 L1440,0 L1440,60 L720,60 L0,60 Z" className="fill-[#06C755]" />
    </svg>
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #06C755 0%, #0bbf5e 50%, #06C755 100%)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-white rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-white rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4 animate-drift-x" />
              </div>
      <div className="absolute inset-0 dot-pattern-dark pointer-events-none opacity-15" />
      <div className="absolute top-[25%] left-[6%] w-2 h-2 rounded-full bg-white/20 pointer-events-none animate-float-a" />
      <div className="absolute bottom-[30%] right-[10%] w-2.5 h-2.5 rounded-full bg-white/15 pointer-events-none animate-float-b" />
      <div className="max-w-[600px] mx-auto px-5 md:px-8 py-10 md:py-14 text-center relative z-10">
        <Reveal>
          <p className="text-white text-[20px] md:text-[26px] font-black leading-[1.7] mb-5">
            LINEマーケティングの<br />戦略設計からアカウント構築<br />運用・分析まで
          </p>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 md:p-7 shadow-[0_8px_40px_rgba(0,0,0,.08)] mb-6">
            <p className="text-[14px] md:text-[15px] text-black/60 leading-[1.9] font-medium">実績豊富なコンサルタントがすべて代行します。<br />まずはお気軽にご相談ください。</p>
            </div>
          <a href="#contact" className="btn-ripple group inline-flex items-center gap-3 bg-white text-[#06C755] font-black rounded-full shadow-[0_4px_24px_rgba(255,255,255,.25)] hover:shadow-[0_8px_40px_rgba(255,255,255,.35)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 px-10 py-4.5 text-[16px] border-2 border-white/80">
            <img src="/line-icon.png" alt="" className="w-6 h-6 rounded-md" />
            ご相談・お問合せ（無料）
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          </Reveal>
      </div>
    </section>
    {/* Bottom chevron */}
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: "clamp(28px, 4vw, 56px)", marginTop: -1 }}>
      <path d="M0,0 L1440,0 L720,60 Z" className="fill-[#06C755]" />
      <path d="M0,60 L720,60 L1440,60 L1440,0 L720,60 L0,0 Z" fill="#e8f5e9" />
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   ACHIEVEMENTS — light green bg
   ═══════════════════════════════════════════════════════════ */
const Achievements = () => (
  <section id="results" className="relative bg-[#e8f5e9] pt-14 pb-16 md:pt-16 md:pb-20 overflow-hidden">
    <WaveSvg fill="#e8f5e9" />
    {/* Decorative */}
    <div className="absolute top-[8%] left-[-4%] w-[180px] md:w-[280px] aspect-square rounded-full bg-[#06C755]/[.06] blur-[50px] pointer-events-none animate-pulse-glow" />
    <div className="absolute bottom-[12%] right-[-6%] w-[150px] md:w-[220px] aspect-square rounded-full bg-[#06C755]/[.05] blur-[40px] pointer-events-none animate-drift-x" />
    <div className="absolute inset-0 dot-pattern pointer-events-none opacity-40" />
    <div className="max-w-[1000px] mx-auto px-5 md:px-8 relative z-10">
        <Reveal>
        <div className="flex flex-col items-center mb-8">
          <img src="/badge-200.png" alt="運用実績200社以上" className="h-[70px] md:h-[80px] w-auto mb-4" loading="lazy" />
          <SectionHead>成果事例</SectionHead>
        </div>
        </Reveal>
      <div className="space-y-6 mb-8">
        {CASES.map((c, i) => (
          <Reveal key={i} delay={i * 80} direction={i % 2 === 0 ? "left" : "right"}>
            <div className={`rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,.07)] overflow-hidden hover:shadow-[0_10px_40px_rgba(0,0,0,.12)] transition-all duration-500 flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
              {/* Screenshot */}
              <div className="md:w-[55%] shrink-0 bg-white flex items-center justify-center p-5 md:p-7">
                <img src={c.img} alt={c.name} className="w-full h-auto max-h-[300px] md:max-h-[340px] object-contain" loading="lazy" />
              </div>
              {/* Info */}
              <div className="p-6 md:p-8 flex flex-col justify-center flex-1 bg-[#f6f9f6]">
                <span className="text-[11px] font-bold text-[#06C755]/70 mb-3 block font-en tracking-[.15em] uppercase">CASE {c.num}</span>
                <h3 className="text-[19px] md:text-[22px] font-black text-black/85 mb-0.5 leading-tight">{c.name}</h3>
                <p className="text-[11px] text-black/35 font-medium mb-5">{c.cat}</p>

                {/* Metric highlight */}
                <div className="rounded-xl bg-white p-4 mb-4 border border-[#06C755]/10">
                  <span className="text-[9px] font-bold text-black/30 block mb-2 tracking-wider">{c.metric}</span>
                  <div className="flex items-baseline gap-2">
                    {c.before !== "—" && <><span className="text-[16px] font-bold text-black/20 line-through">{c.before}</span><ArrowRight size={14} className="text-[#06C755] relative top-[2px]" /></>}
                    <span className="text-[28px] md:text-[32px] font-black text-[#06C755] leading-none">{c.after}</span>
                  </div>
                </div>

                {c.challenge && (
                  <div className="mb-4 flex items-start gap-2">
                    <span className="text-[9px] font-bold text-black/25 shrink-0 mt-0.5">課題</span>
                    <p className="text-[12px] text-black/45 leading-[1.7]">{c.challenge}</p>
                  </div>
                )}
                <p className="text-[12px] text-black/50 leading-[1.8]">{c.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal><p className="text-[14px] font-bold text-black/30 mb-4 text-center">お客様の声</p></Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {VOICES.map((v, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="h-full">
              {/* Avatar + name */}
              <div className="flex items-center gap-3.5 mb-4">
                <img src={v.avatar} alt="" className="w-14 h-14 md:w-16 md:h-16 rounded-full shrink-0 shadow-[0_2px_8px_rgba(0,0,0,.08)] object-cover" />
                <div>
                  <p className="text-[13px] font-bold text-black/60 leading-tight">{v.role}</p>
                </div>
              </div>
              {/* Speech bubble */}
              <div className="relative bg-white rounded-2xl rounded-tl-sm p-5 md:p-6 shadow-[0_2px_16px_rgba(0,0,0,.05)] ml-4">
                <div className="absolute -top-2 left-5 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white" />
                <p className="text-[13px] text-black/55 leading-[1.9] mb-4">{v.quote}</p>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 size={13} className="text-[#06C755]" />
                  <span className="text-[10px] font-bold text-[#06C755]">導入後の成果</span>
                </div>
                <p className="text-[12px] text-black/50 leading-[1.8]">{v.result}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );

/* ═══════════════════════════════════════════════════════════
   STRENGTH — white bg
   ═══════════════════════════════════════════════════════════ */
const Strength = () => (
  <section className="py-14 md:py-20 bg-white relative overflow-hidden">
    <div className="absolute bottom-[-10%] right-[-8%] w-[30%] aspect-square rounded-full bg-[#06C755]/[.03] pointer-events-none animate-pulse-glow" />
    <div className="absolute top-[-5%] left-[-6%] w-[25%] aspect-square rounded-full bg-[#06C755]/[.04] pointer-events-none animate-drift-y" />
    <div className="absolute top-[25%] right-[3%] w-3 h-3 rounded-full bg-[#06C755]/15 pointer-events-none animate-float-a" />
    <div className="absolute bottom-[35%] left-[5%] w-2 h-2 rounded-full bg-[#06C755]/20 pointer-events-none animate-float-b" />
    <div className="absolute inset-0 dot-pattern-white pointer-events-none" />
    <div className="max-w-[1000px] mx-auto px-5 md:px-8 relative z-10">
        <Reveal>
        <SectionHead>VOYAGEが選ばれる理由</SectionHead>
        </Reveal>
      <div className="space-y-10 md:space-y-14">
        {STRENGTHS.map((s, i) => (
          <Reveal key={i} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
            <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-6 md:gap-10`}>
              <div className="w-full md:w-[45%] shrink-0">
                <img
                  src={s.img}
                  alt={s.ja}
                  className="w-full h-[200px] md:h-[240px] object-contain"
                  loading="lazy"
                  style={{
                    mask: "radial-gradient(ellipse at center, black 40%, transparent 72%)",
                    WebkitMask: "radial-gradient(ellipse at center, black 40%, transparent 72%)",
                  }}
                />
              </div>
              <div className={`flex-1 ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                <span className="text-[11px] font-bold text-[#06C755] tracking-widest font-en">STRENGTH {String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[20px] md:text-[24px] font-black text-black mb-3 mt-1">{s.ja}</h3>
                <p className="text-[14px] text-black/45 leading-[2]">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );

/* ═══════════════════════════════════════════════════════════
   FLOW — light green bg
   ═══════════════════════════════════════════════════════════ */
const Flow = () => {
  const [mode, setMode] = useState("recruit");
  const steps = mode === "recruit" ? FLOW_RECRUIT : FLOW_SALES;
  return (
    <section className="relative bg-[#e8f5e9] pt-14 pb-16 md:pt-16 md:pb-20 overflow-hidden">
      <WaveSvg fill="#e8f5e9" />
      <div className="absolute top-[10%] right-[-4%] w-[120px] md:w-[200px] aspect-square rounded-full bg-[#06C755]/[.06] blur-[40px] pointer-events-none animate-drift-y" />
      <div className="absolute bottom-[15%] left-[-6%] w-[100px] md:w-[160px] aspect-square rounded-full bg-[#06C755]/[.05] blur-[30px] pointer-events-none animate-drift-x" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-40" />
      <div className="max-w-[800px] mx-auto px-5 md:px-8 relative z-10">
        <Reveal>
          <SectionHead>運用開始までの流れ</SectionHead>
        </Reveal>
        {/* Toggle tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <button onClick={() => setMode("recruit")} className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all ${mode === "recruit" ? "bg-[#06C755] text-white shadow-[0_4px_16px_rgba(6,199,85,.3)]" : "bg-white/70 text-black/40 hover:bg-white"}`}>採用DX</button>
          <button onClick={() => setMode("sales")} className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all ${mode === "sales" ? "bg-[#06C755] text-white shadow-[0_4px_16px_rgba(6,199,85,.3)]" : "bg-white/70 text-black/40 hover:bg-white"}`}>集客DX</button>
        </div>
        <div className="space-y-0 relative">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-[1px]">
            <div className="w-full h-full bg-[#06C755]/15" />
          </div>
          {steps.map((s, i) => (
            <Reveal key={`${mode}-${i}`} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`flex items-start gap-5 relative pb-10 ${i % 2 === 0 ? "md:flex-row md:text-left" : "md:flex-row-reverse md:text-right"}`}>
                <div className="w-12 h-12 bg-[#06C755] text-white rounded-full flex items-center justify-center font-black text-[16px] shrink-0 relative z-10 shadow-[0_4px_16px_rgba(6,199,85,.3)] md:absolute md:left-1/2 md:-translate-x-1/2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className={`flex-1 bg-white rounded-2xl p-5 md:p-6 shadow-[0_2px_20px_rgba(0,0,0,.06)] relative ${i % 2 === 0 ? "md:mr-[calc(50%+32px)] md:ml-0" : "md:ml-[calc(50%+32px)] md:mr-0"}`}>
                  <div className={`hidden md:block absolute top-5 w-3 h-3 bg-white rotate-45 shadow-[2px_-2px_4px_rgba(0,0,0,.03)] ${i % 2 === 0 ? "-right-1.5" : "-left-1.5"}`} />
                  <p className="text-[11px] font-bold text-[#06C755] mb-1">{s.sub}</p>
                  <h3 className="text-[17px] font-bold text-black mb-2">{s.ja}</h3>
                  <p className="text-[13px] text-black/50 leading-[1.85]">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FAQ — white bg
   ═══════════════════════════════════════════════════════════ */
const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="py-14 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute top-[10%] right-[-5%] w-[20%] aspect-square rounded-full bg-[#06C755]/[.03] pointer-events-none animate-drift-y" />
      <div className="absolute bottom-[15%] left-[-4%] w-[15%] aspect-square rounded-full bg-[#06C755]/[.04] pointer-events-none animate-drift-x" />
      <div className="absolute inset-0 dot-pattern-white pointer-events-none" />
      <div className="max-w-[700px] mx-auto px-5 md:px-8 relative z-10">
        <Reveal>
          <SectionHead>よくあるご質問</SectionHead>
        </Reveal>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="bg-[#f7faf7] rounded-xl overflow-hidden">
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group">
                  <span className="text-[14px] font-bold text-black group-hover:text-[#06C755] transition-colors">{item.q}</span>
                  <ChevronDown className={`text-black/20 shrink-0 transition-transform duration-300 ${openIdx === i ? "rotate-180 !text-[#06C755]" : ""}`} size={16} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? "max-h-40 pb-4" : "max-h-0"}`}>
                  <p className="text-[13px] text-black/50 leading-[1.9] px-5">{item.a}</p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   CONTACT — green bg
   ═══════════════════════════════════════════════════════════ */
const Contact = () => (
  <section id="contact" className="relative bg-[#06C755] pt-14 pb-14 md:pt-16 md:pb-16 overflow-hidden">
    <WaveSvg fill="#06C755" />
    <div className="absolute inset-0 pointer-events-none opacity-10">
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-white rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-white rounded-full blur-[60px] -translate-y-1/4 translate-x-1/4 animate-drift-x" />
    </div>
    <div className="absolute inset-0 dot-pattern-dark pointer-events-none opacity-20" />
    {/* Floating small dots */}
    <div className="absolute top-[20%] left-[8%] w-2 h-2 rounded-full bg-white/20 pointer-events-none animate-float-a" />
    <div className="absolute bottom-[25%] right-[12%] w-3 h-3 rounded-full bg-white/15 pointer-events-none animate-float-b" />
    <div className="absolute top-[50%] right-[5%] w-2 h-2 rounded-full bg-white/10 pointer-events-none animate-drift-y" />
    <div className="max-w-[640px] mx-auto px-5 md:px-8 text-center relative z-10">
      <Reveal>
        <h2 className="text-[24px] md:text-[30px] font-black text-white mb-3 leading-[1.5]">
          <TextRevealChar text="まずはお気軽に" className="inline" />
          <br className="md:hidden" />
          <TextRevealChar text="ご相談ください" className="inline" delay={400} />
        </h2>
        <p className="text-white/60 text-[14px] leading-[1.9] mb-8 max-w-[440px] mx-auto">
          お客様の現状をお聞きし、最適なご提案をさせていただきます。
        </p>
      </Reveal>
      <Reveal delay={100}>
        <div className="bg-white rounded-2xl p-7 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,.10)]">
          <div className="w-14 h-14 bg-[#06C755] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <img src="/line-icon.png" alt="LINE" className="w-9 h-9 rounded-lg" />
    </div>
          <h3 className="text-[18px] md:text-[20px] font-black text-black mb-2">LINEでお問合せ</h3>
          <p className="text-black/40 text-[13px] leading-[1.8] mb-6 max-w-[340px] mx-auto">
            友だち追加後、無料相談のご予約が可能です。お気軽にご連絡ください。
          </p>
          <a href="#" className="inline-flex items-center gap-2 bg-[#06C755] text-white px-8 py-3.5 rounded-full text-[14px] font-bold shadow-[0_4px_20px_rgba(6,199,85,.25)] hover:shadow-[0_8px_32px_rgba(6,199,85,.35)] hover:-translate-y-0.5 transition-all">
            <MessageCircle size={16} /> お友だち追加する
          </a>
            </div>
        </Reveal>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */
const Footer = () => (
  <footer className="bg-black text-white pt-10 pb-6">
    <div className="max-w-[1200px] mx-auto px-5 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-6">
        <div>
          <img src="/logo-voyage-color.png" alt="VOYAGE" className="h-[36px] md:h-[44px] w-auto mb-4" />
          <p className="text-[11px] text-white/30 leading-[1.8]">株式会社VOYAGE<br />東京都港区芝二丁目2番12号 浜松町PREX</p>
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-3 text-[11px] text-white/30 font-semibold">
          <a href="#about" className="hover:text-white/60 transition-colors">会社概要</a>
          <a href="#service" className="hover:text-white/60 transition-colors">サービス</a>
          <a href="#works" className="hover:text-white/60 transition-colors">導入実績</a>
          <a href="#results" className="hover:text-white/60 transition-colors">成果事例</a>
          <a href="#" className="hover:text-white/60 transition-colors">プライバシーポリシー</a>
        </div>
      </div>
      <div className="border-t border-white/[.06] pt-6">
        <p className="text-center text-[10px] text-white/20">&copy; {new Date().getFullYear()} VOYAGE INC. / BACKSTAGE Group</p>
      </div>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="antialiased">
      <ScrollProgressBar />
      <Header />
      <main>
        <Hero />
        <ClientShowcase />
        <PainPoints />
        <ChevronDivider
          sub="そのお悩み、VOYAGEが"
          headline={<><img src="/line-icon.png" alt="LINE" className="inline-block w-8 h-8 md:w-10 md:h-10 rounded-lg align-middle mr-1 -mt-1" /><span className="text-[#fff] bg-[#06C755] px-2 py-0.5 rounded-lg inline-block">LINE</span>を使って<br />すべて<span className="underline decoration-white/40 decoration-4 underline-offset-4">解決</span>します。</>}
          body="多くの企業がLINEを「連絡ツール」としてしか活用できていません。VOYAGEは200社超の運用データに基づき、採用・集客の両面からLINEの持つ本来の力を引き出し、貴社の事業成長を加速させます。"
        />
        <MarketData />
        <YouTubeSection />
        <BackstageGroup />
        <Leadership />
        <Service />
        <CTABanner />
        <Achievements />
        <Strength />
        <Flow />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
