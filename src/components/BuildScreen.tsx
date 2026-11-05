import React from 'react';
import { IconRenderer } from './IconRenderer';
import { DrawingCanvas } from './DrawingCanvas';
import { COLORS, SYMBOLS } from '../constants';
import { IconMode } from '../types';

interface BuildScreenProps {
  iconColor: string;
  iconSymbols: string[];
  iconLabel: string;
  iconMode: IconMode;
  iconDrawing: string | null;
  brushSize: number;
  drawTool: 'pen' | 'eraser';
  drawColor: string;
  onColorChange: (color: string) => void;
  onSymbolsChange: (symbols: string[]) => void;
  onLabelChange: (label: string) => void;
  onModeChange: (mode: IconMode) => void;
  onDrawingChange: (drawing: string | null) => void;
  onToolChange: (tool: 'pen' | 'eraser') => void;
  onDrawColorChange: (color: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export const BuildScreen: React.FC<BuildScreenProps> = ({
  iconColor,
  iconSymbols,
  iconLabel,
  iconMode,
  iconDrawing,
  brushSize,
  drawTool,
  drawColor,
  onColorChange,
  onSymbolsChange,
  onLabelChange,
  onModeChange,
  onDrawingChange,
  onToolChange,
  onDrawColorChange,
  onBack,
  onNext,
}) => {
  const hasSymbolOrDrawing = iconMode === 'symbol' ? iconSymbols.length > 0 : Boolean(iconDrawing);
  const canNext = Boolean(iconLabel.trim() && hasSymbolOrDrawing);

  const previewSyms = iconDrawing ? [] : iconSymbols;
  const previewDraw = iconDrawing || null;

  const handleSymbolClick = (symId: string) => {
    onModeChange('symbol');
    const isSelected = iconSymbols.includes(symId);
    onSymbolsChange(isSelected ? [] : [symId]);
  };

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

              {/* Progress Bar Indicator */}
              <div style={{ display: 'flex', gap: 6 }}>
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
                    background: 'rgba(255, 255, 255, 0.3)',
                  }}
                />
              </div>
            </div>

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
              Step 1 of 2
            </div>
            <div
              style={{
                color: 'white',
                fontSize: 19,
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              Design a feature you think MyDST needs.
            </div>
          </div>

          {/* Body Content */}
          <div
            style={{
              padding: '20px 16px 36px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
              overflowY: 'auto',
            }}
          >
            {/* Large Preview */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <IconRenderer
                size={160}
                color={iconColor}
                symIds={previewSyms}
                drawing={previewDraw}
                label={iconLabel}
              />
            </div>

            {/* Background Colour Grid */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#282829',
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}
              >
                Background Colour
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {COLORS.map(c => {
                  const isSelected = iconColor === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => onColorChange(c)}
                      title={c}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: c,
                        cursor: 'pointer',
                        flexShrink: 0,
                        border: 'none',
                        boxShadow: isSelected
                          ? `0 0 0 3px white, 0 0 0 5.5px ${c}`
                          : '0 2px 4px rgba(0,0,0,0.12)',
                        transition: 'box-shadow 0.15s, transform 0.1s',
                        transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Mode Switch Tabs & Sections */}
            <div>
              <div
                style={{
                  display: 'flex',
                  gap: 4,
                  background: '#F0F2F5',
                  borderRadius: 12,
                  padding: 4,
                  marginBottom: 16,
                }}
              >
                <button
                  type="button"
                  onClick={() => onModeChange('symbol')}
                  style={{
                    flex: 1,
                    padding: '10px 8px',
                    borderRadius: 10,
                    background: iconMode === 'symbol' ? '#440099' : 'transparent',
                    color: iconMode === 'symbol' ? 'white' : '#6B6C6F',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    transition: 'all 0.15s',
                    minHeight: 44,
                  }}
                >
                  Choose Symbols
                </button>
                <button
                  type="button"
                  onClick={() => onModeChange('draw')}
                  style={{
                    flex: 1,
                    padding: '10px 8px',
                    borderRadius: 10,
                    background: iconMode === 'draw' ? '#440099' : 'transparent',
                    color: iconMode === 'draw' ? 'white' : '#6B6C6F',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    transition: 'all 0.15s',
                    minHeight: 44,
                  }}
                >
                  Draw Your Own
                </button>
              </div>

              {iconMode === 'symbol' ? (
                <div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: 8,
                    }}
                  >
                    {SYMBOLS.map(sym => {
                      const sel = iconSymbols.includes(sym.id);
                      return (
                        <button
                          key={sym.id}
                          type="button"
                          onClick={() => handleSymbolClick(sym.id)}
                          title={sym.en}
                          style={{
                            aspectRatio: '1',
                            borderRadius: 14,
                            background: sel ? iconColor : '#F4F5FA',
                            border: `2px solid ${sel ? iconColor : '#E8EAF0'}`,
                            boxShadow: sel ? `0 4px 12px ${iconColor}44` : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            padding: 8,
                            transition: 'all 0.18s',
                            minHeight: 56,
                            transform: sel ? 'scale(1.06)' : 'scale(1)',
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={sel ? 'white' : '#440099'}
                            width="28"
                            height="28"
                            style={{ display: 'block' }}
                          >
                            <path d={sym.path} />
                          </svg>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <DrawingCanvas
                  brushSize={brushSize}
                  drawTool={drawTool}
                  drawColor={drawColor}
                  iconDrawing={iconDrawing}
                  onToolChange={onToolChange}
                  onColorChange={onDrawColorChange}
                  onDrawingChange={onDrawingChange}
                />
              )}
            </div>

            {/* Icon Name Input */}
            <div>
              <label
                htmlFor="icon-label-input"
                style={{
                  display: 'block',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#282829',
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Icon Name
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="icon-label-input"
                  type="text"
                  value={iconLabel}
                  maxLength={20}
                  onChange={e => onLabelChange(e.target.value.slice(0, 20))}
                  placeholder="e.g. BayarBill, EcoTopUp"
                  style={{
                    width: '100%',
                    padding: '14px 52px 14px 16px',
                    borderRadius: 10,
                    border: '1.5px solid #DEE4EF',
                    fontSize: 16,
                    color: '#282829',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 11,
                    color: iconLabel.length >= 20 ? '#E63946' : '#B2B2B2',
                    fontWeight: 600,
                  }}
                >
                  {iconLabel.length}/20
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 9999,
                background: canNext ? '#440099' : '#DEE4EF',
                color: canNext ? 'white' : '#9E9FA5',
                border: 'none',
                cursor: canNext ? 'pointer' : 'default',
                fontSize: 15,
                fontWeight: 700,
                transition: 'all 0.15s',
                minHeight: 52,
                boxShadow: canNext ? '0 4px 14px rgba(68, 0, 153, 0.25)' : 'none',
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
