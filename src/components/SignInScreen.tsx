import React from 'react';
import { DstLogo } from './DstLogo';
import { GenderType } from '../types';

interface SignInScreenProps {
  age: string;
  gender: GenderType;
  onAgeChange: (age: string) => void;
  onGenderChange: (gender: GenderType) => void;
  onStart: () => void;
  onViewGallery: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  age,
  gender,
  onAgeChange,
  onGenderChange,
  onStart,
  onViewGallery,
}) => {
  const canStart = Boolean(age && age.trim().length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canStart) {
      onStart();
    }
  };

  return (
    <div className="screen signin-split">
      {/* LEFT PANEL */}
      <div className="signin-left">
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            right: -60,
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: -50,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'rgba(178, 208, 7, 0.07)',
            pointerEvents: 'none',
          }}
        />

        {/* Top bar: DST logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 36,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <DstLogo size={44} />
            <span
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1.8,
                textTransform: 'uppercase',
                opacity: 0.9,
              }}
            >
              DST X INNOLAB
            </span>
          </div>
        </div>

        {/* Badge */}
        <div
          style={{
            display: 'inline-block',
            background: '#B2D007',
            color: '#1a0066',
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: 'uppercase',
            padding: '5px 12px',
            borderRadius: 4,
            marginBottom: 18,
            width: 'fit-content',
          }}
        >
          Workshop Activity
        </div>

        {/* Title */}
        <div
          style={{
            color: 'white',
            fontSize: 44,
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 14,
            letterSpacing: -0.5,
          }}
        >
          Icon DST
          <br />
          Game
        </div>

        {/* Description */}
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.72)',
            fontSize: 14,
            lineHeight: 1.65,
            marginBottom: 'auto',
          }}
        >
          Design a feature you think MyDST needs. No right or wrong answers, just your ideas!
        </div>

        {/* Divider + HOW IT WORKS */}
        <div className="signin-steps">
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.14)',
              margin: '28px 0',
            }}
          />
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.45)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            How it works
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { num: 1, text: 'Sign in with your age and gender' },
              { num: 2, text: 'Design and name your icon' },
              { num: 3, text: 'Describe your feature for MyDST users' },
              { num: 4, text: 'Submit and see it on the gallery wall' },
            ].map(step => (
              <div key={step.num} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    minWidth: 26,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255, 255, 255, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: 13,
                    lineHeight: 1.5,
                    paddingTop: 3,
                  }}
                >
                  {step.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="signin-right">
        <form onSubmit={handleSubmit} className="signin-right-inner">
          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: '#282829',
              marginBottom: 6,
              letterSpacing: -0.3,
            }}
          >
            Hello, designer.
          </div>
          <div style={{ fontSize: 14, color: '#9E9FA5', marginBottom: 36 }}>
            Tell us about yourself to begin the activity.
          </div>

          {/* Age Input */}
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="age-input"
              style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 700,
                color: '#282829',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Your Age
            </label>
            <input
              id="age-input"
              type="tel"
              value={age}
              placeholder="e.g. 25"
              autoFocus
              onChange={e => onAgeChange(e.target.value.replace(/\D/g, '').slice(0, 2))}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 10,
                border: '1.5px solid #DEE4EF',
                fontSize: 16,
                color: '#282829',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s',
              }}
            />
          </div>

          {/* Gender Segmented Control */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#282829',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Gender
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['Male', 'Female'] as GenderType[]).map(g => {
                const isSelected = gender === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => onGenderChange(g)}
                    style={{
                      flex: 1,
                      padding: '13px 8px',
                      borderRadius: 9999,
                      background: isSelected ? '#440099' : 'white',
                      color: isSelected ? 'white' : '#440099',
                      border: `1.5px solid ${isSelected ? '#440099' : '#DEE4EF'}`,
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                      minHeight: 48,
                      transition: 'all 0.15s',
                    }}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start Button */}
          <button
            type="submit"
            disabled={!canStart}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 9999,
              background: canStart ? '#440099' : '#DEE4EF',
              color: canStart ? 'white' : '#9E9FA5',
              border: 'none',
              cursor: canStart ? 'pointer' : 'default',
              fontSize: 15,
              fontWeight: 700,
              minHeight: 52,
              transition: 'all 0.15s',
              boxShadow: canStart ? '0 4px 14px rgba(68, 0, 153, 0.25)' : 'none',
            }}
          >
            Start Playing
          </button>

          {/* View Gallery Wall Link */}
          <button
            type="button"
            onClick={onViewGallery}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              width: '100%',
              padding: 14,
              borderRadius: 9999,
              border: '1.5px solid #DEE4EF',
              background: 'white',
              color: '#440099',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: 12,
              boxSizing: 'border-box',
              transition: 'all 0.15s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#440099">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
            </svg>
            View Gallery Wall
          </button>
        </form>
      </div>
    </div>
  );
};
