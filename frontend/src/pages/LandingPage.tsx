import React from 'react';
import { ArrowRight, Upload, Sparkles, BarChart2, ShoppingBag, Mic, Award, ChevronDown } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const HOW_IT_WORKS = [
  { num: '01', icon: Upload,      title: 'Upload Photo',         desc: 'Capture or upload a clear photo of your handmade product.' },
  { num: '02', icon: Sparkles,    title: 'AI Analysis',          desc: 'CraftLens detects material, craftsmanship & key visual features.' },
  { num: '03', icon: ShoppingBag, title: 'Bilingual Story',      desc: 'Auto-generate compelling listings in Tamil & English for global reach.' },
  { num: '04', icon: BarChart2,   title: 'Fair Market Pricing',  desc: 'Get data-backed price recommendations from verified artisan sales.' },
];

const FEATURES = [
  {
    icon: Mic,
    title: 'Tamil Voice Input',
    desc: 'Speak freely in Tamil. AI extracts factual specifications without hallucination.',
    color: 'var(--cl-terra)',
    bg: 'var(--cl-terra-pale)',
  },
  {
    icon: BarChart2,
    title: 'Data-Backed Fair Pricing',
    desc: 'Marketplace pricing insights built from actual South Indian artisan benchmarks.',
    color: 'var(--cl-success)',
    bg: 'var(--cl-success-bg)',
  },
  {
    icon: Award,
    title: 'AI Sell Coach',
    desc: 'Simulate buyer questions, optimize quality scores, and publish ready-to-sell listings.',
    color: 'var(--cl-terra-light)',
    bg: 'var(--cl-cream)',
  },
];

const CRAFT_TAGS = ['Terracotta & Pottery', 'Woodcarving', 'Brass & Bronze', 'Handloom Textiles', 'Palm Basketry', 'Stone Craft'];

export const LandingPage: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div style={{ background: 'var(--cl-ivory)', minHeight: '100vh' }}>
      {/* ════════════════════════════════
          HERO — Sleek Modern Dark Section
      ════════════════════════════════ */}
      <section
        style={{
          background: 'var(--cl-espresso)',
          paddingTop: 88,
          paddingBottom: 80,
          borderBottom: '1px solid var(--cl-border)',
        }}
      >
        <div className="cl-container text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span
              className="cl-badge"
              style={{
                background: 'var(--cl-terra-pale)',
                color: 'var(--cl-terra-light)',
                border: '1px solid rgba(200,109,57,0.35)',
                padding: '5px 14px',
                borderRadius: 20,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Digital Selling Assistant for Artisans
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: '#FFFFFF',
              letterSpacing: '-0.015em',
              maxWidth: 820,
              margin: '0 auto 16px',
            }}
          >
            Empowering Artisans with <span style={{ color: 'var(--cl-terra-light)' }}>AI Intelligence</span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              maxWidth: 620,
              margin: '0 auto 32px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.0625rem',
              color: 'var(--cl-gray-mid)',
              lineHeight: 1.7,
            }}
          >
            CraftLens analyzes handcrafted products from a single photo, uncovers their unique story, generates bilingual listings, and calculates fair market prices.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStart}
              className="cl-btn-primary"
              style={{ padding: '13px 30px', fontSize: '1rem' }}
            >
              Analyze Your Craft
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#how-it-works"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '0.9375rem',
                borderRadius: 8,
                color: 'var(--cl-gray)',
                border: '1px solid var(--cl-border)',
                textDecoration: 'none',
                transition: 'all 180ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--cl-gray-mid)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--cl-gray)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--cl-border)'; }}
            >
              Learn More <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Craft Categories Pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {CRAFT_TAGS.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '5px 14px',
                  borderRadius: 6,
                  background: 'var(--cl-white)',
                  border: '1px solid var(--cl-border)',
                  color: 'var(--cl-gray-mid)',
                  fontSize: '0.8125rem',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          HOW IT WORKS — Clean Professional Grid
      ════════════════════════════════ */}
      <section id="how-it-works" style={{ padding: '80px 0', background: 'var(--cl-ivory)', borderBottom: '1px solid var(--cl-border)' }}>
        <div className="cl-container">
          <div className="text-center mb-14">
            <span className="cl-section-label">Seamless Workflow</span>
            <h2 className="cl-h2 mt-2">Designed specifically for craft creators</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="cl-card p-6 flex flex-col justify-between" style={{ background: 'var(--cl-white)' }}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'var(--cl-terra-pale)', border: '1px solid rgba(200,109,57,0.3)' }}
                    >
                      <step.icon className="w-5 h-5" style={{ color: 'var(--cl-terra-light)' }} />
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--cl-gray-mid)' }}>
                      STEP {step.num}
                    </span>
                  </div>
                  <h3 className="cl-h3 mb-2">{step.title}</h3>
                  <p className="cl-body text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          KEY FEATURES
      ════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: 'var(--cl-ivory)' }}>
        <div className="cl-container">
          <div className="text-center mb-14">
            <span className="cl-section-label">Core Capabilities</span>
            <h2 className="cl-h2 mt-2">Tools to market & price your craft with confidence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <div key={i} className="cl-card p-7 space-y-4" style={{ background: 'var(--cl-white)' }}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: feat.bg }}
                >
                  <feat.icon className="w-6 h-6" style={{ color: feat.color }} />
                </div>
                <div>
                  <h3 className="cl-h3 mb-2">{feat.title}</h3>
                  <p className="cl-body text-sm">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CALL TO ACTION
      ════════════════════════════════ */}
      <section style={{ padding: '64px 0 80px', background: 'var(--cl-ivory)' }}>
        <div className="cl-container">
          <div
            className="cl-card p-10 md:p-12 text-center"
            style={{
              background: 'var(--cl-white)',
              borderColor: 'var(--cl-border)',
              color: '#FFFFFF',
              boxShadow: 'var(--cl-shadow-md)',
            }}
          >
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                maxWidth: 600,
                margin: '0 auto 16px',
              }}
            >
              Start analyzing your craft products today
            </h2>
            <p style={{ color: 'var(--cl-gray-mid)', maxWidth: 480, margin: '0 auto 28px', fontFamily: 'Inter', fontSize: '0.9375rem' }}>
              Transform product photos into marketplace listings with intelligent pricing suggestions.
            </p>
            <button
              onClick={onStart}
              className="cl-btn-primary"
              style={{ padding: '13px 32px', fontSize: '1rem' }}
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
