import React from 'react';
import { Smartphone, CreditCard, Layout } from 'lucide-react';

export default function MockupViewer({ mockupMode, setMockupMode, children, payloadType }) {
  return (
    <div style={{ width: '100%' }}>
      {/* Mockup Mode Selector */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '16px' }}>
        <button
          className={`btn-icon ${mockupMode === 'canvas' ? 'active' : ''}`}
          onClick={() => setMockupMode('canvas')}
          style={{ background: mockupMode === 'canvas' ? 'var(--accent-primary)' : undefined, color: mockupMode === 'canvas' ? '#fff' : undefined }}
        >
          <Layout size={14} />
          <span>Canvas View</span>
        </button>

        <button
          className={`btn-icon ${mockupMode === 'phone' ? 'active' : ''}`}
          onClick={() => setMockupMode('phone')}
          style={{ background: mockupMode === 'phone' ? 'var(--accent-primary)' : undefined, color: mockupMode === 'phone' ? '#fff' : undefined }}
        >
          <Smartphone size={14} />
          <span>Phone Screen</span>
        </button>

        <button
          className={`btn-icon ${mockupMode === 'card' ? 'active' : ''}`}
          onClick={() => setMockupMode('card')}
          style={{ background: mockupMode === 'card' ? 'var(--accent-primary)' : undefined, color: mockupMode === 'card' ? '#fff' : undefined }}
        >
          <CreditCard size={14} />
          <span>Business Card</span>
        </button>
      </div>

      {/* Render Mockup View Container */}
      {mockupMode === 'canvas' && (
        <div className="canvas-viewport">
          <div className="live-pill">
            <span className="live-dot" />
            <span>LIVE</span>
          </div>
          {children}
        </div>
      )}

      {mockupMode === 'phone' && (
        <div style={{
          width: '280px',
          height: '480px',
          margin: '0 auto 24px auto',
          background: '#090d16',
          borderRadius: '36px',
          border: '6px solid #1f293d',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 16px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Phone Notch */}
          <div style={{ width: '90px', height: '14px', background: '#1f293d', borderRadius: '0 0 10px 10px' }} />

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: '700', letterSpacing: '0.05em' }}>SCAN TO ACCESS</div>
            <div style={{ fontSize: '1rem', fontWeight: '800', color: '#fff', marginTop: '2px' }}>{payloadType.toUpperCase()} PASS</div>
          </div>

          <div style={{ width: '180px', height: '180px', background: '#fff', padding: '8px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {children}
          </div>

          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Point phone camera to scan instantly</div>
          </div>

          {/* Home indicator bar */}
          <div style={{ width: '100px', height: '4px', background: '#334155', borderRadius: '2px' }} />
        </div>
      )}

      {mockupMode === 'card' && (
        <div style={{
          width: '340px',
          height: '200px',
          margin: '0 auto 24px auto',
          background: 'linear-gradient(135deg, #1e293b, #0f172a)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>Alex Rivera</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: '600' }}>Creative Technologist</div>
            <div style={{ marginTop: '20px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>alex.rivera@studio.design</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>+1 (555) 234-5678</div>
          </div>

          <div style={{ width: '110px', height: '110px', background: '#fff', padding: '6px', borderRadius: '10px' }}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
