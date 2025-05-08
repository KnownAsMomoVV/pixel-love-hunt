
import React, { ReactNode } from "react";
import { IconType, WindowType } from "../contexts/DesktopContext";

export const generateIcons = (
  createWindow: (content: ReactNode, title: string, width: number, height: number) => void
): IconType[] => {
  return [
    {
      id: "travel-memories",
      name: "Travel Memories",
      icon: "folder",
      position: { x: 50, y: 50 },
      action: () => createWindow(
        "vault1",
        "Travel Memories",
        400,
        300
      )
    },
    {
      id: "calendar",
      name: "Calendar",
      icon: "calendar",
      position: { x: 50, y: 150 },
      action: () => createWindow(
        "vault3",
        "Calendar",
        400,
        300
      )
    },
    {
      id: "my-computer",
      name: "My Computer",
      icon: "computer",
      position: { x: 50, y: 250 },
      action: () => createWindow(
        <div className="p-4">
          <h2 className="pixel-font text-xl mb-4">My Computer</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="crt-border p-2">
              <div className="font-bold mb-2">System Info</div>
              <div>MacOS System 7</div>
              <div>Memory: 8MB RAM</div>
              <div>Storage: 80MB</div>
            </div>
            <div className="crt-border p-2">
              <div className="font-bold mb-2">Drives</div>
              <div>Macintosh HD</div>
              <div>Floppy Disk</div>
            </div>
          </div>
        </div>,
        "My Computer",
        400,
        300
      )
    },
    {
      id: "trash",
      name: "Trash",
      icon: "trash",
      position: { x: 50, y: 350 },
      action: () => createWindow(
        <div className="p-4">
          <h2 className="pixel-font text-xl mb-4">Trash</h2>
          <div className="crt-border p-2 text-center">
            <p>Trash is empty.</p>
          </div>
        </div>,
        "Trash",
        350,
        200
      )
    }
  ];
};

export const initialWindows: Omit<WindowType, "zIndex" | "isOpen" | "minimized">[] = [
  {
    id: "welcome",
    title: "Welcome",
    content: (
      <div className="p-4">
        <h2 className="pixel-font-bold text-xl mb-4">Welcome to MacOS Scavenger Hunt!</h2>
        <p className="mb-3">Hi darling! I've created this nostalgic experience just for you.</p>
        <p className="mb-3">Find the three hidden vaults and answer the questions correctly to collect keys.</p>
        <p className="mb-3">Once you have all three keys, a special surprise will unlock!</p>
        <p className="mb-3">Start exploring the desktop to find the vaults. They are hidden in:</p>
        <ul className="list-disc pl-5 mb-4">
          <li>A folder with our memories</li>
          <li>System settings</li>
          <li>A time-keeping app</li>
        </ul>
        <p>Good luck and have fun! 💙</p>
      </div>
    ),
    position: { x: 100, y: 100 },
    size: { width: 450, height: 350 }
  }
];
