import React from 'react';
import { QrCode, Scan, Sparkles, History } from 'lucide-react';

export default function Header({ onOpenScanner, historyCount, onScrollToHistory }) {
  return (
    <header className="glass-card app-header">
      <div className="logo-group">
        <div className="logo-badge">
          <QrCode size={24} />
        </div>
        <div className="logo-text">
          <h1>QR Studio</h1>
          <span>Generate. Customize. Share.</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button 
          className="btn-secondary"
          onClick={onScrollToHistory}
          style={{ width: 'auto', padding: '10px 16px' }}
        >
          <History size={16} />
          <span>History ({historyCount})</span>
        </button>

        <button 
          className="btn-primary" 
          onClick={onOpenScanner}
          style={{ width: 'auto', padding: '10px 20px', fontSize: '0.9rem' }}
        >
          <Scan size={18} />
          <span>QR Scanner</span>
        </button>
      </div>
    </header>
  );
}
