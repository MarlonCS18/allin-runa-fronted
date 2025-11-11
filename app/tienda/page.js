// app/tienda/page.js
import React from 'react';
import TiendaContenido from '../components/TiendaContenido'; // Importa el componente cliente

// Esta función llama a tu API de Java
async function getProducts() {
  try {
    const res = await fetch('http://localhost:8080/api/v1/productos', { 
      cache: 'no-store' 
    });

    if (!res.ok) {
      throw new Error(`Falló al cargar los productos: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("ERROR AL OBTENER PRODUCTOS:", error.message);
    return []; 
  }
}

// Esta página de servidor solo obtiene datos
export default async function TiendaPage() {
  
  const allProducts = await getProducts();

  return (
    <main className="flex flex-col items-center">
      {/* ¡TODO EL CONTENIDO VISUAL SE HA MOVIDO!
        Ahora solo renderizamos el componente cliente
        y le pasamos los productos obtenidos del backend.
      */}
      <TiendaContenido allProducts={allProducts} />
    </main>
  );
}