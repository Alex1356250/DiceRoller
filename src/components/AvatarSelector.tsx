import React from 'react';
import {
  User, UserCircle, Ghost, 
  Cat, Dog, Bird, 
  Crown, Star, Heart, 
  Smile, Coffee, Music,
  Sun, Moon, Cloud
} from 'lucide-react';

interface AvatarSelectorProps {
  selectedAvatar: string;
  onSelect: (avatar: string) => void;
  color: string;
}

const avatars = [
  { icon: User, name: 'user' },
  { icon: UserCircle, name: 'userCircle' },
  { icon: Ghost, name: 'ghost' },
  { icon: Cat, name: 'cat' },
  { icon: Dog, name: 'dog' },
  { icon: Bird, name: 'bird' },
  { icon: Crown, name: 'crown' },
  { icon: Star, name: 'star' },
  { icon: Heart, name: 'heart' },
  { icon: Smile, name: 'smile' },
  { icon: Coffee, name: 'coffee' },
  { icon: Music, name: 'music' },
  { icon: Sun, name: 'sun' },
  { icon: Moon, name: 'moon' },
  { icon: Cloud, name: 'cloud' },
];

export default function AvatarSelector({ selectedAvatar, onSelect, color }: AvatarSelectorProps) {
  return (
    <div className="grid grid-cols-5 gap-2 p-2 bg-gray-50 rounded-lg">
      {avatars.map(({ icon: Icon, name }) => (
        <button
          key={name}
          onClick={() => onSelect(name)}
          className={`p-2 rounded-lg transition-colors ${
            selectedAvatar === name
              ? 'bg-opacity-20'
              : 'hover:bg-gray-100 text-gray-600 hover:text-current'
          }`}
          style={{ 
            backgroundColor: selectedAvatar === name ? color : undefined,
            color: selectedAvatar === name ? color : undefined
          }}
          title={name}
        >
          <Icon size={24} />
        </button>
      ))}
    </div>
  );
}