import React from 'react';
import { PRESETS } from '../utils/qrPresets';
import { Sparkles } from 'lucide-react';

export default function PresetSelector({ activePresetId, onSelectPreset }) {
  return (
    <div style={{ marginTop: '24px' }}>
      <div className="section-header" style={{ marginBottom: '12px' }}>
        <span className="section-title" style={{ fontSize: '1rem' }}>
          <Sparkles size={16} />
          <span>Quick Style Presets</span>
        </span>
      </div>

      <div className="presets-grid">
        {PRESETS.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <div
              key={preset.id}
              className={`preset-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectPreset(preset)}
            >
              <div 
                className="preset-preview" 
                style={{ 
                  backgroundColor: preset.previewBg,
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {/* Mini representation of QR code pattern */}
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
