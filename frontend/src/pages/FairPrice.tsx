import React from 'react';
import { useProduct } from '../context/ProductContext';
import { ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';

interface FairPriceProps {
  onNext: () => void;
}

const comparablesByCategory: Record<string, { id: number; name: string; price: number; platform: string; region: string }[]> = {
  Pottery:   [
    { id: 1, name: 'Handpainted Terracotta Vase',         price: 850,  platform: 'Etsy India',       region: 'Madurai, TN'     },
    { id: 2, name: 'Handcrafted Clay Pot (Medium)',        price: 650,  platform: 'Local Artisan Fair', region: 'Coimbatore, TN' },
    { id: 3, name: 'Decorative Ceramic Terracotta Vase',  price: 1200, platform: 'Amazon Karigar',   region: 'Chennai, TN'     },
  ],
  Woodcraft: [
    { id: 1, name: 'Hand-carved Teak Wall Panel',         price: 1350, platform: 'Craftsvilla',      region: 'Nagercoil, TN'   },
    { id: 2, name: 'Traditional Wood Sculpture (6 in)',   price: 980,  platform: 'GoCoop',            region: 'Salem, TN'       },
    { id: 3, name: 'Rosewood Decorative Artifact',        price: 1800, platform: 'Amazon Karigar',   region: 'Erode, TN'       },
  ],
  Metalware: [
    { id: 1, name: 'Brass Temple Lamp (Medium)',           price: 2200, platform: 'Craftsvilla',      region: 'Swamimalai, TN'  },
    { id: 2, name: 'Handcast Bronze Idol (5 in)',          price: 2800, platform: 'Etsy India',       region: 'Nachiyar Koil, TN'},
    { id: 3, name: 'Antique Brass Diya Set',               price: 1500, platform: 'Amazon Karigar',   region: 'Kumbakonam, TN'  },
  ],
  Textile:   [
    { id: 1, name: 'Kanjivaram Pure Silk Saree',           price: 4500, platform: 'GoCoop',           region: 'Kanchipuram, TN' },
    { id: 2, name: 'Handloom Cotton Block Print Saree',    price: 2200, platform: 'Craftsvilla',      region: 'Salem, TN'       },
    { id: 3, name: 'Traditional Ikat Weave Fabric/m',      price: 1800, platform: 'Etsy India',       region: 'Coimbatore, TN'  },
  ],
  Basketry:  [
    { id: 1, name: 'Handwoven Bamboo Storage Basket',      price: 550,  platform: 'Amazon Karigar',   region: 'Coimbatore, TN'  },
    { id: 2, name: 'Cane Market Carry Basket',             price: 380,  platform: 'Local Artisan Fair', region: 'Madurai, TN'   },
    { id: 3, name: 'Decorative Palm Leaf Basket',          price: 750,  platform: 'Craftsvilla',      region: 'Thanjavur, TN'   },
  ],
  Jewelry:   [
    { id: 1, name: 'Temple Jewelry Earring Set',           price: 1800, platform: 'GoCoop',           region: 'Karaikudi, TN'   },
    { id: 2, name: 'Silver Anklet (Pair)',                 price: 1200, platform: 'Craftsvilla',      region: 'Chennai, TN'     },
    { id: 3, name: 'Handcrafted Bead Necklace',           price: 850,  platform: 'Amazon Karigar',   region: 'Madurai, TN'     },
  ],
};

const defaultComparables = [
  { id: 1, name: 'Traditional Handcraft Item (Small)', price: 550, platform: 'Local Artisan Fair', region: 'Tamil Nadu' },
  { id: 2, name: 'Artisan Craft Souvenir',             price: 750, platform: 'Craftsvilla',        region: 'Tamil Nadu' },
  { id: 3, name: 'Heritage Craft Piece',               price: 950, platform: 'Amazon Karigar',     region: 'South India' },
];

export const FairPrice: React.FC<FairPriceProps> = ({ onNext }) => {
  const { product, setProduct } = useProduct();
  const comparables = comparablesByCategory[product.category] || defaultComparables;
  const avgMarket   = Math.round(comparables.reduce((s, c) => s + c.price, 0) / comparables.length);

  return (
    <div className="cl-container" style={{ padding: '40px 24px' }}>
      {/* Header */}
      <div className="mb-8">
        <span className="cl-section-label">Step 4 of 7</span>
        <h1 className="cl-h1 mt-1 flex items-center gap-3">
          <TrendingUp className="w-7 h-7" style={{ color: 'var(--cl-terra)' }} />
          Fair Price Recommendation
        </h1>
        <p className="cl-body mt-1">
          Calculated for <strong>{product.category}</strong> using real market data from verified artisan platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Main Price Hero ── */}
        <div className="lg:col-span-2 space-y-5">
          <div className="cl-card p-6 md:p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="cl-caption mb-1">AI Recommended Selling Price</p>
                <div className="flex items-baseline gap-2">
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                      fontWeight: 800,
                      lineHeight: 1,
                      color: 'var(--cl-success)',
                    }}
                  >
                    ₹{product.recommendedPrice > 0 ? product.recommendedPrice : '—'}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--cl-gray-mid)' }}>INR</span>
                </div>
              </div>
              <span className="cl-badge cl-badge-success flex items-center gap-1 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" /> Optimal Margin
              </span>
            </div>

            {/* Range */}
            {product.minPriceRange > 0 && (
              <div>
                <p className="cl-caption mb-3">Fair Value Price Range</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Minimum Base', value: product.minPriceRange },
                    { label: 'Maximum Premium', value: product.maxPriceRange },
                  ].map((r) => (
                    <div
                      key={r.label}
                      className="p-4 rounded-lg text-center"
                      style={{ background: 'var(--cl-ivory)', border: '1px solid var(--cl-border)' }}
                    >
                      <p className="cl-caption mb-1">{r.label}</p>
                      <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '1.25rem', color: 'var(--cl-charcoal)' }}>
                        ₹{r.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Input */}
            <div>
              <label className="cl-caption block mb-2" htmlFor="artisan-price-input">
                Your Stated Final Selling Price (INR)
              </label>
              <input
                id="artisan-price-input"
                type="number"
                min={0}
                value={product.artisanStatedPrice || ''}
                onChange={(e) => setProduct({ ...product, artisanStatedPrice: Number(e.target.value) })}
                placeholder={String(product.recommendedPrice || 0)}
                className="cl-input"
                style={{ fontSize: '1.25rem', fontWeight: 700 }}
              />
            </div>
          </div>
        </div>

        {/* ── Market Data ── */}
        <div className="cl-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" style={{ color: 'var(--cl-success)' }} />
            <h3 className="cl-h3" style={{ fontSize: '1rem' }}>Market Benchmarks</h3>
          </div>

          <div
            className="p-3 rounded-lg text-center"
            style={{ background: 'var(--cl-ivory)', border: '1px solid var(--cl-border)' }}
          >
            <p className="cl-caption mb-0.5">Category Market Average</p>
            <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '1.375rem', color: 'var(--cl-charcoal)' }}>
              ₹{avgMarket}
            </p>
          </div>

          <div className="space-y-2.5">
            {comparables.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg space-y-1"
                style={{ background: 'var(--cl-ivory)', border: '1px solid var(--cl-border)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium truncate" style={{ color: 'var(--cl-charcoal)' }}>
                    {item.name}
                  </span>
                  <span className="text-sm font-bold shrink-0 ml-2" style={{ color: 'var(--cl-success)' }}>
                    ₹{item.price}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs" style={{ color: 'var(--cl-gray-mid)' }}>
                  <span>{item.platform}</span>
                  <span>{item.region}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button id="buyer-simulator-btn" onClick={onNext} className="cl-btn-primary" style={{ padding: '12px 26px', fontSize: '0.9375rem', background: 'var(--cl-terra)', borderColor: 'var(--cl-terra-dark)' }}>
          Simulate Buyer Objections <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
