import { type LucideIcon } from 'lucide-react'

interface IconProps {
  name: string
  icon: LucideIcon
  onClick: () => void
}

export default function Icon({ name, icon: IconComponent, onClick }: IconProps) {
  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
      <div className="bg-white p-2 rounded-sm border border-black shadow-[2px_2px_0_#000000]">
        <IconComponent size={32} color="#000000" />
      </div>
      <span className="mt-1 text-sm text-center text-white font-bold">{name}</span>
    </div>
  )
}

