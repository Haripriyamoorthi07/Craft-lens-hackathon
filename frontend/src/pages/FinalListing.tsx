import React from 'react';
import { useProduct } from '../context/ProductContext';
import { CheckCircle, Share2, RefreshCw, ShoppingCart, ShieldCheck, Tag, Ruler, MapPin, Layers } from 'lucide-react';

interface FinalListingProps {
  onRestart: () => void;
}

export const FinalListing: React.FC<FinalListingProps> = ({ onRestart }) => {
  const { product } = useProduct();

  const handleShare = () => {
    const text = `${product.titleEnglish}\n${product.titleTamil}\n\n${product.descriptionEnglish}\n\n₹${product.artisanStatedPrice || product.recommendedPrice}`;
    if (navigator.share) {
      navigator.share({ title: product.titleEnglish, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const details = [
    { icon: Tag,    label: 'Material',      value: product.material             },
    { icon: Ruler,  label: 'Dimensions',    value: product.dimensions           },
    { icon: Layers, label: 'Craftsmanship', value: product.craftsmanshipDetails },
    { icon: MapPin, label: 'Origin',        value: product.origin               },
  ].filter((d) => d.value && !d.value.toLowerCase().includes('not provided'));

  return (
    <div className="cl-container" style={{ padding: '40px 24px' }}>
      {/* Success banner */}
      <div className="text-center mb-8">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ background: 'var(--cl-success-bg)', border: '1px solid rgba(42,111,66,0.3)' }}
        >
          <CheckCircle className="w-6 h-6" style={{ color: 'var(--cl-success)' }} />
        </div>
        <h1 className="cl-h1">Marketplace Ready Listing</h1>
        <p className="cl-body mt-1" style={{ maxWidth: 480, margin: '6px auto 0' }}>
          Verified and priced for immediate publishing on e-commerce platforms.
        </p>
      </div>

      {/* Main card */}
      <div className="cl-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div style={{ background: 'var(--cl-ivory)', minHeight: 320, display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
            {product.imageUrl ? (
              <img
                src={product.catalogueImageUrl || product.imageUrl}
                alt="Final craft product"
                style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: 420 }}
              />
            ) : (
              <div className="w-full h-72 flex items-center justify-center">
                <Layers className="w-12 h-12" style={{ color: 'var(--cl-gray-light)' }} />
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="p-6 md:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              {product.category && <span className="cl-badge cl-badge-terra">{product.category}</span>}

              <div>
                <h2 className="cl-h2">{product.titleEnglish}</h2>
                <h3 className="text-base font-semibold mt-1" style={{ color: 'var(--cl-terra)' }}>{product.titleTamil}</h3>
              </div>

              {/* Price Tag */}
              <div
                className="flex items-center gap-3 py-3 px-4 rounded-lg"
                style={{ background: 'var(--cl-success-bg)', border: '1px solid rgba(42,111,66,0.2)' }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 800,
                    fontSize: '1.75rem',
                    color: 'var(--cl-success)',
                    lineHeight: 1,
                  }}
                >
                  ₹{product.artisanStatedPrice || product.recommendedPrice}
                </span>
                <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--cl-success)' }}>
                  <ShieldCheck className="w-4 h-4" /> Fair Price Verified
                </div>
              </div>
            </div>

            {/* Spec metadata */}
            {details.length > 0 && (
              <div className="space-y-2 text-sm">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-2">
                    <d.icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--cl-terra)' }} />
                    <span style={{ color: 'var(--cl-gray)' }}>
                      <strong style={{ color: 'var(--cl-charcoal)' }}>{d.label}:</strong> {d.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                className="cl-btn-primary flex-1 justify-center"
                style={{ background: 'var(--cl-coffee)', borderColor: 'var(--cl-walnut)' }}
              >
                <ShoppingCart className="w-4 h-4" /> Buy Now (Demo)
              </button>
              <button onClick={handleShare} className="cl-btn-secondary">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Descriptions footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t" style={{ borderColor: 'var(--cl-border)' }}>
          <div className="p-6 space-y-1.5" style={{ borderRight: '1px solid var(--cl-border)' }}>
            <p className="cl-caption" style={{ color: 'var(--cl-terra)' }}>English Listing</p>
            <p className="cl-body text-sm leading-relaxed">{product.descriptionEnglish}</p>
          </div>
          <div className="p-6 space-y-1.5">
            <p className="cl-caption" style={{ color: 'var(--cl-terra)' }}>தமிழ் பட்டியல்</p>
            <p className="cl-body text-sm leading-relaxed">{product.descriptionTamil}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button onClick={onRestart} className="cl-btn-secondary flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Analyze Another Craft
        </button>
      </div>
    </div>
  );
};
