import Navbar from 'components/Navbar'
import MailingListSignup from 'components/MailingListSignup'

export const metadata = {
    title: 'Subscribe – Evolve Community',
    description: 'Sign up to the Evolve Community mailing list for updates on events, tickets, and our work.',
}

export default function SubscribePage() {
    return (
        <div className="flex flex-col flex-1">
            <Navbar overlay={false} />

            <section className="flex-1 flex items-center justify-center px-6 pt-32 pb-10">
                <div className="max-w-lg w-full text-center">
                    <h1 className="font-display text-heading-1 md:text-display text-forest mb-4">Stay Connected</h1>
                    <p className="text-ink-soft mb-8">
                        Get updates on upcoming gatherings, ticket releases, and what
                        we're creating at Evolve.
                    </p>
                    <div className="card p-6 text-left">
                        <MailingListSignup />
                    </div>
                </div>
            </section>
        </div>
    )
}
