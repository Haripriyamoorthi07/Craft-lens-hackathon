import React from 'react';
import { useProduct } from '../context/ProductContext';
import { MessageSquare, User, Bot, ArrowRight } from 'lucide-react';

interface BuyerSimulatorProps {
  onNext: () => void;
}

function getSimulations(category: string, material: string, titleEn: string) {
  const cat  = category?.toLowerCase() || '';
  const mat  = material?.toLowerCase() || '';
  const name = titleEn || 'this handcrafted item';

  if (cat.includes('pottery') || cat.includes('terracotta') || mat.includes('clay')) return [
    {
      id: 1, type: 'Durability',
      qEn: `Is ${name} fragile? How will it survive courier shipping?`,
      qTa: `இந்தப் பானை உடையக்கூடியதா? கூரியரில் பாதுகாப்பாக வருமா?`,
      aEn: 'We double-wrap each item in shock-absorbing foam inside a reinforced corrugated box with FRAGILE labels. Zero-breakage guarantee — replaced free of cost if damaged in transit.',
      aTa: 'ஒவ்வொரு பொருளும் அதிர்வு தாங்கும் ஃபோம் மற்றும் வலுவான பெட்டியில் பேக் செய்யப்படுகிறது. போக்குவரத்தில் உடைந்தால் இலவசமாக மாற்றிக் கொடுக்கிறோம்.'
    },
    {
      id: 2, type: 'Authenticity',
      qEn: `Is ${name} 100% handmade natural clay, or factory-made?`,
      qTa: 'இது 100% இயற்கை களிமண்ணா? மெஷினில் செய்யப்பட்டதா?',
      aEn: `100% handcrafted from natural ${mat || 'clay'}. No chemicals or synthetic glazes. Each piece is unique — natural imperfections confirm it's genuinely handmade.`,
      aTa: `இது 100% இயற்கையான ${mat || 'களிமண்'} கொண்டு கைகளால் செய்யப்பட்டது. ஒவ்வொரு பொருளும் தனித்துவமானது.`
    },
  ];

  if (cat.includes('wood') || mat.includes('wood') || mat.includes('teak')) return [
    {
      id: 1, type: 'Wood Quality',
      qEn: `Is ${name} solid wood or plywood with veneer?`,
      qTa: 'இது திடமான மரத்தில் செய்யப்பட்டதா அல்லது ஒட்டு மரமா?',
      aEn: `100% solid ${mat || 'natural wood'} — no MDF or plywood. Natural wood grain visible in every carving. Authenticity certificate provided on request.`,
      aTa: `இது 100% திடமான ${mat || 'இயற்கை மரம்'} — ஒட்டு மரம் அல்ல.`
    },
    {
      id: 2, type: 'Maintenance',
      qEn: 'Will this wood crack in humid/AC environments? How do I maintain it?',
      qTa: 'ஈரப்பதமான சூழலில் இந்த மரம் வெடிக்குமா?',
      aEn: 'Treated with natural oil polish for humidity protection. Wipe with a dry cloth. Apply coconut/linseed oil every 6 months to preserve the natural sheen.',
      aTa: 'இயற்கை எண்ணெய் பூச்சு ஈரப்பதத்திலிருந்து பாதுகாக்கும். 6 மாதங்களுக்கு ஒரு முறை எண்ணெய் தடவலாம்.'
    },
  ];

  return [
    {
      id: 1, type: 'Authenticity',
      qEn: `Is ${name} genuinely handcrafted by a local artisan?`,
      qTa: 'இது உண்மையிலேயே கைவினைஞரால் தயாரிக்கப்பட்டதா?',
      aEn: '100% handcrafted by a local Tamil Nadu artisan using traditional techniques. Each piece is unique. GI tag documentation available on request.',
      aTa: 'தமிழ்நாட்டிலிருந்து வரும் கைவினைஞரால் 100% கைவினையில் தயாரிக்கப்பட்டது.'
    },
    {
      id: 2, type: 'Delivery & Returns',
      qEn: 'How long is delivery? Can I return if it looks different from photos?',
      qTa: 'டெலிவரி எத்தனை நாட்களில் வரும்? திரும்பப் பெறலாமா?',
      aEn: '5–7 business day delivery across India. 7-day no-questions return policy. Full refund or free replacement if item differs from photos.',
      aTa: '5–7 வேலை நாட்களில் டெலிவரி. 7 நாள் திரும்பப் பெற அனுமதி. படத்திலிருந்து வித்தியாசமாக இருந்தால் முழு பணம் திரும்பக் கொடுக்கிறோம்.'
    },
  ];
}

