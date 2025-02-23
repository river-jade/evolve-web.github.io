const nextConfig = {
  async redirects() {
    return [
      {
        source: '/qr',
        destination: 'https://linktr.ee/evolve.community',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
