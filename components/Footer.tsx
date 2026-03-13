'use client'

import { usePathname } from 'next/navigation'
import { contactEmail } from 'app/metadata'
import MailingListSignup from './MailingListSignup'

export default function Footer() {
  const pathname = usePathname()

  return (
    <footer className="flex flex-col gap-4 max-w-xl w-full mx-auto mt-8 mb-4 pt-6 border-t border-stone-200">

      {/* Contact Info */}
      <p className="text-stone-700 text-sm">
        Contact us:{' '}
        <a
          href={`mailto:${contactEmail}`}
          className="text-teal-600 hover:text-teal-500 font-medium"
        >
          {contactEmail}
        </a>
      </p>

      {/* Mailing List Signup — hidden on /subscribe which has its own */}
      {pathname !== '/subscribe' && <MailingListSignup />}

      {/* Copyright */}
      <p className="pt-4 text-stone-500 text-xs border-t border-stone-100 mt-6 text-center">
        © {new Date().getFullYear()} Evolve Community. All rights reserved.
      </p>
    </footer>
  )
}