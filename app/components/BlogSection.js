// app/components/BlogSection.js
'use client'; // Necesario para que Swiper funcione

import { Swiper, SwiperSlide } from 'swiper/react';
// Importamos los módulos que usaremos
import { Autoplay, Navigation } from 'swiper/modules';

export default function BlogSection({ posts }) {
  
  return (
    <section className="w-full bg-gray-50 py-20 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-12">Edúcate con Nosotros</h2>

      {/* ¡LA NUEVA CONFIGURACIÓN DE SWIPER!
        Prioriza la LECTURA y la INTERACCIÓN (jalar).
      */}
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}              // Bucle infinito
        
        // --- ¡AQUÍ ESTÁ TU REQUISITO! ---
        slidesPerView={2}      // 1. Muestra 2 blogs
        spaceBetween={30}        // Espacio entre ellos
        
        // --- ¡AQUÍ ESTÁ LA SOLUCIÓN! ---
        autoplay={{
          delay: 7000,           // 2. ¡SE DETIENE 7 SEGUNDOS! Tiempo de sobra para leer.
          disableOnInteraction: false, // Sigue automático después de que lo jalas
          pauseOnMouseEnter: true,   // 3. SE DETIENE si pones el mouse encima (para leer con calma)
        }}
        
        // --- HACE EL MOVIMIENTO MENOS "BRUSCO" ---
        speed={1000} // 4. La transición (el slide) dura 1 segundo (suave)
        
        grabCursor={true}        // 5. Muestra la "manito" y SÍ se puede "jalar"
      >
        
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            
            {/* 6. ¡CUADRADO MÁS GRANDE! (Cambiamos a h-80) */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden h-80">
              <div className="flex h-full">
                
                {/* Lado Izquierdo (Texto) */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-2xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    {post.summary}
                  </p>
                  <a href={`/blog/${post.slug}`} className="text-green-600 font-semibold hover:underline mt-4">
                    Más información
                  </a>
                </div>
                
                {/* Lado Derecho (Imagen) */}
                <div className="w-2/5">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}