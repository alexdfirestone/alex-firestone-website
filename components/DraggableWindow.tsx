import { useDrag } from 'react-dnd'
import { Minus, Square, X } from 'lucide-react'

interface DraggableWindowProps {
  name: string
  title: string
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  onMove: (x: number, y: number) => void
  children: React.ReactNode
}

export default function DraggableWindow({ 
  name,
  title, 
  onClose, 
  onMinimize, 
  onMaximize, 
  isMinimized, 
  isMaximized,
  position,
  onMove,
  children 
}: DraggableWindowProps) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'window',
    item: { name, ...position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        const { x, y } = monitor.getClientOffset() || { x: 0, y: 0 }
        onMove(x, y)
      }
    },
  }), [name, position, onMove])

  const windowClass = isMaximized ? 'fixed inset-0 z-50' : 'absolute'
  const style = isMaximized ? {} : { left: position.x, top: position.y }

  return (
    <div 
      ref={(node) => {
        preview(node);
      }}
      className={`${windowClass} bg-[#e8e8e8] border-2 border-black shadow-[2px_2px_0_#000000] ${isMinimized ? 'h-8' : ''} w-80 md:w-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] md:max-w-none md:max-h-none md:relative md:top-auto md:left-auto md:transform-none`}
      style={{
        ...style,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'move' : 'auto',
      }}
    >
      <div 
        ref={(node) => {
          drag(node);
        }}
        className="bg-[#e8e8e8] p-1 flex justify-between items-center border-b-2 border-black cursor-move"
      >
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
        <span className="text-xs md:text-sm font-bold text-center flex-grow">{title}</span>
        <div className="w-9 h-3"></div>
      </div>
      {!isMinimized && <div className="p-2 md:p-4 bg-white overflow-auto max-h-[calc(100vh-8rem)] md:max-h-none">{children}</div>}
    </div>
  )
}

