import React from 'react';
import { Globe } from 'lucide-react';

export default function UrlForm({ value, onChange }) {
  return (
    <div className="form-group">
      <label className="form-label">
        <span>Website URL</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>https:// format</span>
      </label>
      <div style={{ position: 'relative' }}>
        <Globe 
          size={18} 
          style={{ 
            position: 'absolute', 
            left: '14px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: 'var(--text-muted)' 
          }} 
        />
        <input
          type="url"
          className="form-input"
          style={{ paddingLeft: '44px' }}
          placeholder="https://example.com"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
