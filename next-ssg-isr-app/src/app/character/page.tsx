"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CharacterListResponse, SimpleCharacter } from "@/types/rickAndMorty";
import { IoSearch } from "react-icons/io5";

async function getCharacters(): Promise<SimpleCharacter[]> {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Error al cargar personajes");
  const data: CharacterListResponse = await res.json();
  return data.results.map((char) => ({
    id: char.id,
    name: char.name,
    image: char.image,
  }));
}

export default function CharacterList() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [characters, setCharacters] = useState<SimpleCharacter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Carga inicial
  useEffect(() => {
    async function loadInitial() {
      setLoading(true);
      try {
        const chars = await getCharacters();
        setCharacters(chars);
      } catch {
        setError("No se pudieron cargar los personajes");
      } finally {
        setLoading(false);
      }
    }
    loadInitial();
  }, []);

  // Función de búsqueda
  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (query) params.append("name", query);
      if (status) params.append("status", status);
      if (type) params.append("type", type);
      if (gender) params.append("gender", gender);

      const res = await fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`);
      if (!res.ok) throw new Error("No hay personajes que coincidan");

      const data: CharacterListResponse = await res.json();
      setCharacters(
        data.results.map((char) => ({
          id: char.id,
          name: char.name,
          image: char.image,
        }))
      );
    } catch {
      setCharacters([]);
      setError("No se encontraron personajes con esos filtros.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6">Personajes de Rick & Morty</h1>

      {/* Buscador */}
      <div className="mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex-grow flex">
          <input
            type="text"
            placeholder="Nombre"
            className="p-2 rounded-l bg-gray-700 text-white flex-grow min-w-[200px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 p-2 rounded-r hover:bg-green-800 transition"
          >
            <IoSearch size={24} className="text-white" />
          </button>
        </div>

        {/* Filtros */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white min-w-[150px]"
        >
          <option value="">Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white min-w-[150px]"
        >
          <option value="">Type</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
        </select>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white min-w-[150px]"
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {loading && <p className="text-white">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((char) => (
          <Link key={char.id} href={`/character/${char.id}`}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer">
              <Image
                src={char.image}
                width={150}
                height={150}
                alt={char.name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <h2 className="text-center font-bold mt-2">{char.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
