'use client'

import { usePathname } from 'next/navigation'
import { contactEmail } from 'app/metadata'
import MailingListSignup from './MailingListSignup'

export default function Footer() {
  const pathname = usePathname()

  return (
    <footer className="relative overflow-hidden mt-16 bg-forest text-paper">
      {/* Spiral dots as a quiet pattern off the corner of the panel */}
      <img
        src="/brand/evolve-mark-single-sand.svg"
        alt=""
        aria-hidden="true"
        className="spiral-pattern -right-32 -bottom-40 w-[520px] max-w-none"
      />

      <div className="relative max-w-6xl w-full mx-auto px-6 md:px-16 pt-16 pb-8 flex flex-col gap-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="flex flex-col gap-4">
            <img
              src="/brand/evolve-lockup-horizontal-on-dark.svg"
              alt="Evolve"
              width={264}
              height={72}
              className="h-[72px] w-auto self-start"
            />
            <p className="label !text-leaf">Connect · Grow · Evolve</p>

            {/* Contact Info */}
            <p className="text-small font-medium mt-4">
              Contact us:{' '}
              <a
                href={`mailto:${contactEmail}`}
                className="underline decoration-leaf decoration-2 underline-offset-4 hover:decoration-paper transition-colors"
              >
                {contactEmail}
              </a>
            </p>
          </div>

          {/* Mailing List Signup — hidden on /subscribe which has its own */}
          {pathname !== '/subscribe' && (
            <div className="card p-6 text-forest">
              <MailingListSignup />
            </div>
          )}
        </div>

        {/* Copyright */}
        <p className="pt-6 text-paper text-label font-medium border-t border-paper/20 text-center">
          © {new Date().getFullYear()} Evolve Community. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
