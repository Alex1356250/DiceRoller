import {
  User, UserCircle, Ghost, 
  Cat, Dog, Bird, 
  Crown, Star, Heart, 
  Smile, Coffee, Music,
  Sun, Moon, Cloud
} from 'lucide-react';

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

export function getAvatarIcon(name: string) {
  return avatars.find(a => a.name === name)?.icon || User;
}