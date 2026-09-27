import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import confetti from 'canvas-confetti';
import { Download, Copy, Bookmark, Check, Sparkles, FileCode } from 'lucide-react';
import MockupViewer from './MockupViewer';

export default function LivePreview({ config, payloadContent, payloadType, onSaveToRecent, showToast }) {
  const ref = useRef(null);
  const [qrCodeInstance, setQrCodeInstance] = useState(null);
  const [mockupMode, setMockupMode] = useState('canvas');
  const [exportRes, setExportRes] = useState(1024);
  const [copied, setCopied] = useState(false);

  // Initialize QRCodeStyling instance
  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 260,
      height: 260,
      data: payloadContent || 'https://example.com',
      image: config.logoUrl || undefined,
      margin: config.margin,
      qrOptions: {
        errorCorrectionLevel: config.errorCorrectionLevel || 'M'
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: config.logoSize || 0.25,
        margin: 4
      },
      dotsOptions: {
        type: config.dotsType || 'square',
        color: config.useGradient ? undefined : config.dotsColor,
        gradient: config.useGradient ? {
          type: config.gradientType || 'linear',
          rotation: (config.gradientAngle || 0) * (Math.PI / 180),
          colorStops: [
            { offset: 0, color: config.gradientColor1 || '#6366f1' },
            { offset: 1, color: config.gradientColor2 || '#06b6d4' }
          ]
        } : undefined
      },
      backgroundOptions: {
        color: config.bgColor || '#ffffff'
      },
      cornersSquareOptions: {
        type: config.cornersSquareType || 'square',
        color: config.useGradient ? undefined : config.dotsColor
      },
      cornersDotOptions: {
        type: config.cornersDotType || 'square',
        color: config.useGradient ? undefined : config.dotsColor
      }
    });

    setQrCodeInstance(qr);
  }, []);

  // Update QR instance when options change
  useEffect(() => {
    if (!qrCodeInstance) return;

    qrCodeInstance.update({
      data: payloadContent || 'https://example.com',
      image: config.logoUrl || undefined,
      margin: config.margin,
      qrOptions: {
        errorCorrectionLevel: config.errorCorrectionLevel || 'M'
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: config.logoSize || 0.25,
        margin: 4
      },
      dotsOptions: {
        type: config.dotsType || 'square',
        color: config.useGradient ? undefined : config.dotsColor,
        gradient: config.useGradient ? {
          type: config.gradientType || 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: config.gradientColor1 || '#6366f1' },
            { offset: 1, color: config.gradientColor2 || '#06b6d4' }
          ]
        } : undefined
      },
      backgroundOptions: {
        color: config.bgColor || '#ffffff'
      },
      cornersSquareOptions: {
        type: config.cornersSquareType || 'square',
        color: config.useGradient ? undefined : config.dotsColor
      },
      cornersDotOptions: {
        type: config.cornersDotType || 'square',
        color: config.useGradient ? undefined : config.dotsColor
      }
    });
  }, [qrCodeInstance, config, payloadContent]);

  // Append QR Canvas to Ref DOM element
  useEffect(() => {
    if (ref.current && qrCodeInstance) {
      ref.current.innerHTML = '';
      qrCodeInstance.append(ref.current);
    }
  }, [ref, qrCodeInstance]);

  // Trigger Confetti Celebratory Burst
  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981']
    });
  };

  // Export PNG
  const handleDownloadPng = () => {
    if (!qrCodeInstance) return;
    qrCodeInstance.update({ width: exportRes, height: exportRes });
    qrCodeInstance.download({ name: `qr-studio-${payloadType}-${Date.now()}`, extension: 'png' });
    qrCodeInstance.update({ width: 260, height: 260 });
    triggerConfetti();
    showToast(`Downloaded PNG (${exportRes}x${exportRes}px) successfully!`);
  };

  // Export SVG
  const handleDownloadSvg = () => {
    if (!qrCodeInstance) return;
    qrCodeInstance.download({ name: `qr-studio-${payloadType}-${Date.now()}`, extension: 'svg' });
    triggerConfetti();
    showToast('Downloaded Vector SVG successfully!');
  };

  // Copy Image to Clipboard
  const handleCopyClipboard = async () => {
    try {
      if (!qrCodeInstance) return;
      const blob = await qrCodeInstance.getRawData('png');
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      setCopied(true);
      showToast('Copied QR code image to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast('Could not copy directly. Use Download PNG instead.');
    }
  };

  // Save to Recent History
  const handleSaveToRecent = async () => {
    if (!qrCodeInstance) return;
    try {
      const blob = await qrCodeInstance.getRawData('png');
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        onSaveToRecent({
          id: Date.now().toString(),
          type: payloadType,
          content: payloadContent,
          thumb: base64data,
          timestamp: new Date().toISOString(),
          config: { ...config }
        });
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="glass-card preview-card">
      <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.08em', marginBottom: '4px' }}>
        Interactive Studio
      </div>
      <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '4px' }}>Live Preview</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px', textAlign: 'center' }}>
        Your QR code updates automatically as you edit
      </p>

      {/* Mockup Container */}
      <MockupViewer mockupMode={mockupMode} setMockupMode={setMockupMode} payloadType={payloadType}>
        <div ref={ref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
      </MockupViewer>

      {/* Metadata Badges Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '12px',
        width: '100%',
        padding: '12px 16px',
        background: 'var(--bg-input)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700 }}>TYPE</div>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>{payloadType.toUpperCase()}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700 }}>SIZE</div>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>{config.size} × {config.size}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700 }}>ERROR CORR</div>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>{config.errorCorrectionLevel}</div>
        </div>
      </div>

      {/* Export Options & Actions */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button className="btn-secondary" onClick={handleSaveToRecent}>
          <Bookmark size={16} />
          <span>Save to Recent</span>
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px', gap: '10px' }}>
          <button className="btn-primary" onClick={handleDownloadPng}>
            <Download size={18} />
            <span>Download PNG</span>
          </button>

          <select
            className="form-select"
            value={exportRes}
            onChange={(e) => setExportRes(parseInt(e.target.value))}
            style={{ padding: '8px 10px', fontSize: '0.85rem' }}
          >
            <option value="512">512px HD</option>
            <option value="1024">1024px Full HD</option>
            <option value="2048">2048px 4K</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button className="btn-secondary" onClick={handleDownloadSvg}>
            <FileCode size={16} />
            <span>SVG Vector</span>
          </button>

          <button className="btn-secondary" onClick={handleCopyClipboard}>
            {copied ? <Check size={16} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy Image'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
