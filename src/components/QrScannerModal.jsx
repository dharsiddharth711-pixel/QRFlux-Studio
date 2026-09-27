import React, { useState } from 'react';
import jsQR from 'jsqr';
import { X, Upload, Scan, Copy, Check, ArrowRight } from 'lucide-react';

export default function QrScannerModal({ isOpen, onClose, onLoadIntoStudio, showToast }) {
  const [scanResult, setScanResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setErrorMsg(null);
    setScanResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        });

        if (code) {
          setScanResult(code.data);
          showToast('Successfully decoded QR code!');
        } else {
          setErrorMsg('No valid QR code detected in this image. Please try another image.');
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      setCopied(true);
      showToast('Copied scanned content to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Scan size={22} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>QR Code Scanner</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Upload Zone */}
        <div style={{
          border: '2px dashed var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '36px 20px',
          textAlign: 'center',
          background: 'var(--bg-input)',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <Upload size={32} style={{ color: 'var(--accent-primary)', marginBottom: '12px' }} />
          <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
            Upload a QR Code Image
          </p>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            PNG, JPG, WEBP formats supported
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              cursor: 'pointer',
              width: '100%',
              height: '100%'
            }}
          />
        </div>

        {errorMsg && (
          <div style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: 'var(--accent-rose)',
            fontSize: '0.85rem',
            marginBottom: '16px'
          }}>
            {errorMsg}
          </div>
        )}

        {scanResult && (
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Decoded Content Result
            </div>
            <div style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#fff',
              wordBreak: 'break-all',
              background: 'rgba(0,0,0,0.3)',
              padding: '10px 12px',
              borderRadius: '8px',
              marginBottom: '12px'
            }}>
              {scanResult}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-secondary" onClick={handleCopy} style={{ flex: 1 }}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                className="btn-primary"
                onClick={() => {
                  onLoadIntoStudio(scanResult);
                  onClose();
                }}
                style={{ flex: 1.2 }}
              >
                <span>Load in Studio</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        <button className="btn-secondary" onClick={onClose} style={{ width: '100%' }}>
          Close Scanner
        </button>
      </div>
    </div>
  );
}
