import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, ArrowLeft } from 'lucide-react';

const CONTACT_EMAIL = "info@voyage-inc.co.jp";

export default function ContactForm() {
  const [form, setForm] = useState({ company: "", name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`【VOYAGE】お問い合わせ - ${form.company || form.name || "お問い合わせ"}`);
    const body = encodeURIComponent(
      `以下の内容でお問い合わせいただきました。\n\n` +
      `会社名：${form.company}\n` +
      `お名前：${form.name}\n` +
      `メール：${form.email}\n` +
      `電話：${form.phone}\n\n` +
      `お問い合わせ内容：\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="antialiased min-h-screen bg-[#f8f9f8]">
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-[720px] mx-auto px-5 md:px-8 h-14 flex items-center">
          <Link to="/#contact" className="inline-flex items-center gap-2 text-[13px] font-semibold text-black/60 hover:text-black transition-colors">
            <ArrowLeft size={16} /> トップへ戻る
          </Link>
        </div>
      </header>
      <main className="max-w-[520px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <h1 className="text-[22px] md:text-[28px] font-bold text-black mb-2">メールでお問い合わせ</h1>
        <p className="text-[14px] text-black/50 mb-8">フォーム送信後、メールソフトが起動します。</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,.06)] space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-black/60 mb-1.5">会社名</label>
            <input type="text" placeholder="株式会社〇〇" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f8f9f8] text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#00BFA5]/30 focus:border-[#00BFA5]/50 transition-all" />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-black/60 mb-1.5">お名前 <span className="text-[#00BFA5]">*</span></label>
            <input type="text" placeholder="山田 太郎" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f8f9f8] text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#00BFA5]/30 focus:border-[#00BFA5]/50 transition-all" />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-black/60 mb-1.5">メールアドレス <span className="text-[#00BFA5]">*</span></label>
            <input type="email" placeholder="example@company.co.jp" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f8f9f8] text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#00BFA5]/30 focus:border-[#00BFA5]/50 transition-all" />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-black/60 mb-1.5">電話番号（任意）</label>
            <input type="tel" placeholder="03-1234-5678" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f8f9f8] text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#00BFA5]/30 focus:border-[#00BFA5]/50 transition-all" />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-black/60 mb-1.5">お問い合わせ内容 <span className="text-[#00BFA5]">*</span></label>
            <textarea placeholder="お聞きしたい内容をご記入ください" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} required rows={5} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f8f9f8] text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#00BFA5]/30 focus:border-[#00BFA5]/50 transition-all resize-none" />
          </div>
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-[#00BFA5] text-white px-6 py-4 rounded-full text-[15px] font-bold shadow-[0_4px_20px_rgba(0,191,165,.25)] hover:shadow-[0_8px_32px_rgba(0,191,165,.35)] hover:-translate-y-0.5 transition-all mt-6">
            <Send size={18} /> 送信する
          </button>
        </form>
      </main>
    </div>
  );
}
