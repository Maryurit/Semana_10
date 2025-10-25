// app/character/[id]/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-2xl mt-4">Personaje no encontrado 😢</p>
      <a
        href="/character"
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-green-900 transition"
      >
        Volver a la lista
      </a>
    </div>
  );
}
