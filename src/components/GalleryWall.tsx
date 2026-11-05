import React, { useState, useEffect } from 'react';
import { IconEntry } from '../types';
import { STORAGE_KEY, BROADCAST_CHANNEL_NAME } from '../constants';
import { IconRenderer } from './IconRenderer';
import { DstLogo } from './DstLogo';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

interface GalleryWallProps {
  onBackToGame: () => void;
}

const DEFAULT_SAMPLES: IconEntry[] = [
  {
    id: 'sample-1',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    age: '24',
    gender: 'Female',
    iconColor: '#440099',
    iconSymbols: ['receipt', 'qr'],
    iconLabel: 'BayarBill',
    iconMode: 'symbol',
    iconDrawing: null,
    desc1: 'One-tap bill payment for DST mobile and home fiber bills with instant cashback points.',
    desc3: 'Eliminates queuing at payment counters and simplifies monthly utility reconciliation.',
  },
  {
    id: 'sample-2',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    age: '28',
    gender: 'Male',
    iconColor: '#B2D007',
    iconSymbols: ['tree', 'wallet'],
    iconLabel: 'EcoTopUp',
    iconMode: 'symbol',
    iconDrawing: null,
    desc1: 'Digital paperless top-up that plants a tree in Brunei for every $50 accumulated recharge.',
    desc3: 'Encourages green digital habits while rewarding subscribers with bonus data perks.',
  },
  {
    id: 'sample-3',
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    age: '22',
    gender: 'Female',
    iconColor: '#2196F3',
    iconSymbols: ['tv', 'wifi'],
    iconLabel: 'DSTStream',
    iconMode: 'symbol',
    iconDrawing: null,
    desc1: 'Zero-rated video streaming hub for local Brunei creators and live sports events.',
    desc3: 'Enables users to enjoy mobile entertainment without eating into their core monthly data quota.',
  },
  {
    id: 'sample-4',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    age: '35',
    gender: 'Male',
    iconColor: '#FF9800',
    iconSymbols: ['people', 'chart'],
    iconLabel: 'FamilyShare',
    iconMode: 'symbol',
    iconDrawing: null,
    desc1: 'Shared family data bucket with customizable quota caps and real-time usage alerts for parents.',
    desc3: 'Prevents bill shocks and gives parents transparent management over children phone plans.',
  },
];

