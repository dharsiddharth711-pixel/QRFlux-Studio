import React from 'react';
import { Phone } from 'lucide-react';

export default function PhoneForm({ value, onChange }) {
  const handlePhoneChange = (num) => {
    // Extract raw phone format
    onChange(num);
  };

  const rawNum = value.replace('tel:', '');

  return (
    <div className="form-group">
      <label className="form-label">Phone Number</label>
      <div style={{ position: 'relative' }}>
        <Phone 
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
          type="tel"
          className="form-input"
          style={{ paddingLeft: '44px' }}
          placeholder="+1 (555) 000-0000"
          value={rawNum}
          onChange={(e) => handlePhoneChange(`tel:${e.target.value}`)}
        />
      </div>
    </div>
  );
}
