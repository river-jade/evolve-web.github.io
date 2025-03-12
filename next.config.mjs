const nextConfig = {
  async redirects() {
    return [
      {
        source: '/qr',
        destination: 'https://linktr.ee/evolve.community',
        permanent: true,
      },
      {
        source: '/mailing-list',
        destination: 'https://world.us10.list-manage.com/subscribe?u=2f59f4888aeaef053a48ad2bc&id=100146c012',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
