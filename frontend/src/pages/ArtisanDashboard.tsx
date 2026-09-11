import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { PlusCircle, Package, TrendingUp, Star, FileText, Tag, MessageSquare, Share2, Sparkles, Check } from 'lucide-react';

interface DashboardProps {
  onAddProduct: () => void;
  onViewProduct?: () => void;
}

const STATS = [
  { icon: Package,    label: 'Active Listings',      value: '1',      color: 'var(--cl-terra)',   bg: 'var(--cl-terra-pale)' },
  { icon: TrendingUp, label: 'Fair Price Accuracy',  value: '96%',    color: 'var(--cl-success)', bg: 'var(--cl-success-bg)' },
  { icon: Star,       label: 'Avg Sell Coach Score', value: '84/100', color: 'var(--cl-warn)',    bg: 'var(--cl-warn-bg)' },
];

export const ArtisanDashboard: React.FC<DashboardProps> = ({ onAddProduct }) => {
  const { product, setCurrentStep } = useProduct();
  const [copied, setCopied] = useState(false);

  const item = {
    titleEn: product.titleEnglish || 'Handpainted Terracotta Clay Vase',
    titleTa: product.titleTamil   || 'கைவினை களிமண் பானை',
    price:    product.recommendedPrice || product.artisanStatedPrice || 850,
    category: product.category || 'Pottery',
    score:    product.coachScore || 78,
    image:    product.imageUrl || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=200&q=80',
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${item.titleEn} - ₹${item.price}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cl-container" style={{ padding: '40px 24px' }}>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="cl-section-label">Artisan Dashboard</span>
          <h1 className="cl-h1 mt-1">My Craft Listings</h1>
        </div>
        <button
          onClick={onAddProduct}
          className="cl-btn-primary shrink-0"
          style={{ background: 'var(--cl-terra)', borderColor: 'var(--cl-terra-dark)' }}
        >
          <PlusCircle className="w-4 h-4" /> Add New Craft
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="cl-card p-5 flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: s.bg }}
            >
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <div>
              <p className="cl-caption">{s.label}</p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.375rem',
                  fontWeight: 700,
                  marginTop: 2,
                  color: 'var(--cl-charcoal)',
                }}
              >
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className="cl-ornament-divider mb-6">
        <span className="cl-section-label">Recent Products</span>
      </div>

      {/* ── Product Card ── */}
      <div className="cl-card overflow-hidden">
        <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Image */}
          <div
            className="shrink-0"
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
              overflow: 'hidden',
              border: '1px solid var(--cl-border)',
            }}
          >
            <img
              src={item.image}
              alt={item.titleEn}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="cl-h3" style={{ fontSize: '1.125rem' }}>{item.titleEn}</h3>
              <span className="cl-badge cl-badge-success">Live Listing</span>
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: '0.875rem', color: 'var(--cl-terra)', marginBottom: 8 }}>
              {item.titleTa}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: 'var(--cl-charcoal)',
                }}
              >
                ₹{item.price}
              </span>
              <span className="cl-badge cl-badge-neutral">{item.category}</span>
              <span className="cl-badge cl-badge-terra">
                Coach Score: {item.score}/100
              </span>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div
          style={{
            padding: '12px 24px',
            borderTop: '1px solid var(--cl-border)',
            background: 'var(--cl-ivory)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => setCurrentStep(5)}
            className="cl-btn-secondary"
            style={{ padding: '7px 14px', fontSize: '0.8125rem' }}
          >
            <FileText className="w-3.5 h-3.5" style={{ color: 'var(--cl-terra)' }} /> Listing
          </button>
          <button
            onClick={() => setCurrentStep(6)}
            className="cl-btn-secondary"
            style={{ padding: '7px 14px', fontSize: '0.8125rem' }}
          >
            <Tag className="w-3.5 h-3.5" style={{ color: 'var(--cl-success)' }} /> Fair Price
          </button>
          <button
            onClick={() => setCurrentStep(7)}
            className="cl-btn-secondary"
            style={{ padding: '7px 14px', fontSize: '0.8125rem' }}
          >
            <MessageSquare className="w-3.5 h-3.5" style={{ color: 'var(--cl-warn)' }} /> Buyer Q&A
          </button>
          <button
            onClick={() => setCurrentStep(8)}
            className="cl-btn-secondary"
            style={{ padding: '7px 14px', fontSize: '0.8125rem' }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--cl-terra)' }} /> AI Coach
          </button>
          <div style={{ flex: 1 }} />
          <button
            onClick={handleShare}
            className="cl-btn-ghost"
            style={{ padding: '7px 14px', fontSize: '0.8125rem' }}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>
      </div>
    </div>
  );
};
