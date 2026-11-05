import React from 'react';
import { SYMBOLS } from '../constants';

interface IconRendererProps {
  size: number;
  color: string;
  symIds: string[];
  drawing: string | null;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const IconRenderer: React.FC<IconRendererProps> = ({
  size,
  color,
  symIds,
  drawing,
  label,
  className = '',
  style = {},
}) => {
  const r = Math.round(size * 0.18);
  const fs = Math.max(8, Math.round(size * 0.09));

  const baseStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: r,
    background: color || '#440099',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
    flexShrink: 0,
    overflow: 'hidden',
    position: 'relative',
    padding: drawing ? 0 : 6,
    userSelect: 'none',
    ...style,
  };

  if (drawing) {
    return (
      <div style={baseStyle} className={className}>
        <img
          src={drawing}
          alt={label || 'Custom icon'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            mixBlendMode: 'multiply',
          }}
        />
        {label ? (
          <div
            style={{
              position: 'absolute',
              bottom: 5,
              left: 4,
              right: 4,
              color: 'white',
              fontSize: fs,
              fontWeight: 700,
              textAlign: 'center',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              wordBreak: 'break-word',
              lineHeight: 1.1,
            }}
          >
            {label}
          </div>
        ) : null}
      </div>
    );
  }

  const syms = (symIds || [])
    .map(id => SYMBOLS.find(s => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const n = syms.length;

  if (n === 0) {
    return (
      <div style={baseStyle} className={className}>
        <div
          style={{
            width: size * 0.38,
            height: size * 0.38,
            borderRadius: 8,
            border: '2px dashed rgba(255,255,255,0.35)',
          }}
        />
        {label ? (
          <div
            style={{
              color: 'white',
              fontSize: fs,
              fontWeight: 700,
              textAlign: 'center',
              paddingLeft: 4,
              paddingRight: 4,
              wordBreak: 'break-word',
              lineHeight: 1.1,
              marginTop: 4,
            }}
          >
            {label}
          </div>
        ) : null}
      </div>
    );
  }

  const icoSz = n === 1 ? Math.round(size * 0.44) : n === 2 ? Math.round(size * 0.3) : Math.round(size * 0.26);

  return (
    <div style={baseStyle} className={className}>
      {n === 1 ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width={icoSz}
            height={icoSz}
            style={{ display: 'block' }}
          >
            <path d={syms[0].path} />
          </svg>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, auto)',
            gap: 3,
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          {syms.slice(0, 4).map((sym, i) => (
            <div key={i}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                width={icoSz}
                height={icoSz}
                style={{ display: 'block' }}
              >
                <path d={sym.path} />
              </svg>
            </div>
          ))}
        </div>
      )}

      {label ? (
        <div
          style={{
            color: 'white',
            fontSize: fs,
            fontWeight: 700,
            textAlign: 'center',
            wordBreak: 'break-word',
            lineHeight: 1.1,
            maxWidth: '100%',
            flexShrink: 0,
            paddingBottom: 2,
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};
