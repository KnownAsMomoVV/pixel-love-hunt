
import React, { useState } from 'react';

const PacmanGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="pixel-font text-lg mb-4">Pacman Game</h2>
      
      <div className="crt-border p-4 bg-black w-full max-w-md aspect-square flex flex-col items-center justify-center">
        {!gameStarted ? (
          <div className="text-center">
            <div className="text-2xl text-yellow-400 mb-6 animate-bounce">PACMAN</div>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {Array.from({ length: 16 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <button 
              className="pixel-button bg-yellow-400 text-black px-6 py-2 hover:bg-yellow-300"
              onClick={() => setGameStarted(true)}
            >
              START GAME
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-white mb-4">Coming Soon!</div>
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-yellow-400 rounded-full relative animate-pacman">
                <div className="absolute top-0 left-0 right-0 h-4 bg-black" style={{ borderRadius: '50px 50px 0 0' }}></div>
              </div>
            </div>
            <div className="mt-8">
              <button 
                className="pixel-button bg-yellow-400 text-black px-4 py-1 hover:bg-yellow-300"
                onClick={() => setGameStarted(false)}
              >
                Back to Menu
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-xs">
        This is a placeholder for the Pacman game.
        <br />
        The full game will be implemented soon!
      </div>
    </div>
  );
};

export default PacmanGame;
