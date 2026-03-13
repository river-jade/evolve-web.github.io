'use client'

import { useEffect, useRef } from 'react'

export default function MailingListSignup() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container || container.querySelector('script')) return

        const script = document.createElement('script')
        script.src = 'https://eocampaign1.com/form/0fb58ae2-1ea3-11f1-bdb6-77e616722b63.js'
        script.async = true
        script.dataset.form = '0fb58ae2-1ea3-11f1-bdb6-77e616722b63'
        container.appendChild(script)
    }, [])

    return <div ref={containerRef} />
}
