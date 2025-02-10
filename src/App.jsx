import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Heart, Gift } from 'lucide-react';


const CountdownTimer = ({ onTimeReached }) => {
  const targetDate = new Date('2025-02-11T00:00:00'); // Set target date to November 11, 2025
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate)); // Initialize timeLeft
  const [showCountdown, setShowCountdown] = useState(true); // Controls visibility of the countdown

  // Function to calculate time left
  function calculateTimeLeft(targetDate) {
    const difference = +new Date(targetDate) - +new Date(); // Difference in milliseconds
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!showCountdown) return null; // Don't render anything when countdown is done

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <Heart
        size={48}
        className="text-red-500 transition-transform duration-200 animate-pulse"
        fill="currentColor"
      />
      <div className="flex flex-wrap justify-center gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-white/10 backdrop-blur-lg rounded-lg p-4 min-w-[100px]">
            <div className="text-4xl font-bold text-white">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-pink-300 text-sm uppercase">
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GiftBox = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (!isOpening) {
      setIsOpening(true);
      setTimeout(() => {
        onOpen();
      }, 2000);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`cursor-pointer transition-all duration-1000 ${isOpening ? 'scale-150 opacity-0' : 'hover:scale-110'}`}
    >
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 60 60" className="animate-float">
          <rect x="10" y="20" width="40" height="35" fill="#FF69B4" className="animate-pulse"/>
          <rect x="5" y="15" width="50" height="10" fill="#FFB6C1"/>
          <rect x="25" y="15" width="10" height="40" fill="#FFB6C1" className={isOpening ? 'animate-lid-open' : ''} />
          <path d="M30 5 L40 15 H20 Z" fill="#FFB6C1"/>
        </svg>
        {!isOpening && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg">
            Click to Open
          </div>
        )}
      </div>
    </div>
  );
};

const Butterfly = ({ x, y }) => (
  <div 
    className="absolute animate-butterfly"
    style={{ 
      left: x,
      top: y,
      zIndex: 50,
      filter: 'drop-shadow(0 0 5px rgba(255,192,203,0.5))'
    }}
  >
    <svg width="30" height="30" viewBox="0 0 100 100">
      <path
        d="M50 30 C20 10, 0 40, 20 60 C0 80, 20 90, 50 70 C80 90, 100 80, 80 60 C100 40, 80 10, 50 30"
        fill="#FFB6C1"
        className="animate-wing"
      />
    </svg>
  </div>
);

const FireworkRocket = ({ id, startX }) => (
  <div 
    className="absolute bottom-0 w-4 h-4 rounded-full animate-rocket"
    style={{
      left: startX,
      zIndex: 30,
      background: 'radial-gradient(circle, #fff 0%, #ffd700 100%)',
      filter: 'brightness(1.5) drop-shadow(0 0 15px yellow)'
    }}
  />
);

const FireworkExplosion = ({ x, y }) => {
  const particles = Array.from({ length: 60 }, (_, index) => ({
    id: `particle-${Date.now()}-${Math.random()}-${index}`,
  }));
  const colors = ['#FFD700', '#FF69B4', '#87CEEB', '#FF4500', '#9370DB', '#40E0D0', '#FF1493', '#00FF7F'];

  return (
    <div className="absolute" style={{ left: x, top: y, zIndex: 40 }}>
      {particles.map((particle) => {
        const angle = (particles.indexOf(particle) * 360) / particles.length;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 4 + Math.random() * 4;
        return (
          <div
            key={particle.id}
            className="absolute rounded-full animate-explosion"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              '--angle': `${angle}deg`,
              '--distance': `${200 + Math.random() * 100}px`,
              filter: 'brightness(1.5) drop-shadow(0 0 8px currentColor)'
            }}
          />
        );
      })}
    </div>
  );
};

const BirthdayMessage = ({ className = '' }) => (
  <div className={`backdrop-blur-xl bg-white/20 rounded-xl p-6 md:p-8 shadow-xl mb-8 text-white border border-white/10 hover:bg-white/30 transition-all duration-300 ${className}`}>
    <p className="text-2xl md:text-3xl mb-6 leading-relaxed satisfy animate-fade-in">
      Assalamu Alaikum Dearest Fatima Zahra,
    </p>
    <div className="space-y-6 quicksand">
      <p className="text-lg md:text-xl leading-relaxed animate-slide-up">
        May Allah bless you abundantly on this special day and always. Like these
        sparkling fireworks lighting up the night sky, may your life be filled with
        moments of joy, success, and endless blessings.
      </p>
      <p className="text-lg md:text-xl leading-relaxed animate-slide-up delay-150">
        InshaAllah, may this new year of your life bring you closer to your goals,
        strengthen your faith, and help you make the most of every precious moment.
        (And yes, that includes conquering laziness! 😉🎁)
      </p>
      <p className="text-lg md:text-xl leading-relaxed animate-slide-up delay-300">
        May Allah guide you towards what's best in both worlds and fill your days
        with purpose, productivity, and peace. Keep shining bright!
      </p>
    </div>
    <div className="mt-8 mb-4 text-2xl md:text-3xl text-gold-300 satisfy animate-fade-in delay-500">
      With prayers and warm wishes,
    </div>
    <p className="text-2xl md:text-3xl satisfy text-gold-300 animate-fade-in delay-700">
      Umair ✨
    </p>
  </div>
);

