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
                <div className="max-w-lg w-full">
                    <MailingListSignup variant="full" />
                </div>
            </section>
        </div>
    )
}