export const BuyerSimulator: React.FC<BuyerSimulatorProps> = ({ onNext }) => {
  const { product } = useProduct();
  const sims = getSimulations(product.category, product.material, product.titleEnglish);

  return (
    <div className="cl-container" style={{ padding: '48px 24px' }}>
      {/* Header */}
      <div className="mb-8">
        <span className="cl-section-label">Step 5 of 7</span>
        <h1 className="cl-h1 mt-1 flex items-center gap-3">
          <MessageSquare className="w-8 h-8" style={{ color: 'var(--cl-terra)' }} />
          Buyer Simulator
        </h1>
        <p className="cl-body mt-1">
          AI simulates real buyer objections for <strong style={{ color: 'var(--cl-charcoal)' }}>{product.titleEnglish || product.category}</strong> and prepares confident answers.
        </p>
      </div>

      <div className="space-y-6">
        {sims.map((sim) => (
          <div
            key={sim.id}
            className="cl-card p-6 space-y-5"
            style={{ background: 'var(--cl-white)', border: '1px solid var(--cl-border)' }}
          >
            {/* Type badge */}
            <div className="flex items-center justify-between">
              <span className="cl-badge cl-badge-terra">{sim.type}</span>
              <span className="cl-caption">✦ Simulated Objection</span>
            </div>

            {/* Buyer Question */}
            <div
              className="p-5 rounded-2xl flex items-start gap-4"
              style={{
                background: 'var(--cl-cream)',
                border: '1px solid var(--cl-border)',
                borderRadius: '4px 16px 16px 16px',
              }}
            >
              <div
                className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
                style={{ background: 'var(--cl-parchment)', border: '1px solid var(--cl-tan)' }}
              >
                <User className="w-4 h-4" style={{ color: 'var(--cl-coffee)' }} />
              </div>
              <div className="space-y-1">
                <p className="cl-caption" style={{ color: 'var(--cl-gray-mid)' }}>Potential Buyer Asks:</p>
                <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: '1.0625rem', color: 'var(--cl-charcoal)' }}>
                  "{sim.qEn}"
                </p>
                <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.9375rem', fontStyle: 'italic', color: 'var(--cl-terra)' }}>
                  "{sim.qTa}"
                </p>
              </div>
            </div>

            {/* Recommended Answer */}
            <div
              className="p-5 rounded-2xl flex items-start gap-4"
              style={{
                background: 'var(--cl-terra-pale)',
                border: '1px solid rgba(184,115,42,0.3)',
                borderRadius: '16px 4px 16px 16px',
              }}
            >
              <div
                className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
                style={{ background: 'var(--cl-coffee)', color: 'var(--cl-parchment)' }}
              >
                <Bot className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <p className="cl-caption" style={{ color: 'var(--cl-terra-dark)' }}>✦ Recommended Artisan Answer:</p>
                <p style={{ fontFamily: 'Inter', fontSize: '0.9375rem', color: 'var(--cl-charcoal)', lineHeight: 1.65 }}>
                  {sim.aEn}
                </p>
                <p style={{ fontFamily: 'Inter', fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--cl-brown)', lineHeight: 1.65 }}>
                  {sim.aTa}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button id="view-coach-score-btn" onClick={onNext} className="cl-btn-primary" style={{ padding: '13px 28px', fontSize: '1rem' }}>
          View AI Sell Coach Score <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
