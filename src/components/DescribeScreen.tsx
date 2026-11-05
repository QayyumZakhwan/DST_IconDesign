import React from 'react';
import { IconRenderer } from './IconRenderer';

interface DescribeScreenProps {
  iconColor: string;
  iconSymbols: string[];
  iconLabel: string;
  iconDrawing: string | null;
  desc1: string;
  desc3: string;
  onDesc1Change: (desc1: string) => void;
  onDesc3Change: (desc3: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const DescribeScreen: React.FC<DescribeScreenProps> = ({
  iconColor,
  iconSymbols,
  iconLabel,
  iconDrawing,
  desc1,
  desc3,
  onDesc1Change,
  onDesc3Change,
  onBack,
  onSubmit,
}) => {
  const canSubmit = Boolean(desc1.trim() && desc3.trim());

  const previewSyms = iconDrawing ? [] : iconSymbols;
  const previewDraw = iconDrawing || null;

  return (
    <div className="game-screen-wrap">
      <div className="game-screen-inner">
        <div className="screen" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Top Purple Header */}
          <div
            style={{
              background: 'linear-gradient(160deg, #440099 0%, #1a0066 100%)',
              padding: '20px 20px 28px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              {/* Back Button */}
              <button
                type="button"
                onClick={onBack}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: 14,
                  padding: '4px 0',
                  minHeight: 44,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                Back
              </button>

              {/* Small Icon Preview in header */}
              <IconRenderer
                size={56}
                color={iconColor}
                symIds={previewSyms}
                drawing={previewDraw}
                label={iconLabel}
              />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    color: 'rgba(255, 255, 255, 0.55)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}
                >
                  Step 2 of 2
                </div>
                <div
                  style={{
                    color: 'white',
                    fontSize: 19,
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}
                >
                  Tell us about your feature.
                </div>
              </div>

              {/* Both progress pills filled */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <div
                  style={{
                    width: 28,
                    height: 4,
                    borderRadius: 9999,
                    background: '#B2D007',
                  }}
                />
                <div
                  style={{
                    width: 28,
                    height: 4,
                    borderRadius: 9999,
                    background: '#B2D007',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div
            style={{
              padding: '20px 16px 36px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* Question 1 */}
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="desc1-input"
                style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#282829',
                  marginBottom: 8,
                }}
              >
                What does your icon do?
              </label>
              <textarea
                id="desc1-input"
                value={desc1}
                maxLength={100}
                placeholder="Describe the feature..."
                onChange={e => onDesc1Change(e.target.value.slice(0, 100))}
                style={{
                  width: '100%',
                  minHeight: 84,
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #DEE4EF',
                  fontSize: 16,
                  color: '#282829',
                  resize: 'none',
                  boxSizing: 'border-box',
                  outline: 'none',
                  lineHeight: 1.5,
                  transition: 'border-color 0.15s',
                }}
              />
              <div
                style={{
                  textAlign: 'right',
                  fontSize: 11,
                  color: desc1.length >= 100 ? '#E63946' : '#B2B2B2',
                  marginTop: 4,
                  fontWeight: 600,
                }}
              >
                {desc1.length} / 100
              </div>
            </div>

            {/* Question 2 */}
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="desc3-input"
                style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#282829',
                  marginBottom: 8,
                }}
              >
                How does it help MyDST users?
              </label>
              <textarea
                id="desc3-input"
                value={desc3}
                maxLength={100}
                placeholder="What problem does it solve?"
                onChange={e => onDesc3Change(e.target.value.slice(0, 100))}
                style={{
                  width: '100%',
                  minHeight: 84,
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #DEE4EF',
                  fontSize: 16,
                  color: '#282829',
                  resize: 'none',
                  boxSizing: 'border-box',
                  outline: 'none',
                  lineHeight: 1.5,
                  transition: 'border-color 0.15s',
                }}
              />
              <div
                style={{
                  textAlign: 'right',
                  fontSize: 11,
                  color: desc3.length >= 100 ? '#E63946' : '#B2B2B2',
                  marginTop: 4,
                  fontWeight: 600,
                }}
              >
                {desc3.length} / 100
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: 20 }}>
              <button
                type="button"
                onClick={onSubmit}
                disabled={!canSubmit}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: 9999,
                  background: canSubmit ? '#440099' : '#DEE4EF',
                  color: canSubmit ? 'white' : '#9E9FA5',
                  border: 'none',
                  cursor: canSubmit ? 'pointer' : 'default',
                  fontSize: 15,
                  fontWeight: 700,
                  minHeight: 52,
                  transition: 'all 0.15s',
                  boxShadow: canSubmit ? '0 4px 14px rgba(68, 0, 153, 0.25)' : 'none',
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
