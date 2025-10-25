// app/character/[id]/error.tsx
"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600">¡Ups! 😬</h1>
      <p className="text-xl mt-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-green-900 transition"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
