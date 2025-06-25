import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BirthdayOS = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [bootText, setBootText] = useState('');
  const [openWindows, setOpenWindows] = useState({});
  const [windowOrder, setWindowOrder] = useState([]);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showBirthdayBlast, setShowBirthdayBlast] = useState(false);

  const bootSequence = [
    'LOADING: BIRTHDAY CELEBRATION SYSTEM v24.0',
    '🎂 Initializing HAPPY BIRTHDAY protocols...',
    'Injecting tulips... ✅',
    'Validating Palermo Drip... SUCCESS ✨',
    'Loading Softy appreciation modules... 💕',
    'Deploying birthday chaos... 🎉',
    '👑 HAPPY BIRTHDAY PRERNA PRACHI! 👑',
    'SOFTY.EXE READY TO CELEBRATE'
  ];

  useEffect(() => {
    let currentText = '';
    let lineIndex = 0;
    let charIndex = 0;

    const typeBootText = () => {
      if (lineIndex < bootSequence.length) {
        if (charIndex < bootSequence[lineIndex].length) {
          currentText += bootSequence[lineIndex][charIndex];
          setBootText(currentText);
          charIndex++;
          setTimeout(typeBootText, 50);
        } else {
          currentText += '\n';
          setBootText(currentText);
          lineIndex++;
          charIndex = 0;
          setTimeout(typeBootText, 300);
        }
      } else {
        setTimeout(() => {
          setIsBooted(true);
          setShowBirthdayBlast(true);
          setTimeout(() => setShowBirthdayBlast(false), 3000);
        }, 1000);
      }
    };

    setTimeout(typeBootText, 500);
  }, []);

  const openWindow = (appId) => {
    setOpenWindows(prev => ({ ...prev, [appId]: true }));
    setWindowOrder(prev => [...prev.filter(id => id !== appId), appId]);
  };

  const closeWindow = (appId) => {
    setOpenWindows(prev => ({ ...prev, [appId]: false }));
    setWindowOrder(prev => prev.filter(id => id !== appId));
  };

  const bringToFront = (appId) => {
    setWindowOrder(prev => [...prev.filter(id => id !== appId), appId]);
  };

  if (!isBooted) {
    return (
      <div className="h-screen bg-black text-green-400 font-mono p-8 flex flex-col justify-center">
        <div className="text-lg leading-relaxed whitespace-pre-line">
          {bootText}
        </div>
        <div className="mt-4 animate-pulse">█</div>
      </div>
    );
  }

  return (
    <div 
      className="h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(45deg, rgba(236, 72, 153, 0.8), rgba(168, 85, 247, 0.8), rgba(6, 182, 212, 0.8)), 
                    url('/prerna-background.png') center/cover`
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenuPos({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
      }}
      onClick={() => {
        setShowContextMenu(false);
        setShowStartMenu(false);
      }}
    >
      {/* Birthday Blast Animation */}
      <AnimatePresence>
        {showBirthdayBlast && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-9xl"
            >
              🎂
            </motion.div>
            <div className="absolute text-white text-4xl font-bold animate-bounce">
              HAPPY BIRTHDAY SOFTY! 🎉
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ y: -100, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200) }}
            animate={{ y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100 }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            {['🎉', '🎂', '🎈', '✨', '🌷', '👑'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      {/* Floating Softy Photos - Random Movement */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.img
          src="/prerna-tulips.png"
          alt="Softy"
          className="absolute w-20 h-20 rounded-full border-4 border-pink-400 object-cover"
          animate={{ 
            x: [50, 200, 400, 100, 50],
            y: [50, 150, 100, 300, 50],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 0.8, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        />
        <motion.img
          src="/pp2.jpg"
          alt="Softy"
          className="absolute w-16 h-16 rounded-full border-4 border-cyan-400 object-cover"
          animate={{ 
            x: [300, 50, 350, 150, 300],
            y: [80, 250, 50, 200, 80],
            rotate: [0, -90, -180, -270, -360],
            scale: [1, 0.8, 1.3, 0.9, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.img
          src="/pp3.jpg"
          alt="Softy"
          className="absolute w-24 h-24 rounded-full border-4 border-purple-400 object-cover"
          animate={{ 
            x: [150, 400, 80, 250, 150],
            y: [200, 80, 300, 150, 200],
            rotate: [0, 270, 180, 450, 360],
            scale: [1, 1.1, 0.9, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4
          }}
        />
        <motion.img
          src="/prerna-running.png"
          alt="Prerna Running"
          className="absolute w-20 h-20 rounded-full border-4 border-yellow-400 object-cover"
          animate={{ 
            x: [80, 300, 150, 350, 80],
            y: [300, 100, 250, 200, 300],
            rotate: [0, 120, 240, 360],
            scale: [1, 0.7, 1.4, 0.8, 1]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 6
          }}
        />
        
        {/* Extra floating photo for more chaos */}
        <motion.img
          src="/pp4.jpg"
          alt="Softy"
          className="absolute w-18 h-18 rounded-full border-4 border-green-400 object-cover"
          animate={{ 
            x: [200, 100, 300, 50, 200],
            y: [150, 300, 80, 180, 150],
            rotate: [360, 180, 0, 270, 360],
            scale: [0.8, 1.3, 0.6, 1.1, 0.8]
          }}
          transition={{ 
            duration: 22, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 8
          }}
        />
      </div>

      {/* Tulip Emojis - More Random Movement */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <motion.div
          className="absolute text-4xl"
          animate={{ 
            x: [100, 300, 150, 250, 100],
            y: [120, 200, 80, 250, 120],
            rotate: [0, 180, 360],
            scale: [1, 1.5, 0.8, 1.2, 1]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          🌷
        </motion.div>
        <motion.div
          className="absolute text-5xl"
          animate={{ 
            x: [250, 80, 320, 120, 250],
            y: [180, 300, 100, 220, 180],
            rotate: [360, 180, 0, 270, 360],
            scale: [1, 0.7, 1.4, 0.9, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          🌷
        </motion.div>
        <motion.div
          className="absolute text-3xl"
          animate={{ 
            x: [50, 200, 100, 300, 50],
            y: [250, 100, 280, 150, 250],
            rotate: [0, 90, 180, 270, 360],
            scale: [0.8, 1.3, 1, 0.6, 0.8]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        >
          🌷
        </motion.div>
      </div>

      {/* Desktop Icons */}
      <DesktopIcons onOpenWindow={openWindow} />

      {/* Windows */}
      <AnimatePresence>
        {Object.entries(openWindows).map(([appId, isOpen]) => 
          isOpen && (
            <Window
              key={appId}
              appId={appId}
              onClose={() => closeWindow(appId)}
              onFocus={() => bringToFront(appId)}
              zIndex={1000 + windowOrder.indexOf(appId)}
            />
          )
        )}
      </AnimatePresence>

      {/* Context Menu */}
      <AnimatePresence>
        {showContextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bg-gray-800 text-white p-2 rounded border-2 border-pink-400 z-50"
            style={{ left: contextMenuPos.x, top: contextMenuPos.y }}
          >
            <div className="cursor-pointer hover:bg-pink-600 p-1 rounded">🎉 Launch Birthday Parade</div>
            <div className="cursor-pointer hover:bg-pink-600 p-1 rounded">🎂 More Birthday Chaos</div>
            <div className="cursor-pointer hover:bg-pink-600 p-1 rounded">📸 Screenshot This Slay</div>
            <div className="cursor-pointer hover:bg-pink-600 p-1 rounded">🌷 Deploy Birthday Tulips</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar 
        showStartMenu={showStartMenu}
        setShowStartMenu={setShowStartMenu}
        openWindows={openWindows}
        onOpenWindow={openWindow}
      />

      {/* Floating Birthday Message */}
      <motion.div 
        className="fixed top-4 right-4 text-white font-bold text-lg bg-pink-600 bg-opacity-80 p-3 rounded-lg border-2 border-yellow-400"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🎂 BIRTHDAY GIRL DETECTED! 👑
      </motion.div>
    </div>
  );
};

const DesktopIcons = ({ onOpenWindow }) => {
  const icons = [
    { id: 'birthday', emoji: '🎂', name: 'HAPPY BIRTHDAY!', x: 50, y: 50 },
    { id: 'tulip', emoji: '🌷', name: 'TULIP.BAT', x: 50, y: 150 },
    { id: 'drip', emoji: '👟', name: 'DRIP CHECK', x: 50, y: 250 },
    { id: 'gallery', emoji: '📸', name: 'SOFTY GALLERY', x: 200, y: 50 },
    { id: 'fanmail', emoji: '💌', name: 'BIRTHDAY WISHES', x: 200, y: 150 },
    { id: 'vibe', emoji: '🎶', name: 'BIRTHDAY BEATS', x: 200, y: 250 },
    { id: 'danger', emoji: '🧠', name: 'DO NOT CLICK THIS', x: 350, y: 50 }
  ];

  return (
    <>
      {icons.map(icon => (
        <motion.div
          key={icon.id}
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed text-center cursor-pointer select-none"
          style={{ left: icon.x, top: icon.y }}
          onDoubleClick={() => onOpenWindow(icon.id)}
        >
          <div className="text-4xl mb-1">{icon.emoji}</div>
          <div className="text-white font-bold text-xs bg-black bg-opacity-50 px-1 rounded max-w-20">
            {icon.name}
          </div>
        </motion.div>
      ))}
    </>
  );
};

const Window = ({ appId, onClose, onFocus, zIndex }) => {
  const [position, setPosition] = useState({ x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 });

  const apps = {
    birthday: <BirthdayApp />,
    tulip: <TulipApp />,
    drip: <DripApp />,
    gallery: <GalleryApp />,
    fanmail: <FanMailApp />,
    vibe: <VibeApp />,
    danger: <DangerApp />
  };

  const titles = {
    birthday: '🎂 HAPPY BIRTHDAY SOFTY! 🎉',
    tulip: '🌷 TULIP.BAT - Terminal',
    drip: '👟 DRIP CHECK - Analysis Complete',
    gallery: '📸 SOFTY GALLERY - Picture Perfect',
    fanmail: '💌 BIRTHDAY WISHES - Inbox (999+)',
    vibe: '🎶 BIRTHDAY BEATS - Party Mode',
    danger: '🧠 SYSTEM CRITICAL ERROR'
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: -180 }}
      className="fixed bg-gray-800 border-2 border-pink-400 rounded-lg overflow-hidden shadow-2xl"
      style={{ 
        left: position.x, 
        top: position.y, 
        zIndex,
        width: appId === 'birthday' ? '500px' : '400px',
        height: appId === 'birthday' ? '400px' : '300px',
        filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))'
      }}
      onMouseDown={onFocus}
      drag
      dragMomentum={false}
      onDragEnd={(e, info) => {
        setPosition(prev => ({
          x: prev.x + info.offset.x,
          y: prev.y + info.offset.y
        }));
      }}
    >
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 flex justify-between items-center cursor-move">
        <span className="text-white font-bold text-sm">{titles[appId]}</span>
        <button 
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
        >
          ❌
        </button>
      </div>
      <div className="p-4 h-full overflow-auto bg-black text-green-400">
        {apps[appId]}
      </div>
    </motion.div>
  );
};

const BirthdayApp = () => {
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-white h-full flex flex-col justify-center relative">
      {/* Background Softy Photo */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center rounded"
        style={{ backgroundImage: "url('/pp4.jpg')" }}
      />
      
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-6xl mb-4 relative z-10"
      >
        🎂
      </motion.div>
      
      <h1 className="text-3xl font-bold text-pink-400 mb-4 relative z-10">
        HAPPY BIRTHDAY
      </h1>
      
      <h2 className="text-2xl font-bold text-cyan-400 mb-4 relative z-10">
        PRERNA PRACHI!
      </h2>
      
      <div className="text-lg mb-4 relative z-10">
        <div className="text-yellow-400">aka SOFTY 💕</div>
        <div className="text-yellow-400">aka PP 👑</div>
      </div>

      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              initial={{ scale: 0, x: 200, y: 150 }}
              animate={{ 
                scale: [0, 1, 0],
                x: 200 + (Math.random() - 0.5) * 300,
                y: 150 + (Math.random() - 0.5) * 200
              }}
              transition={{ duration: 1 }}
            >
              🎆
            </motion.div>
          ))}
        </div>
      )}

      <div className="space-y-2 text-sm relative z-10">
        <div className="text-pink-300">🎉 Another year of being iconic!</div>
        <div className="text-purple-300">📸 Another year of slaying photos!</div>
        <div className="text-cyan-300">🌷 Another year of tulip aesthetics!</div>
        <div className="text-yellow-300">👟 Another year of Palermo drip!</div>
      </div>

      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-4xl mt-4 relative z-10"
      >
        🎁✨🎈
      </motion.div>
    </div>
  );
};

const GalleryApp = () => {
  const softyPhotos = [
    { id: 1, src: '/prerna.jpg', caption: 'Main Character Energy ✨' },
    { id: 2, src: '/pp2.jpg', caption: 'Camera God Mode 📸' },
    { id: 3, src: '/pp3.jpg', caption: 'Tulip Aesthetic Queen 🌷' },
    { id: 4, src: '/pp4.jpg', caption: 'Birthday Slay Mode 🎂' },
    { id: 5, src: '/prerna-running.png', caption: 'Running Queen 🏃‍♀️' },
    { id: 6, src: '/prerna.jpg', caption: 'Pure Iconic Energy 👑' }
  ];

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="text-white h-full">
      <h2 className="text-lg mb-3 text-center text-cyan-400">📸 SOFTY'S GALLERY 📸</h2>
      
      {selectedPhoto ? (
        <div className="h-full flex flex-col">
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="bg-pink-600 text-white px-2 py-1 rounded mb-2 text-xs self-start"
          >
            ← Back to Gallery
          </button>
          <div className="flex-1 flex flex-col items-center">
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.caption}
              className="max-w-full max-h-40 object-contain rounded border-2 border-pink-400"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="hidden text-4xl">📸</div>
            <div className="text-center mt-2 text-yellow-400">
              {selectedPhoto.caption}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-40">
            {softyPhotos.map((photo) => (
              <motion.div 
                key={photo.id}
                className="cursor-pointer border-2 border-gray-600 rounded overflow-hidden bg-gray-700 flex items-center justify-center h-16"
                whileHover={{ scale: 1.05, borderColor: '#ec4899' }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <img 
                  src={photo.src} 
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center text-2xl">
                  📸
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-3 text-yellow-400 animate-pulse">
            🌟 {softyPhotos.length} photos of pure slay 🌟
          </div>
          <div className="text-xs text-center mt-2">Click any photo to view full size! 📸</div>
        </>
      )}
    </div>
  );
};

const DripApp = () => {
  const [sparkles, setSparkles] = useState(false);

  return (
    <div className="text-center text-white">
      <h2 className="text-xl mb-4 text-pink-400">👟 BIRTHDAY DRIP ANALYSIS 👟</h2>
      
      {/* Palermo Shoe Emoji (since no palermo image available) */}
      <motion.div 
        className={`text-6xl mb-4 ${sparkles ? 'animate-spin' : ''}`}
        onClick={() => setSparkles(!sparkles)}
        whileHover={{ scale: 1.1 }}
      >
        👟
      </motion.div>
      
      {sparkles && <div className="text-2xl animate-bounce">🎉✨🎂✨🎉</div>}
      <div className="bg-green-600 p-2 rounded mb-2">
        <div className="text-sm">BIRTHDAY SLAY LEVEL: ∞ ✅</div>
      </div>
      <div className="text-xs">Status: LEGALLY TOO ICONIC FOR ONE DAY</div>
      <div className="text-xs mt-2">⚠️ Warning: Birthday drip may cause celebration overflow</div>
      <div className="text-xs mt-1 text-pink-400">🎂 Special birthday edition detected!</div>
    </div>
  );
};

const TulipApp = () => {
  const [lines, setLines] = useState([]);
  
  useEffect(() => {
    const commands = [
      'C:\\BIRTHDAY> initializing...',
      '🎂 HAPPY BIRTHDAY SOFTY! 🎂',
      'Prerna detected. Birthday mode active. 🎉',
      'Loading birthday aesthetic protocols... ✨',
      'Florals overloaded. Deploying birthday petals... 🌷🎂🌷',
      'Main character energy: BIRTHDAY LEVEL 💅',
      'System status: BIRTHDAY QUEEN ACTIVATED 👑',
      'ERROR: Too much birthday drip detected. Celebration overflow imminent.',
      'PP.exe is having the best birthday ever! 🎈'
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < commands.length) {
        setLines(prev => [...prev, commands[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-sm">
      {lines.map((line, i) => (
        <div key={i} className="mb-1 animate-pulse">{line}</div>
      ))}
      <div className="animate-pulse">█</div>
    </div>
  );
};

const FanMailApp = () => {
  const messages = [
    "🎂 HAPPY BIRTHDAY PP! You are literally not allowed to age this gracefully. - Anonymous Birthday Admirer",
    "Softy, my camera is planning your birthday party because even it knows you're special. - Confused Photographer",
    "I saw you running today and thought: 'There goes the birthday queen.' - Random Birthday Witness",
    "Your birthday aesthetic is making everyone else's celebrations look basic. - Birthday Committee",
    "PP, please slow down the birthday slay, you're making us all look like we're not celebrating. - The Birthday Club",
    "🌷 Happy Birthday! Your tulip energy is blooming even more today! - Botanical Birthday Society"
  ];

  return (
    <div className="text-white">
      <h2 className="text-lg mb-3 text-pink-400">🎂 BIRTHDAY WISHES 🎂</h2>
      <div className="space-y-3 text-xs overflow-y-auto max-h-40">
        {messages.map((msg, i) => (
          <motion.div 
            key={i} 
            className="bg-pink-900 p-2 rounded border-l-4 border-pink-400"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.3 }}
          >
            {msg}
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-2 text-yellow-400 animate-pulse">
        🎉 999+ more birthday wishes waiting...
      </div>
    </div>
  );
};

const VibeApp = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="text-white text-center">
      <h2 className="text-lg mb-3 text-purple-400">🎂 BIRTHDAY RADIO 🎂</h2>
      <div className="bg-purple-900 p-3 rounded mb-3">
        <div className="text-sm mb-2">Now Playing:</div>
        <div className="text-lg text-pink-400">"Birthday But Make It Iconic"</div>
        <div className="text-xs text-gray-400">by PP & The Birthday Legends</div>
      </div>
      
      <div className="flex justify-center items-center space-x-2 mb-3">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-pink-600 px-3 py-1 rounded hover:bg-pink-500"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>

      {isPlaying && (
        <div className="flex justify-center space-x-1 mb-2">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-cyan-400 rounded"
              animate={{ height: [4, 20, 4] }}
              transition={{ 
                repeat: Infinity, 
                duration: 0.5, 
                delay: i * 0.1 
              }}
            />
          ))}
        </div>
      )}
      
      <div className="text-xs">🎵 Birthday Vibes: MAXIMUM ✨</div>
      <div className="text-xs mt-1 text-pink-400">🎂 Special birthday playlist activated!</div>
    </div>
  );
};

const DangerApp = () => {
  return (
    <div className="text-center">
      <div className="text-red-500 text-6xl mb-4 animate-pulse">🎂💥</div>
      <div className="text-red-400 text-xl mb-2">BIRTHDAY OVERLOAD</div>
      <div className="text-white text-sm mb-4">
        ERROR: TOO MUCH BIRTHDAY ICON ENERGY. CELEBRATION FAILED TO CONTAIN.
      </div>
      <div className="text-xs text-gray-400 mb-4">
        System unable to process this level of birthday main character energy.
      </div>
      <motion.button 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        whileHover={{ scale: 1.1 }}
        onClick={() => window.location.reload()}
      >
        🔄 REBOOT BIRTHDAY REALITY
      </motion.button>
    </div>
  );
};

const Taskbar = ({ showStartMenu, setShowStartMenu, openWindows, onOpenWindow }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t-2 border-pink-400 h-12 flex items-center px-2 z-40">
      <motion.button
        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded mr-2 font-bold"
        whileHover={{ scale: 1.05 }}
        onClick={(e) => {
          e.stopPropagation();
          setShowStartMenu(!showStartMenu);
        }}
      >
        🎂 BIRTHDAY
      </motion.button>

      {Object.entries(openWindows).map(([appId, isOpen]) => 
        isOpen && (
          <div key={appId} className="bg-gray-700 text-white px-2 py-1 rounded mx-1 text-xs">
            {appId.toUpperCase()}
          </div>
        )
      )}

      <div className="ml-auto text-white text-sm">
        🎉 BIRTHDAY TIME: FOREVER! 🎂
      </div>

      <AnimatePresence>
        {showStartMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-12 left-0 bg-gray-800 border-2 border-pink-400 p-4 rounded-tr-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-pink-400 font-bold mb-2">🎂 BIRTHDAY QUEEN PP! 👑</div>
            <div className="text-white text-xs space-y-1 max-w-60">
              <div>🎉 IT'S HER BIRTHDAY! 🎉</div>
              <div>🏃‍♀️ Professional runner (& professional birthday slay-er)</div>
              <div>📸 Camera god having the most photogenic birthday</div>
              <div>👗 Fashion icon (birthday outfit: ICONIC)</div>
              <div>🌷 Tulip aesthetic birthday queen</div>
              <div>✨ Birthday main character energy: MAXIMUM</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdayOS;