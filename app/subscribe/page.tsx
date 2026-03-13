import Navbar from 'components/Navbar'
import MailingListSignup from 'components/MailingListSignup'

export const metadata = {
    title: 'Subscribe – Evolve Community',
    description: 'Sign up to the Evolve Community mailing list for updates on events, tickets, and our work.',
}

export default function SubscribePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar overlay={false} />

            <section className="flex-1 flex items-center justify-center px-6 pt-28 pb-16">
                <div className="max-w-lg w-full text-center">
                    <h1 className="text-3xl font-bold text-stone-800 mb-3">Stay Connected</h1>
                    <p className="text-stone-600 mb-8">
                        Get updates on upcoming gatherings, ticket releases, and what
                        we're creating at Evolve.
                    </p>
                    <MailingListSignup />
                </div>
            </section>
        </div>
    )
}
