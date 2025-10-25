import { ReactNode } from "react";
import Link from "next/link";
import { IoPeople } from "react-icons/io5";

interface CharacterLayoutProps {
  children: ReactNode;
}

export default function CharacterLayout({ children }: CharacterLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <nav className="bg-black bg-opacity-30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/character"
            className="text-white text-2xl font-bold hover:text-green-400 transition"
          >
            <IoPeople size={30} className="inline-block" /> Rick & Morty App
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
