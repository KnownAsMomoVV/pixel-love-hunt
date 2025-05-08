
import React, { useState, useEffect } from 'react';
import { useDesktop, WindowType } from '../contexts/DesktopContext';
import Icon from './Icon';
import Window from './Window';
import TaskBar from './TaskBar';
import Vault from './Vault';
import RewardPage from './RewardPage';
import { generateIcons, initialWindows } from '../data/desktopItems';

const MacDesktop: React.FC = () => {
  const { 
    setIcons, 
    icons, 
    windows, 
    setWindows, 
    activeWindowId,
    showReward
  } = useDesktop();
  const [initialized, setInitialized] = useState(false);
  
  // Initialize desktop items
  useEffect(() => {
    if (initialized) return;
    
    // Create a window when clicking on an icon
    const createWindow = (content: React.ReactNode, title: string, width: number, height: number) => {
      const newWindow: WindowType = {
        id: title.toLowerCase().replace(/\s+/g, '-'),
        title,
        content,
        position: {
          x: Math.max(50, Math.min(window.innerWidth - width - 50, 100 + Math.random() * 100)),
          y: Math.max(50, Math.min(window.innerHeight - height - 50, 100 + Math.random() * 100))
        },
        size: { width, height },
        isOpen: true,
        zIndex: windows.length + 1,
        minimized: false
      };

      setWindows(prev => [...prev, newWindow]);
      return newWindow.id;
    };

    // Generate icons
    setIcons(generateIcons(createWindow));
    
    // Initialize windows with the welcome window and vault windows
    const initialWindowsWithProps = initialWindows.map((win, index) => ({
      ...win,
      zIndex: index + 1,
      isOpen: win.id === 'welcome',
      minimized: false
    }));
    
    // Create vault windows
    const vaultWindows = [
      {
        id: 'vault1',
        title: 'Travel Memories',
        content: <Vault vaultId="vault1" question="Where did we confess?" correctAnswer="TAIPEI 101" />,
        position: { x: 150, y: 120 },
        size: { width: 400, height: 350 },
        isOpen: false,
        zIndex: initialWindowsWithProps.length + 1,
        minimized: false
      },
      {
        id: 'vault2',
        title: 'System Settings',
        content: <Vault vaultId="vault2" question="In what language did we confess?" correctAnswer="JAPANESE" />,
        position: { x: 180, y: 150 },
        size: { width: 400, height: 350 },
        isOpen: false,
        zIndex: initialWindowsWithProps.length + 2,
        minimized: false
      },
      {
        id: 'vault3',
        title: 'Calendar',
        content: <Vault vaultId="vault3" question="When did we first meet in Europe?" correctAnswer="SEPTEMBER" />,
        position: { x: 210, y: 180 },
        size: { width: 400, height: 350 },
        isOpen: false,
        zIndex: initialWindowsWithProps.length + 3,
        minimized: false
      },
      {
        id: 'reward',
        title: 'Special Surprise',
        content: <RewardPage />,
        position: { x: 100, y: 80 },
        size: { width: 500, height: 400 },
        isOpen: false,
        zIndex: initialWindowsWithProps.length + 4,
        minimized: false
      }
    ];
    
    setWindows([...initialWindowsWithProps, ...vaultWindows]);
    setInitialized(true);
  }, [initialized, setIcons, setWindows, windows.length]);

  // Handle document clicks to close menus
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mac-dropdown') && !target.closest('.taskbar-menu')) {
        // Close menus when clicking outside
        // This will be handled by the context
      }
    };
    
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <div className="crt-effect min-h-screen bg-mac-blue relative overflow-hidden">
      {/* Desktop icons */}
      {icons.map((icon) => (
        <Icon key={icon.id} {...icon} />
      ))}

      {/* Special surprise icon that appears after all vaults are unlocked */}
      {showReward && (
        <Icon
          id="special-surprise"
          name="Special Surprise"
          icon="special"
          position={{ x: window.innerWidth / 2 - 35, y: window.innerHeight / 2 - 40 }}
          action={() => {
            const rewardWindow = windows.find(w => w.id === 'reward');
            if (rewardWindow) {
              setWindows(prev => 
                prev.map(w => 
                  w.id === 'reward' 
                    ? { ...w, isOpen: true, minimized: false, zIndex: Math.max(...prev.map(win => win.zIndex), 0) + 1 } 
                    : w
                )
              );
            }
          }}
          className="animate-pixel-fade-in"
        />
      )}
      
      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          {...window}
        />
      ))}
      
      {/* Taskbar */}
      <TaskBar />
    </div>
  );
};

export default MacDesktop;
