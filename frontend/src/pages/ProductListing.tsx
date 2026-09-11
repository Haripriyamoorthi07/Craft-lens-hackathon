import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { Languages, Copy, ArrowRight, Check } from 'lucide-react';

interface ProductListingProps {
  onNext: () => void;
}

type TabKey = 'bilingual' | 'en' | 'ta';

export const ProductListing: React.FC<ProductListingProps> = ({ onNext }) => {
  const { product } = useProduct();
  const [activeTab, setActiveTab] = useState<TabKey>('bilingual');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `${product.titleEnglish} / ${product.titleTamil}\n\n${product.descriptionEnglish}\n\n${product.descriptionTamil}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TABS: { key: TabKey; label: string }[] = [
    { key: 'bilingual', label: 'Bilingual (Tamil + English)' },
    { key: 'en',        label: 'English Only' },
    { key: 'ta',        label: 'தமிழ் மட்டும்' },
  ];

  const showEn = activeTab === 'bilingual' || activeTab === 'en';
  const showTa = activeTab === 'bilingual' || activeTab === 'ta';

  return (
    <div className="cl-container" style={{ padding: '40px 24px' }}>
      {/* Header */}
      <div className="mb-8">
        <span className="cl-section-label">Step 3 of 7</span>
        <h1 className="cl-h1 mt-1 flex items-center gap-3">
          <Languages className="w-7 h-7" style={{ color: 'var(--cl-terra)' }} />
          Bilingual Product Listing
        </h1>
        <p className="cl-body mt-1">
          Auto-generated listing in Tamil + English optimized for local buyers & e-commerce export.
        </p>
      </div>

      <div className="cl-card overflow-hidden">
        {/* Tab Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 24px',
            background: 'var(--cl-ivory)',
            borderBottom: '1px solid var(--cl-border)',
          }}
        >
          <div className="flex gap-2 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  transition: 'all 180ms ease',
                  background: activeTab === tab.key ? 'var(--cl-coffee)' : 'transparent',
                  color: activeTab === tab.key ? '#FFFFFF' : 'var(--cl-gray)',
                  border: activeTab === tab.key ? '1px solid var(--cl-coffee)' : '1px solid transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="cl-btn-ghost flex items-center gap-1.5"
            style={{ padding: '6px 12px', fontSize: '0.8125rem' }}
          >
            {copied
              ? <><Check className="w-3.5 h-3.5" style={{ color: 'var(--cl-success)' }} /> Copied!</>
              : <><Copy className="w-3.5 h-3.5" /> Copy Text</>
            }
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Title */}
          <div className="space-y-1">
            {showEn && (
              <h2 className="cl-h2">{product.titleEnglish}</h2>
            )}
            {showTa && (
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', fontWeight: 600, color: 'var(--cl-terra)' }}>
                {product.titleTamil}
              </h3>
            )}
          </div>

          {/* Category Badge */}
          {product.category && (
            <span className="cl-badge cl-badge-terra">{product.category}</span>
          )}

          {/* Descriptions Grid */}
          <div className={`grid grid-cols-1 ${showEn && showTa ? 'md:grid-cols-2' : ''} gap-6`}>
            {showEn && (
              <div className="cl-card p-5 space-y-2" style={{ background: 'var(--cl-ivory)' }}>
                <p className="cl-caption" style={{ color: 'var(--cl-terra)' }}>English Description</p>
                <p className="cl-body text-sm leading-relaxed">{product.descriptionEnglish}</p>
              </div>
            )}
            {showTa && (
              <div className="cl-card p-5 space-y-2" style={{ background: 'var(--cl-ivory)' }}>
                <p className="cl-caption" style={{ color: 'var(--cl-terra)' }}>தமிழ் விவரிப்பு</p>
                <p className="cl-body text-sm leading-relaxed">{product.descriptionTamil}</p>
              </div>
            )}
          </div>

          {/* Meta strip */}
          <div
            className="flex flex-wrap gap-4 pt-4 text-xs"
            style={{ borderTop: '1px solid var(--cl-border)', color: 'var(--cl-gray-mid)' }}
          >
            {product.material   && <span>🧱 {product.material}</span>}
            {product.dimensions && <span>📐 {product.dimensions}</span>}
            {product.origin     && <span>📍 {product.origin}</span>}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={onNext} className="cl-btn-primary" style={{ padding: '12px 26px', fontSize: '0.9375rem', background: 'var(--cl-terra)', borderColor: 'var(--cl-terra-dark)' }}>
          Recommend Fair Price <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
