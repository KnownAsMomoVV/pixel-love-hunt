
import React from 'react';

const RewardPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="text-center mb-4">
        <h2 className="pixel-font-bold text-xl mb-2">Special Surprise</h2>
        <p className="text-mac-blue">Congratulations on solving all the puzzles! 💙</p>
      </div>
      
      <div className="flex-1 crt-border p-4 mb-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {/* Placeholder for image - will be replaced with actual image */}
          <div className="relative w-full h-64 bg-mac-blue bg-opacity-20 flex items-center justify-center">
            <span className="text-lg">Your special image will appear here</span>
            
            {/* Animated pixel hearts */}
            <div className="absolute top-4 right-4 text-mac-blue animate-sparkle">💙</div>
            <div className="absolute bottom-4 left-4 text-mac-blue animate-sparkle delay-300">💙</div>
            <div className="absolute top-4 left-4 text-mac-blue animate-sparkle delay-700">💙</div>
            <div className="absolute bottom-4 right-4 text-mac-blue animate-sparkle delay-500">💙</div>
          </div>
        </div>
      </div>
      
      <div className="crt-border p-4">
        <h3 className="pixel-font text-mac-blue text-lg mb-2">A Message For You:</h3>
        <p className="mb-2">
          This is where your heartfelt message will go. You can replace this text with your personal message
          to create a special moment.
        </p>
        <p className="mb-4">
          The scavenger hunt represents our journey together - finding each other through special moments,
          languages, and shared experiences.
        </p>
        <div className="text-center mt-4 text-mac-blue">
          <span className="animate-heart-pulse inline-block">💙</span>
          <span className="mx-2">I love you</span>
          <span className="animate-heart-pulse inline-block">💙</span>
        </div>
      </div>
    </div>
  );
};

export default RewardPage;
