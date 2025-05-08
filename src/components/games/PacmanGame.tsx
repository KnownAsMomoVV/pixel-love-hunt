
import React, { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 15;
const CELL_SIZE = 20;
const INITIAL_PACMAN = { x: 7, y: 7 };
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_DOTS = Array.from({ length: 30 }, () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
}));
const GAME_SPEED = 200;

// Filter out dots that spawn on initial Pacman position
const filteredDots = INITIAL_DOTS.filter(
  dot => dot.x !== INITIAL_PACMAN.x || dot.y !== INITIAL_PACMAN.y
);

const PacmanGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [pacmanPosition, setPacmanPosition] = useState(INITIAL_PACMAN);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [dots, setDots] = useState(filteredDots);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(true);
  
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef(direction);
  const intervalRef = useRef<number | null>(null);
  
  // Animation interval for mouth
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const mouthInterval = setInterval(() => {
        setMouthOpen(prev => !prev);
      }, 200);
      
      return () => clearInterval(mouthInterval);
    }
  }, [gameStarted, gameOver]);
  
  const moveGame = () => {
    if (!gameStarted || gameOver) return;
    
    // Move Pacman
    const newPosition = {
      x: pacmanPosition.x + directionRef.current.x,
      y: pacmanPosition.y + directionRef.current.y,
    };
    
    // Check wall collision and wrap around
    let adjustedX = newPosition.x;
    let adjustedY = newPosition.y;
    
    if (newPosition.x < 0) adjustedX = GRID_SIZE - 1;
    if (newPosition.x >= GRID_SIZE) adjustedX = 0;
    if (newPosition.y < 0) adjustedY = GRID_SIZE - 1;
    if (newPosition.y >= GRID_SIZE) adjustedY = 0;
    
    const finalPosition = { x: adjustedX, y: adjustedY };
    setPacmanPosition(finalPosition);
    
    // Check dot collision
    const dotEaten = dots.findIndex(
      dot => dot.x === finalPosition.x && dot.y === finalPosition.y
    );
    
    if (dotEaten !== -1) {
      setDots(prev => prev.filter((_, index) => index !== dotEaten));
      setScore(prev => prev + 10);
    }
    
    // Check if all dots are eaten
    if (dots.length === 1 && dotEaten !== -1) {
      setGameOver(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!gameStarted || gameOver) return;
    
    // Stop event propagation to prevent window movement
    e.preventDefault();
    e.stopPropagation();
    
    switch (e.key) {
      case 'ArrowUp':
        directionRef.current = { x: 0, y: -1 };
        setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        directionRef.current = { x: 0, y: 1 };
        setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        directionRef.current = { x: -1, y: 0 };
        setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        directionRef.current = { x: 1, y: 0 };
        setDirection({ x: 1, y: 0 });
        break;
    }
  };
  
  const startGame = () => {
    setGameStarted(true);
    setPacmanPosition(INITIAL_PACMAN);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setDots(filteredDots);
    setScore(0);
    setGameOver(false);
    
    // Focus the game container
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  };
  
  const restartGame = () => {
    startGame();
  };
  
  // Set up game loop
  useEffect(() => {
    if (gameStarted && !gameOver) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = window.setInterval(moveGame, GAME_SPEED);
      
      // Focus the game container
      if (gameContainerRef.current) {
        gameContainerRef.current.focus();
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [gameStarted, gameOver]);
  
  // Set up keyboard controls
  useEffect(() => {
    // Add a keyboard event listener to the game container
    const gameContainer = gameContainerRef.current;
    if (gameContainer) {
      gameContainer.addEventListener('keydown', handleKeyDown);
      
      // Make the container focusable
      gameContainer.setAttribute('tabIndex', '0');
    }
    
    return () => {
      if (gameContainer) {
        gameContainer.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [gameStarted, gameOver]);
  
  // Get rotation angle based on direction
  const getPacmanRotation = () => {
    if (direction.x === 1) return 0;
    if (direction.x === -1) return 180;
    if (direction.y === 1) return 90;
    if (direction.y === -1) return 270;
    return 0;
  };
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="pixel-font text-lg mb-4">Pacman Game</h2>
      
      {gameStarted && !gameOver && (
        <div className="mb-2">Score: {score}</div>
      )}
      
      <div 
        ref={gameContainerRef}
        className="crt-border p-4 bg-black w-full max-w-md aspect-square flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
        tabIndex={0}
      >
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
              onClick={startGame}
            >
              START GAME
            </button>
          </div>
        ) : gameOver ? (
          <div className="text-center">
            <div className="text-2xl text-yellow-400 mb-4">GAME OVER</div>
            <div className="text-white mb-6">Score: {score}</div>
            <button 
              className="pixel-button bg-yellow-400 text-black px-6 py-2 hover:bg-yellow-300"
              onClick={restartGame}
            >
              PLAY AGAIN
            </button>
          </div>
        ) : (
          <div 
            style={{
              position: 'relative',
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
              backgroundColor: '#111',
              overflow: 'hidden',
            }}
          >
            {/* Dots */}
            {dots.map((dot, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: dot.x * CELL_SIZE + CELL_SIZE/2 - 3,
                  top: dot.y * CELL_SIZE + CELL_SIZE/2 - 3,
                  width: 6,
                  height: 6,
                  backgroundColor: 'yellow',
                  borderRadius: '50%'
                }}
              />
            ))}
            
            {/* Pacman */}
            <div
              style={{
                position: 'absolute',
                left: pacmanPosition.x * CELL_SIZE,
                top: pacmanPosition.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: 'transparent',
              }}
            >
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'yellow',
                  borderRadius: '50%',
                  clipPath: mouthOpen 
                    ? `polygon(0 0, ${direction.x >= 0 ? '50%' : '100%'} 50%, 0 100%, 0 50%)`
                    : 'circle(50%)',
                  transform: `rotate(${getPacmanRotation()}deg)`,
                  transition: 'transform 0.2s'
                }}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-xs">
        {gameStarted ? 
          "Use arrow keys to move Pacman. Click on the game area first." : 
          "Click Start Game to begin"}
      </div>
    </div>
  );
};

export default PacmanGame;