export const GalleryWall: React.FC<GalleryWallProps> = ({ onBackToGame }) => {
  const [entries, setEntries] = useState<IconEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEntry, setSelectedEntry] = useState<IconEntry | null>(null);

  const loadEntries = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntries(parsed);
          return;
        }
      }
      // If none saved yet, seed with default workshop showcase entries
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLES));
      setEntries(DEFAULT_SAMPLES);
    } catch {
      setEntries(DEFAULT_SAMPLES);
    }
  };

  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);

  useEffect(() => {
    loadEntries();

    // 1. Real-time live Firestore subscription
    const iconsCollection = collection(db, 'icons');
    const unsubscribeFirestore = onSnapshot(
      iconsCollection,
      snapshot => {
        if (!snapshot.empty) {
          const remoteEntries: IconEntry[] = [];
          snapshot.forEach(docSnap => {
            const data = docSnap.data() as IconEntry;
            remoteEntries.push(data);
          });
          remoteEntries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setEntries(remoteEntries);
          setIsLiveConnected(true);
        } else {
          loadEntries();
        }
      },
      error => {
        console.warn('Firestore onSnapshot notice:', error);
        setIsLiveConnected(false);
        loadEntries();
      }
    );

    // 2. BroadcastChannel listener for fast local tab sync
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      channel.onmessage = () => {
        loadEntries();
      };
    } catch {
      // ignore
    }

    // 3. Storage event for multi-window sync
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loadEntries();
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      unsubscribeFirestore();
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const filteredEntries = entries.filter(item => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchLabel = item.iconLabel.toLowerCase().includes(q);
      const matchDesc1 = item.desc1.toLowerCase().includes(q);
      const matchDesc3 = item.desc3.toLowerCase().includes(q);
      return matchLabel || matchDesc1 || matchDesc3;
    }
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#EAECF3', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header Bar */}
      <header
        style={{
          background: 'linear-gradient(160deg, #440099 0%, #1a0066 100%)',
          color: 'white',
          padding: '24px 20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <DstLogo size={42} />
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  color: '#B2D007',
                  textTransform: 'uppercase',
                }}
              >
                DST X INNOLAB WORKSHOP
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.3, margin: 0 }}>
                Icon DST Gallery Wall
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Home Button with Home Logo */}
            <button
              type="button"
              onClick={onBackToGame}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#B2D007',
                color: '#1a0066',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 9999,
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(178, 208, 7, 0.35)',
                transition: 'all 0.15s',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              Home
            </button>
          </div>
        </div>
      </header>

      {/* Toolbar with Search and Total Count */}
      <div
        style={{
          background: 'white',
          borderBottom: '1px solid #DEE4EF',
          padding: '16px 20px',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#282829' }}>
              All Icons ({filteredEntries.length})
            </div>
            {isLiveConnected && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#1a0066',
                  background: '#B2D007',
                  padding: '2px 8px',
                  borderRadius: 9999,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#1a0066',
                    display: 'inline-block',
                  }}
                />
                Live
              </div>
            )}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: 280, maxWidth: '100%' }}>
            <input
              type="text"
              placeholder="Search icons or ideas..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 34px',
                borderRadius: 9999,
                border: '1.5px solid #DEE4EF',
                fontSize: 13,
                color: '#282829',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#9E9FA5"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid of Submissions */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 20px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        {filteredEntries.length === 0 ? (
          <div
            style={{
              background: 'white',
              borderRadius: 16,
              padding: '60px 20px',
              textAlign: 'center',
              border: '1.5px dashed #DEE4EF',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: '#282829', marginBottom: 8 }}>
              No icons found
            </div>
            <p style={{ color: '#9E9FA5', fontSize: 14, marginBottom: 20 }}>
              Try adjusting your search query or return Home to create one!
            </p>
            <button
              type="button"
              onClick={onBackToGame}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                borderRadius: 9999,
                background: '#440099',
                color: 'white',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              Home
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {filteredEntries.map(entry => (
              <div
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  border: '1.5px solid #F0F2F5',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  transition: 'transform 0.18s, box-shadow 0.18s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.09)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                }}
              >
                {/* Header: Icon + Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <IconRenderer
                    size={72}
                    color={entry.iconColor}
                    symIds={entry.iconSymbols}
                    drawing={entry.iconDrawing}
                    label=""
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: '#282829',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {entry.iconLabel || 'Untitled Icon'}
                    </div>
                    <div style={{ fontSize: 12, color: '#9E9FA5', marginTop: 3 }}>
                      Designer: Age {entry.age || '?'} • {entry.gender}
                    </div>
                  </div>
                </div>

                {/* Feature Description Snippet */}
                <div style={{ borderTop: '1px solid #F0F2F5', paddingTop: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#9E9FA5', textTransform: 'uppercase', marginBottom: 4 }}>
                    Feature Concept
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: '#4B4D52',
                      lineHeight: 1.45,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {entry.desc1}
                  </div>
                </div>

                {/* Problem Solved */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#9E9FA5', textTransform: 'uppercase', marginBottom: 4 }}>
                    How it helps users
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: '#4B4D52',
                      lineHeight: 1.45,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {entry.desc3}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Selected Entry Detail Modal */}
      {selectedEntry && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(16, 24, 32, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            zIndex: 1000,
            backdropFilter: 'blur(3px)',
          }}
          onClick={() => setSelectedEntry(null)}
        >
          <div
            className="screen"
            style={{
              background: 'white',
              borderRadius: 20,
              maxWidth: 440,
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                background: 'linear-gradient(160deg, #440099 0%, #1a0066 100%)',
                padding: '24px 20px',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                style={{
                  position: 'absolute',
                  right: 14,
                  top: 14,
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  color: 'white',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                }}
              >
                ✕
              </button>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                <IconRenderer
                  size={120}
                  color={selectedEntry.iconColor}
                  symIds={selectedEntry.iconSymbols}
                  drawing={selectedEntry.iconDrawing}
                  label={selectedEntry.iconLabel}
                />
              </div>

              <div style={{ color: 'white', fontSize: 20, fontWeight: 800 }}>
                {selectedEntry.iconLabel}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 }}>
                Created by {selectedEntry.gender}, Age {selectedEntry.age}
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#440099', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>
                  What it does
                </div>
                <div style={{ fontSize: 14, color: '#282829', lineHeight: 1.5 }}>
                  {selectedEntry.desc1}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#440099', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>
                  How it helps MyDST users
                </div>
                <div style={{ fontSize: 14, color: '#282829', lineHeight: 1.5 }}>
                  {selectedEntry.desc3}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                style={{
                  width: '100%',
                  padding: 14,
                  borderRadius: 9999,
                  background: '#440099',
                  color: 'white',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: 6,
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
