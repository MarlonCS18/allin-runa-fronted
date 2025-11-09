// app/components/CategoryCarousel.js
'use client'; // Necesario para que Swiper funcione

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Tus categorías, alineadas con tu panel de admin
const categories = [
  { name: 'Superfoods', img: '/img/categories/superfoods.jpeg' },
  { name: 'Despensa Saludable', img: '/img/categories/despensa.jpg' },
  { name: 'Bienestar', img: '/img/categories/bienestar.jpg' },
  { name: 'Cuidado Personal', img: '/img/categories/cuidado.jpg' },
  // (Repetimos para el bucle)
  { name: 'Superfoods', img: '/img/categories/superfoods.jpg' },
  { name: 'Despensa Saludable', img: '/img/categories/despensa.jpg' },
];

export default function CategoryCarousel() {
  return (
    <section className="w-full py-16 bg-gray-50 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={4} // Muestra 4 a la vez
        loop={true}
        autoplay={{ // Tu idea de que se mueva solo
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
              <img src={category.img} alt={category.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <h3 className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">{category.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}