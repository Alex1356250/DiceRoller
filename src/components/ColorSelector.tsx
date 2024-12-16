import React, { useState, useRef, useEffect } from 'react';
import { Palette } from 'lucide-react';

interface ColorSelectorProps {
  color: string;
  onChange: (color: string) => void;
}

const colors = [
  '#2563eb', // blue
  '#dc2626', // red
  '#16a34a', // green
  '#9333ea', // purple
  '#ea580c', // orange
  '#0891b2', // cyan
  '#4f46e5', // indigo
  '#db2777', // pink
  '#ca8a04', // yellow
  '#059669', // emerald
];

export default function ColorSelector({ color, onChange }: ColorSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        style={{ color }}
      >
        <Palette size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 p-2 bg-white rounded-lg shadow-lg grid grid-cols-5 gap-1 z-10">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => {
                onChange(c);
                setIsOpen(false);
              }}
              className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
                c === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      )}
    </div>
  );
}