'use client'

import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MenuBar from './MenuBar'
import Window from './Window'
import Icon from './Icon'
import ExcelWindow from './ExcelWindow'
import { Folder, FileText, User, Mail } from 'lucide-react'

type WindowState = {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
};

type Windows = {
  [key: string]: WindowState;
};

export default function Desktop() {
  const [windows, setWindows] = useState<Windows>({
    about: { isOpen: false, isMinimized: false, isMaximized: false },
    projects: { isOpen: false, isMinimized: false, isMaximized: false },
    resume: { isOpen: false, isMinimized: false, isMaximized: false },
    contact: { isOpen: false, isMinimized: false, isMaximized: false },
  });
  const [bgColor, setBgColor] = useState('#66a4ff');
  const [isSnowing, setIsSnowing] = useState(false);

  const toggleWindow = (name: string) => {
    setWindows(prev => ({
      ...prev,
      [name]: { ...prev[name], isOpen: !prev[name].isOpen, isMinimized: false }
    }));
  };

  const closeWindow = (name: string) => {
    setWindows(prev => ({
      ...prev,
      [name]: { ...prev[name], isOpen: false, isMinimized: false, isMaximized: false }
    }));
  };

  const minimizeWindow = (name: string) => {
    setWindows(prev => ({
      ...prev,
      [name]: { ...prev[name], isMinimized: !prev[name].isMinimized }
    }));
  };

  const maximizeWindow = (name: string) => {
    setWindows(prev => ({
      ...prev,
      [name]: { ...prev[name], isMaximized: !prev[name].isMaximized }
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-[100vw] h-[100vh] bg-[#e2c5a1] rounded-lg overflow-hidden relative">
        <div className="absolute inset-8 bg-[#e2c5a1] rounded-lg shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
          <div className="absolute inset-4 bg-black rounded">
            <div className="h-full flex flex-col">
              <MenuBar 
                bgColor={bgColor} 
                setBgColor={setBgColor} 
                isSnowing={isSnowing}
                setIsSnowing={setIsSnowing}
              />
              <div className="flex-1 p-4 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
                <div className="grid grid-cols-4 gap-4">
                  <Icon name="About Me" icon={User} onClick={() => toggleWindow('about')} />
                  <Icon name="Projects" icon={Folder} onClick={() => toggleWindow('projects')} />
                  <Icon name="Resume" icon={FileText} onClick={() => toggleWindow('resume')} />
                  <Icon name="Contact Me" icon={Mail} onClick={() => toggleWindow('contact')} />
                </div>
                {windows.about.isOpen && (
                  <Window 
                    title="About Me" 
                    onClose={() => closeWindow('about')}
                    onMinimize={() => minimizeWindow('about')}
                    onMaximize={() => maximizeWindow('about')}
                    isMinimized={windows.about.isMinimized}
                    isMaximized={windows.about.isMaximized}
                  >
                    <p className="p-4">
                      Hello! I&apos;m Alex Firestone, a web developer passionate about creating unique digital experiences.
                    </p>
                  </Window>
                )}
                {windows.projects.isOpen && (
                  <Window 
                    title="Projects" 
                    onClose={() => closeWindow('projects')}
                    onMinimize={() => minimizeWindow('projects')}
                    onMaximize={() => maximizeWindow('projects')}
                    isMinimized={windows.projects.isMinimized}
                    isMaximized={windows.projects.isMaximized}
                  >
                    <ul className="p-4 list-disc list-inside">
                      <li>Project 1: Personal Website</li>
                      <li>Project 2: E-commerce Platform</li>
                      <li>Project 3: Weather App</li>
                    </ul>
                  </Window>
                )}
                {windows.resume.isOpen && (
                  <Window 
                    title="Resume" 
                    onClose={() => closeWindow('resume')}
                    onMinimize={() => minimizeWindow('resume')}
                    onMaximize={() => maximizeWindow('resume')}
                    isMinimized={windows.resume.isMinimized}
                    isMaximized={windows.resume.isMaximized}
                  >
                    <div className="p-4">
                      <h2 className="font-bold mb-2">Experience</h2>
                      <p>Web Developer at XYZ Company (2018-Present)</p>
                      <h2 className="font-bold mt-4 mb-2">Education</h2>
                      <p>BS in Computer Science, University of Technology (2014-2018)</p>
                    </div>
                  </Window>
                )}
                {windows.contact.isOpen && (
                  <ExcelWindow 
                    title="Contact Me" 
                    onClose={() => closeWindow('contact')}
                    onMinimize={() => minimizeWindow('contact')}
                    onMaximize={() => maximizeWindow('contact')}
                    isMinimized={windows.contact.isMinimized}
                    isMaximized={windows.contact.isMaximized}
                  />
                )}
                {isSnowing && (
                  <div className="snow-container absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(50)].map((_, i) => (
                      <div 
                        key={i} 
                        className="snowflake absolute text-white"
                        style={{
                          left: `${Math.random() * 100}%`,
                          animationDuration: `${Math.random() * 3 + 2}s`,
                          animationDelay: `${Math.random() * 2}s`,
                          fontSize: `${Math.random() * 10 + 10}px`,
                          opacity: Math.random().toString()
                        }}
                      >
                        ❄
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Ventilation lines */}
        <div className="absolute bottom-0 left-0 right-0 h-8 flex justify-center items-center">
          <div className="w-48 h-4 flex space-x-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex-1 bg-[#d1b48f] rounded-sm"></div>
            ))}
          </div>
        </div>

        {/* Apple logo */}
        <div className="absolute bottom-2 left-4">
          <div className="w-4 h-4 bg-[#d1b48f]"></div>
        </div>
        <style jsx>{`
          @keyframes fall {
            0% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(600px);
            }
          }
          .snowflake {
            animation: fall linear infinite;
          }
        `}</style>
      </div>
    </DndProvider>
  )
}

