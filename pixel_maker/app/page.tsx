import EmojiGenerator from '../components/emoji-generator';
import EmojiGrid from '../components/emoji-grid';
import AuthButton from '../components/sign-in-button';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 relative">
      <AuthButton />
      <h1 className="text-4xl font-bold mb-8 text-center">Pixel Maker</h1>
      <EmojiGenerator />
      <EmojiGrid />
    </main>
  );
}
