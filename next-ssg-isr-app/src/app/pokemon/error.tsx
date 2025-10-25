'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error detectado:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white text-center">
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png"
        alt="Psyduck confundido"
        width={120}
        height={120}
      />
      <h1 className="text-3xl font-bold mt-4">¡Ups! Algo salió mal 😵</h1>
      <p className="text-gray-300 mt-2">Hubo un error al cargar los datos. Puedes intentar nuevamente.</p>

      <button
        onClick={() => reset()}
        className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold transition"
      >
        🔄 Reintentar
      </button>
    </div>
  );
}
