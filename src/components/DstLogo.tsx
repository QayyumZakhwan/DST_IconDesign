import React, { useState } from 'react';
import { DST_LOGO_BASE64 } from '../constants';

interface DstLogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const DstLogo: React.FC<DstLogoProps> = ({ size = 44, className = '', style = {} }) => {
  const [rotation, setRotation] = useState<number>(0);

  const handleSpin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRotation(prev => prev + 360);
  };

  return (
    <img
      src={DST_LOGO_BASE64}
      alt="DST logo"
      width={size}
      height={size}
      onClick={handleSpin}
      title="Click to spin!"
      className={className}
      style={{
        display: 'block',
        objectFit: 'contain',
        cursor: 'pointer',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        userSelect: 'none',
        ...style,
      }}
    />
  );
};
