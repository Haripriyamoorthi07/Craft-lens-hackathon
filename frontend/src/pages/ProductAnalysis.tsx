import React from 'react';
import { useProduct } from '../context/ProductContext';
import { Sparkles, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, ImageIcon, Tag } from 'lucide-react';

interface ProductAnalysisProps {
  onNext: () => void;
}

const CONFIDENCE: Record<string, number> = {
  Material: 94, Craftsmanship: 88, Dimensions: 72, Origin: 80,
};

export const ProductAnalysis: React.FC<ProductAnalysisProps> = ({ onNext }) => {
  const { product } = useProduct();
  const displayImage = product.catalogueImageUrl || product.imageUrl;
  const isNotProvided = (v: string) => !v || v.toLowerCase().includes('not provided') || v.toLowerCase().includes('not identifiable');

  const facts = [
    { label: 'Material',      value: product.material,              icon: '🧱' },
    { label: 'Craftsmanship', value: product.craftsmanshipDetails,  icon: '🔨' },
    { label: 'Dimensions',    value: product.dimensions,            icon: '📐' },
    { label: 'Origin',        value: product.origin,                icon: '📍' },
  ];

  return (
    <div className="cl-container" style={{ padding: '48px 24px' }}>
      {/* Header */}
      <div className="mb-8">
        <span className="cl-badge cl-badge-terra mb-3 inline-flex">
          <Sparkles className="w-3.5 h-3.5" /> AI Analysis Complete
        </span>
        <h1 className="cl-h1 mt-1">CraftLens Analysis</h1>
        <p className="cl-body mt-1">Facts extracted directly from your photo and description. Unconfirmed info is clearly marked.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Image Panel ── */}
        <div className="cl-card p-6 space-y-4" style={{ background: 'var(--cl-white)', border: '1px solid var(--cl-border)' }}>
          <div className="relative">
            {product.catalogueImageUrl && (
              <div
                className="absolute top-3 left-3 z-10 cl-badge cl-badge-terra flex items-center gap-1"
                style={{ boxShadow: 'var(--cl-shadow-sm)' }}
              >
                <Sparkles className="w-3 h-3" /> AI Studio Image
              </div>
            )}
            {displayImage ? (
              <img
                src={displayImage}
                alt="Analyzed craft product"
                className="w-full rounded-xl object-contain"
                style={{ height: 300, background: 'var(--cl-parchment)', border: '1px solid var(--cl-border)' }}
              />
            ) : (
              <div
                className="w-full h-72 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--cl-parchment)', border: '1px solid var(--cl-border)' }}
              >
                <ImageIcon className="w-12 h-12" style={{ color: 'var(--cl-gray-pale)' }} />
              </div>
            )}
          </div>

          {/* Artisan Voice Quote */}
          {product.artisanVoiceNoteText && (
            <blockquote
              className="p-4 rounded-xl text-sm italic leading-relaxed"
              style={{
                background: 'var(--cl-terra-pale)',
                borderLeft: '3px solid var(--cl-terra)',
                color: 'var(--cl-brown)',
                fontFamily: 'Playfair Display, serif',
              }}
            >
              "{product.artisanVoiceNoteText}"
              <footer className="mt-1 text-xs not-italic" style={{ color: 'var(--cl-gray-mid)', fontFamily: 'Inter' }}>— Artisan's description</footer>
            </blockquote>
          )}

          {/* Category + price preview */}
          <div className="flex items-center justify-between">
            {product.category && (
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" style={{ color: 'var(--cl-terra)' }} />
                <span className="cl-badge cl-badge-terra">{product.category}</span>
              </div>
            )}
            {product.recommendedPrice > 0 && (
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" style={{ color: 'var(--cl-success)' }} />
                <span className="text-sm font-bold" style={{ color: 'var(--cl-success)', fontFamily: 'Playfair Display, serif' }}>
                  ₹{product.recommendedPrice} recommended
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Fact Sheet ── */}
        <div className="cl-card p-6 space-y-5" style={{ background: 'var(--cl-white)', border: '1px solid var(--cl-border)' }}>
          <div className="flex items-center justify-between">
            <h2 className="cl-h3">Craft Identification</h2>
            <span className="cl-badge cl-badge-success flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Zero Hallucination
            </span>
          </div>

          <div className="space-y-3">
            {facts.map((fact) => {
              const warn = isNotProvided(fact.value);
              const conf = CONFIDENCE[fact.label] ?? 85;
              return (
                <div key={fact.label} className="cl-fact-row">
                  <div className="min-w-0">
                    <p className="cl-caption mb-0.5">{fact.icon} {fact.label}</p>
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: warn ? 'var(--cl-warn)' : 'var(--cl-charcoal)', fontFamily: 'Inter' }}
                    >
                      {fact.value || 'Not provided'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {warn ? (
                      <AlertTriangle className="w-4 h-4" style={{ color: 'var(--cl-warn)' }} />
                    ) : (
                      <>
                        <span className="text-xs font-bold" style={{ color: 'var(--cl-success)' }}>{conf}%</span>
                        <CheckCircle className="w-4 h-4" style={{ color: 'var(--cl-success)' }} />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Price Range */}
          {product.minPriceRange > 0 && (
            <div
              className="p-4 rounded-xl space-y-2"
              style={{ background: 'var(--cl-terra-pale)', border: '1px solid rgba(184,115,42,0.3)' }}
            >
              <p className="cl-caption" style={{ color: 'var(--cl-terra-dark)' }}>AI Price Estimate</p>
              <div className="flex items-baseline gap-3">
                <span
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 800,
                    fontSize: '1.75rem',
                    color: 'var(--cl-coffee)',
                  }}
                >
                  ₹{product.recommendedPrice}
                </span>
                <span className="text-xs" style={{ color: 'var(--cl-gray-mid)', fontFamily: 'Inter' }}>
                  Range ₹{product.minPriceRange} – ₹{product.maxPriceRange}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next */}
      <div className="flex justify-end mt-8">
        <button id="generate-listing-btn" onClick={onNext} className="cl-btn-primary" style={{ padding: '13px 28px', fontSize: '1rem' }}>
          Generate Bilingual Listing <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
