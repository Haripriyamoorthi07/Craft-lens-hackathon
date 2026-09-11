import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProduct } from '../context/ProductContext';
import { Camera, Mic, Upload, ArrowRight, AlertCircle, ImageIcon, Loader2, X, ZoomIn, CheckCircle, RefreshCw } from 'lucide-react';
import { analyzeProductWithAi } from '../services/api';

interface ProductCaptureProps {
  onNext: () => void;
}

const ANALYSIS_STEPS = [
  'Detecting craft type',
  'Identifying material',
  'Understanding craftsmanship',
  'Estimating market value',
  'Generating bilingual listing',
];

export const ProductCapture: React.FC<ProductCaptureProps> = ({ onNext }) => {
  const { t } = useLanguage();
  const { setProduct } = useProduct();

  const [isRecording, setIsRecording]         = useState(false);
  const [descriptionInput, setDescriptionInput] = useState('');
  const [imagePreview, setImagePreview]       = useState<string>('');
  const [imageFile, setImageFile]             = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing]         = useState(false);
  const [analysisStep, setAnalysisStep]       = useState(0);
  const [error, setError]                     = useState('');
  const [isDragOver, setIsDragOver]           = useState(false);

  // Webcam state
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraReady, setCameraReady]         = useState(false);
  const [cameraError, setCameraError]         = useState('');
  const [captured, setCaptured]               = useState<string>('');

  const fileInputRef   = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const videoRef       = useRef<HTMLVideoElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const streamRef      = useRef<MediaStream | null>(null);

  // Advance fake analysis progress while analyzing
  useEffect(() => {
    if (!isAnalyzing) { setAnalysisStep(0); return; }
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setAnalysisStep(step);
      if (step >= ANALYSIS_STEPS.length - 1) clearInterval(timer);
    }, 900);
    return () => clearInterval(timer);
  }, [isAnalyzing]);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const handleCameraCapture = async () => {
    setCameraError(''); setCaptured(''); setCameraReady(false); setShowCameraModal(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => { videoRef.current?.play(); setCameraReady(true); };
      }
    } catch (err: any) {
      const msg = err?.name === 'NotAllowedError'
        ? t('Camera permission denied. Please allow camera access.', 'கேமரா அனுமதி மறுக்கப்பட்டது.')
        : err?.name === 'NotFoundError'
        ? t('No camera found. Please use Upload Photo.', 'கேமரா கண்டுபிடிக்கப்படவில்லை.')
        : t('Could not access camera. Please use Upload Photo.', 'கேமராவை அணுக முடியவில்லை.');
      setCameraError(msg);
    }
  };

  const handleSnapPhoto = () => {
    const video = videoRef.current; const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    setCaptured(canvas.toDataURL('image/jpeg', 0.92));
    video.pause();
  };

  const handleRetake = () => { setCaptured(''); videoRef.current?.play(); };

  const handleUseCaptured = () => {
    if (!captured) return;
    setImagePreview(captured); setImageFile(null); setError('');
    setShowCameraModal(false); stopStream(); setCaptured(''); setCameraReady(false);
  };

  const handleCloseCamera = () => {
    stopStream(); setShowCameraModal(false); setCaptured(''); setCameraReady(false); setCameraError('');
  };

  const processFile = (file: File) => {
    setError(''); setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => { const r = ev.target?.result as string; if (r) setImagePreview(r); };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    processFile(file); e.target.value = '';
  };

  const handleGalleryUpload = () => {
    fileInputRef.current?.removeAttribute('capture');
    fileInputRef.current?.click();
  };

  // Drag and drop
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) processFile(file);
  };

  const handleVoiceRecord = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setError(t('Voice recognition not supported. Please type.', 'தட்டச்சு செய்யவும்.')); return; }
    if (isRecording) { recognitionRef.current?.stop(); setIsRecording(false); return; }
    try {
      const rec = new SR(); rec.lang = 'ta-IN'; rec.continuous = true; rec.interimResults = false;
      rec.onstart  = () => setIsRecording(true);
      rec.onresult = (ev: any) => {
        const t = Array.from(ev.results).map((r: any) => r[0].transcript).join(' ');
        setDescriptionInput((prev) => prev ? `${prev} ${t}` : t);
      };
      rec.onerror  = (ev: any) => { setIsRecording(false); if (ev.error === 'not-allowed') setError(t('Microphone denied.', 'மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டது.')); };
      rec.onend    = () => setIsRecording(false);
      rec.start(); recognitionRef.current = rec;
    } catch { setIsRecording(false); }
  };

  const handleProceed = async () => {
    if (!imagePreview) { setError(t('Please upload or take a product photo first.', 'முதலில் படம் பதிவேற்றவும்.')); return; }
    setError(''); setIsAnalyzing(true);
    try {
      const aiResult = await analyzeProductWithAi(imagePreview, descriptionInput, 'ta');
      setProduct((prev) => ({
        ...prev,
        imageUrl: imagePreview,
        catalogueImageUrl: aiResult.catalogueImageUrl,
        artisanVoiceNoteText: descriptionInput,
        category: aiResult.detectedCategory || prev.category,
        material: aiResult.extractedFacts.material,
        craftsmanshipDetails: aiResult.extractedFacts.craftsmanship,
        dimensions: aiResult.extractedFacts.dimensions,
        origin: aiResult.extractedFacts.origin,
        titleEnglish: aiResult.titleEnglish,
        titleTamil: aiResult.titleTamil,
        descriptionEnglish: aiResult.descriptionEnglish,
        descriptionTamil: aiResult.descriptionTamil,
        recommendedPrice: aiResult.recommendedPrice,
        minPriceRange: aiResult.minPrice,
        maxPriceRange: aiResult.maxPrice,
        artisanStatedPrice: aiResult.recommendedPrice,
        coachScore: aiResult.qualityScore,
        improvementsList: aiResult.improvements || prev.improvementsList,
      }));
      onNext();
    } catch (e) {
      console.error(e);
      setError(t('Analysis failed. Please try again.', 'பகுப்பாய்வு தோல்வியடைந்தது.'));
    } finally { setIsAnalyzing(false); }
  };

  return (
    <div className="cl-container" style={{ padding: '48px 24px' }}>
      {/* Page header */}
      <div className="mb-8">
        <span className="cl-section-label">Step 1 of 7</span>
        <h1 className="cl-h1 mt-1">Analyze Your Craft</h1>
        <p className="cl-body mt-2">Upload a clear photo and describe your product. CraftLens AI will do the rest.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Upload card ── */}
        <div className="cl-card p-6 flex flex-col gap-5" style={{ background: 'var(--cl-white)', border: '1px solid var(--cl-border)' }}>
          <h2 className="cl-h3 flex items-center gap-2">
            <ImageIcon className="w-5 h-5" style={{ color: 'var(--cl-terra)' }} />
            Product Photo
          </h2>

          {/* Drop zone */}
          <div
            className={`cl-upload-zone relative flex flex-col items-center justify-center min-h-[260px] transition-all ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{ cursor: 'pointer', background: 'var(--cl-espresso)', border: '2px dashed var(--cl-border)' }}
          >
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Uploaded craft"
                  className="w-full h-64 object-contain rounded-xl"
                  style={{ background: 'var(--cl-cream)' }}
                />
                {/* Replace overlay */}
                <div
                  className="absolute inset-0 rounded-xl flex items-center justify-center gap-3 opacity-0 hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(15,10,7,0.85)' }}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    className="cl-btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
                  >
                    <Upload className="w-4 h-4" /> Replace
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setImagePreview(''); setImageFile(null); }}
                    className="cl-btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '0.8125rem', color: 'var(--cl-warn)', borderColor: 'rgba(217,136,43,0.3)' }}
                  >
                    <X className="w-4 h-4" /> Remove
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center p-8 space-y-3 pointer-events-none">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                  style={{ background: 'var(--cl-terra-pale)', border: '1px solid rgba(200,109,57,0.3)' }}
                >
                  <Upload className="w-7 h-7" style={{ color: 'var(--cl-terra-light)' }} />
                </div>
                <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: '1.125rem', color: 'var(--cl-charcoal)' }}>
                  {isDragOver ? 'Drop your craft here' : 'Drop your craft image here'}
                </p>
                <p className="text-xs" style={{ color: 'var(--cl-gray-mid)', fontFamily: 'Inter' }}>or click to choose from gallery</p>
                <p className="text-xs" style={{ color: 'var(--cl-gray-mid)', fontFamily: 'Inter' }}>JPG, PNG or WEBP · Clear product photo</p>
              </div>
            )}
          </div>

          {imageFile && (
            <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--cl-success)', fontFamily: 'Inter' }}>
              <CheckCircle className="w-3.5 h-3.5" />
              {imageFile.name} ({Math.round(imageFile.size / 1024)} KB)
            </p>
          )}
          {!imageFile && imagePreview && (
            <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--cl-success)', fontFamily: 'Inter' }}>
              <CheckCircle className="w-3.5 h-3.5" />
              Photo captured from camera
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button onClick={handleGalleryUpload} className="cl-btn-secondary flex-1" style={{ padding: '10px 0', fontSize: '0.875rem', justifyContent: 'center' }}>
              <Upload className="w-4 h-4" /> Upload Photo
            </button>
            <button
              onClick={handleCameraCapture}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl font-semibold text-sm transition"
              style={{
                padding: '10px 0',
                background: 'var(--cl-terra-pale)',
                color: 'var(--cl-terra-dark)',
                border: '1.5px solid rgba(184,115,42,0.3)',
                fontSize: '0.875rem',
                fontFamily: 'Inter',
              }}
            >
              <Camera className="w-4 h-4" /> Take Photo
            </button>
          </div>

          <input id="craft-image-upload" type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* ── Voice / Description card ── */}
        <div className="cl-card p-6 flex flex-col gap-5" style={{ background: 'var(--cl-white)', border: '1px solid var(--cl-border)' }}>
          <h2 className="cl-h3 flex items-center gap-2">
            <Mic className="w-5 h-5" style={{ color: 'var(--cl-terra)' }} />
            Describe Your Craft
          </h2>

          {/* Mic button */}
          <div
            className="flex flex-col items-center gap-3 py-6 rounded-xl"
            style={{ background: 'var(--cl-espresso)', border: '1px solid var(--cl-border)' }}
          >
            <div className="relative">
              {isRecording && (
                <span
                  className="absolute inset-0 rounded-full cl-pulse-ring"
                  style={{ background: 'rgba(200,109,57,0.3)' }}
                />
              )}
              <button
                id="voice-record-btn"
                onClick={handleVoiceRecord}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all ${isRecording ? 'cl-mic-recording' : ''}`}
                style={{
                  background: isRecording ? '#E53E3E' : 'var(--cl-terra)',
                  color: '#FFFFFF',
                  boxShadow: isRecording ? '0 0 0 6px rgba(229,62,62,0.3)' : '0 4px 16px rgba(200,109,57,0.4)',
                }}
              >
                <Mic className="w-7 h-7 text-white" style={{ strokeWidth: 2.2, color: '#FFFFFF' }} />
              </button>
            </div>
            <p className="text-xs font-semibold" style={{ color: isRecording ? '#E53E3E' : 'var(--cl-charcoal)', fontFamily: 'Inter' }}>
              {isRecording ? '🔴 Listening… tap again to stop' : 'Tap to speak in Tamil or English'}
            </p>
          </div>

          {/* Text area */}
          <div className="flex flex-col gap-1.5">
            <label className="cl-caption" htmlFor="description-textarea">
              Voice Note / Description (Tamil or English)
            </label>
            <textarea
              id="description-textarea"
              rows={5}
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              placeholder="Speak or type: material, size, technique, story, origin…"
              className="cl-textarea"
            />
          </div>

          {/* Info note */}
          <div
            className="flex items-start gap-2 p-3 rounded-xl text-xs"
            style={{ background: 'var(--cl-terra-pale)', border: '1px solid rgba(184,115,42,0.25)', color: 'var(--cl-brown)' }}
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--cl-terra)' }} />
            <span>AI analyzes your actual image and description. Content changes with every new photo.</span>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="mt-4 flex items-center gap-2 p-3 rounded-xl text-sm"
          style={{ background: '#FBF0E0', border: '1px solid rgba(160,98,46,0.3)', color: 'var(--cl-warn)' }}
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Analyze CTA */}
      <div className="flex justify-end mt-8">
        <button
          id="analyze-product-btn"
          onClick={handleProceed}
          disabled={isAnalyzing || !imagePreview}
          className="cl-btn-primary"
          style={{ padding: '13px 28px', fontSize: '1rem' }}
        >
          {isAnalyzing ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing…</>
          ) : (
            <>Analyze with AI <ArrowRight className="w-5 h-5" /></>
          )}
        </button>
      </div>

      {/* ══ Webcam Modal ══ */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(28,16,7,0.8)', backdropFilter: 'blur(6px)' }}>
          <div className="cl-card w-full max-w-xl overflow-hidden" style={{ boxShadow: 'var(--cl-shadow-lg)', border: '1px solid var(--cl-terra)' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--cl-border)', background: 'var(--cl-parchment)' }}>
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5" style={{ color: 'var(--cl-terra)' }} />
                <h3 className="cl-h3">Take a Photo</h3>
              </div>
              <button onClick={handleCloseCamera} className="p-1.5 rounded-lg transition" style={{ color: 'var(--cl-gray)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5" style={{ background: 'var(--cl-white)' }}>
              {cameraError ? (
                <div className="text-center py-8 space-y-4">
                  <Camera className="w-14 h-14 mx-auto" style={{ color: 'var(--cl-gray-pale)' }} />
                  <p className="text-sm" style={{ color: '#A03020' }}>{cameraError}</p>
                  <button onClick={handleCloseCamera} className="cl-btn-secondary">Close</button>
                </div>
              ) : (
                <>
                  <div className="relative rounded-xl overflow-hidden aspect-video" style={{ background: 'var(--cl-espresso)' }}>
                    <video ref={videoRef} className={`w-full h-full object-cover ${captured ? 'hidden' : ''}`} playsInline muted />
                    {captured && <img src={captured} alt="Snapshot" className="w-full h-full object-contain" />}
                    {!cameraReady && !captured && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--cl-terra)' }} />
                        <p className="text-sm" style={{ color: 'var(--cl-parchment)' }}>Starting camera…</p>
                      </div>
                    )}
                    {cameraReady && !captured && (
                      <>
                        {/* Corner guides */}
                        {[['top-3 left-3 border-t-2 border-l-2 rounded-tl-md'],['top-3 right-3 border-t-2 border-r-2 rounded-tr-md'],['bottom-3 left-3 border-b-2 border-l-2 rounded-bl-md'],['bottom-3 right-3 border-b-2 border-r-2 rounded-br-md']].map((cls, i) => (
                          <div key={i} className={`absolute w-6 h-6 ${cls[0]}`} style={{ borderColor: 'var(--cl-terra)' }} />
                        ))}
                        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded" style={{ background: 'rgba(28,16,7,0.75)', color: 'var(--cl-parchment)' }}>
                          Centre your product in frame
                        </p>
                      </>
                    )}
                    {captured && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'var(--cl-terra)', color: '#FAF5EB' }}>
                        <ZoomIn className="w-3 h-3" /> Photo captured!
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    {!captured ? (
                      <button
                        onClick={handleSnapPhoto}
                        disabled={!cameraReady}
                        className="w-14 h-14 rounded-full border-4 flex items-center justify-center hover:scale-105 active:scale-95 transition disabled:opacity-40"
                        style={{ background: 'var(--cl-parchment)', borderColor: 'var(--cl-terra)' }}
                      >
                        <div className="w-9 h-9 rounded-full" style={{ background: 'var(--cl-terra)' }} />
                      </button>
                    ) : (
                      <>
                        <button onClick={handleRetake} className="cl-btn-secondary">
                          <RefreshCw className="w-4 h-4" /> Retake
                        </button>
                        <button onClick={handleUseCaptured} className="cl-btn-primary">
                          <CheckCircle className="w-4 h-4" /> Use This Photo
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══ AI Analysis Loading Overlay ══ */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(28,16,7,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="cl-card p-8 w-full max-w-md text-center space-y-6" style={{ boxShadow: 'var(--cl-shadow-lg)', border: '1px solid var(--cl-terra)' }}>
            {/* Image with scan animation */}
            <div className="relative rounded-xl overflow-hidden mx-auto" style={{ width: 160, height: 160, border: '2px solid var(--cl-terra)' }}>
              <img src={imagePreview} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.8)' }} />
              <div className="cl-scan-bar" />
            </div>

            <div>
              <p className="cl-section-label mb-1">CraftLens AI</p>
              <h3 className="cl-h2">Analyzing your craft…</h3>
            </div>

            {/* Progress steps */}
            <div className="space-y-3 text-left">
              {ANALYSIS_STEPS.map((step, i) => {
                const done = i < analysisStep;
                const active = i === analysisStep;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all"
                      style={{
                        background: done ? 'var(--cl-success)' : active ? 'var(--cl-terra-pale)' : 'var(--cl-cream)',
                        border: active ? '2px solid var(--cl-terra)' : '2px solid var(--cl-border)',
                      }}
                    >
                      {done && <CheckCircle className="w-3 h-3" style={{ color: '#fff' }} />}
                      {active && <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--cl-terra)' }} />}
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{
                        fontFamily: 'Inter',
                        color: done ? 'var(--cl-success)' : active ? 'var(--cl-charcoal)' : 'var(--cl-gray-light)',
                      }}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
