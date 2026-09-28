import React from 'react';
import { X, Sparkles, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TrialLimitModal({ isOpen, onClose, onOpenAuth }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', textAlign: 'center' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-amber)',
          margin: '0 auto 16px auto'
        }}>
          <Lock size={28} />
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
          5 Free Trial Generations Used!
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          You have reached the maximum 5 free QR code generations for non-logged-in guest users.
        </p>

        <div style={{
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          textAlign: 'left',
          marginBottom: '24px',
          fontSize: '0.82rem',
          color: 'var(--text-main)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontWeight: 700 }}>
            <ShieldCheck size={16} />
            <span>Sign In to Unlock Pro Access Immediately:</span>
          </div>
          <div>✨ <strong>Unlimited</strong> QR Code Generations & Scans</div>
          <div>✨ Unlock <strong>All 6 Preset Themes</strong></div>
          <div>✨ Embed <strong>Custom Logos</strong> (WhatsApp, Instagram, Wi-Fi, etc.)</div>
          <div>✨ Customize <strong>Website Theme & Glow Accents</strong></div>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            onClose();
            onOpenAuth();
          }}
          style={{ width: '100%', marginBottom: '10px' }}
        >
          <span>Sign In / Create Account (Free)</span>
          <ArrowRight size={18} />
        </button>

        <button className="btn-secondary" onClick={onClose} style={{ width: '100%' }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
