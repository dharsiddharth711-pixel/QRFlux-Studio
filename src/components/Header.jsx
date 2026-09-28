import React, { useState } from 'react';
import { Scan, History, LogIn, LogOut, Crown, ChevronDown, Palette, Zap } from 'lucide-react';

export default function Header({ 
  onOpenScanner, 
  historyCount, 
  onScrollToHistory, 
  onOpenAuth, 
  user, 
  onLogout,
  trialsLeft,
  onOpenThemeModal
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="glass-card app-header">
      <div className="logo-group">
        <div className="logo-badge" style={{ padding: 0, overflow: 'hidden', background: 'none' }}>
          <img src="/logo.png" alt="QRFlux Studio Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
        </div>
        <div className="logo-text">
          <h1>QRFlux Studio</h1>
          <span>Generate. Customize. Share.</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {/* Trial Badge for Guest Users */}
        {!user && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '999px',
            background: trialsLeft > 0 ? 'rgba(245, 158, 11, 0.12)' : 'rgba(244, 63, 94, 0.15)',
            border: `1px solid ${trialsLeft > 0 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(244, 63, 94, 0.4)'}`,
            fontSize: '0.78rem',
            fontWeight: 700,
            color: trialsLeft > 0 ? 'var(--accent-amber)' : 'var(--accent-rose)'
          }}>
            <Zap size={14} />
            <span>{trialsLeft > 0 ? `Free Trials: ${trialsLeft} / 5 left` : '0 Trials Left'}</span>
          </div>
        )}

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
          style={{ width: 'auto', padding: '10px 18px', fontSize: '0.9rem' }}
        >
          <Scan size={18} />
          <span>QR Scanner</span>
        </button>

        {/* Theme Customizer Trigger for Signed-in Users */}
        {user && (
          <button
            className="btn-secondary"
            onClick={onOpenThemeModal}
            title="Customize Website Theme & Glow Accents"
            style={{ width: 'auto', padding: '10px 14px' }}
          >
            <Palette size={16} style={{ color: 'var(--accent-primary)' }} />
            <span>Theme</span>
          </button>
        )}

        {!user ? (
          <button 
            className="btn-secondary"
            onClick={onOpenAuth}
            style={{ 
              width: 'auto', 
              padding: '10px 18px',
              borderColor: 'var(--accent-primary)',
              color: '#fff',
              background: 'rgba(99, 102, 241, 0.15)'
            }}
          >
            <LogIn size={16} style={{ color: 'var(--accent-primary)' }} />
            <span>Sign In</span>
          </button>
        ) : (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 12px 6px 8px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: '999px',
                cursor: 'pointer',
                color: '#fff'
              }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#fff' }}
              />
              <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>{user.name}</span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, var(--accent-amber), var(--accent-rose))',
                color: '#fff'
              }}>
                PRO v2.4
              </span>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </button>

            {dropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  width: '240px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  padding: '14px',
                  zIndex: 100
                }}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div style={{ paddingBottom: '10px', marginBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>{user.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '0.72rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                    <Crown size={12} />
                    <span>Pro Account Edition (v2.4.0)</span>
                  </div>
                </div>

                <button
                  className="btn-secondary"
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenThemeModal();
                  }}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '0.85rem', marginBottom: '6px' }}
                >
                  <Palette size={14} />
                  <span>Customize Site Theme</span>
                </button>

                <button
                  className="btn-secondary"
                  onClick={() => {
                    onLogout();
                    setDropdownOpen(false);
                  }}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '0.85rem', color: 'var(--accent-rose)' }}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
