import React from 'react';
import { Palette, Shapes, Image, Sliders, Layers } from 'lucide-react';
import { LOGO_PRESETS } from '../utils/qrPresets';

export default function Customizer({ config, setConfig }) {
  const updateConfig = (key, val) => {
    setConfig((prev) => ({ ...prev, [key]: val }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateConfig('logoUrl', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Size & Margin Controls */}
      <div>
        <div className="section-header" style={{ marginBottom: '14px' }}>
          <span className="section-title">
            <Sliders size={18} />
            <span>Size & Spacing</span>
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div className="form-label">
              <span>Size</span>
              <span className="range-val">{config.size}px</span>
            </div>
            <input
              type="range"
              min="160"
              max="600"
              step="10"
              value={config.size}
              onChange={(e) => updateConfig('size', parseInt(e.target.value))}
              className="custom-range"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <div className="form-label">
              <span>Margin</span>
              <span className="range-val">{config.margin}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="2"
              value={config.margin}
              onChange={(e) => updateConfig('margin', parseInt(e.target.value))}
              className="custom-range"
            />
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '16px', marginBottom: 0 }}>
          <div className="form-label">
            <span>Error Correction Level</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Higher correction allows readable logos
            </span>
          </div>
          <select
            className="form-select"
            value={config.errorCorrectionLevel}
            onChange={(e) => updateConfig('errorCorrectionLevel', e.target.value)}
          >
            <option value="L">Low (7% recovery)</option>
            <option value="M">Medium (15% recovery)</option>
            <option value="Q">Quartile (25% recovery)</option>
            <option value="H">High (30% recovery - Recommended for Logos)</option>
          </select>
        </div>
      </div>

      <hr style={{ borderColor: 'var(--border-color)', opacity: 0.5 }} />

      {/* 2. Color & Gradient Styling */}
      <div>
        <div className="section-header" style={{ marginBottom: '14px' }}>
          <span className="section-title">
            <Palette size={18} />
            <span>Color & Gradient</span>
          </span>
          <button
            className="btn-icon"
            onClick={() => updateConfig('useGradient', !config.useGradient)}
          >
            <Layers size={14} />
            <span>{config.useGradient ? 'Using Gradient' : 'Solid Color'}</span>
          </button>
        </div>

        {!config.useGradient ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Foreground Color</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="color"
                  value={config.dotsColor}
                  onChange={(e) => updateConfig('dotsColor', e.target.value)}
                  style={{ width: '42px', height: '42px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'none' }}
                />
                <input
                  type="text"
                  className="form-input"
                  value={config.dotsColor}
                  onChange={(e) => updateConfig('dotsColor', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Background Color</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="color"
                  value={config.bgColor}
                  onChange={(e) => updateConfig('bgColor', e.target.value)}
                  style={{ width: '42px', height: '42px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'none' }}
                />
                <input
                  type="text"
                  className="form-input"
                  value={config.bgColor}
                  onChange={(e) => updateConfig('bgColor', e.target.value)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Gradient Color 1</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="color"
                    value={config.gradientColor1}
                    onChange={(e) => updateConfig('gradientColor1', e.target.value)}
                    style={{ width: '42px', height: '42px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'none' }}
                  />
                  <input
                    type="text"
                    className="form-input"
                    value={config.gradientColor1}
                    onChange={(e) => updateConfig('gradientColor1', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Gradient Color 2</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="color"
                    value={config.gradientColor2}
                    onChange={(e) => updateConfig('gradientColor2', e.target.value)}
                    style={{ width: '42px', height: '42px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'none' }}
                  />
                  <input
                    type="text"
                    className="form-input"
                    value={config.gradientColor2}
                    onChange={(e) => updateConfig('gradientColor2', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Background Color</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="color"
                    value={config.bgColor}
                    onChange={(e) => updateConfig('bgColor', e.target.value)}
                    style={{ width: '42px', height: '42px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'none' }}
                  />
                  <input
                    type="text"
                    className="form-input"
                    value={config.bgColor}
                    onChange={(e) => updateConfig('bgColor', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Gradient Type</label>
                <select
                  className="form-select"
                  value={config.gradientType}
                  onChange={(e) => updateConfig('gradientType', e.target.value)}
                >
                  <option value="linear">Linear</option>
                  <option value="radial">Radial</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <hr style={{ borderColor: 'var(--border-color)', opacity: 0.5 }} />

      {/* 3. Module & Corner Shape Styling */}
      <div>
        <div className="section-header" style={{ marginBottom: '14px' }}>
          <span className="section-title">
            <Shapes size={18} />
            <span>Patterns & Shapes</span>
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Dot Pattern</label>
            <select
              className="form-select"
              value={config.dotsType}
              onChange={(e) => updateConfig('dotsType', e.target.value)}
            >
              <option value="square">Square</option>
              <option value="dots">Dots</option>
              <option value="rounded">Rounded</option>
              <option value="classy">Classy</option>
              <option value="classy-rounded">Classy Rounded</option>
              <option value="extra-rounded">Extra Rounded</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Corner Frame</label>
            <select
              className="form-select"
              value={config.cornersSquareType}
              onChange={(e) => updateConfig('cornersSquareType', e.target.value)}
            >
              <option value="square">Square</option>
              <option value="extra-rounded">Extra Rounded</option>
              <option value="dot">Dot Circle</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Corner Eye</label>
            <select
              className="form-select"
              value={config.cornersDotType}
              onChange={(e) => updateConfig('cornersDotType', e.target.value)}
            >
              <option value="square">Square</option>
              <option value="dot">Dot Circle</option>
            </select>
          </div>
        </div>
      </div>

      <hr style={{ borderColor: 'var(--border-color)', opacity: 0.5 }} />

      {/* 4. Center Logo Overlay */}
      <div>
        <div className="section-header" style={{ marginBottom: '14px' }}>
          <span className="section-title">
            <Image size={18} />
            <span>Center Logo Overlay</span>
          </span>
          {config.logoUrl && (
            <button
              className="btn-icon delete"
              onClick={() => updateConfig('logoUrl', null)}
            >
              <span>Remove Logo</span>
            </button>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Preset Logo Icon</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {LOGO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`preset-card ${config.logoPresetId === preset.id ? 'active' : ''}`}
                style={{ padding: '8px 4px' }}
                onClick={() => {
                  updateConfig('logoPresetId', preset.id);
                  updateConfig('logoUrl', preset.icon);
                  if (preset.id !== 'none') {
                    updateConfig('errorCorrectionLevel', 'H');
                  }
                }}
              >
                {preset.icon ? (
                  <img src={preset.icon} alt={preset.label} style={{ width: '22px', height: '22px', margin: '0 auto 4px auto', display: 'block' }} />
                ) : (
                  <div style={{ height: '22px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>None</div>
                )}
                <span style={{ fontSize: '0.7rem', display: 'block' }}>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Or Upload Custom Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-input"
              style={{ fontSize: '0.8rem', padding: '8px' }}
              onChange={handleLogoUpload}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <div className="form-label">
              <span>Logo Size Ratio</span>
              <span className="range-val">{Math.round((config.logoSize || 0.25) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.38"
              step="0.02"
              value={config.logoSize || 0.25}
              onChange={(e) => updateConfig('logoSize', parseFloat(e.target.value))}
              className="custom-range"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
