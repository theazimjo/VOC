import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { extractWordsFromImageAI, getGeminiApiKey, setGeminiApiKey } from '../../utils/geminiService';
import './PhotoWordExtractorModal.css';

export default function PhotoWordExtractorModal({ isOpen, onClose, onImport, existingWords = [] }) {
  const { user } = useAuth();
  const ADMIN_EMAILS = ['azimjon29042006@gmail.com', 'azimjonxolmirzayev30@gmail.com'];
  const isAllowedUser = ADMIN_EMAILS.includes(user?.email?.toLowerCase());

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedItems, setExtractedItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [customKey, setCustomKey] = useState('');


  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Normalize existing pack words for instant duplicate detection
  const existingWordSet = useMemo(() => {
    return new Set(existingWords.map(w => (w.word || '').trim().toLowerCase()));
  }, [existingWords]);

  // Clean up camera stream when modal closes or unmounts
  const stopCameraStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (!isOpen) {
      stopCameraStream();
    }
  }, [isOpen]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg("Iltimos, rasm faylini tanlang (JPEG, PNG, WebP)");
      return;
    }

    setErrorMsg(null);
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (evt) => {
      processAndSetPreview(evt.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Auto-sharpen & contrast image on canvas for crystal clear OCR
  const processAndSetPreview = (dataUrl) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Apply light image enhancement filter for crisp text OCR
      ctx.filter = 'contrast(1.15) brightness(1.05)';
      ctx.drawImage(img, 0, 0);

      const enhancedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setImagePreview(enhancedDataUrl);
    };
    img.src = dataUrl;
  };

  // Start live Web Camera viewfinder
  const startCamera = async () => {
    setErrorMsg(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Rear camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      mediaStreamRef.current = stream;
      setIsCameraActive(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch (err) {
      console.warn("MediaDevices camera access failed or denied, falling back to camera input:", err);
      // Fallback: trigger native device camera input
      cameraInputRef.current?.click();
    }
  };

  // Capture high-res frame from video stream
  const captureFrameFromCamera = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');

    // Draw frame with auto contrast sharpening for text readability
    ctx.filter = 'contrast(1.2) brightness(1.05) saturate(0.9)';
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    stopCameraStream();
    setImagePreview(dataUrl);
  };

  const handleExtract = async () => {
    if (!imagePreview || isProcessing) return;

    if (!getGeminiApiKey()) {
      setShowKeyInput(true);
      setErrorMsg("🔑 Gemini API Kaliti kiritilmagan. Iltimos, kalitni kiriting.");
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const mimeType = selectedImage?.type || 'image/jpeg';
      const items = await extractWordsFromImageAI(imagePreview, mimeType, existingWords);

      if (!items || items.length === 0) {
        setErrorMsg("Rasmdan so'zlar ajratib bo'lmadi. Iltimos, boshqa aniqroq rasm tanlang.");
        setExtractedItems([]);
      } else {
        // Map extracted items and automatically uncheck / flag duplicates
        const processedList = items.map((item, index) => {
          const cleanKey = (item.word || '').trim().toLowerCase();
          const isDuplicate = existingWordSet.has(cleanKey);
          return {
            id: `ext_${Date.now()}_${index}`,
            word: item.word,
            translation: item.translation,
            partOfSpeech: item.partOfSpeech || 'noun',
            definition: item.definition || '',
            example: item.example || '',
            isDuplicate: isDuplicate,
            selected: !isDuplicate // Automatically deselect existing words!
          };
        });

        setExtractedItems(processedList);
      }
    } catch (err) {
      console.error(err);
      if (err.message && err.message.includes('API kalit')) {
        setShowKeyInput(true);
      }
      setErrorMsg(err.message || "Rasmni AI orqali tahlil qilishda xatolik yuz berdi");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleSelect = (id) => {
    setExtractedItems(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const handleDeleteItem = (id) => {
    setExtractedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleFieldChange = (id, field, value) => {
    setExtractedItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSelectAll = (selectState) => {
    setExtractedItems(prev => prev.map(item => ({
      ...item,
      selected: item.isDuplicate ? false : selectState
    })));
  };

  const selectedCount = extractedItems.filter(i => i.selected).length;

  const handleConfirmSave = () => {
    const itemsToSave = extractedItems
      .filter(i => i.selected && i.word.trim() && i.translation.trim())
      .map(i => ({
        word: i.word.trim(),
        translation: i.translation.trim(),
        partOfSpeech: i.partOfSpeech || 'noun',
        definition: i.definition || '',
        example: i.example || ''
      }));

    if (itemsToSave.length === 0) {
      setErrorMsg("Qo'shish uchun kamida 1 ta so'z tanlanishi kerak");
      return;
    }

    onImport(itemsToSave);
    handleResetAndClose();
  };

  const handleResetAndClose = () => {
    stopCameraStream();
    setSelectedImage(null);
    setImagePreview(null);
    setExtractedItems([]);
    setErrorMsg(null);
    setIsProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={handleResetAndClose}>
          <motion.div 
            className="modal photo-modal"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div className="modal-header">
              <h2>📸 Rasmdan so'zlarni ajratish (AI OCR)</h2>
              <button className="btn btn-ghost btn-icon" onClick={handleResetAndClose}>✕</button>
            </div>

            <div className="modal-body photo-modal-body">
              {!isAllowedUser ? (
                <div style={{ textAlign: 'center', padding: '36px 16px' }}>
                  <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>🔒</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-1, #f3f4f6)' }}>
                    Rasmdan so'z ajratish (AI OCR)
                  </h3>
                  <p style={{ color: 'var(--text-2, #9ca3af)', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto 16px auto', lineHeight: '1.5' }}>
                    Ushbu AI imkoniyati hozirda sinov jarayonida. Tez orada barcha foydalanuvchilar uchun ishga tushiriladi!
                  </p>
                  <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '20px', background: 'rgba(124, 58, 237, 0.15)', color: 'var(--accent-1, #7c3aed)', fontSize: '0.82rem', fontWeight: 'bold' }}>
                    🚀 Coming soon
                  </span>
                </div>
              ) : (
                <>
                  {errorMsg && (
                    <div className="photo-error-banner">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  {showKeyInput && (
                    <div style={{ padding: '10px 14px', background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.25)', borderRadius: '10px', marginBottom: '14px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 'bold', display: 'block', marginBottom: '6px', color: 'var(--text-1, #f3f4f6)' }}>
                        🔑 Gemini API Kalitingizni kiriting:
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          type="password" 
                          className="input" 
                          value={customKey} 
                          onChange={e => setCustomKey(e.target.value)} 
                          placeholder="AI Studio API Key..." 
                          style={{ fontSize: '0.85rem', flex: 1 }}
                        />
                        <button 
                          type="button" 
                          className="btn btn-primary" 
                          onClick={() => {
                            if (customKey.trim()) {
                              setGeminiApiKey(customKey.trim());
                              setShowKeyInput(false);
                              setErrorMsg(null);
                              if (imagePreview) handleExtract();
                            }
                          }}
                          style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', padding: '6px 14px' }}
                        >
                          Saqlash
                        </button>
                      </div>
                    </div>
                  )}


              {/* Live Web Camera Viewfinder */}
              {isCameraActive ? (
                <div className="photo-camera-viewfinder">
                  <div className="camera-viewport-wrapper">
                    <video ref={videoRef} playsInline autoPlay muted className="camera-video-stream" />
                    <div className="camera-doc-frame">
                      <span className="doc-frame-corner top-left"></span>
                      <span className="doc-frame-corner top-right"></span>
                      <span className="doc-frame-corner bottom-left"></span>
                      <span className="doc-frame-corner bottom-right"></span>
                      <p className="doc-frame-hint">📄 Kitob yoki varaqni ramka ichiga tekis joylashtiring</p>
                    </div>
                  </div>

                  <div className="camera-controls">
                    <button type="button" className="btn btn-ghost" onClick={stopCameraStream}>
                      Bekor qilish
                    </button>
                    <button type="button" className="btn btn-primary btn-snap-photo" onClick={captureFrameFromCamera}>
                      📸 Tiniq Rasmga olish
                    </button>
                  </div>
                  <canvas ref={canvasRef} style={{ display: 'none' }} />
                </div>
              ) : extractedItems.length === 0 ? (
                /* Step 1: Upload or Capture Photo */
                <div className="photo-upload-section">
                  {imagePreview ? (
                    <div className="photo-preview-container">
                      <img src={imagePreview} alt="Tahlil uchun rasm" className="photo-preview-img" />
                      <button 
                        type="button" 
                        className="btn btn-ghost photo-reselect-btn"
                        onClick={() => { setSelectedImage(null); setImagePreview(null); }}
                        disabled={isProcessing}
                      >
                        🔄 Boshqa rasm yuklash / Rasmga olish
                      </button>
                    </div>
                  ) : (
                    <div className="photo-input-options">
                      {/* Option 1: File Dropzone */}
                      <div 
                        className="photo-dropzone"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <span className="photo-dropzone-icon">📁</span>
                        <p className="photo-dropzone-title">Rasmni yuklash</p>
                        <p className="photo-dropzone-sub">Galereya yoki kompyuterdan rasm tanlang</p>
                      </div>

                      {/* Option 2: Direct Camera Trigger */}
                      <div 
                        className="photo-dropzone camera-option"
                        onClick={startCamera}
                      >
                        <span className="photo-dropzone-icon">📸</span>
                        <p className="photo-dropzone-title">Rasmga olish (Camera)</p>
                        <p className="photo-dropzone-sub">Kamera orqali kitob varag meytini rasmga oling</p>
                      </div>

                      {/* Hidden File Inputs */}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileSelect} 
                        accept="image/*" 
                        style={{ display: 'none' }}
                      />
                      <input 
                        type="file" 
                        ref={cameraInputRef} 
                        onChange={handleFileSelect} 
                        accept="image/*" 
                        capture="environment"
                        style={{ display: 'none' }}
                      />
                    </div>
                  )}

                  {imagePreview && (
                    <div className="photo-action-bar">
                      <button
                        type="button"
                        className="btn btn-primary photo-extract-btn"
                        onClick={handleExtract}
                        disabled={isProcessing}
                      >
                        {isProcessing ? '✨ Gemini AI rasmni tahlil qilmoqda...' : '✨ Rasmdagi so\'zlarni tahlil qilish'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Step 2: Interactive Review List */
                <div className="photo-review-section">
                  <div className="photo-review-header">
                    <span className="photo-review-count">
                      Jami topilgan: <strong>{extractedItems.length} ta</strong> | Tanlangan: <strong>{selectedCount} ta</strong>
                    </span>
                    <div className="photo-review-controls">
                      <button type="button" className="btn-link" onClick={() => handleSelectAll(true)}>Hammasini belgilash</button>
                      <span>•</span>
                      <button type="button" className="btn-link" onClick={() => handleSelectAll(false)}>Bekor qilish</button>
                    </div>
                  </div>

                  <div className="photo-items-list">
                    {extractedItems.map((item) => (
                      <div 
                        key={item.id} 
                        className={`photo-item-card ${item.selected ? 'selected' : ''} ${item.isDuplicate ? 'duplicate' : ''}`}
                      >
                        <div className="photo-item-checkbox">
                          <input 
                            type="checkbox" 
                            checked={item.selected} 
                            onChange={() => handleToggleSelect(item.id)}
                          />
                        </div>

                        <div className="photo-item-fields">
                          <div className="photo-item-row">
                            <input 
                              type="text" 
                              className="input photo-input-word" 
                              value={item.word} 
                              onChange={e => handleFieldChange(item.id, 'word', e.target.value)}
                              placeholder="So'z"
                            />
                            <span className="photo-item-arrow">➔</span>
                            <input 
                              type="text" 
                              className="input photo-input-trans" 
                              value={item.translation} 
                              onChange={e => handleFieldChange(item.id, 'translation', e.target.value)}
                              placeholder="Tarjimasi"
                            />
                          </div>

                          {(item.definition || item.example) && (
                            <div className="photo-item-subtext">
                              {item.definition && <span className="photo-def">📖 {item.definition}</span>}
                              {item.example && <span className="photo-ex">💬 "{item.example}"</span>}
                            </div>
                          )}

                          {item.isDuplicate && (
                            <span className="photo-badge-duplicate">
                              ⚠️ To'plamda mavjud (O'tkazib yuboriladi)
                            </span>
                          )}
                        </div>

                        <button 
                          type="button" 
                          className="btn-icon photo-item-delete"
                          onClick={() => handleDeleteItem(item.id)}
                          title="Ro'yxatdan o'chirish"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
                </>
              )}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-ghost" onClick={handleResetAndClose}>
                {isAllowedUser ? "Bekor qilish" : "Yopish"}
              </button>
              {isAllowedUser && extractedItems.length > 0 && (
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleConfirmSave}
                  disabled={selectedCount === 0}
                >
                  {selectedCount > 0 ? `✨ ${selectedCount} ta so'zni saqlash` : "So'z tanlanmadi"}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
