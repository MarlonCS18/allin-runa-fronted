// app/components/TiendaContenido.js
"use client"; 

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // (La importación que arreglamos antes)
import Link from 'next/link'; 
import { motion } from 'framer-motion';

// Importamos los componentes hijos
import ProductCard, { fadeInUp } from './ProductCard';
import FilterGroup from './FilterGroup';

// Definimos las animaciones
const categories = ["Superfoods", "Despensa Saludable", "Bienestar", "Cuidado Personal"];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      ease: 'easeOut'
    }
  }
};

export default function TiendaContenido({ allProducts }) {
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('popularidad');
  const [filteredProducts, setFilteredProducts] = useState(allProducts); 

  // Lógica de filtros (sin Origen)
  useEffect(() => {
    let products = [...allProducts];

    if (selectedCategories.length > 0) {
      products = products.filter(p => selectedCategories.includes(p.categoria));
    }
    
    switch (sortOrder) {
      case 'precio-asc':
        products.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        products.sort((a, b) => b.precio - b.precio);
        break;
      case 'nombre-asc':
        products.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      default: 
        products.sort((a, b) => a.id - b.id);
        break;
    }
    setFilteredProducts(products);
  }, [selectedCategories, sortOrder, allProducts]);

  // Funciones de manejo de filtros
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  return (
    // Usamos un Fragment (<>) para envolver las 3 secciones
    <>
      {/* --- SECCIÓN 1: HERO DE TIENDA --- */}
      <section className="relative w-full h-[50vh] flex items-center justify-center text-center text-white -mt-16">
        {/* --- ¡ARREGLO AQUÍ! --- */}
        {/* Añadimos el '/' al inicio de la ruta */}
        <Image
          src="/img/tienda-hero.webp" // Asumiendo que se llama 'tienda-hero.webp' y está en 'public/img/'
          alt="Productos orgánicos en una mesa"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
        />
        <motion.div 
          className="relative z-10 max-w-3xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Nuestra Tienda
          </h1>
          <p className="text-xl md:text-2xl">
            Descubre la colección completa de productos orgánicos Allin Runa.
          </p>
        </motion.div>
      </section>

      {/* --- SECCIÓN 2: CUERPO PRINCIPAL (Filtros + Cuadrícula) --- */}
      <div className="w-full max-w-full mx-auto py-16 px-4 md:px-8 lg:px-12 flex flex-col lg:flex-row gap-10">
        
        {/* COLUMNA IZQUIERDA: Filtros (Sidebar) */}
        <motion.aside 
          className="w-full lg:w-1/4 xl:w-1/5 bg-white p-6 rounded-lg shadow-lg self-start sticky top-24"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Filtros</h2>
            <button 
              onClick={() => {
                setSelectedCategories([]);
              }}
              className="text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
            >
              Limpiar todo
            </button>
          </div>
          
          <FilterGroup
            title="Categoría"
            options={categories}
            selected={selectedCategories}
            onChange={handleCategoryChange}
          />
          
        </motion.aside>

        {/* COLUMNA DERECHA: Productos */}
        <main className="w-full lg:w-3/4 xl:w-4/5">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <p className="text-sm text-gray-600 w-full md:w-auto">
              Mostrando {filteredProducts.length} productos
            </p>
            <select 
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="popularidad">Popularidad</option>
              <option value="precio-asc">Precio: Más bajo a más alto</option>
              <option value="precio-desc">Precio: Más alto a más bajo</option>
              <option value="nombre-asc">Alfabéticamente, A-Z</option>
            </select>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
            key={filteredProducts.length}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </main>
      </div>

      {/* --- SECCIÓN 3: CTA (Newsletter) --- */}
      <section className="w-full bg-gray-100 py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Únete a la Comunidad Allin Runa</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            ¿Inspirado por nuestra historia? Recibe más relatos de nuestros productores, recetas saludables y acceso anticipado a nuevos productos.
          </p>
          <form className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Tu correo electrónico"
              className="px-6 py-4 rounded-full text-gray-800 w-full md:flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <button 
              type="submit"
              className="bg-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>
    </>
  );
}