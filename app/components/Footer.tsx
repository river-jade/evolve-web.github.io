import { contactEmail } from 'app/metadata'
import MailchimpForm from './MailChimpForm'

export default function Footer() {
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
      
      {/* Form Area */}
      <div className="mt-4">
        <h4 className="text-lg font-bold text-stone-800 mb-2">Stay Connected</h4>
        <p className="text-stone-600 text-sm mb-4">Get updates on events, tickets, and our work.</p>
        <MailchimpForm />
        
        {/* ADDED: Small Mailchimp branding for credibility */}
        <p className="text-xs text-stone-400 mt-2 text-center">
            Secured by Mailchimp
        </p>
      </div>

      {/* Copyright */}
      <p className="pt-4 text-stone-500 text-xs border-t border-stone-100 mt-6 text-center">
        © {new Date().getFullYear()} Evolve Community. All rights reserved.
      </p>
    </footer>
  )
}