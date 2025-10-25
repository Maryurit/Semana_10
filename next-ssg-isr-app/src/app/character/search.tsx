"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export default function CharacterSearch() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Evita llamar si no hay ningún filtro
    if (!query && !status && !type && !gender) {
      setCharacters([]);
      return;
    }

    const fetchCharacters = async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (query) params.append("name", query);
        if (status) params.append("status", status);
        if (type) params.append("type", type);
        if (gender) params.append("gender", gender);

        const res = await fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`);
        if (!res.ok) throw new Error("No se encontraron personajes");

        const data = await res.json();
        setCharacters(data.results || []);
      } catch (err) {
        setCharacters([]);
        setError("No se encontraron personajes con esos filtros.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [query, status, type, gender]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl mb-6 font-bold">Buscar Personajes</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Nombre"
          className="p-2 rounded bg-gray-700 flex-grow min-w-[200px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status (e.g. alive)"
          className="p-2 rounded bg-gray-700 min-w-[150px]"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type"
          className="p-2 rounded bg-gray-700 min-w-[150px]"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gender"
          className="p-2 rounded bg-gray-700 min-w-[150px]"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {characters.map((char) => (
          <Link key={char.id} href={`/character/${char.id}`}>
            <a className="bg-gray-800 rounded p-4 flex flex-col items-center hover:bg-gray-700 transition">
              <Image
                src={char.image}
                alt={char.name}
                width={150}
                height={150}
                className="rounded-full"
                loading="lazy"
              />
              <h2 className="mt-2 font-semibold">{char.name}</h2>
              <p>Status: {char.status}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
