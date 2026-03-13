import MailchimpForm from './MailChimpForm'

export default function MailingListSignup({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
    const isFullPage = variant === 'full'

    return (
        <div className={isFullPage ? 'mt-0' : 'mt-4'}>
            <h4
                className={
                    isFullPage
                        ? 'text-2xl font-bold text-stone-800 mb-3'
                        : 'text-lg font-bold text-stone-800 mb-2'
                }
            >
                Stay Connected
            </h4>
            <p
                className={
                    isFullPage
                        ? 'text-stone-600 mb-6'
                        : 'text-stone-600 text-sm mb-4'
                }
            >
                Get updates on events, tickets, and our work.
            </p>

            <MailchimpForm />

            <p className="text-xs text-stone-400 mt-2 text-center">
                Secured by Mailchimp
            </p>
        </div>
    )
}