const App = () => {
  const [rockets, setRockets] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [butterflies, setButterflies] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const targetDate = '2025-02-11T00:00:00';

  const startCelebration = () => {
    setShowGift(true);
  };

  const handleGiftOpen = () => {
    setShowContent(true);
    
    const launchFirework = () => {
      const id = Date.now();
      const startX = `${10 + Math.random() * 80}%`;
      
      setRockets(prev => [...prev, { id, startX }]);
      
      setTimeout(() => {
        setExplosions(prev => [...prev, { id, x: startX, y: '20%' }]);
        setRockets(prev => prev.filter(rocket => rocket.id !== id));
        
        setTimeout(() => {
          setExplosions(prev => prev.filter(exp => exp.id !== id));
        }, 2000);
      }, 1000);
    };

    const addButterfly = () => {
      const id = Date.now();
      const x = `${Math.random() * 100}%`;
      const y = `${Math.random() * 100}%`;
      
      setButterflies(prev => [...prev, { id, x, y }]);
      setTimeout(() => {
        setButterflies(prev => prev.filter(b => b.id !== id));
      }, 10000);
    };

    for (let i = 0; i < 10; i++) {
      setTimeout(() => launchFirework(), i * 200);
      setTimeout(() => addButterfly(), i * 500);
    }

    const fireworkInterval = setInterval(launchFirework, 2000);
    const butterflyInterval = setInterval(addButterfly, 3000);
    
    return () => {
      clearInterval(fireworkInterval);
      clearInterval(butterflyInterval);
    };
  };

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900" />
      <div className="min-h-screen relative z-10 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
        <CountdownTimer targetDate={targetDate} onTimeReached={startCelebration} />
        
        {showGift && !showContent && (
          <GiftBox onOpen={handleGiftOpen} />
        )}

        {showContent && (
          <>
            {rockets.map(rocket => (
              <FireworkRocket key={rocket.id} {...rocket} />
            ))}
            {explosions.map(explosion => (
              <FireworkExplosion key={explosion.id} {...explosion} />
            ))}
            {butterflies.map(butterfly => (
              <Butterfly key={butterfly.id} {...butterfly} />
            ))}

            <div className="relative z-20 max-w-4xl mx-4 animate-content-appear">
              <div className="text-4xl text-pink-400 animate-bounce mb-8">🎉 Happy Birthday! 🎉</div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white animate-glow-rainbow sacramento">
                Happy Birthday
                <Sparkles className="inline-block ml-4 w-8 h-8 text-yellow-300 animate-spin-slow" />
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gold-300 animate-glow-soft dancing-script">
                Fatima Zahra!
              </h2>

              <BirthdayMessage />

              <div className="flex justify-center space-x-6">
                <span className="text-6xl animate-bounce">🎁</span>
                <span className="text-6xl animate-bounce delay-150">🎈</span>
                <span className="text-6xl animate-bounce delay-300">🎊</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Sacramento&family=Dancing+Script:wght@700&family=Satisfy&family=Quicksand:wght@400;700&display=swap');

  .sacramento { font-family: 'Sacramento', cursive; }
  .dancing-script { font-family: 'Dancing Script', cursive; }
  .satisfy { font-family: 'Satisfy', cursive; }
  .quicksand { font-family: 'Quicksand', sans-serif; }

  .text-gold-300 { color: #FFD700; }

  @keyframes lid-open {
    0% { transform-origin: bottom; transform: rotateX(0deg); }
    100% { transform-origin: bottom; transform: rotateX(-180deg); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  @keyframes content-appear {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.1); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes butterfly {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(100px, -50px) rotate(15deg); }
    50% { transform: translate(0, -100px) rotate(0deg); }
    75% { transform: translate(-100px, -50px) rotate(-15deg); }
  }

  @keyframes wing {
    0%, 100% { transform: scaleX(1); }
    50% { transform: scaleX(0.5); }
  }

  @keyframes rocket {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    90% {
      transform: translateY(-90vh) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-90vh) scale(2);
      opacity: 0;
    }
  }

  @keyframes explosion {
    0% {
      transform: rotate(var(--angle)) translateX(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: rotate(var(--angle)) translateX(var(--distance)) scale(0);
      opacity: 0;
    }
  }

  @keyframes glow-rainbow {
    0%, 100% { 
      text-shadow: 0 0 20px #fff,
                   0 0 30px #ff69b4,
                   0 0 40px #ff69b4,
                   0 0 70px #ff69b4;
    }
    33% {
      text-shadow: 0 0 20px #fff,
                   0 0 30px #ffd700,
                   0 0 40px #ffd700,
                   0 0 70px #ffd700;
    }
    66% {
      text-shadow: 0 0 20px #fff,
                   0 0 30px #87ceeb,
                   0 0 40px #87ceeb,
                   0 0 70px #87ceeb;
    }
  }

  .animate-rocket {
    animation: rocket 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .animate-explosion {
    animation: explosion 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .animate-butterfly {
    animation: butterfly 10s ease-in-out infinite;
  }

  .animate-wing {
    animation: wing 0.3s ease-in-out infinite;
  }

  .animate-glow-rainbow {
    animation: glow-rainbow 4s ease-in-out infinite;
  }

  .animate-fade-in {
    animation: fade-in 1s ease-out forwards;
  }

  .animate-slide-up {
    animation: slide-up 1s ease-out forwards;
  }

  .animate-spin-slow {
    animation: spin 3s linear infinite;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-content-appear {
    animation: content-appear 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .delay-150 { animation-delay: 150ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-500 { animation-delay: 500ms; }
  .delay-700 { animation-delay: 700ms; }

  @keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes slide-up {
    0% { 
      opacity: 0;
      transform: translateY(20px);
    }
    100% { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    overflow-x: hidden;
    background: linear-gradient(to bottom right, #1a1a2e, #4a1259, #1a1a2e);
  }
`;
document.head.appendChild(styleSheet);

export default App;