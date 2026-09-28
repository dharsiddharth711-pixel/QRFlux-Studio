import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function WifiForm({ onChange }) {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [hidden, setHidden] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!ssid) {
      onChange('');
      return;
    }
    const hiddenStr = hidden ? 'H:true;' : '';
    const wifiStr = `WIFI:S:${ssid};T:${encryption};P:${password};${hiddenStr};`;
    onChange(wifiStr);
  }, [ssid, password, encryption, hidden, onChange]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">Network Name (SSID)</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. MyWiFi_5G"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="WiFi Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={encryption === 'nopass'}
            />
            {encryption !== 'nopass' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Security Type</label>
          <select
            className="form-select"
            value={encryption}
            onChange={(e) => setEncryption(e.target.value)}
          >
            <option value="WPA">WPA / WPA2 / WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">None (Open)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
        <input
          type="checkbox"
          id="hidden-wifi"
          checked={hidden}
          onChange={(e) => setHidden(e.target.checked)}
          style={{ accentColor: 'var(--accent-primary)', width: '16px', height: '16px', cursor: 'pointer' }}
        />
        <label htmlFor="hidden-wifi" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
          Hidden SSID network
        </label>
      </div>
    </div>
  );
}
