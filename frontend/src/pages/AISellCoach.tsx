import React, { useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import { Award, CheckCircle2, ArrowRight, Sparkles, Plus } from 'lucide-react';

interface CoachProps {
  onNext: () => void;
}

export const AISellCoach: React.FC<CoachProps> = ({ onNext }) => {
  const { product, setProduct } = useProduct();
  const [appliedIndexes, setAppliedIndexes] = useState<number[]>([]);
  const [animatedScore, setAnimatedScore]   = useState(0);

  const score      = product.coachScore || 0;
  const radius     = 52;
  const circ       = 2 * Math.PI * radius;
  const dashOffset = circ - (animatedScore / 100) * circ;
  const label      = score >= 85 ? 'Marketplace Ready'
                   : score >= 65 ? 'Good — Room to Improve'
                   : 'Needs Optimization';

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(score / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, score);
      setAnimatedScore(current);
      if (current >= score) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [score]);

  const handleApply = (idx: number) => {
    if (appliedIndexes.includes(idx)) return;
    setAppliedIndexes([...appliedIndexes, idx]);
    setProduct((prev) => ({
      ...prev,
      coachScore: Math.min(100, prev.coachScore + 7),
      dimensions: 'Height: 12 in | Diameter: 6 in | Weight: 1.2 kg',
    }));
  };

  return (
    <div className="cl-container" style={{ padding: '40px 24px' }}>
      {/* Header */}
      <div className="mb-8">
        <span className="cl-section-label">Step 6 of 7</span>
        <h1 className="cl-h1 mt-1 flex items-center gap-3">
          <Award className="w-7 h-7" style={{ color: 'var(--cl-terra)' }} />
          AI Sell Coach
        </h1>
        <p className="cl-body mt-1">
          Optimization recommendations to increase buyer trust & search visibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ── Score Ring Card ── */}
        <div className="cl-card p-6 md:p-8 flex flex-col items-center justify-center text-center gap-4">
          <p className="cl-caption">Quality Audit Score</p>

          {/* SVG Score Ring */}
          <div className="relative" style={{ width: 140, height: 140 }}>
            <svg width="140" height="140" viewBox="0 0 140 140" className="cl-score-ring">
              <circle cx="70" cy="70" r={radius} fill="none" stroke="var(--cl-border)" strokeWidth="10" />
              <circle
                cx="70" cy="70" r={radius}
                fill="none"
                stroke="var(--cl-terra)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '2.25rem',
                  fontWeight: 800,
                  color: 'var(--cl-charcoal)',
                  lineHeight: 1,
                }}
              >
                {animatedScore}
              </span>
              <span className="cl-caption" style={{ marginTop: 2 }}>/100</span>
            </div>
          </div>

          <span className="cl-badge cl-badge-terra">
            {label}
          </span>
        </div>

        {/* ── Checklist ── */}
        <div className="md:col-span-2 cl-card p-6 space-y-5">
          <h2 className="cl-h3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--cl-terra)' }} />
            Optimization Checklist
          </h2>

          {product.improvementsList.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-8 rounded-lg gap-2"
              style={{ background: 'var(--cl-ivory)', border: '1px border var(--cl-border)' }}
            >
              <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--cl-success)' }} />
              <p className="cl-body text-sm">Your listing meets all quality benchmarks!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {product.improvementsList.map((item, idx) => {
                const applied = appliedIndexes.includes(idx);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-4 p-3.5 rounded-lg transition"
                    style={{
                      background: applied ? 'var(--cl-success-bg)' : 'var(--cl-ivory)',
                      border: `1px solid ${applied ? 'rgba(42,111,66,0.2)' : 'var(--cl-border)'}`,
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0"
                        style={{ color: applied ? 'var(--cl-success)' : 'var(--cl-gray-light)' }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: applied ? 'var(--cl-success)' : 'var(--cl-charcoal)',
                          textDecoration: applied ? 'line-through' : 'none',
                        }}
                      >
                        {item}
                      </span>
                    </div>
                    <button
                      onClick={() => handleApply(idx)}
                      disabled={applied}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition"
                      style={{
                        background: applied ? 'transparent' : 'var(--cl-coffee)',
                        color: applied ? 'var(--cl-success)' : '#FFFFFF',
                        border: applied ? '1px solid var(--cl-success)' : 'none',
                        cursor: applied ? 'default' : 'pointer',
                      }}
                    >
                      {applied ? 'Applied' : 'Apply Fix'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={onNext} className="cl-btn-primary" style={{ padding: '12px 26px', fontSize: '0.9375rem', background: 'var(--cl-terra)', borderColor: 'var(--cl-terra-dark)' }}>
          Generate Final Listing <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
