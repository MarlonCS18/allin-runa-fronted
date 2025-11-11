/** @type {import('next').NextConfig} */
const nextConfig = {
  // ¡AQUÍ ESTÁ LA SOLUCIÓN!
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/img/**', // Permite cualquier imagen dentro de la carpeta /img/
      },
    ],
  },
};

export default nextConfig;