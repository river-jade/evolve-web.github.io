const nextConfig = {
  async redirects() {
    return [
      {
        source: '/qr',
        destination: 'https://linktr.ee/evolve.community',
        permanent: true,
      },
      {
        source: '/principles',
        destination: '/values',
        permanent: true,
      },
      {
        source: '/mailing-list',
        destination: 'https://world.us10.list-manage.com/subscribe?u=2f59f4888aeaef053a48ad2bc&id=100146c012',
        permanent: true,
      },
      {
        source: '/fb-event',
        destination: 'https://www.facebook.com/events/860183339903891',
        permanent: true,
      },
      {
        source: '/workshop-descriptions-2026',
        destination: '/workshops/2026',
        permanent: true,
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**', // This allows all paths under drive.google.com
      },
    ],
  },
}

export default nextConfig
