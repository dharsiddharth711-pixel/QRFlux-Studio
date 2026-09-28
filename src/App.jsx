import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ContentTabs from './components/ContentTabs';
import UrlForm from './components/Forms/UrlForm';
import TextForm from './components/Forms/TextForm';
import EmailForm from './components/Forms/EmailForm';
import PhoneForm from './components/Forms/PhoneForm';
import WifiForm from './components/Forms/WifiForm';
import Customizer from './components/Customizer';
import PresetSelector from './components/PresetSelector';
import LivePreview from './components/LivePreview';
import RecentHistory from './components/RecentHistory';
import QrScannerModal from './components/QrScannerModal';
import AuthModal from './components/AuthModal';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('url');

  // Form input contents
  const [urlContent, setUrlContent] = useState('');
  const [textContent, setTextContent] = useState('');
  const [emailPayload, setEmailPayload] = useState('');
  const [phonePayload, setPhonePayload] = useState('');
  const [wifiPayload, setWifiPayload] = useState('');

  // User Authentication state
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('qr_flux_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Active configuration state
  const [config, setConfig] = useState({
    size: 260,
    margin: 10,
    errorCorrectionLevel: 'M',
    dotsColor: '#000000',
    bgColor: '#ffffff',
    dotsType: 'square',
    cornersSquareType: 'square',
    cornersDotType: 'square',
    useGradient: false,
    gradientType: 'linear',
    gradientColor1: '#6366f1',
    gradientColor2: '#06b6d4',
    gradientAngle: 0,
    logoUrl: null,
    logoPresetId: 'none',
    logoSize: 0.25,
    presetId: 'classic'
  });

  // Recent History state initialized from localStorage
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('qr_studio_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Modals & Toasts
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Save history & user to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('qr_studio_history', JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  }, [history]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('qr_flux_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('qr_flux_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Show Toast notification helper
  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleLoginSuccess = (userObj) => {
    setUser(userObj);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Signed out of account.');
  };

  // Get active payload text based on active tab
  const getActivePayload = () => {
    switch (activeTab) {
      case 'url': return urlContent;
      case 'text': return textContent;
      case 'email': return emailPayload;
      case 'phone': return phonePayload;
      case 'wifi': return wifiPayload;
      default: return urlContent;
    }
  };

  // Save to recent
  const handleSaveToRecent = (newItem) => {
    setHistory((prev) => [newItem, ...prev.slice(0, 19)]);
    showToast('Saved QR code to Recent History!');
  };

  // Reuse saved item
  const handleReuseHistory = (item) => {
    setActiveTab(item.type);
    if (item.type === 'url') setUrlContent(item.content);
    else if (item.type === 'text') setTextContent(item.content);

    if (item.config) {
      setConfig((prev) => ({ ...prev, ...item.config }));
    }
    showToast(`Loaded ${item.type.toUpperCase()} payload and design settings into Studio!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete history item
  const handleDeleteHistory = (id) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
    showToast('Deleted item from history.');
  };

  // Clear all history
  const handleClearHistory = () => {
    setHistory([]);
    showToast('Cleared all history items.');
  };

  // Select Quick Preset
  const handleSelectPreset = (preset) => {
    setConfig((prev) => ({
      ...prev,
      dotsColor: preset.dotsColor,
      bgColor: preset.bgColor,
      dotsType: preset.dotsType,
      cornersSquareType: preset.cornersSquareType,
      cornersDotType: preset.cornersDotType,
      useGradient: preset.useGradient,
      gradientType: preset.gradientType || 'linear',
      gradientColor1: preset.gradientColor1 || '#6366f1',
      gradientColor2: preset.gradientColor2 || '#06b6d4',
      presetId: preset.id
    }));
    showToast(`Applied "${preset.name}" preset!`);
  };

  // Load scanner result into studio
  const handleLoadScannerResult = (text) => {
    if (text.startsWith('http://') || text.startsWith('https://')) {
      setActiveTab('url');
      setUrlContent(text);
    } else {
      setActiveTab('text');
      setTextContent(text);
    }
    showToast('Loaded scanned text into QR Studio generator!');
  };

  const scrollToHistory = () => {
    const el = document.getElementById('history-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Navbar Header */}
      <Header
        onOpenScanner={() => setIsScannerOpen(true)}
        historyCount={history.length}
        onScrollToHistory={scrollToHistory}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="badge-tag">
          <Sparkles size={14} />
          <span>QR CODE DESIGNER STUDIO</span>
        </div>
        <h2 className="hero-title">Create beautiful QR codes</h2>
        <p className="hero-subtitle">
          Generate customizable QR codes for links, text, emails, phone numbers and Wi-Fi networks with luxury themes and high-res vector exports.
        </p>
      </div>

      {/* Studio Main Grid */}
      <div className="studio-grid">
        {/* Left Column Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
              QR Content
            </h3>

            {/* Type Switcher Tabs */}
            <ContentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Content Input Forms */}
            {activeTab === 'url' && <UrlForm value={urlContent} onChange={setUrlContent} />}
            {activeTab === 'text' && <TextForm value={textContent} onChange={setTextContent} />}
            {activeTab === 'email' && <EmailForm onChange={setEmailPayload} />}
            {activeTab === 'phone' && <PhoneForm value={phonePayload} onChange={setPhonePayload} />}
            {activeTab === 'wifi' && <WifiForm onChange={setWifiPayload} />}
          </div>

          {/* Customizer Panel */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div className="section-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>Customization</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700, letterSpacing: '0.05em' }}>
                DESIGN ENGINE
              </span>
            </div>

            <Customizer config={config} setConfig={setConfig} />

            {/* Presets Selector */}
            <PresetSelector
              activePresetId={config.presetId}
              onSelectPreset={handleSelectPreset}
            />
          </div>
        </div>

        {/* Right Column Sticky Live Preview */}
        <div>
          <LivePreview
            config={config}
            payloadContent={getActivePayload()}
            payloadType={activeTab}
            onSaveToRecent={handleSaveToRecent}
            showToast={showToast}
          />
        </div>
      </div>

      {/* Polished Recent History Section */}
      <RecentHistory
        history={history}
        onReuse={handleReuseHistory}
        onDelete={handleDeleteHistory}
        onClearAll={handleClearHistory}
        showToast={showToast}
      />

      {/* Scanner Modal */}
      <QrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onLoadIntoStudio={handleLoadScannerResult}
        showToast={showToast}
      />

      {/* Auth Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        showToast={showToast}
      />

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.8rem',
        color: 'var(--text-dim)'
      }}>
        <div>QRFlux Studio • Create QR codes quickly and easily</div>
        <div>Built with React & Vite</div>
      </footer>
    </div>
  );
}
