
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
    },
    // New icons for a more lively desktop
    {
      id: "music-player",
      name: "Music Player",
      icon: "music",
      position: { x: 150, y: 50 },
      action: () => createWindow(
        <div className="p-4">
          <h2 className="pixel-font text-xl mb-4">Music Player</h2>
          <div className="crt-border p-3 mb-4">
            <div className="font-bold mb-2">Now Playing</div>
            <div className="text-mac-blue">Our Song</div>
          </div>
          <div className="flex justify-center space-x-4">
            <button className="pixel-button bg-mac-white hover:bg-mac-blue hover:text-mac-white transition-colors">
              ⏮ Previous
            </button>
            <button className="pixel-button bg-mac-white hover:bg-mac-blue hover:text-mac-white transition-colors">
              ▶️ Play
            </button>
            <button className="pixel-button bg-mac-white hover:bg-mac-blue hover:text-mac-white transition-colors">
              ⏭ Next
            </button>
          </div>
        </div>,
        "Music Player",
        400,
        300
      )
    },
    {
      id: "photo-frame",
      name: "Our Photos",
      icon: "folder-heart",
      position: { x: 150, y: 150 },
      action: () => createWindow(
        <div className="p-4">
          <h2 className="pixel-font text-xl mb-4">Our Photos</h2>
          <div className="crt-border p-2 mb-4">
            <div className="h-40 bg-mac-black bg-opacity-20 flex items-center justify-center">
              <span className="text-lg">This is us! 💙</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="crt-border p-1 bg-gray-200">Photo 1.jpg</div>
            <div className="crt-border p-1 bg-gray-200">Photo 2.jpg</div>
            <div className="crt-border p-1 bg-gray-200">Photo 3.jpg</div>
            <div className="crt-border p-1 bg-gray-200">Photo 4.jpg</div>
          </div>
        </div>,
        "Our Photos",
        400,
        320
      )
    },
    {
      id: "anniversary",
      name: "Anniversary",
      icon: "calendar-heart",
      position: { x: 150, y: 250 },
      action: () => createWindow(
        <div className="p-4">
          <h2 className="pixel-font text-xl mb-4">Special Date</h2>
          <div className="crt-border p-3">
            <div className="text-center">
              <h3 className="text-xl font-bold text-mac-blue">13 May</h3>
              <p className="mt-2">Our special day! 💙</p>
              <div className="mt-4 bg-mac-black bg-opacity-20 p-4">
                <p>Many more happy anniversaries to come!</p>
              </div>
            </div>
          </div>
        </div>,
        "Anniversary",
        350,
        300
      )
    },
    {
      id: "notes",
      name: "Notes",
      icon: "file-text",
      position: { x: 150, y: 350 },
      action: () => createWindow(
        <div className="p-4">
          <h2 className="pixel-font text-xl mb-4">Notes</h2>
          <div className="crt-border p-3 bg-mac-white">
            <p className="mb-2">To-Do List:</p>
            <ul className="list-disc pl-5">
              <li>Find all the hidden keys</li>
              <li>Unlock the special surprise</li>
              <li>Remember our special moments</li>
            </ul>
          </div>
        </div>,
        "Notes",
        350,
        300
      )
    },
    {
      id: "games",
      name: "Games",
      icon: "gamepad",
      position: { x: 250, y: 50 },
      action: () => createWindow(
        <div className="p-4">
          <h2 className="pixel-font text-xl mb-4">Games</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="crt-border p-2 text-center">
              <div className="font-bold mb-1">Pixelate</div>
              <div className="bg-mac-blue bg-opacity-20 h-16 flex items-center justify-center">
                Game 1
              </div>
            </div>
            <div className="crt-border p-2 text-center">
              <div className="font-bold mb-1">Memory</div>
              <div className="bg-mac-blue bg-opacity-20 h-16 flex items-center justify-center">
                Game 2
              </div>
            </div>
          </div>
        </div>,
        "Games",
        400,
        300
      )
    },
    {
      id: "documents",
      name: "Documents",
      icon: "folder",
      position: { x: 250, y: 150 },
      action: () => createWindow(
        <div className="p-4">
          <h2 className="pixel-font text-xl mb-4">Documents</h2>
          <div className="crt-border p-2 mb-4">
            <div className="grid grid-cols-1 gap-2">
              <div className="crt-border p-1 bg-gray-200">Journal.txt</div>
              <div className="crt-border p-1 bg-gray-200">Love_Letter.doc</div>
              <div className="crt-border p-1 bg-gray-200">Plans.doc</div>
              <div className="crt-border p-1 bg-gray-200">Memories.txt</div>
            </div>
          </div>
        </div>,
        "Documents",
        400,
        300
      )
    },
    {
      id: "end-vault",
      name: "Special Surprise",
      icon: "special",
      position: { x: 250, y: 250 },
      action: () => createWindow(
        "reward",
        "Special Surprise",
        500,
        400
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
