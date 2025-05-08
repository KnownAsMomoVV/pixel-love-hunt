
import React, { useState, useEffect } from 'react';
import { useDesktop } from '../contexts/DesktopContext';

const TaskBar: React.FC = () => {
  const { 
    windows, 
    openWindow, 
    menuOpen, 
    setMenuOpen, 
    activeMenu, 
    setActiveMenu,
    keys,
    setShowReward 
  } = useDesktop();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check if all keys are collected
    const allKeysCollected = keys.vault1 && keys.vault2 && keys.vault3;
    if (allKeysCollected) {
      // Add a delay before showing the reward icon
      const timer = setTimeout(() => {
        setShowReward(true);
      }, 2000);
      
      return () => clearInterval(timer);
    }
  }, [keys, setShowReward]);

  const handleMenuClick = (menuName: string) => {
    if (activeMenu === menuName) {
      setMenuOpen(false);
      setActiveMenu(null);
    } else {
      setMenuOpen(true);
      setActiveMenu(menuName);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveMenu(null);
  };

  const handleSettingsClick = () => {
    closeMenu();
    openWindow('vault2');
  };

  return (
    <div className="mac-taskbar fixed bottom-0 left-0 right-0 z-50 px-2">
      <div className="flex items-center space-x-4">
        <div 
          className="font-bold px-2 relative cursor-pointer"
          onClick={() => handleMenuClick('apple')}
        >
          <div className="text-lg">🍎</div>
          
          {menuOpen && activeMenu === 'apple' && (
            <div className="mac-dropdown absolute bottom-full left-0 mb-1 w-48 crt-border bg-mac-white shadow-lg animate-pixel-fade-in z-10">
              <div className="p-2 border-b border-mac-lightGray">About This Mac</div>
              <div 
                className="p-2 border-b border-mac-lightGray cursor-pointer hover:bg-mac-blue hover:text-mac-white"
                onClick={handleSettingsClick}
              >
                Settings
              </div>
              <div className="p-2">Restart</div>
            </div>
          )}
        </div>
        
        <div 
          className="px-2 cursor-pointer relative"
          onClick={() => handleMenuClick('file')}
        >
          File
          
          {menuOpen && activeMenu === 'file' && (
            <div className="mac-dropdown absolute bottom-full left-0 mb-1 w-48 crt-border bg-mac-white shadow-lg animate-pixel-fade-in z-10">
              <div className="p-2 border-b border-mac-lightGray">New</div>
              <div className="p-2 border-b border-mac-lightGray">Open</div>
              <div className="p-2">Close</div>
            </div>
          )}
        </div>
        
        <div 
          className="px-2 cursor-pointer relative"
          onClick={() => handleMenuClick('edit')}
        >
          Edit
          
          {menuOpen && activeMenu === 'edit' && (
            <div className="mac-dropdown absolute bottom-full left-0 mb-1 w-48 crt-border bg-mac-white shadow-lg animate-pixel-fade-in z-10">
              <div className="p-2 border-b border-mac-lightGray">Copy</div>
              <div className="p-2 border-b border-mac-lightGray">Paste</div>
              <div className="p-2">Select All</div>
            </div>
          )}
        </div>
        
        <div 
          className="px-2 cursor-pointer relative"
          onClick={() => handleMenuClick('help')}
        >
          Help
          
          {menuOpen && activeMenu === 'help' && (
            <div className="mac-dropdown absolute bottom-full left-0 mb-1 w-48 crt-border bg-mac-white shadow-lg animate-pixel-fade-in z-10">
              <div className="p-2 border-b border-mac-lightGray">Search</div>
              <div className="p-2">About</div>
            </div>
          )}
        </div>
      </div>
      
      <div className="px-2">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    </div>
  );
};

export default TaskBar;
