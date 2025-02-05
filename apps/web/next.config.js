/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para ignorar erros de TypeScript durante a compilação
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuração para ignorar erros de ESLint durante a compilação
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Habilita source maps em produção
  productionBrowserSourceMaps: true,
  // Desabilita verificações de tipos em tempo de execução
  reactStrictMode: false,
};

module.exports = nextConfig;
