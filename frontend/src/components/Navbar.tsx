import React, { useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentStep: number;
  onNavigate: (step: number) => void;
}

const NAV_LINKS = [
  { label: 'Home',      step: 1 },
  { label: 'Analyze',   step: 3 },
  { label: 'My Crafts', step: 2 },
];

export const Navbar: React.FC<NavbarProps> = ({ currentStep, onNavigate }) => {
  const { product } = useProduct();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const analysisReady = Boolean(product.imageUrl && product.titleEnglish);

  const handleLink = (step: number) => { onNavigate(step); setMobileOpen(false); };
  const handleAnalyze = () => { onNavigate(3); setMobileOpen(false); };

  return (
    <>
      <nav className={`cl-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="cl-container">
          <div className="flex items-center justify-between h-16">

            {/* ── Brand Logo ── */}
            <button
              onClick={() => onNavigate(1)}
              className="flex items-center gap-2.5 group"
            >
              <div
                className="w-7 h-7 rounded flex items-center justify-center shrink-0"
                style={{
                  background: 'var(--cl-terra)',
                }}
              >
                <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '0.875rem', color: '#FFFFFF', lineHeight: 1 }}>C</span>
              </div>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '1.125rem',
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}>
                Craft<span style={{ color: 'var(--cl-terra-light)' }}>Lens</span>
              </span>
            </button>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = currentStep === link.step;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleLink(link.step)}
                    className="px-3.5 py-1.5 rounded-md text-sm font-medium transition-all"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: isActive ? '#FFFFFF' : '#A89B90',
                      background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                    }}
                    onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
                    onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#A89B90'; }}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:flex items-center gap-3">
              {analysisReady && (
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded"
                  style={{ background: 'rgba(42,111,66,0.25)', color: '#82D898', border: '1px solid rgba(42,111,66,0.4)' }}
                >
                  ✓ Analysis ready
                </span>
              )}
              <button
                onClick={handleAnalyze}
                className="cl-btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.875rem', background: 'var(--cl-terra)', borderColor: 'var(--cl-terra-dark)' }}
              >
                Analyze Craft
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className="md:hidden p-2 rounded-lg transition"
              style={{ color: '#A89B90' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-x-0 z-30 shadow-xl"
          style={{
            top: 64,
            background: 'var(--cl-espresso)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="cl-container py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = currentStep === link.step;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLink(link.step)}
                  className="text-left px-4 py-2.5 rounded-lg text-sm font-medium transition"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: isActive ? '#FFFFFF' : '#A89B90',
                    background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                  }}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-2 mt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <button onClick={handleAnalyze} className="cl-btn-primary w-full justify-center" style={{ background: 'var(--cl-terra)', borderColor: 'var(--cl-terra-dark)' }}>
                Analyze Craft
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
