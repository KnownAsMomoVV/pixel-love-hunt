
import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { useDesktop, WindowType } from '../contexts/DesktopContext';
import Vault from './Vault';

interface WindowProps extends WindowType {}

const Window: React.FC<WindowProps> = ({ 
  id, 
  title, 
  content, 
  position, 
  size, 
  isOpen, 
  zIndex, 
  minimized 
}) => {
  const { closeWindow, minimizeWindow, bringToFront, activeWindowId, keys, setShowReward } = useDesktop();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [windowPosition, setWindowPosition] = useState(position);
  const windowRef = useRef<HTMLDivElement>(null);

  // Handle window focus
  useEffect(() => {
    const handleMouseDown = () => {
      if (id !== activeWindowId) {
        bringToFront(id);
      }
    };

    const windowElement = windowRef.current;
    if (windowElement) {
      windowElement.addEventListener('mousedown', handleMouseDown);
      return () => {
        windowElement.removeEventListener('mousedown', handleMouseDown);
      };
    }
  }, [id, activeWindowId, bringToFront]);

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setWindowPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
      e.preventDefault();
    }
  };

  // Determine if it's a vault window
  const isVault = id === "vault1" || id === "vault2" || id === "vault3";
  let vaultContent: ReactNode = content;
  
  // Check if this is the reward window and if all keys are collected
  const isReward = id === "reward";
  const allKeysCollected = keys.vault1 && keys.vault2 && keys.vault3;
  
  // Update showReward status whenever keys change
  useEffect(() => {
    if (allKeysCollected) {
      setShowReward(true);
    }
  }, [keys, setShowReward]);
  
  if (isVault) {
    switch (id) {
      case "vault1":
        vaultContent = (
          <div className="p-4 h-full flex flex-col">
            <div className="flex-1">
              <div className="crt-border p-2 mb-4">
                <h3 className="text-xl mb-2">Travel Photos</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="crt-border p-1 bg-gray-200">Taiwan Trip.jpg</div>
                  <div className="crt-border p-1 bg-gray-200">Tokyo Skyline.jpg</div>
                  <div className="crt-border p-1 bg-gray-200">Beach Sunset.jpg</div>
                  <div className="crt-border p-1 bg-gray-200">Mountain View.jpg</div>
                </div>
              </div>
              
              <div className="crt-border p-2 bg-mac-black text-mac-white">
                <h3 className="text-xl mb-2">Vault #1</h3>
                <p className="mb-4">To unlock this vault, answer the question:</p>
                <p className="mb-2 font-bold">"Where did we confess?"</p>
              </div>
            </div>
          </div>
        );
        break;
      case "vault2":
        vaultContent = (
          <div className="p-4 h-full flex flex-col">
            <div className="flex-1">
              <div className="crt-border p-2 mb-4">
                <h3 className="text-xl mb-2">System Settings</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="crt-border p-1 flex justify-between items-center">
                    <span>Sound</span>
                    <div className="crt-border bg-gray-200 w-20 h-4"></div>
                  </div>
                  <div className="crt-border p-1 flex justify-between items-center">
                    <span>Display</span>
                    <div className="crt-border bg-gray-200 w-20 h-4"></div>
                  </div>
                  <div className="crt-border p-1 flex justify-between items-center">
                    <span>Language</span>
                    <div className="crt-border bg-gray-200 w-20 h-4">English</div>
                  </div>
                </div>
              </div>
              
              <div className="crt-border p-2 bg-mac-black text-mac-white">
                <h3 className="text-xl mb-2">Vault #2</h3>
                <p className="mb-4">To unlock this vault, answer the question:</p>
                <p className="mb-2 font-bold">"In what language did we confess?"</p>
                <Vault vaultId="vault2" question="In what language did we confess?" correctAnswer="JAPANESE" />
              </div>
            </div>
          </div>
        );
        break;
      case "vault3":
        vaultContent = (
          <div className="p-4 h-full flex flex-col">
            <div className="flex-1">
              <div className="crt-border p-2 mb-4">
                <h3 className="text-xl mb-2">Calendar Events</h3>
                <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                  <div>S</div>
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="crt-border h-6 w-full flex items-center justify-center">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="crt-border p-2 bg-mac-black text-mac-white">
                <h3 className="text-xl mb-2">Vault #3</h3>
                <p className="mb-4">To unlock this vault, answer the question:</p>
                <p className="mb-2 font-bold">"When did we first meet in Europe?"</p>
                <Vault vaultId="vault3" question="When did we first meet in Europe?" correctAnswer="SEPTEMBER" />
              </div>
            </div>
          </div>
        );
        break;
    }
  }

  if (!isOpen || minimized) {
    return null;
  }
  
  // Prevent opening reward window if not all keys collected
  if (isReward && !allKeysCollected) {
    return (
      <div
        ref={windowRef}
        className="mac-window absolute animate-pixel-fade-in"
        style={{
          left: windowPosition.x,
          top: windowPosition.y,
          width: size.width,
          height: size.height,
          zIndex
        }}
      >
        <div 
          className="mac-window-header"
          onMouseDown={handleDragStart}
        >
          <div className="flex space-x-2">
            <div 
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(id);
              }}
            ></div>
            <div 
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(id);
              }}
            ></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs font-bold">{title}</span>
          </div>
        </div>
        <div className="mac-window-body p-4 flex flex-col items-center justify-center">
          <div className="text-xl mb-4 text-center">🔒 Locked</div>
          <div className="text-center mb-4">
            You need to collect all three keys to unlock this special surprise!
          </div>
          <div className="flex space-x-4 mb-4">
            <div className={`flex flex-col items-center ${keys.vault1 ? 'text-mac-blue' : 'text-gray-400'}`}>
              <div className="text-2xl mb-1">🔑</div>
              <div className="text-xs">Key 1</div>
            </div>
            <div className={`flex flex-col items-center ${keys.vault2 ? 'text-mac-blue' : 'text-gray-400'}`}>
              <div className="text-2xl mb-1">🔑</div>
              <div className="text-xs">Key 2</div>
            </div>
            <div className={`flex flex-col items-center ${keys.vault3 ? 'text-mac-blue' : 'text-gray-400'}`}>
              <div className="text-2xl mb-1">🔑</div>
              <div className="text-xs">Key 3</div>
            </div>
          </div>
          <button 
            className="pixel-button bg-mac-blue text-white"
            onClick={() => closeWindow(id)}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={windowRef}
      className={`mac-window absolute animate-pixel-fade-in`}
      style={{
        left: windowPosition.x,
        top: windowPosition.y,
        width: size.width,
        height: size.height,
        zIndex
      }}
    >
      <div 
        className="mac-window-header"
        onMouseDown={handleDragStart}
      >
        <div className="flex space-x-2">
          <div 
            className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
          ></div>
          <div 
            className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(id);
            }}
          ></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs font-bold">{title}</span>
        </div>
      </div>
      <div className="mac-window-body">
        {isVault ? vaultContent : content}
      </div>
    </div>
  );
};

export default Window;
