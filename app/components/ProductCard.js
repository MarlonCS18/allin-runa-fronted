// app/components/ProductCard.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

// Define la URL de tu backend aquí
const BACKEND_URL = 'http://localhost:8080';

export default function ProductCard({ product }) {
  
  // --- ¡AQUÍ ESTÁ LA SOLUCIÓN! ---
  // Verificamos si product.imagenUrl tiene un valor "truthy" (no es null, undefined, o "")
  // Si existe, creamos la URL completa.
  // Si no existe, usamos una imagen de placeholder local de la carpeta 'public'.
  const imageUrl = product.imagenUrl 
    ? `${BACKEND_URL}${product.imagenUrl}` 
    : '/img/placeholder.webp'; // <-- ¡Imagen de reemplazo!

  return (
    <motion.div 
      className="group"
      variants={fadeInUp}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
        <Link href={`/producto/${product.id}`} className="block">
          
          <div className="relative w-full h-64">
            {/* Ahora 'src' siempre tendrá una URL válida:
              o la del backend, o la del placeholder.
            */}
            <Image
              src={imageUrl} 
              alt={product.nombre} 
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {/* Quitamos la insignia de 'origen' porque tu API 
              no tiene ese campo (como dijiste antes).
            */}
          </div>

          <div className="p-5 flex-grow">
            <span className="text-sm text-gray-500">{product.categoria}</span>
            <h3 className="text-lg font-bold text-gray-800 truncate mt-1">
              {product.nombre}
            </h3>
            <p className="text-xl font-bold text-green-700 mt-2">
              S/ {product.precio.toFixed(2)}
            </p>
          </div>
        </Link>
        
        <div className="px-5 pb-5 mt-auto">
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-full font-semibold transition-all duration-300 hover:bg-green-700">
            Añadir al Carrito
          </button>
        </div>
      </div>
    </motion.div>
  );
}