
import React, { useEffect, useState } from 'react';

const RewardPage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="text-center mb-4">
        <h2 className="pixel-font-bold text-xl mb-2 animate-sparkle">Special Surprise</h2>
        <p className="text-mac-blue animate-fade-in">Congratulations on solving all the puzzles! 💙</p>
      </div>
      
      <div className="flex-1 crt-border p-4 mb-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {/* Image container with animations */}
          <div className={`relative w-full h-64 bg-mac-blue bg-opacity-20 flex items-center justify-center transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-lg">Your special image will appear here</span>
            
            {/* Animated pixel hearts */}
            <div className="absolute top-4 right-4 text-mac-blue animate-sparkle">💙</div>
            <div className="absolute bottom-4 left-4 text-mac-blue animate-sparkle delay-300">💙</div>
            <div className="absolute top-4 left-4 text-mac-blue animate-sparkle delay-700">💙</div>
            <div className="absolute bottom-4 right-4 text-mac-blue animate-sparkle delay-500">💙</div>
            
            {/* Animated stars */}
            <div className="absolute top-8 right-10 text-yellow-400 animate-sparkle delay-200">✨</div>
            <div className="absolute bottom-8 left-10 text-yellow-400 animate-sparkle delay-400">✨</div>
            <div className="absolute top-20 left-20 text-yellow-400 animate-sparkle delay-600">✨</div>
            <div className="absolute bottom-12 right-12 text-yellow-400 animate-sparkle">✨</div>
            
            {/* Animated fireworks */}
            <div className="absolute top-8 left-8 text-pink-400 animate-firework">🎆</div>
            <div className="absolute bottom-8 right-8 text-green-400 animate-firework delay-500">🎆</div>
            
            {/* New color explosions */}
            <div className="absolute top-1/4 left-1/4 h-8 w-8 rounded-full bg-pink-500 bg-opacity-50 animate-ping"></div>
            <div className="absolute bottom-1/4 right-1/4 h-8 w-8 rounded-full bg-blue-500 bg-opacity-50 animate-ping delay-300"></div>
            <div className="absolute top-1/2 left-3/4 h-6 w-6 rounded-full bg-purple-500 bg-opacity-50 animate-ping delay-700"></div>
          </div>
        </div>
      </div>
      
      <div className="crt-border p-4">
        <h3 className="pixel-font text-mac-blue text-lg mb-2 animate-fade-in">A Message For You:</h3>
        <p className="mb-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
          This is where your heartfelt message will go. You can replace this text with your personal message
          to create a special moment.
        </p>
        <p className="mb-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
          The scavenger hunt represents our journey together - finding each other through special moments,
          languages, and shared experiences.
        </p>
        <div className="text-center mt-4 text-mac-blue animate-fade-in" style={{ animationDelay: "600ms" }}>
          <span className="animate-heart-pulse inline-block">💙</span>
          <span className="mx-2">I love you</span>
          <span className="animate-heart-pulse inline-block">💙</span>
        </div>
      </div>
    </div>
  );
};

export default RewardPage;
