import { Minus, Square, X } from 'lucide-react'

interface WindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMinimized: boolean
  isMaximized: boolean
  children: React.ReactNode
}

export default function Window({ title, onClose, onMinimize, onMaximize, isMinimized, isMaximized, children }: WindowProps) {
  const windowClass = isMaximized ? 'fixed inset-0 z-50' : 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96'
  
  return (
    <div className={`${windowClass} bg-[#e8e8e8] border-2 border-black shadow-[2px_2px_0_#000000] ${isMinimized ? 'h-8' : ''}`}>
      <div className="bg-[#e8e8e8] p-1 flex justify-between items-center border-b-2 border-black">
        <div className="flex items-center space-x-2">
          <button 
            className="w-3 h-3 rounded-full border border-black bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center"
            onClick={onClose}
          >
            <X size={8} className="text-black opacity-0 hover:opacity-100" />
          </button>
          <button 
            className="w-3 h-3 rounded-full border border-black bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center"
            onClick={onMinimize}
          >
            <Minus size={8} className="text-black opacity-0 hover:opacity-100" />
          </button>
          <button 
            className="w-3 h-3 rounded-full border border-black bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center"
            onClick={onMaximize}
          >
            <Square size={8} className="text-black opacity-0 hover:opacity-100" />
          </button>
        </div>
        <span className="text-sm font-bold text-center flex-grow">{title}</span>
        <div className="w-9 h-3"></div>
      </div>
      {!isMinimized && <div className="p-4 bg-white">{children}</div>}
    </div>
  )
}

