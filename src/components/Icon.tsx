
import React from 'react';
import { IconType } from '../contexts/DesktopContext';
import { Calendar, Folder, Monitor, File, Settings, Music, FileText, Gamepad } from 'lucide-react';

interface IconProps extends IconType {
  className?: string;
}

const Icon: React.FC<IconProps> = ({ id, name, icon, position, action, className }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'folder':
        return <Folder className="w-8 h-8 text-mac-blue" />;
      case 'calendar':
        return <Calendar className="w-8 h-8 text-mac-blue" />;
      case 'calendar-heart':
        return (
          <div className="w-8 h-8 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-mac-blue" />
            <div className="absolute text-xs font-bold text-mac-blue">13</div>
          </div>
        );
      case 'computer':
        return <Monitor className="w-8 h-8 text-mac-blue" />;
      case 'file':
        return <File className="w-8 h-8 text-mac-blue" />;
      case 'file-text':
        return <FileText className="w-8 h-8 text-mac-blue" />;
      case 'settings':
        return <Settings className="w-8 h-8 text-mac-blue" />;
      case 'music':
        return <Music className="w-8 h-8 text-mac-blue" />;
      case 'gamepad':
        return <Gamepad className="w-8 h-8 text-mac-blue" />;
      case 'folder-heart':
        return (
          <div className="w-8 h-8 flex items-center justify-center">
            <Folder className="w-8 h-8 text-mac-blue" />
            <div className="absolute text-xs">💙</div>
          </div>
        );
      case 'trash':
        return (
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-mac-blue" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" 
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      case 'special':
        return (
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-mac-blue animate-heart-pulse" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                 stroke="white" strokeWidth="1" fill="currentColor"/>
            </svg>
          </div>
        );
      default:
        return <Folder className="w-8 h-8 text-mac-blue" />;
    }
  };

  return (
    <div
      className={`mac-icon hover:mac-icon-hover ${className || ''}`}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      onClick={action}
    >
      <div className="mac-icon-img flex items-center justify-center">
        {renderIcon()}
      </div>
      <div className="mac-icon-label pixel-font">{name}</div>
    </div>
  );
};

export default Icon;
