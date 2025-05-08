
import React, { useEffect, useState, useRef } from 'react';

const GRID_SIZE = 15;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_FOOD = { x: 3, y: 3 };
const GAME_SPEED = 150;

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const directionRef = useRef(direction);
  const intervalIdRef = useRef<number | null>(null);
  
  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    
    // Make sure food doesn't spawn on the snake
    const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    if (isOnSnake) return generateFood();
    
    return newFood;
  };

  const moveSnake = () => {
    if (gameOver || isPaused || !isPlaying) return;
    
    const head = snake[0];
    const newHead = {
      x: head.x + directionRef.current.x,
      y: head.y + directionRef.current.y
    };
    
    // Check wall collision
    if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
      setGameOver(true);
      return;
    }
    
    // Check self collision
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      setGameOver(true);
      return;
    }
    
    // Create new snake with the new head
    const newSnake = [newHead, ...snake];
    
    // Check food collision
    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(generateFood());
      setScore(prevScore => prevScore + 1);
    } else {
      newSnake.pop(); // Remove tail if no food eaten
    }
    
    setSnake(newSnake);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isPlaying) return;
    
    // Prevent reversing direction
    switch (e.key) {
      case 'ArrowUp':
        if (directionRef.current.y !== 1) {
          directionRef.current = { x: 0, y: -1 };
          setDirection({ x: 0, y: -1 });
        }
        break;
      case 'ArrowDown':
        if (directionRef.current.y !== -1) {
          directionRef.current = { x: 0, y: 1 };
          setDirection({ x: 0, y: 1 });
        }
        break;
      case 'ArrowLeft':
        if (directionRef.current.x !== 1) {
          directionRef.current = { x: -1, y: 0 };
          setDirection({ x: -1, y: 0 });
        }
        break;
      case 'ArrowRight':
        if (directionRef.current.x !== -1) {
          directionRef.current = { x: 1, y: 0 };
          setDirection({ x: 1, y: 0 });
        }
        break;
      case ' ':
        togglePause();
        break;
    }
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(INITIAL_FOOD);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setIsPlaying(true);
  };
  
  const togglePause = () => {
    setIsPaused(!isPaused);
  };
  
  const startGame = () => {
    resetGame();
    setIsPlaying(true);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying && !gameOver && !isPaused) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      intervalIdRef.current = window.setInterval(moveSnake, GAME_SPEED);
    } else if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isPlaying, gameOver, isPaused]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="pixel-font text-lg mb-2">Snake Game</h2>
      <div className="mb-2">Score: {score}</div>
      
      <div 
        className="crt-border" 
        style={{ 
          width: GRID_SIZE * CELL_SIZE, 
          height: GRID_SIZE * CELL_SIZE,
          position: 'relative',
          backgroundColor: '#222',
          overflow: 'hidden'
        }}
      >
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
            <button 
              className="pixel-button bg-mac-blue text-white px-4 py-2"
              onClick={startGame}
            >
              Start Game
            </button>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
            <div className="text-center">
              <div className="text-white mb-2">Game Over!</div>
              <div className="text-white mb-4">Score: {score}</div>
              <button 
                className="pixel-button bg-mac-blue text-white px-4 py-2"
                onClick={resetGame}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
        
        {isPaused && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
            <div className="text-white">Paused</div>
          </div>
        )}
        
        {/* Food */}
        <div 
          style={{
            position: 'absolute',
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: 'red',
            borderRadius: '50%'
          }}
        />
        
        {/* Snake */}
        {snake.map((segment, index) => (
          <div 
            key={index}
            style={{
              position: 'absolute',
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: index === 0 ? '#33C3F0' : '#1EAEDB',
              border: index === 0 ? '2px solid white' : 'none'
            }}
          />
        ))}
      </div>
      
      <div className="mt-2 flex space-x-2">
        <button 
          className="pixel-button bg-mac-white hover:bg-mac-blue hover:text-white"
          onClick={togglePause}
          disabled={!isPlaying || gameOver}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button 
          className="pixel-button bg-mac-white hover:bg-mac-blue hover:text-white"
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
      <div className="mt-2 text-xs">
        Use arrow keys to control. Press Space to pause.
      </div>
    </div>
  );
};

export default SnakeGame;
