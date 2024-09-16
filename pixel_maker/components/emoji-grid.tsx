'use client';

import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Download, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Emoji = {
  id: string;
  url: string;
  likes: number;
};

export default function EmojiGrid() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    fetchEmojis();
  }, []);

  const fetchEmojis = async () => {
    const { data, error } = await supabase
      .from('emojis')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching emojis:', error);
    } else {
      setEmojis(data);
    }
  };

  const handleLike = async (id: string) => {
    const { data, error } = await supabase
      .from('emojis')
      .update({ likes: emojis.find(e => e.id === id)!.likes + 1 })
      .eq('id', id);

    if (error) {
      console.error('Error updating likes:', error);
    } else {
      setEmojis(emojis.map(emoji => 
        emoji.id === id ? { ...emoji, likes: emoji.likes + 1 } : emoji
      ));
    }
  };

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'emoji.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {emojis.map((emoji) => (
        <Card key={emoji.id} className="p-2 relative group">
          <img src={emoji.url} alt="Emoji" className="w-full h-auto" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => handleDownload(emoji.url)} className="text-white mr-2">
              <Download size={20} />
            </button>
            <button onClick={() => handleLike(emoji.id)} className="text-white">
              <Heart size={20} />
            </button>
          </div>
          <span className="absolute bottom-1 right-1 text-xs text-white bg-black bg-opacity-50 px-1 rounded">
            {emoji.likes}
          </span>
        </Card>
      ))}
    </div>
  );
}