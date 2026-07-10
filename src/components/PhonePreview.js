import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function PhonePreview() {
  const { currentTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const iframeRef = useRef(null);

  const phoneDevices = [
    { name: 'iPhone 14 Pro', width: 390, height: 844, ratio: '19.5:9' },
    { name: 'Samsung Galaxy S23', width: 384, height: 854, ratio: '19.5:9' },
    { name: 'iPhone 13', width: 390, height: 844, ratio: '19.5:9' },
    { name: 'Google Pixel 7', width: 393, height: 851, ratio: '19.5:9' }
  ];

  const [selectedDevice, setSelectedDevice] = useState(phoneDevices[0]);

  const handleUrlChange = (newUrl) => {
    setCurrentUrl(newUrl);
    if (iframeRef.current) {
      iframeRef.current.src = newUrl;
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      background: currentTheme.background,
      border: `2px solid ${currentTheme.border}`,
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      transition: 'all 0.3s ease',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: currentTheme.surface,
        padding: '12px 16px',
        borderBottom: `1px solid ${currentTheme.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: currentTheme.text
          }}>📱 Mobile Preview</span>
          <select
            value={selectedDevice.name}
            onChange={(e) => setSelectedDevice(phoneDevices.find(d => d.name === e.target.value))}
            style={{
              background: currentTheme.background,
              color: currentTheme.text,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '12px'
            }}
          >
            {phoneDevices.map(device => (
              <option key={device.name} value={device.name}>
                {device.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={refreshPreview}
            style={{
              background: currentTheme.accent,
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = currentTheme.accentHover}
            onMouseOut={(e) => e.target.style.background = currentTheme.accent}
          >
            🔄
          </button>
          <button
            onClick={toggleExpand}
            style={{
              background: currentTheme.accent,
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = currentTheme.accentHover}
            onMouseOut={(e) => e.target.style.background = currentTheme.accent}
          >
            {isExpanded ? '📉' : '📱'}
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('phone-preview-container');
              if (element) {
                element.style.display = element.style.display === 'none' ? 'block' : 'none';
              }
            }}
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Device Info */}
      <div style={{
        padding: '8px 16px',
        background: currentTheme.surface,
        borderBottom: `1px solid ${currentTheme.border}`,
        fontSize: '11px',
        color: currentTheme.textSecondary
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{selectedDevice.name}</span>
          <span>{selectedDevice.ratio}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{selectedDevice.width} × {selectedDevice.height}px</span>
          <span>Mobile View</span>
        </div>
      </div>

      {/* Phone Frame */}
      <div style={{
        padding: '20px',
        background: currentTheme.background,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        transition: 'all 0.3s ease'
      }}>
        <div
          id="phone-preview-container"
          style={{
            position: 'relative',
            width: isExpanded ? '100%' : `${selectedDevice.width}px`,
            height: isExpanded ? '600px' : `${selectedDevice.height}px`,
            background: '#000',
            borderRadius: isExpanded ? '12px' : '36px',
            border: '8px solid #222',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Phone Notch */}
          {!isExpanded && (
            <div style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '150px',
              height: '28px',
              background: '#000',
              borderRadius: '0 0 20px 20px',
              zIndex: 10
            }} />
          )}

          {/* iframe with app */}
          <iframe
            ref={iframeRef}
            src={currentUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: isExpanded ? '12px' : '28px',
              background: '#fff'
            }}
            title="Mobile App Preview"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </div>

      {/* URL Input */}
      <div style={{
        padding: '12px 16px',
        background: currentTheme.surface,
        borderTop: `1px solid ${currentTheme.border}`
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '12px',
            color: currentTheme.textSecondary,
            minWidth: '60px'
          }}>URL:</span>
          <input
            type="url"
            value={currentUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="Enter URL to preview..."
            style={{
              flex: 1,
              background: currentTheme.background,
              color: currentTheme.text,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '12px',
              outline: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PhonePreview;
