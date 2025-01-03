'use client'

import { useState } from 'react'
import { useDrag } from 'react-dnd'
import { Minus, Square, X } from 'lucide-react'

interface ExcelWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMinimized: boolean
  isMaximized: boolean
}

export default function ExcelWindow({ 
  title, 
  onClose, 
  onMinimize, 
  onMaximize, 
  isMinimized, 
  isMaximized
}: ExcelWindowProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'window',
    item: { name: 'excel', ...position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        const { x, y } = monitor.getClientOffset() || { x: 0, y: 0 }
        setPosition({ x, y })
      }
    },
  }), [position])

  const windowClass = isMaximized ? 'fixed inset-0 z-50' : 'absolute'
  const style = isMaximized ? {} : { left: position.x, top: position.y }

  return (
    <div 
      ref={preview}
      className={`${windowClass} bg-[#e8e8e8] border-2 border-black shadow-[2px_2px_0_#000000] ${isMinimized ? 'h-8' : ''}`}
      style={{
        ...style,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'move' : 'auto',
      }}
    >
      <div 
        ref={drag}
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
        <span className="text-sm font-bold text-center flex-grow">{title}</span>
        <div className="w-9 h-3"></div>
      </div>
      {!isMinimized && (
        <div className="bg-white p-2 overflow-auto" style={{ height: 'calc(100% - 2rem)' }}>
          <form onSubmit={handleSubmit}>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-8 bg-gray-200 border border-gray-400"></th>
                  <th className="w-24 bg-gray-200 border border-gray-400">A</th>
                  <th className="w-32 bg-gray-200 border border-gray-400">B</th>
                  <th className="bg-gray-200 border border-gray-400">C</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bg-gray-200 border border-gray-400 text-center">1</td>
                  <td className="border border-gray-400 px-1">Your Name:</td>
                  <td className="border border-gray-400" colSpan={2}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-1 focus:outline-none"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-200 border border-gray-400 text-center">2</td>
                  <td className="border border-gray-400 px-1">Your Email:</td>
                  <td className="border border-gray-400" colSpan={2}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-1 focus:outline-none"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-200 border border-gray-400 text-center">3</td>
                  <td className="border border-gray-400 px-1">Message for Alex:</td>
                  <td className="border border-gray-400" colSpan={2}>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-1 focus:outline-none"
                      rows={4}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-200 border border-gray-400 text-center">4</td>
                  <td className="border border-gray-400" colSpan={3}>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600"
                    >
                      Send to Alex
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          {submitted && (
            <div className="mt-4 text-green-600 font-bold">
              Thank you for your message! Alex will get back to you soon.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

