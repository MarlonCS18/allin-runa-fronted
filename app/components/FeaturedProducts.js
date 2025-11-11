// app/components/FeaturedProducts.js
'use client';

import React from 'react';
import { motion } from 'framer-motion';

// --- Variantes de Animación ---

// Variante para el contenedor de la cuadrícula
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Anima cada tarjeta 0.1s después de la anterior
    },
  },
};

// ¡NUEVA ANIMACIÓN! (Zoom en lugar de deslizar)
const cardVariant = {
  hidden: { opacity: 0, scale: 0.95 }, // Empieza invisible y un 5% más pequeño
  visible: { 
    opacity: 1, 
    scale: 1, // Termina en su tamaño completo
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

// Animación simple para el encabezado
const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' }}
};

// Recibimos 'productos' como prop
export default function FeaturedProducts({ productos }) {
  return (
    // Usamos el fondo "Tono Arena"
    <section className="w-full bg-stone-100 py-20"> 
      <div className="max-w-6xl mx-auto px-4">
        
        <motion.div 
          className="text-center"
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Selección del Mes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Productos orgánicos traídos desde tu API de Java.
          </p>
        </motion.div>
        
        {/* Contenedor de la cuadrícula animada */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {productos.map((producto) => (
            // Aplicamos la animación de "scale" a cada tarjeta
            <motion.div
              key={producto.id}
              variants={cardVariant}
            >
              <div className="border bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 h-full">
                <img src={producto.imagen} alt={producto.nombre} className="w-full h-56 object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold h-14">{producto.nombre}</h3>
                  <p className="text-2xl font-bold text-green-700 mt-2">S/ {producto.precio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}