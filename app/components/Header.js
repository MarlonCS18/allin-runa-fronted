// app/components/Header.js
"use client"; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clase de texto que cambia (blanco o gris)
  const textClass = isScrolled ? 'text-gray-800' : 'text-white';

  return (
    <header 
      className={`
        sticky top-0 z-50 w-full 
        transition-all duration-300 ease-in-out
        ${isScrolled ? 'bg-zinc-50 shadow-md' : 'bg-transparent'}
      `}
    >
      
      {/* Contenedor interno que centra todo */}
      <div className="flex h-16 max-w-6xl items-center justify-between mx-auto px-4">

        {/* --- ¡NUEVA AGRUPACIÓN IZQUIERDA! --- */}
        {/* Logo y Navegación están juntos */}
        <div className="flex items-center gap-8">
          
          {/* Logo */}
          <Link 
            href="/" 
            className={`text-xl font-bold transition-colors ${textClass}`}
          >
            Allin Runa
          </Link>

          {/* Navegación Principal */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link 
              href="/tienda" 
              className={`transition-colors hover:text-green-700 ${textClass}`}
            >
              Tienda
            </Link>
            <Link 
              href="/nosotros" 
              className={`transition-colors hover:text-green-700 ${textClass}`}
            >
              Nosotros
            </Link>
            <Link 
              href="/blog" 
              className={`transition-colors hover:text-green-700 ${textClass}`}
            >
              Blog
            </Link>
          </nav>
        </div>

        {/* --- GRUPO DERECHO (Acciones) --- */}
        {/* El carrito queda solo a la derecha, lo cual es limpio */}
        <div className="flex items-center gap-4">
          <button 
            aria-label="Carrito" 
            className={`transition-colors hover:text-green-700 ${textClass}`}
          >
            {/* Aquí iría un ícono de Carrito */}
            <span>Carrito</span>
          </button>
        </div>

      </div>
    </header>
  );
}