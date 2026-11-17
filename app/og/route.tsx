import { title as defaultTitle } from 'app/metadata'
import { ImageResponse } from 'next/og'

export function GET(request: Request) {
  let url = new URL(request.url)
  let title = url.searchParams.get('title') || defaultTitle

  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full justify-center px-24"
        style={{ backgroundColor: '#123D32', color: '#FBF6EA' }}
      >
        <div tw="flex text-2xl" style={{ letterSpacing: '0.3em', color: '#A7C7A0' }}>
          EVOLVE COMMUNITY
        </div>
        <h2 tw="flex flex-col text-7xl text-left mt-6" style={{ fontWeight: 400, lineHeight: 1.1 }}>
          {title}
        </h2>
        <div tw="flex mt-10" style={{ width: 96, height: 8, borderRadius: 999, backgroundColor: '#F4A261' }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
