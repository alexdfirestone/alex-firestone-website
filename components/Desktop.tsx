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
        <div className="absolute inset-4 md:inset-8 bg-[#e2c5a1] rounded-lg shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
          <div className="absolute inset-2 md:inset-4 bg-black rounded">
            <div className="h-full flex flex-col">
              <MenuBar 
                bgColor={bgColor} 
                setBgColor={setBgColor} 
                isSnowing={isSnowing}
                setIsSnowing={setIsSnowing}
              />
              <div className="flex-1 p-2 md:p-4 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
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
                    <div className="p-4 space-y-4">
                      <p className="text-sm leading-relaxed">
                        Hi, I'm Alex Firestone, a full-stack engineer, founder, and forward deployed solutions engineer passionate about building AI-powered products and solving complex customer challenges.
                      </p>
                      <p className="text-sm leading-relaxed">
                        I have taken products from 0 to 1, architected scalable web applications, and delivered tools that combine LLMs with thoughtful design to create impactful digital experiences. I thrive at the intersection of engineering and customer success, turning ambitious ideas and real-world needs into solutions that work.
                      </p>
                    </div>
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
                                          <ul className="p-4 list-disc list-inside space-y-2">
                        <li>
                          <span className="font-medium">Ugig Research (UGIG.app)</span> - A marketplace connecting students and researchers to facilitate human research studies
                        </li>
                        <li>
                          <span className="font-medium">AdviserGPT (advisergpt.ai)</span> - AI-powered SaaS platform helping investment managers accelerate customer acquisition and growth through automated RFP and DDQ workflows
                        </li>
                        <li>
                          <span className="font-medium">Personal Projects</span> - Check out my code on <a href="https://github.com/alexdfirestone" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
                        </li>
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
                    <div className="p-4 text-sm space-y-4 max-h-96 overflow-y-auto">
                      <div className="border-b pb-2">
                        <h1 className="font-bold text-lg">Alex Firestone</h1>
                        <p className="text-xs text-gray-600">(510) 499-1833 | alexdfirestone@gmail.com | Palo Alto, CA</p>
                      </div>
                      
                      <div>
                        <h2 className="font-bold text-base border-b border-gray-300 pb-1 mb-2">EXPERIENCE</h2>
                        
                        <div className="mb-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">Founder & Head of Product Engineering</h3>
                            <span className="text-xs text-gray-600">Palo Alto, CA</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">AdviserGPT.ai | September 2024 - Present</p>
                          <ul className="list-disc list-inside text-xs space-y-1 ml-2">
                            <li>Ideated, built, and launched an AI-driven SaaS that automates RFP, DDQ, and marketing-commentary workflows for investment managers, trimming average response time by 70%.</li>
                            <li>Closed eight enterprise design-partner deals worth $120K+ in pilot ARR, and raised $400K in pre-seed capital.</li>
                            <li>Led a full-stack team across LLM engineering, product design, and UI; shipped v1 on Next.js + Vercel, Supabase, and OpenAI APIs—landing the first paying customer within three months.</li>
                            <li>Developed and deployed retrieval-augmented generation and AI agent pipelines with proprietary indexing tailored to asset management workflows. Improved answer accuracy significantly quarter-over-quarter and reduced manual review time by 50%.</li>
                          </ul>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">Senior Forward Deployed Engineer</h3>
                            <span className="text-xs text-gray-600">New York, NY</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">Ridgeline Inc. | October 2021 - August 2024</p>
                          <ul className="list-disc list-inside text-xs space-y-1 ml-2">
                            <li>Built and led a cross-functional team that delivered an internal deployment platform for Ridgeline apps, Python ETL workflows, and automated tasks—cutting onboarding time and costs by 50% (≈ $500K per client).</li>
                          </ul>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">Quality Engineer</h3>
                            <span className="text-xs text-gray-600">Incline Village, NV</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">Ridgeline Inc. | October 2020 - 2021</p>
                          <ul className="list-disc list-inside text-xs space-y-1 ml-2">
                            <li>Engineered robust automated test suites for API, integration, and UI testing at Ridgeline, covering Order Management, Electronic Trading, Portfolio Accounting, CRM, and Data Platform Reporting.</li>
                          </ul>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">Founder</h3>
                            <span className="text-xs text-gray-600">Santa Barbara, CA</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">Ugig Research Inc. | October 2018 - 2020</p>
                          <ul className="list-disc list-inside text-xs space-y-1 ml-2">
                            <li>Built a SaaS marketplace that matched research participants with university labs; scaled to 10K active users across 10+ universities before winding down in 2020 when nationwide COVID-19 restrictions paused in-person studies.</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h2 className="font-bold text-base border-b border-gray-300 pb-1 mb-3">TECHNICAL SKILLS</h2>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2 text-sm">Programming Languages</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs">TypeScript</span>
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs">Python</span>
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs">Postgres</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-sm">Web & Frameworks</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs">React (JS/TS)</span>
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs">Next.js</span>
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs">Flask</span>
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs">FastAPI</span>
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs">Streamlit</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-sm">AI / LLM Engineering</h4>
                            <div className="space-y-2">
                              <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">RAG & Agentic Workflows</span>
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">LLM Optimization</span>
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">LangChain</span>
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">DSpy</span>
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">Vercel AI SDK</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">pgvector</span>
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">OpenAI APIs</span>
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">Google Gemini</span>
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">Anthropic Claude</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h2 className="font-bold text-base border-b border-gray-300 pb-1 mb-2">EDUCATION</h2>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">University of California, Santa Barbara</h3>
                            <p className="text-xs text-gray-600">Santa Barbara, CA</p>
                          </div>
                          <span className="text-xs text-gray-600">Class of 2020</span>
                        </div>
                        <p className="text-xs">BS Biochemistry and Molecular Biology</p>
                        <p className="text-xs">Technology Management Certificate</p>
                      </div>
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

