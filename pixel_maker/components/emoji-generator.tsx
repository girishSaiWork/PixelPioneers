'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function EmojiGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmoji, setGeneratedEmoji] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-emoji', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedEmoji(data.emoji);
        // Save the generated emoji to Supabase
        const { error } = await supabase
          .from('emojis')
          .insert({ url: data.emoji, prompt: prompt });
        if (error) {
          console.error('Error saving emoji:', error);
        }
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error generating emoji:', error);
      // TODO: Add error handling UI
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter your emoji prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full"
        />
        <Button type="submit" disabled={isGenerating} className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Emoji'
          )}
        </Button>
      </form>
      {generatedEmoji && (
        <div className="mt-4 flex justify-center">
          <img src={generatedEmoji} alt="Generated Emoji" className="w-16 h-16" />
        </div>
      )}
    </Card>
  );
}