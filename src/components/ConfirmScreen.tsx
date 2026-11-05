import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { IconRenderer } from './IconRenderer';

interface ConfirmScreenProps {
  iconColor: string;
  iconSymbols: string[];
  iconLabel: string;
  iconDrawing: string | null;
  onViewGallery: () => void;
  onStartOver: () => void;
}

export const ConfirmScreen: React.FC<ConfirmScreenProps> = ({
  iconColor,
  iconSymbols,
  iconLabel,
  iconDrawing,
  onViewGallery,
  onStartOver,
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#440099', '#B2D007', '#E63946', '#2196F3', '#F4B400'],
      });
    } catch {
      // ignore
    }
  }, []);

  const previewSyms = iconDrawing ? [] : iconSymbols;
  const previewDraw = iconDrawing || null;

  return (
    <div className="game-screen-wrap">
      <div className="game-screen-inner">
        <div
          className="screen"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '40px 24px',
            textAlign: 'center',
          }}
        >
          {/* Green Pop Checkmark */}
          <div
            className="pop"
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: '#B2D007',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              boxShadow: '0 8px 24px rgba(178, 208, 7, 0.4)',
            }}
          >
            <svg width="38" height="38" viewBox="0 0 24 24" fill="white">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>

          {/* Large Icon Preview */}
          <div style={{ marginBottom: 28 }}>
            <IconRenderer
              size={160}
              color={iconColor}
              symIds={previewSyms}
              drawing={previewDraw}
              label={iconLabel}
            />
          </div>

          {/* Success Titles */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: '#282829',
              marginBottom: 8,
            }}
          >
            Your icon is live!
          </div>
          <div
            style={{
              fontSize: 13,
              color: '#9E9FA5',
              marginBottom: 36,
            }}
          >
            It will appear on the gallery wall shortly.
          </div>

          {/* View Gallery Wall Action */}
          <button
            type="button"
            onClick={onViewGallery}
            style={{
              display: 'block',
              width: '100%',
              maxWidth: 320,
              padding: 16,
              background: '#440099',
              color: 'white',
              border: 'none',
              borderRadius: 9999,
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              marginBottom: 12,
              boxShadow: '0 4px 16px rgba(68, 0, 153, 0.3)',
              transition: 'transform 0.15s',
            }}
          >
            View Gallery Wall
          </button>

          {/* Start Over Button */}
          <button
            type="button"
            onClick={onStartOver}
            style={{
              background: 'none',
              border: 'none',
              color: '#9E9FA5',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              padding: '12px 20px',
              minHeight: 44,
            }}
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};
