import React from 'react';
import { X, Palette, Check, Sparkles, Moon } from 'lucide-react';

export const ACCENT_THEMES = [
  { id: 'indigo', name: 'Electric Indigo', primary: '#6366f1', secondary: '#8b5cf6' },
  { id: 'cyan', name: 'Cyber Cyan', primary: '#06b6d4', secondary: '#3b82f6' },
  { id: 'emerald', name: 'Emerald Mint', primary: '#10b981', secondary: '#059669' },
  { id: 'rose', name: 'Neon Rose', primary: '#f43f5e', secondary: '#ec4899' },
  { id: 'amber', name: 'Amber Gold', primary: '#f59e0b', secondary: '#d97706' }
];

export const BACKGROUND_THEMES = [
  { id: 'dark-glass', name: 'Dark Glassmorphic', bg: '#0a0d14', card: 'rgba(20, 27, 41, 0.7)' },
  { id: 'oled-black', name: 'OLED Pure Black', bg: '#020408', card: 'rgba(12, 16, 24, 0.85)' },
  { id: 'slate-studio', name: 'Slate Studio', bg: '#0f172a', card: 'rgba(30, 41, 59, 0.75)' },
  { id: 'cyber-purple', name: 'Deep Cyber Purple', bg: '#0b0716', card: 'rgba(24, 15, 42, 0.8)' }
];

export default function ThemeCustomizerModal({ isOpen, onClose, siteTheme, setSiteTheme, showToast }) {
  if (!isOpen) return null;

  const applyAccent = (accent) => {
    document.documentElement.style.setProperty('--accent-primary', accent.primary);
    document.documentElement.style.setProperty('--accent-secondary', accent.secondary);
    setSiteTheme((prev) => ({ ...prev, accentId: accent.id }));
    showToast(`Applied ${accent.name} site accent!`);
  };

  const applyBackground = (bgTheme) => {
    document.documentElement.style.setProperty('--bg-primary', bgTheme.bg);
    document.documentElement.style.setProperty('--bg-card', bgTheme.card);
    setSiteTheme((prev) => ({ ...prev, bgId: bgTheme.id }));
    showToast(`Switched to ${bgTheme.name} background atmosphere!`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Palette size={22} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Website Theme & Accents</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          As a signed-in member, customize the website look, accent glow, and background atmosphere.
        </p>

        {/* Accent Color Themes */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', display: 'block', marginBottom: '10px' }}>
            Site Accent Glow Theme
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {ACCENT_THEMES.map((acc) => {
              const isActive = siteTheme.accentId === acc.id;
              return (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => applyAccent(acc)}
                  style={{
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-input)',
                    border: `1px solid ${isActive ? acc.primary : 'var(--border-color)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${acc.primary}, ${acc.secondary})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}>
                    {isActive && <Check size={14} />}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>{acc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Background Atmosphere Themes */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', display: 'block', marginBottom: '10px' }}>
            Background Atmosphere
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {BACKGROUND_THEMES.map((bgT) => {
              const isActive = siteTheme.bgId === bgT.id;
              return (
                <button
                  key={bgT.id}
                  type="button"
                  onClick={() => applyBackground(bgT)}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: bgT.bg,
                    border: `1px solid ${isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.15)'}`,
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <Moon size={16} style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>{bgT.name}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button className="btn-primary" onClick={onClose} style={{ width: '100%' }}>
          Done Customizing
        </button>
      </div>
    </div>
  );
}
