import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Stroke, StrokePoint } from '../types';

interface DrawingCanvasProps {
  brushSize: number;
  drawTool: 'pen' | 'eraser';
  drawColor: string;
  iconDrawing: string | null;
  onToolChange: (tool: 'pen' | 'eraser') => void;
  onColorChange: (color: string) => void;
  onDrawingChange: (dataUrl: string | null) => void;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  brushSize,
  drawTool,
  drawColor,
  iconDrawing,
  onToolChange,
  onColorChange,
  onDrawingChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const currentStrokeRef = useRef<StrokePoint[]>([]);
  const isDrawingRef = useRef<boolean>(false);
  const dprRef = useRef<number>(1);
  const canvasReadyRef = useRef<boolean>(false);
  const [hasDrawn, setHasDrawn] = useState<boolean>(!!iconDrawing);

  const canvasBg = drawColor === '#FFFFFF' ? '#000000' : '#FFFFFF';

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasReadyRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bg = drawColor === '#FFFFFF' ? '#000000' : '#FFFFFF';
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const drawPts = (pts: StrokePoint[], w: number) => {
      if (!pts || !pts.length) return;
      if (pts.length === 1) {
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, w / 2, 0, Math.PI * 2);
        ctx.fill();
        return;
      }
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const mx = (pts[i - 1].x + pts[i].x) / 2;
        const my = (pts[i - 1].y + pts[i].y) / 2;
        ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, mx, my);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      ctx.stroke();
    };

    strokesRef.current.forEach(s => {
      const eBg = s.drawBg || '#FFFFFF';
      const c = s.eraser ? eBg : s.color || '#000000';
      ctx.strokeStyle = c;
      ctx.fillStyle = c;
      drawPts(s.pts, s.w);
    });

    if (currentStrokeRef.current.length > 0) {
      const c = drawTool === 'eraser' ? bg : drawColor;
      ctx.strokeStyle = c;
      ctx.fillStyle = c;
      drawPts(currentStrokeRef.current, brushSize * dprRef.current);
    }
  }, [drawColor, drawTool, brushSize]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) {
      setTimeout(initCanvas, 80);
      return;
    }
    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvasReadyRef.current = true;
    redraw();
  }, [redraw]);

  useEffect(() => {
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  useEffect(() => {
    redraw();
  }, [redraw, drawColor, drawTool]);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>): StrokePoint => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * dprRef.current,
      y: (e.clientY - rect.top) * dprRef.current,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    isDrawingRef.current = true;
    currentStrokeRef.current = [getPos(e)];
    redraw();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    currentStrokeRef.current.push(getPos(e));
    redraw();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas && e.pointerId) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }

    if (currentStrokeRef.current.length > 0) {
      strokesRef.current.push({
        pts: currentStrokeRef.current,
        w: brushSize * dprRef.current,
        eraser: drawTool === 'eraser',
        color: drawColor,
        drawBg: drawColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
      });
      setHasDrawn(true);
    }
    currentStrokeRef.current = [];
    redraw();

    if (canvas) {
      setTimeout(() => {
        onDrawingChange(canvas.toDataURL());
      }, 30);
    }
  };

  const clearCanvas = () => {
    strokesRef.current = [];
    currentStrokeRef.current = [];
    setHasDrawn(false);
    redraw();
    onDrawingChange(null);
  };

  return (
    <div>
      {/* Drawing Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
          flexWrap: 'wrap',
        }}
      >
        {/* Pen Button */}
        <button
          type="button"
          onClick={() => onToolChange('pen')}
          title="Pen"
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: drawTool === 'pen' ? '#440099' : '#F4F5FA',
            border: `2px solid ${drawTool === 'pen' ? '#440099' : '#DEE4EF'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.15s',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={drawTool === 'pen' ? 'white' : '#440099'}
            width="20"
            height="20"
            style={{ display: 'block' }}
          >
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>

        {/* Eraser Button */}
        <button
          type="button"
          onClick={() => onToolChange('eraser')}
          title="Eraser"
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: drawTool === 'eraser' ? '#440099' : '#F4F5FA',
            border: `2px solid ${drawTool === 'eraser' ? '#440099' : '#DEE4EF'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.15s',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={drawTool === 'eraser' ? 'white' : '#440099'}
            width="20"
            height="20"
            style={{ display: 'block' }}
          >
            <path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L5.03 20H20v-2h-6.17l7.04-7.04c.78-.78.78-2.05 0-2.83l-2.32-2.32c-.38-.39-.89-.59-1.41-.59zm0 2l2.32 2.32-3.9 3.9-2.32-2.32 3.9-3.9z" />
          </svg>
        </button>

        {/* Ink Colors */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            background: '#F0F2F5',
            borderRadius: 9999,
            padding: 3,
          }}
        >
          {['#000000', '#FFFFFF'].map(c => (
            <button
              key={c}
              type="button"
              onClick={() => {
                clearCanvas();
                onColorChange(c);
                onToolChange('pen');
              }}
              title={c === '#000000' ? 'Black ink' : 'White ink'}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: c,
                border: `2.5px solid ${drawColor === c ? '#440099' : c === '#FFFFFF' ? '#DEE4EF' : 'transparent'}`,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.15s',
              }}
            />
          ))}
        </div>

        {/* Clear Button */}
        <button
          type="button"
          onClick={clearCanvas}
          style={{
            marginLeft: 'auto',
            padding: '10px 14px',
            borderRadius: 9999,
            background: '#FFF0F0',
            border: 'none',
            color: '#E63946',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            minHeight: 44,
          }}
        >
          Clear
        </button>
      </div>

      {/* Canvas Area */}
      <div
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          position: 'relative',
          border: '2px solid #DEE4EF',
          background: canvasBg,
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '1',
            touchAction: 'none',
            cursor: drawTool === 'eraser' ? 'cell' : 'crosshair',
            background: canvasBg,
          }}
        />

        {!hasDrawn && strokesRef.current.length === 0 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              gap: 8,
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill={drawColor === '#FFFFFF' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)'}
            >
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
            <div
              style={{
                color: drawColor === '#FFFFFF' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              Draw with your finger
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
