// src/app/character/[id]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Character } from "@/types/rickAndMorty";

interface CharacterPageProps {
  params: { id: string };
}

// Traer datos de un personaje
async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 }, // Revalidación cada 10 días
  });

  if (!res.ok) return notFound();
  return res.json();
}

// Generar rutas estáticas para todos los personajes (todas las páginas de la API)
export async function generateStaticParams() {
  let allCharacters: Character[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data = await res.json();
    totalPages = data.info.pages;
    allCharacters = allCharacters.concat(data.results);
    page++;
  } while (page <= totalPages);

  return allCharacters.map((char) => ({
    id: char.id.toString(),
  }));
}

// Página de detalle
export default async function CharacterDetail({ params }: CharacterPageProps) {
  // Si params es una Promise, la resolvemos
  const resolvedParams = await params;
  const character = await getCharacter(resolvedParams.id);


  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex justify-center items-center">
            <Image
              src={character.image}
              width={300}
              height={300}
              alt={character.name}
              className="rounded-xl"
            />
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-4xl font-bold">{character.name}</h1>
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Type:</strong> {character.type || "N/A"}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Origin:</strong> {character.origin.name}</p>
            <p><strong>Location:</strong> {character.location.name}</p>
            <p><strong>Episodes:</strong> {character.episode.length}</p>
            <p><strong>Created:</strong> {character.created}</p>
          </div>
        </div>
        <div className="p-6 bg-gray-700">
          <Link
            href="/character"
            className="inline-block bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition"
          >
            ← Volver a la lista
          </Link>
        </div>
      </div>
    </div>
  );
}
