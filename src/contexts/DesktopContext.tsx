
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Position = {
  x: number;
  y: number;
};

export type WindowType = {
  id: string;
  title: string;
  content: ReactNode;
  position: Position;
  size: { width: number; height: number };
  isOpen: boolean;
  zIndex: number;
  minimized: boolean;
};

export type IconType = {
  id: string;
  name: string;
  icon: string;
  position: Position;
  action: () => void;
};

type VaultKeys = {
  vault1: boolean;
  vault2: boolean;
  vault3: boolean;
};

type DesktopContextType = {
  icons: IconType[];
  setIcons: React.Dispatch<React.SetStateAction<IconType[]>>;
  windows: WindowType[];
  setWindows: React.Dispatch<React.SetStateAction<WindowType[]>>;
  activeWindowId: string | null;
  setActiveWindowId: React.Dispatch<React.SetStateAction<string | null>>;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  keys: VaultKeys;
  setKeys: React.Dispatch<React.SetStateAction<VaultKeys>>;
  showReward: boolean;
  setShowReward: React.Dispatch<React.SetStateAction<boolean>>;
  playSound: (sound: string) => void;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeMenu: string | null;
  setActiveMenu: React.Dispatch<React.SetStateAction<string | null>>;
};

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

export const DesktopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [icons, setIcons] = useState<IconType[]>([]);
  const [windows, setWindows] = useState<WindowType[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [keys, setKeys] = useState<VaultKeys>({ vault1: false, vault2: false, vault3: false });
  const [showReward, setShowReward] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const openWindow = (id: string) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id 
          ? { ...window, isOpen: true, minimized: false, zIndex: Math.max(...prev.map(w => w.zIndex), 0) + 1 } 
          : window
      )
    );
    setActiveWindowId(id);
    playSound('open');
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(window => window.id === id ? { ...window, isOpen: false } : window));
    playSound('close');
    if (activeWindowId === id) {
      const openWindows = windows.filter(w => w.isOpen && w.id !== id);
      if (openWindows.length > 0) {
        const topWindow = openWindows.reduce((prev, current) => 
          (prev.zIndex > current.zIndex) ? prev : current
        );
        setActiveWindowId(topWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(window => window.id === id ? { ...window, minimized: true } : window));
    playSound('minimize');
    if (activeWindowId === id) {
      const openWindows = windows.filter(w => w.isOpen && !w.minimized && w.id !== id);
      if (openWindows.length > 0) {
        const topWindow = openWindows.reduce((prev, current) => 
          (prev.zIndex > current.zIndex) ? prev : current
        );
        setActiveWindowId(topWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const bringToFront = (id: string) => {
    if (activeWindowId === id) return;
    
    setWindows(prev => {
      const maxZIndex = Math.max(...prev.map(w => w.zIndex), 0);
      return prev.map(window => window.id === id ? { ...window, zIndex: maxZIndex + 1 } : window);
    });
    
    setActiveWindowId(id);
    playSound('click');
  };

  const playSound = (sound: string) => {
    // We'll implement actual sound effects later
    console.log(`Playing sound: ${sound}`);
    // In a real implementation, we would play audio files here
  };

  return (
    <DesktopContext.Provider
      value={{
        icons,
        setIcons,
        windows,
        setWindows,
        activeWindowId,
        setActiveWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        bringToFront,
        keys,
        setKeys,
        showReward,
        setShowReward,
        playSound,
        menuOpen,
        setMenuOpen,
        activeMenu,
        setActiveMenu
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
};

export const useDesktop = (): DesktopContextType => {
  const context = useContext(DesktopContext);
  if (context === undefined) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
};
