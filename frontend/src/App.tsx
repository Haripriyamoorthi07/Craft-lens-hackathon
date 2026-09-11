import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ProductProvider, useProduct } from './context/ProductContext';
import { Navbar } from './components/Navbar';
import { StepIndicator } from './components/StepIndicator';

import { LandingPage } from './pages/LandingPage';
import { ArtisanDashboard } from './pages/ArtisanDashboard';
import { ProductCapture } from './pages/ProductCapture';
import { ProductAnalysis } from './pages/ProductAnalysis';
import { ProductListing } from './pages/ProductListing';
import { FairPrice } from './pages/FairPrice';
import { BuyerSimulator } from './pages/BuyerSimulator';
import { AISellCoach } from './pages/AISellCoach';
import { FinalListing } from './pages/FinalListing';

const MainApp: React.FC = () => {
  const { currentStep, setCurrentStep, resetProduct, product } = useProduct();

  const handleNextStep = () => {
    if (currentStep < 9) setCurrentStep(currentStep + 1);
  };

  const handleNavigate = (step: number) => {
    const analysisCompleted = Boolean(product.imageUrl && product.titleEnglish);
    if (step >= 4 && !analysisCompleted) {
      setCurrentStep(3);
      return;
    }
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--cl-ivory)', color: 'var(--cl-charcoal)' }}>
      <Navbar currentStep={currentStep} onNavigate={handleNavigate} />
      <StepIndicator currentStep={currentStep} onSelectStep={handleNavigate} />

      <main className="flex-1">
        {currentStep === 1 && <LandingPage onStart={() => setCurrentStep(3)} />}
        {currentStep === 2 && (
          <ArtisanDashboard
            onAddProduct={() => setCurrentStep(3)}
            onViewProduct={() => setCurrentStep(5)}
          />
        )}
        {currentStep === 3 && <ProductCapture onNext={handleNextStep} />}
        {currentStep === 4 && <ProductAnalysis onNext={handleNextStep} />}
        {currentStep === 5 && <ProductListing onNext={handleNextStep} />}
        {currentStep === 6 && <FairPrice onNext={handleNextStep} />}
        {currentStep === 7 && <BuyerSimulator onNext={handleNextStep} />}
        {currentStep === 8 && <AISellCoach onNext={handleNextStep} />}
        {currentStep === 9 && <FinalListing onRestart={resetProduct} />}
      </main>

      <footer
        className="mt-auto"
        style={{
          background: 'var(--cl-white)',
          borderTop: '1px solid var(--cl-border)',
          padding: '24px 0',
        }}
      >
        <div className="cl-container flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'var(--cl-gray-mid)' }}>
            © 2026 CraftLens — AI Sell Coach for Artisans
          </p>
          <p className="text-xs" style={{ color: 'var(--cl-gray-light)' }}>
            Empowering traditional artisans with intelligent tools
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <ProductProvider>
        <MainApp />
      </ProductProvider>
    </LanguageProvider>
  );
}
