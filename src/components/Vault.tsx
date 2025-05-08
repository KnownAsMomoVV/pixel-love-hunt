
import React, { useState, useEffect } from 'react';
import { useDesktop } from '../contexts/DesktopContext';
import { toast } from '@/components/ui/use-toast';

interface VaultProps {
  vaultId: 'vault1' | 'vault2' | 'vault3';
  question: string;
  correctAnswer: string;
}

const Vault: React.FC<VaultProps> = ({ vaultId, question, correctAnswer }) => {
  const { keys, setKeys, playSound } = useDesktop();
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  // Check if this vault is already unlocked when component mounts
  useEffect(() => {
    if (keys[vaultId]) {
      setUnlocked(true);
    }
  }, [keys, vaultId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't do anything if already unlocked
    if (unlocked) return;
    
    // Compare answers case insensitive
    if (answer.trim().toUpperCase() === correctAnswer.toUpperCase()) {
      setUnlocked(true);
      setKeys(prev => ({ ...prev, [vaultId]: true }));
      playSound('success');
      toast({
        title: "Vault Unlocked!",
        description: "You've found a key!",
        duration: 3000,
      });
      
      // Check if all vaults are unlocked
      const allKeysCollected = Object.values({ ...keys, [vaultId]: true }).every(Boolean);
      if (allKeysCollected) {
        toast({
          title: "All Vaults Unlocked!",
          description: "Check your desktop for a special surprise!",
          duration: 5000,
        });
      }
    } else {
      setAttempts(attempts + 1);
      playSound('error');
      toast({
        title: "Wrong Answer",
        description: "Try again!",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className="h-full">
      {unlocked ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-3xl mb-4 text-mac-blue animate-heart-pulse">🔑</div>
          <h3 className="text-xl mb-4 text-center">Key Collected!</h3>
          <div className="crt-border p-4 bg-mac-blue bg-opacity-20 text-center">
            <p>You've successfully unlocked this vault!</p>
            <p className="mt-2">
              {keys.vault1 && keys.vault2 && keys.vault3 
                ? "All keys collected! Check your desktop for a special surprise!" 
                : "Find the remaining vaults to collect all keys!"}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 mb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="answer" className="block mb-2">Enter your answer:</label>
                <input
                  type="text"
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="pixel-input w-full"
                  autoComplete="off"
                />
              </div>
              
              <button 
                type="submit"
                className="pixel-button bg-mac-white hover:bg-mac-blue hover:text-mac-white transition-colors"
              >
                Submit Answer
              </button>
            </form>
          </div>
          
          {attempts > 0 && (
            <div className="crt-border p-2 bg-mac-black text-mac-white">
              <p>Attempts: {attempts}</p>
              <p className="text-sm">
                {attempts >= 3 ? "Hint: Think about a special moment we shared!" : "Keep trying!"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Vault;
