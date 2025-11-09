// app/page.js
import React from 'react';

// Importamos los componentes (ahora son Testimonials, BlogSection y Footer)
import Testimonials from './components/Testimonials';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import CTASection from './components/CTASection';

/* ==============================================
 * FUNCIÓN PARA PEDIR PRODUCTOS (Backend Java)
 * ============================================== */
async function getProductos() {
  try {
    const res = await fetch('http://localhost:8080/api/v1/productos/destacados', { cache: 'no-store' });
    if (!res.ok) throw new Error('Falló al cargar los productos');
    return res.json();
  } catch (error) {
    console.error("ERROR BACKEND (Productos):", error.message);
    return [];
  }
}

/* ==============================================
 * FUNCIÓN PARA PEDIR POSTS DEL BLOG (Simulado)
 * ============================================== */
async function getBlogPosts() {
  // ¡Actualizado con los campos que tu nuevo diseño de blog necesita!
  return [
    { id: 1, title: 'Los 5 Superfoods', summary: 'Descubre los 5 superfoods que debes conocer...', image: '/img/blog/blog1.jpeg', slug: 'superfoods' },
    { id: 2, title: 'Evita Industriales', summary: 'Por qué evitar productos industriales y elegir...', image: '/img/blog/blog2.jpeg', slug: 'industriales' },
    { id: 3, title: 'Cuidado Sin Tóxicos', summary: 'Guía de Cuidado Personal Sin Tóxicos para...', image: '/img/blog/blog3.jpeg', slug: 'cuidado-personal' },
    { id: 4, title: 'El Poder de la Maca', summary: 'Todo sobre los beneficios de la maca orgánica...', image: '/img/blog/blog4.jpeg', slug: 'maca' },
  ];
}



/* ==============================================
 * PÁGINA PRINCIPAL (La unión de todo)
 * ============================================== */
export default async function HomePage() {
  // Pedimos los datos
  const productos = await getProductos();
  const posts = await getBlogPosts();

  // Datos para tus secciones estáticas
  const categories = [
    { name: 'Superfoods', img: '/img/categories/superfoods.jpeg' },
    { name: 'Despensa Saludable', img: '/img/categories/despensa.jpeg' },
    { name: 'Bienestar', img: '/img/categories/bienestar.jpeg' },
    { name: 'Cuidado Personal', img: '/img/categories/cuidado.jpeg' },
  ];

  const origins = [
    { name: 'Costa', img: '/img/producers/costa.jpeg' },
    { name: 'Sierra', img: '/img/producers/sierra.jpeg' }, // ¡Cambié a Regiones!
    { name: 'Selva', img: '/img/producers/selva.jpeg' },   // ¡Cambié a Regiones!
  ];

  return (
    <main className="flex flex-col items-center text-gray-800">


    {/* ============================================== */}
      {/* --- SECCIÓN 1: HERO (¡Con Animación de Scroll!) --- */}
      {/* ============================================== */}
      <HeroSection />


      {/* --- SECCIÓN 2: CATEGORÍAS (Tu nuevo Grid Estático) --- */}
      <section className="w-full max-w-6xl mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            // Contenedor con overflow-hidden para "cortar" el zoom
            <div key={category.name} className="relative h-80 rounded-lg overflow-hidden shadow-lg group">
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-400" // Tu efecto de zoom
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <h3 className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECCIÓN 3: ORÍGENES (Tu nuevo Grid Estático) --- */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4 text-center">
        <h2 className="text-5xl font-extrabold mb-12">Nuestros Orígenes</h2> {/* Tu título grandote */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {origins.map((origin) => (
            <div key={origin.name} className="relative h-96 rounded-lg overflow-hidden shadow-2xl group">
              <img src={origin.img} alt={origin.name} className="w-full h-full object-cover" />
              {/* Overlay oscuro que aparece al hacer hover */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              {/* Texto que aparece al hacer hover */}
              <h3 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {origin.name}
              </h3>
            </div>
          ))}
        </div>
      </section>


      {/* ============================================== */}
      {/* --- SECCIÓN 4: MANIFIESTO (Tu Versión Escalonada) --- */}
      {/* ============================================== */}
      <section className="w-full bg-gray-50 py-24 overflow-hidden"> {/* overflow-hidden es por si algo se desborda */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4">
          
          {/* --- Columna Izquierda (Tus Imágenes Escalonadas) --- */}
          {/* Este es el contenedor vertical para tus 3 imágenes */}
          <div className="flex flex-col gap-6"> {/* 'gap-6' es el espacio vertical entre ellas */}
            
            {/* Imagen 1 (Alineada a la izquierda por defecto) */}
            <div className="w-5/6"> {/* No ocupa el 100% del ancho */}
              <img 
                src="/img/manifiesto/manifesto-1.jpg" 
                alt="Productos naturales" 
                className="rounded-lg shadow-2xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Imagen 2 (Alineada a la derecha) */}
            <div className="w-5/6 self-end"> {/* 'self-end' la empuja a la derecha */}
              <img 
                src="/img/manifiesto/manifesto-2.jpg" 
                alt="Comunidad de agricultores" 
                className="rounded-lg shadow-2xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Imagen 3 (Alineada a la izquierda por defecto) */}
            <div className="w-5/6"> {/* De vuelta a la izquierda */}
              <img 
                src="/img/manifiesto/manifesto-3.jpg" 
                alt="Bienestar" 
                className="rounded-lg shadow-2xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
              />
            </div>

          </div>

          {/* --- Columna Derecha (Tu Texto Comunicador) --- */}
          <div className="text-left">
            <h2 className="text-5xl font-extrabold mb-6">
              Tu Bienestar es Nuestra Misión.
            </h2>
            <h3 className="text-2xl text-green-700 font-semibold mb-6">
              Más que productos, un estilo de vida.
            </h3>
            
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                En Allin Runa, no solo vendemos. Nuestra misión es "informar, educar y ofrecerte acceso a productos confiables".
              </p>
              <p>
                Estamos cansados de las "soluciones industriales" que solo alivian síntomas. Creemos en la "prevención de enfermedades" y en el "bienestar integral".
              </p>
              <p>
                Por eso, cada producto que ves aquí contribuye a tu "salud a largo plazo".
              </p>
            </div>
          </div>
          
        </div>
      </section>
      


      {/* --- SECCIÓN 5: PRODUCTOS DESTACADOS (Desde tu API) --- */}
      <section className="w-full py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Selección del Mes</h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Productos orgánicos traídos desde tu API de Java.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productos.map((producto) => (
              <div key={producto.id} className="border bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                <img src={producto.imagen} alt={producto.nombre} className="w-full h-56 object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold h-14">{producto.nombre}</h3>
                  <p className="text-2xl font-bold text-green-700 mt-2">S/ {producto.precio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 6: CTA A LA TIENDA (MOVIDA AQUÍ) --- */}
      <CTASection />

      {/* --- SECCIÓN 7: TESTIMONIOS (MOVIDA AQUÍ) --- */}
      <Testimonials />

      {/* --- SECCIÓN 8: BLOG (Carrusel Fluido) --- */}
      <BlogSection posts={posts} />

      {/* --- SECCIÓN 9: FOOTER --- */}
      <Footer />

    </main>
  );
}