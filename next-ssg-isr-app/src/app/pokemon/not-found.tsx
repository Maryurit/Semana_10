import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white text-center">
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="Ditto perdido"
        width={120}
        height={120}
      />
      <h1 className="text-3xl font-bold mt-4">Pokémon no encontrado 😕</h1>
      <p className="text-gray-300 mt-2 max-w-md">
        No pudimos encontrar el Pokémon que buscabas. Tal vez está escondido en la hierba alta 🌿
      </p>
      <Link
        href="/pokemon"
        className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold transition"
      >
        ⬅️ Volver al listado
      </Link>
    </div>
  );
}
