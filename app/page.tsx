
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-10 gap-4">
      <h1 className='text-3xl'>Integrando RainbowKit</h1>
      <ConnectButton />
    </main>
  );
}
