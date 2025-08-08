'use client'

import { useState, useEffect } from 'react'
import { Apple, Twitter, Linkedin, Mail, Instagram, Power, Rocket } from 'lucide-react'

interface MenuBarProps {
  bgColor: string;
  setBgColor: (color: string) => void;
  isSnowing: boolean;
  setIsSnowing: (isSnowing: boolean) => void;
}

const addFakeCursor = (e: MouseEvent) => {
  const x = e.clientX + Math.random() * 20 - 10;
  const y = e.clientY + Math.random() * 20 - 10;
  const cursor = document.createElement('div');
  cursor.className = 'fake-cursor';
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
  document.body.appendChild(cursor);
  setTimeout(() => cursor.remove(), 500);
};

export default function MenuBar({ bgColor, setBgColor, isSnowing, setIsSnowing }: MenuBarProps) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [isAppleOpen, setIsAppleOpen] = useState(false);
  const [isSpecialOpen, setIsSpecialOpen] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--desktop-bg', bgColor);
  }, [bgColor]);

  const handleColorChange = (color: string) => {
    setBgColor(color);
    setIsViewOpen(false);
  };

  const handleShutdown = () => {
    setIsShuttingDown(true);
    setIsAppleOpen(false);
    setTimeout(() => {
      const root = document.documentElement;
      root.style.setProperty('--desktop-bg', 'black');
    }, 500);
  };

  const handleLaunch = () => {
    setIsLaunched(!isLaunched);
    setIsSnowing(!isSnowing);
    setIsSpecialOpen(false);
    if (!isLaunched) {
      document.addEventListener('mousemove', addFakeCursor);
    } else {
      document.removeEventListener('mousemove', addFakeCursor);
      document.querySelectorAll('.fake-cursor').forEach(el => el.remove());
    }
  };

  return (
    <>
      <style jsx global>{`
        .fake-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
        }
      `}</style>
      <div className={`fixed inset-0 bg-black transition-opacity duration-500 ${isShuttingDown ? 'opacity-100 z-[60]' : 'opacity-0 -z-10'}`}></div>
      <div className="bg-[#dddddd] text-black p-1 flex items-center space-x-4 border-b border-[#999999] relative z-50">
        <div className="relative">
          <Apple size={18} className="cursor-pointer" onClick={() => setIsAppleOpen(!isAppleOpen)} />
          {isAppleOpen && (
            <div className="absolute top-full left-0 w-48 bg-[#dddddd] border border-[#999999] shadow-lg rounded-b overflow-hidden">
              <div className="p-2">
                <button 
                  className="w-full text-left px-4 py-1 text-sm hover:bg-[#3875d7] hover:text-white flex items-center space-x-2"
                  onClick={handleShutdown}
                >
                  <Power size={16} />
                  <span>Shut Down</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <span className="font-bold">Alex Firestone</span>
        
        {/* Desktop menu items - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <span 
              className={`px-2 py-1 rounded-t ${isFileOpen ? 'bg-[#666666] text-white' : ''} cursor-pointer`}
              onClick={() => setIsFileOpen(!isFileOpen)}
            >
              File
            </span>
            {isFileOpen && (
              <div className="absolute top-full left-0 w-48 bg-[#dddddd] border border-[#999999] shadow-lg rounded-b overflow-hidden">
                <div className="p-2">
                  <div className="flex flex-col space-y-2">
                    <a 
                      href="https://twitter.com/alexfirestone" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-2 px-4 py-1 text-sm hover:bg-[#3875d7] hover:text-white"
                    >
                      <Twitter size={16} />
                      <span>Twitter</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/alexfirestone" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-2 px-4 py-1 text-sm hover:bg-[#3875d7] hover:text-white"
                    >
                      <Linkedin size={16} />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="mailto:alex@example.com" 
                      className="flex items-center space-x-2 px-4 py-1 text-sm hover:bg-[#3875d7] hover:text-white"
                    >
                      <Mail size={16} />
                      <span>Email</span>
                    </a>
                    <a 
                      href="https://www.instagram.com/alexfirestone" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-2 px-4 py-1 text-sm hover:bg-[#3875d7] hover:text-white"
                    >
                      <Instagram size={16} />
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <span>Edit</span>
          <div className="relative">
            <span 
              className={`px-2 py-1 rounded-t ${isViewOpen ? 'bg-[#666666] text-white' : ''} cursor-pointer`}
              onClick={() => setIsViewOpen(!isViewOpen)}
            >
              View
            </span>
            {isViewOpen && (
              <div className="absolute top-full left-0 w-48 bg-[#dddddd] border border-[#999999] shadow-lg rounded-b overflow-hidden">
                <div className="p-2">
                  <div className="font-bold mb-2 text-sm">Change Background:</div>
                  <div className="flex flex-col space-y-2">
                    <button 
                      className="w-full text-left px-4 py-1 text-sm hover:bg-[#3875d7] hover:text-white"
                      onClick={() => handleColorChange('#66a4ff')}
                    >
                      Blue Sky
                    </button>
                    <button 
                      className="w-full text-left px-4 py-1 text-sm hover:bg-[#3875d7] hover:text-white"
                      onClick={() => handleColorChange('#98fb98')}
                    >
                      Light Green
                    </button>
                    <button 
                      className="w-full text-left px-4 py-1 text-sm hover:bg-[#3875d7] hover:text-white"
                      onClick={() => handleColorChange('#ffa07a')}
                    >
                      Light Salmon
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <span 
              className={`px-2 py-1 rounded-t ${isSpecialOpen ? 'bg-[#666666] text-white' : ''} cursor-pointer`}
              onClick={() => setIsSpecialOpen(!isSpecialOpen)}
            >
              Special
            </span>
            {isSpecialOpen && (
              <div className="absolute top-full left-0 w-48 bg-[#dddddd] border border-[#999999] shadow-lg rounded-b overflow-hidden">
                <div className="p-2">
                  <button 
                    className="w-full text-left px-4 py-1 text-sm hover:bg-[#3875d7] hover:text-white flex items-center space-x-2"
                    onClick={handleLaunch}
                  >
                    <Rocket size={16} />
                    <span>{isLaunched ? 'Unlaunch' : 'Launch'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

