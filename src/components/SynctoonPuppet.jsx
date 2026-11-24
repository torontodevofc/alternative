import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Modern Cute Cut-Out 2D Storyteller Puppet (Kurzgesagt / Synctoon inspired)
 * Anatomically anchored shoulder sockets so arms NEVER detach from the torso,
 * with calm, smooth, relaxed ("deboinha") breathing and talking motion.
 */
export default function SynctoonPuppet({
  work = '',
  atmosphereId = 'epic',
  isPlaying = false,
  sceneIndex = 0
}) {
  const [viseme, setViseme] = useState('closed'); // 'closed' | 'A' | 'O' | 'E'
  const [blink, setBlink] = useState(false);
  const [eyebrowMood, setEyebrowMood] = useState('neutral');

  // Smooth, relaxed lip-sync viseme animation cycle (every 240ms - calm talking)
  useEffect(() => {
    if (!isPlaying) {
      setViseme('closed');
      return;
    }

    const visemesList = ['A', 'closed', 'E', 'O', 'closed', 'A'];
    const interval = setInterval(() => {
      const v = visemesList[Math.floor(Math.random() * visemesList.length)];
      setViseme(v);
    }, 240);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Natural slow blinking (every 3.8s)
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 3800);
    return () => clearInterval(blinkTimer);
  }, []);

  // Update mood based on atmosphere
  useEffect(() => {
    if (atmosphereId === 'horror') setEyebrowMood('worried');
    else if (atmosphereId === 'happy') setEyebrowMood('happy');
    else if (atmosphereId === 'comedy') setEyebrowMood(sceneIndex % 2 === 0 ? 'happy' : 'neutral');
    else if (atmosphereId === 'plottwist') setEyebrowMood('suspicious');
    else setEyebrowMood('neutral');
  }, [atmosphereId, sceneIndex]);

  const cleanWork = work.toLowerCase();

  // Curated cute cartoon color palettes
  let style = {
    skin: '#fed7aa',
    blush: '#fda4af',
    hair: '#854d0e',
    eyes: '#1e293b',
    hoodie: '#38bdf8',
    hoodieDark: '#0284c7',
    pants: '#1e293b',
    boots: '#0f172a',
    accessory: 'none'
  };

  if (/toy story|woody/i.test(cleanWork)) {
    style = { skin: '#fed7aa', blush: '#fda4af', hair: '#92400e', eyes: '#451a03', hoodie: '#f59e0b', hoodieDark: '#d97706', pants: '#2563eb', boots: '#78350f', accessory: 'cowboy' };
  } else if (/shrek/i.test(cleanWork)) {
    style = { skin: '#bbf7d0', blush: '#86efac', hair: '#15803d', eyes: '#14532d', hoodie: '#fef08a', hoodieDark: '#eab308', pants: '#78350f', boots: '#451a03', accessory: 'ogre' };
  } else if (/interestelar|espaço|nave/i.test(cleanWork)) {
    style = { skin: '#fde047', blush: '#fef08a', hair: '#475569', eyes: '#1e293b', hoodie: '#f1f5f9', hoodieDark: '#cbd5e1', pants: '#64748b', boots: '#334155', accessory: 'astronaut' };
  } else if (/titanic/i.test(cleanWork)) {
    style = { skin: '#fed7aa', blush: '#fca5a5', hair: '#b45309', eyes: '#1e3a8a', hoodie: '#1e3a8a', hoodieDark: '#172554', pants: '#0f172a', boots: '#18181b', accessory: 'coat' };
  } else if (atmosphereId === 'horror') {
    style = { skin: '#e2e8f0', blush: '#cbd5e1', hair: '#0f172a', eyes: '#dc2626', hoodie: '#450a0a', hoodieDark: '#1c1917', pants: '#09090b', boots: '#000', accessory: 'gothic' };
  } else if (atmosphereId === 'happy') {
    style = { skin: '#fed7aa', blush: '#f43f5e', hair: '#d97706', eyes: '#0f172a', hoodie: '#fbbf24', hoodieDark: '#f59e0b', pants: '#0284c7', boots: '#0369a1', accessory: 'happy' };
  }

  return (
    <div className="relative flex flex-col items-center select-none">
      
      {/* Ground Cast Shadow */}
      <motion.div
        animate={{
          scaleX: isPlaying ? [1, 1.08, 1] : [1, 1.04, 1],
          opacity: [0.35, 0.5, 0.35]
        }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="w-36 h-5 bg-black/60 rounded-full filter blur-[4px] -mb-3 z-0"
      />

      {/* Main Cute Cut-out Puppet Body (Chill, relaxed breathing) */}
      <motion.div
        animate={{
          y: isPlaying ? [0, -3.5, 0] : [0, -1.8, 0],
          rotate: isPlaying ? [-0.8, 0.8, -0.8] : [0, 0.4, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: isPlaying ? 2.0 : 2.8,
          ease: 'easeInOut'
        }}
        className="relative z-10 filter drop-shadow-[0_16px_25px_rgba(0,0,0,0.85)]"
      >
        <svg width="180" height="260" viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          
          <defs>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
            </filter>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={style.hoodie} />
              <stop offset="100%" stopColor={style.hoodieDark} />
            </linearGradient>
          </defs>

          {/* 1. LEGS & SNEAKERS (Steady, calm standing pose) */}
          <g id="legs" filter="url(#softShadow)">
            {/* Left Leg */}
            <rect x="62" y="165" width="20" height="58" rx="10" fill={style.pants} stroke="#0f172a" strokeWidth="3" />
            {/* Right Leg */}
            <rect x="98" y="165" width="20" height="58" rx="10" fill={style.pants} stroke="#0f172a" strokeWidth="3" />
            
            {/* Left Shoe */}
            <rect x="54" y="215" width="30" height="18" rx="8" fill={style.boots} stroke="#000" strokeWidth="2.5" />
            <rect x="54" y="226" width="30" height="7" rx="3" fill="#f8fafc" />

            {/* Right Shoe */}
            <rect x="96" y="215" width="30" height="18" rx="8" fill={style.boots} stroke="#000" strokeWidth="2.5" />
            <rect x="96" y="226" width="30" height="7" rx="3" fill="#f8fafc" />
          </g>

          {/* 2. CHUBBY CUTE TORSO */}
          <g id="torso" filter="url(#softShadow)">
            {/* Hoodie body */}
            <path
              d="M50 94 Q90 88 130 94 L124 172 Q90 178 56 172 Z"
              fill="url(#bodyGrad)"
              stroke="#0f172a"
              strokeWidth="3.5"
            />

            {/* Cute hoodie front pocket */}
            <path
              d="M66 135 Q90 138 114 135 L110 162 Q90 165 70 162 Z"
              fill={style.hoodieDark}
              stroke="#0f172a"
              strokeWidth="2.5"
            />

            {/* Hoodie strings */}
            <path d="M82 94 L80 114" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M98 94 L100 114" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />

            {/* Cute badge / theme icon */}
            {style.accessory === 'cowboy' && (
              <polygon points="90,110 93,118 101,118 95,123 97,130 90,126 83,130 85,123 79,118 87,118" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
            )}
            {style.accessory === 'astronaut' && (
              <circle cx="90" cy="118" r="9" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            )}
          </g>

          {/* 3. ARMS & MITTEN HANDS (PERFECTLY ANCHORED INTO SHOULDER SOCKETS) */}
          <g id="arms">
            
            {/* LEFT SHOULDER SOCKET AT (52, 102) */}
            <motion.g
              animate={{
                rotate: isPlaying ? [-6, 6, -6] : [-2, 2, -2]
              }}
              style={{
                transformOrigin: '52px 102px'
              }}
              transition={{
                repeat: Infinity,
                duration: 2.1,
                ease: 'easeInOut'
              }}
            >
              {/* Arm capsule centered right on shoulder (52, 102) */}
              <rect x="42" y="94" width="20" height="58" rx="10" fill={style.hoodieDark} stroke="#0f172a" strokeWidth="3" />
              {/* Cute hand */}
              <circle cx="52" cy="154" r="10" fill={style.skin} stroke="#0f172a" strokeWidth="2.5" />
            </motion.g>

            {/* RIGHT SHOULDER SOCKET AT (128, 102) */}
            <motion.g
              animate={{
                rotate: isPlaying ? [6, -6, 6] : [2, -2, 2]
              }}
              style={{
                transformOrigin: '128px 102px'
              }}
              transition={{
                repeat: Infinity,
                duration: 2.1,
                ease: 'easeInOut'
              }}
            >
              {/* Arm capsule centered right on shoulder (128, 102) */}
              <rect x="118" y="94" width="20" height="58" rx="10" fill={style.hoodieDark} stroke="#0f172a" strokeWidth="3" />
              {/* Cute hand */}
              <circle cx="128" cy="154" r="10" fill={style.skin} stroke="#0f172a" strokeWidth="2.5" />
            </motion.g>

          </g>

          {/* 4. BIG CUTE CHIBI HEAD & EXPRESSIVE FACE */}
          <motion.g
            id="head"
            animate={{
              rotate: isPlaying ? [-1.2, 1.2, -1.2] : [0, 0.8, 0]
            }}
            style={{ transformOrigin: '90px 85px' }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            filter="url(#softShadow)"
          >
            {/* Head Circle */}
            <circle cx="90" cy="52" r="35" fill={style.skin} stroke="#0f172a" strokeWidth="3.5" />

            {/* Rosy Anime Cheeks */}
            <ellipse cx="62" cy="62" rx="7" ry="4.5" fill={style.blush} opacity="0.65" />
            <ellipse cx="118" cy="62" rx="7" ry="4.5" fill={style.blush} opacity="0.65" />

            {/* Cute Cartoon Hair */}
            <path
              d="M55 45 Q90 12 125 45 Q118 20 90 18 Q62 20 55 45 Z"
              fill={style.hair}
              stroke="#0f172a"
              strokeWidth="2.5"
            />
            {/* Hair tuff bangs */}
            <path d="M75 22 Q90 35 96 22 Z" fill={style.hair} />

            {/* Thematic Headgear */}
            {style.accessory === 'cowboy' && (
              <g>
                <ellipse cx="90" cy="22" rx="46" ry="11" fill="#78350f" stroke="#000" strokeWidth="3" />
                <path d="M64 22 L70 5 L110 5 L116 22 Z" fill="#92400e" stroke="#000" strokeWidth="2.5" />
                <line x1="68" y1="17" x2="112" y2="17" stroke="#fbbf24" strokeWidth="3" />
              </g>
            )}

            {style.accessory === 'ogre' && (
              <g>
                <ellipse cx="50" cy="32" rx="10" ry="6" transform="rotate(-30 50 32)" fill="#86efac" stroke="#0f172a" strokeWidth="2.5" />
                <ellipse cx="130" cy="32" rx="10" ry="6" transform="rotate(30 130 32)" fill="#86efac" stroke="#0f172a" strokeWidth="2.5" />
              </g>
            )}

            {style.accessory === 'astronaut' && (
              <circle cx="90" cy="52" r="41" fill="none" stroke="#38bdf8" strokeWidth="4" opacity="0.85" />
            )}

            {/* BIG CUTE CARTOON EYES */}
            {blink ? (
              <g>
                <line x1="70" y1="52" x2="82" y2="52" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="98" y1="52" x2="110" y2="52" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            ) : (
              <g>
                {/* Left Eye */}
                <ellipse cx="76" cy="48" rx="6.5" ry="8" fill={style.eyes} />
                <circle cx="78" cy="45" r="2.5" fill="#ffffff" />
                <circle cx="74" cy="51" r="1.2" fill="#ffffff" />

                {/* Right Eye */}
                <ellipse cx="104" cy="48" rx="6.5" ry="8" fill={style.eyes} />
                <circle cx="106" cy="45" r="2.5" fill="#ffffff" />
                <circle cx="102" cy="51" r="1.2" fill="#ffffff" />
              </g>
            )}

            {/* DYNAMIC EYEBROWS */}
            {eyebrowMood === 'worried' ? (
              <g>
                <path d="M68 38 L80 34" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                <path d="M100 34 L112 38" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              </g>
            ) : eyebrowMood === 'happy' ? (
              <g>
                <path d="M70 34 Q76 30 82 34" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M98 34 Q104 30 110 34" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            ) : (
              <g>
                <path d="M70 36 Q76 33 82 36" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M98 36 Q104 33 110 36" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* CUTE SYNCTOON MOUTH VISEMES (Smooth, calm transition) */}
            <g id="synctoon-mouth">
              {/* Rest / Cute Smile */}
              {viseme === 'closed' && (
                <path d="M82 66 Q90 73 98 66" stroke="#0f172a" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              )}

              {/* Viseme A: Open joyful mouth */}
              {viseme === 'A' && (
                <g>
                  <path d="M80 64 Q90 62 100 64 Q100 74 90 75 Q80 74 80 64 Z" fill="#e11d48" stroke="#0f172a" strokeWidth="2.5" />
                  <ellipse cx="90" cy="71" rx="5" ry="3" fill="#f43f5e" />
                </g>
              )}

              {/* Viseme E: Big toothy grin */}
              {viseme === 'E' && (
                <g>
                  <path d="M79 64 Q90 72 101 64 Z" fill="#e11d48" stroke="#0f172a" strokeWidth="2.5" />
                  <rect x="83" y="63" width="14" height="4" fill="#ffffff" rx="1.5" />
                </g>
              )}

              {/* Viseme O: Cute rounded mouth */}
              {viseme === 'O' && (
                <ellipse cx="90" cy="67" rx="5.5" ry="6.5" fill="#e11d48" stroke="#0f172a" strokeWidth="2.5" />
              )}
            </g>

          </motion.g>

        </svg>
      </motion.div>
    </div>
  );
}
