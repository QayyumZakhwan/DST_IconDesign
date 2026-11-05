import React, { useState, useEffect } from 'react';
import { GameState, GenderType, IconEntry, IconMode, ScreenType } from './types';
import { STORAGE_KEY, BROADCAST_CHANNEL_NAME } from './constants';
import { db, handleFirestoreError, OperationType } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { SignInScreen } from './components/SignInScreen';
import { BuildScreen } from './components/BuildScreen';
import { DescribeScreen } from './components/DescribeScreen';
import { ConfirmScreen } from './components/ConfirmScreen';
import { GalleryWall } from './components/GalleryWall';

export const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    screen: 'signin',
    age: '',
    gender: 'Male',
    accountingExp: false,
    iconColor: '#440099',
    iconSymbols: [],
    iconLabel: '',
    iconMode: 'symbol',
    iconDrawing: null,
    brushSize: 10,
    drawTool: 'pen',
    drawColor: '#000000',
    desc1: '',
    desc2: '',
    desc3: '',
  });

  const setScreen = (screen: ScreenType) => {
    setGameState(prev => ({ ...prev, screen }));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [gameState.screen]);

  const handleStartGame = () => {
    setScreen('build');
  };

  const handleSubmitEntry = () => {
    const {
      age,
      gender,
      accountingExp,
      iconColor,
      iconSymbols,
      iconLabel,
      iconMode,
      iconDrawing,
      desc1,
      desc2,
      desc3,
    } = gameState;

    const entry: IconEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      age,
      gender,
      accountingExp,
      iconColor,
      iconSymbols,
      iconLabel: iconLabel.trim(),
      iconMode,
      iconDrawing: iconMode === 'draw' ? iconDrawing : null,
      desc1: desc1.trim(),
      desc2: desc2.trim(),
      desc3: desc3.trim(),
    };

    // Save to Firestore for live real-time sync across all participants
    setDoc(doc(db, 'icons', entry.id), entry).catch(err => {
      console.warn('Firestore write error, falling back to local storage', err);
    });

    try {
      const existing: IconEntry[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existing.unshift(entry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      try {
        const ch = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        ch.postMessage({ type: 'new', entry });
        ch.close();
      } catch {
        // BroadcastChannel may not be supported in older runtimes
      }
    } catch (err) {
      console.error('Error saving icon entry to localStorage', err);
    }

    setScreen('confirm');
  };

  const handleStartOver = () => {
    setGameState({
      screen: 'signin',
      age: '',
      gender: 'Male',
      accountingExp: false,
      iconColor: '#440099',
      iconSymbols: [],
      iconLabel: '',
      iconMode: 'symbol',
      iconDrawing: null,
      brushSize: 10,
      drawTool: 'pen',
      drawColor: '#000000',
      desc1: '',
      desc2: '',
      desc3: '',
    });
  };

  return (
    <div>
      {gameState.screen === 'signin' && (
        <SignInScreen
          age={gameState.age}
          gender={gameState.gender}
          onAgeChange={age => setGameState(prev => ({ ...prev, age }))}
          onGenderChange={gender => setGameState(prev => ({ ...prev, gender }))}
          onStart={handleStartGame}
          onViewGallery={() => setScreen('gallery')}
        />
      )}

      {gameState.screen === 'build' && (
        <BuildScreen
          iconColor={gameState.iconColor}
          iconSymbols={gameState.iconSymbols}
          iconLabel={gameState.iconLabel}
          iconMode={gameState.iconMode}
          iconDrawing={gameState.iconDrawing}
          brushSize={gameState.brushSize}
          drawTool={gameState.drawTool}
          drawColor={gameState.drawColor}
          onColorChange={color => setGameState(prev => ({ ...prev, iconColor: color }))}
          onSymbolsChange={symbols => setGameState(prev => ({ ...prev, iconSymbols: symbols }))}
          onLabelChange={label => setGameState(prev => ({ ...prev, iconLabel: label }))}
          onModeChange={mode => setGameState(prev => ({ ...prev, iconMode: mode }))}
          onDrawingChange={drawing => setGameState(prev => ({ ...prev, iconDrawing: drawing }))}
          onToolChange={tool => setGameState(prev => ({ ...prev, drawTool: tool }))}
          onDrawColorChange={color => setGameState(prev => ({ ...prev, drawColor: color }))}
          onBack={() => setScreen('signin')}
          onNext={() => setScreen('describe')}
        />
      )}

      {gameState.screen === 'describe' && (
        <DescribeScreen
          iconColor={gameState.iconColor}
          iconSymbols={gameState.iconSymbols}
          iconLabel={gameState.iconLabel}
          iconDrawing={gameState.iconDrawing}
          desc1={gameState.desc1}
          desc3={gameState.desc3}
          onDesc1Change={desc1 => setGameState(prev => ({ ...prev, desc1 }))}
          onDesc3Change={desc3 => setGameState(prev => ({ ...prev, desc3 }))}
          onBack={() => setScreen('build')}
          onSubmit={handleSubmitEntry}
        />
      )}

      {gameState.screen === 'confirm' && (
        <ConfirmScreen
          iconColor={gameState.iconColor}
          iconSymbols={gameState.iconSymbols}
          iconLabel={gameState.iconLabel}
          iconDrawing={gameState.iconDrawing}
          onViewGallery={() => setScreen('gallery')}
          onStartOver={handleStartOver}
        />
      )}

      {gameState.screen === 'gallery' && (
        <GalleryWall onBackToGame={() => setScreen('signin')} />
      )}
    </div>
  );
};

export default App;
