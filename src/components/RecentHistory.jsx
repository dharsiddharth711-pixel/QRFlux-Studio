import React from 'react';
import { History, RefreshCw, Trash2, Download, ExternalLink, Inbox } from 'lucide-react';

export default function RecentHistory({ history, onReuse, onDelete, onClearAll, showToast }) {
  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' });
    } catch (e) {
      return isoString;
    }
  };

  const handleDownloadThumb = (item) => {
    const link = document.createElement('a');
    link.href = item.thumb;
    link.download = `qr-code-${item.type}-${Date.now()}.png`;
    link.click();
    showToast('Downloaded saved QR code!');
  };

  return (
    <div className="glass-card" style={{ padding: '28px', marginTop: '36px' }} id="history-section">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <History size={20} style={{ color: 'var(--accent-primary)' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>Saved History</h2>
          <span style={{ 
            fontSize: '0.78rem', 
            padding: '2px 8px', 
            borderRadius: '999px', 
            background: 'rgba(99, 102, 241, 0.15)', 
            color: 'var(--accent-primary)',
            fontWeight: 700 
          }}>
            {history.length}
          </span>
        </div>

        {history.length > 0 && (
          <button className="btn-icon delete" onClick={onClearAll}>
            <Trash2 size={14} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div style={{
          padding: '48px 20px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-dim)'
          }}>
            <Inbox size={26} />
          </div>
          <p style={{ fontSize: '0.95rem' }}>No saved QR codes yet.</p>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Click "Save to Recent" under the preview to store your custom designs here.
          </span>
        </div>
      ) : (
        <div className="history-grid">
          {history.map((item) => (
            <div key={item.id} className="history-card">
              <div className="history-thumb">
                <img src={item.thumb} alt="QR Thumbnail" />
              </div>

              <div className="history-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(99, 102, 241, 0.2)',
                    color: 'var(--accent-primary)',
                    textTransform: 'uppercase'
                  }}>
                    {item.type}
                  </span>
                  <span className="history-meta">{formatDate(item.timestamp)}</span>
                </div>

                <div className="history-title" title={item.content}>
                  {item.content}
                </div>

                <div className="history-actions">
                  <button 
                    className="btn-icon"
                    onClick={() => onReuse(item)}
                    title="Reuse these settings & content"
                  >
                    <RefreshCw size={12} />
                    <span>Reuse</span>
                  </button>

                  <button 
                    className="btn-icon"
                    onClick={() => handleDownloadThumb(item)}
                    title="Download PNG"
                  >
                    <Download size={12} />
                    <span>Download</span>
                  </button>

                  <button 
                    className="btn-icon delete"
                    onClick={() => onDelete(item.id)}
                    title="Delete item"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
