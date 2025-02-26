import { contactEmail } from 'app/metadata'
import { MailChimpVendorForm } from './MailchimpForm.vendor'

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 max-w-xl w-full mx-auto mt-12 mb-4 pt-6 border-t-1 border-gray-200">
      <p>
        Contact us:{' '}
        <a
          href={`mailto:${contactEmail}`}
          className="underline decoration-dotted text-blue-600"
        >
          {contactEmail}
        </a>
      </p>

      <MailChimpVendorForm />

      <p className="mt-8 text-neutral-600 dark:text-neutral-300 text-xs">
        © {new Date().getFullYear()} Evolve Community. All rights reserved.
      </p>
    </footer>
  )
}
