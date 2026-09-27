import React from 'react';

export default function TextForm({ value, onChange }) {
  return (
    <div className="form-group">
      <label className="form-label">
        <span>Plain Text / Message</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{value.length} characters</span>
      </label>
      <textarea
        className="form-input"
        style={{ minHeight: '90px', resize: 'vertical' }}
        placeholder="Enter your custom text message here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
