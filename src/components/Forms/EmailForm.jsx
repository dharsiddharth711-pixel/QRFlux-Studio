import React, { useState, useEffect } from 'react';

export default function EmailForm({ onChange }) {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (!email && !subject && !body) {
      onChange('');
      return;
    }
    const mailtoStr = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onChange(mailtoStr);
  }, [email, subject, body, onChange]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">Recipient Email</label>
        <input
          type="email"
          className="form-input"
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">Subject</label>
        <input
          type="text"
          className="form-input"
          placeholder="Email Subject Line"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">Body Message</label>
        <textarea
          className="form-input"
          style={{ minHeight: '70px', resize: 'vertical' }}
          placeholder="Enter pre-filled email message..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
    </div>
  );
}
