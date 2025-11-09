// app/components/HeroSection.js
'use client'; 

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Navbar (MOVIDO AQUÍ) ---
function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full p-6 flex justify-between items-center text-white"> {/* Z-50 para asegurar visibilidad */}
      <div className="text-3xl font-bold">Allin Runa</div>
      <div className="flex gap-8 text-lg">
        <a href="/tienda" className="hover:text-gray-300">Tienda</a>
        <a href="/blog" className="hover:text-gray-300">Blog</a>
        <a href="/nosotros" className="hover:text-gray-300">Nosotros</a>
      </div>
    </nav>
  );
}

// --- Icono para el "Scroll Down" (¡Más grande y claro!) ---
const ScrollDownIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

export default function HeroSection() {
  
  const { scrollYProgress } = useScroll(); 
  
  // Transformamos el scroll en opacidad y posición Y
  // El contenido se desvanece y sube un poco más al hacer scroll
  const opacity = useTransform(scrollYProgress, [0.0, 0.3], [1, 0]); // Más lento el fade out
  const yContent = useTransform(scrollYProgress, [0.0, 0.3], ["0%", "-50%"]); // Se mueve más arriba

  return (
    <section 
      className="w-full relative bg-cover bg-center bg-fixed overflow-hidden flex items-center h-[120vh]" // Elimino 'justify-center' de aquí
      style={{ 
        backgroundImage: "url('hero1-bg.jpg')",
      }}
    >
      {/* Capa oscura de fondo */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div> {/* Z-0 para que esté debajo */}
      
      {/* Navbar (siempre visible) */}
      <Navbar />
      
      {/* ============================================== */}
      {/* --- CONTENIDO PRINCIPAL DEL HERO (ANIMADO) --- */}
      {/* ============================================== */}
      {/* Este div ahora contendrá todo el texto y el botón */}
      <motion.div 
        className="relative z-10 w-full pl-16 md:pl-50 pr-8 text-left" // Texto alineado a la izquierda, padding para los lados
        style={{ opacity, y: yContent }} // Aplicamos las animaciones de scroll
      >
        <div className="max-w-3xl"> {/* Contenedor para limitar el ancho del texto */}
          
          {/* Título Principal (Animación de entrada: Flotar desde arriba) */}
          <motion.h1 
            className="text-7xl md:text-8xl font-extrabold text-white leading-tight mb-4" // ¡Texto más grande y claro!
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Salud Real, Directo del Productor
          </motion.h1>
          
          {/* Subtítulo Descriptivo (Animación de entrada: Flotar desde la izquierda) */}
          <motion.p
            className="text-2xl md:text-3xl text-gray-200 mb-10" // ¡Texto más grande y claro!
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            Descubre productos orgánicos, frescos y sostenibles que nutren tu vida.
          </motion.p>
          
          {/* Botón Explorar Tienda (Animación de entrada: Flotar desde abajo) */}
          <motion.a 
            href="/tienda" 
            className="inline-block bg-green-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-green-700 transition-colors shadow-lg" // ¡Botón más grande!
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            Explorar Tienda
          </motion.a>
        </div>
      </motion.div>
      
      {/* ============================================== */}
      {/* --- INDICADOR DE SCROLL (Visible y Animado) -- */}
      {/* ============================================== */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20" // Centrado y con Z-INDEX ALTO
        style={{ opacity }} // Animación de desvanecimiento con el scroll
      >
        {/* Animación de rebote (sube y baja) */}
        <motion.div
          animate={{ y: [0, 15, 0] }} // Rebota un poco más
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ScrollDownIcon />
        </motion.div>
      </motion.div>
      
    </section>
  );
}