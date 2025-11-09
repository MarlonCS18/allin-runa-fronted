// app/components/CTASection.js
'use client'; // ¡Necesario para las animaciones de Framer Motion!

import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    // 1. ¡MEJORA 1: Efecto Parallax "bg-fixed"!
    <section 
      className="w-full h-96 bg-cover bg-center bg-fixed" 
      
      // ¡AQUÍ ESTÁ EL ARREGLO!
      // Añadimos "/img/" a la ruta de la imagen
      style={{ backgroundImage: "url('hero-bg.jpg')" }} 
    >
      <div className="w-full h-full flex flex-col items-center justify-center bg-opacity-60 text-center text-white p-4">
        
        {/* 3. ¡MEJORA 3: Animación de Título! */}
        <motion.h2 
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }} // La animación ocurre 1 vez
        >
          ¿Listo para empezar tu cambio?
        </motion.h2>
        
        {/* 2. ¡MEJORA 2: Subtítulo + Animación! */}
        <motion.p 
          className="text-xl max-w-xl mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Explora nuestro catálogo completo de productos 100% orgánicos.
        </motion.p>
        
        {/* 3. ¡MEJORA 3: Animación de Botón! */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a 
            href="/tienda" 
            className="mt-8 inline-block bg-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Ver Tienda Completa
          </a>
        </motion.div>

      </div>
    </section>
  );
}