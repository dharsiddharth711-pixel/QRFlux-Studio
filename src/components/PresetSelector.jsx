import React from 'react';
import { PRESETS } from '../utils/qrPresets';
import { Sparkles, Lock } from 'lucide-react';

export default function PresetSelector({ activePresetId, onSelectPreset, isLoggedIn, onOpenAuth }) {
  return (
    <div style={{ marginTop: '24px' }}>
      <div className="section-header" style={{ marginBottom: '12px' }}>
        <span className="section-title" style={{ fontSize: '1rem' }}>
          <Sparkles size={16} />
          <span>Quick Style Presets</span>
        </span>
        {!isLoggedIn && (
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
            First 2 Free
          </span>
        )}
      </div>

      <div className="presets-grid">
        {PRESETS.map((preset, index) => {
          const isActive = activePresetId === preset.id;
          const isLocked = !isLoggedIn && index >= 2;

          return (
            <div
              key={preset.id}
              className={`preset-card ${isActive ? 'active' : ''}`}
              style={{
                position: 'relative',
                opacity: isLocked ? 0.65 : 1,
                cursor: 'pointer'
              }}
              onClick={() => {
                if (isLocked) {
                  onOpenAuth();
                } else {
                  onSelectPreset(preset);
                }
              }}
            >
              {isLocked && (
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  background: 'rgba(245, 158, 11, 0.9)',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000'
                }}>
                  <Lock size={10} />
                </div>
              )}

              <div 
                className="preset-preview" 
                style={{ 
                  backgroundColor: preset.previewBg,
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div style={{ 
                  width: '28px', 
                  height: '28px', 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '3px' 
                }}>
                  <div style={{ background: preset.previewFg, borderRadius: '2px' }} />
                  <div style={{ background: preset.previewFg, borderRadius: '2px' }} />
                  <div style={{ background: 'transparent' }} />
                  <div style={{ background: 'transparent' }} />
                  <div style={{ background: preset.previewFg, borderRadius: '2px' }} />
                  <div style={{ background: preset.previewFg, borderRadius: '2px' }} />
                  <div style={{ background: preset.previewFg, borderRadius: '2px' }} />
                  <div style={{ background: 'transparent' }} />
                  <div style={{ background: preset.previewFg, borderRadius: '2px' }} />
                </div>
              </div>
              <div className="preset-name">{preset.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
