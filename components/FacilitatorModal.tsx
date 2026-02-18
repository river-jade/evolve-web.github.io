'use client'

import Link from 'next/link'
import type { FacilitatorEntry } from 'lib/data'
import Modal from './Modal'

const PLACEHOLDER_IMAGE = '/images/evolve-logo.jpg'

type Props = {
    facilitator: FacilitatorEntry | null
    onClose: () => void
    year: string
    activeDay: string
}

export const FacilitatorModal = ({ facilitator, onClose, year, activeDay }: Props) => {
    return (
        <Modal
            isOpen={!!facilitator}
            onClose={onClose}
            title={facilitator?.name}
        >
            {facilitator && (
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-full md:w-1/3 shrink-0">
                            <img
                                src={facilitator.image ? `/images/facilitator-images/${facilitator.image}` : PLACEHOLDER_IMAGE}
                                alt={facilitator.name}
                                className="w-full aspect-square object-cover rounded-xl shadow-md bg-stone-100"
                            />
                        </div>
                        <div className="flex-1">
                            {facilitator.bio ? (
                                <div className="prose prose-stone text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                                    {facilitator.bio}
                                </div>
                            ) : (
                                <p className="text-stone-500 italic">No bio provided.</p>
                            )}
                        </div>
                    </div>

                    {/* Other Workshops by this person */}
                    {facilitator.workshops && facilitator.workshops.length > 0 && (
                        <div className="pt-4 border-t border-stone-100">
                            <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wide mb-3">Workshops at Evolve</h3>
                            <ul className="space-y-2">
                                {facilitator.workshops.map(w => (
                                    <li key={w.slug}>
                                        <span className="font-medium text-gray-900 block">{w.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="pt-2 flex justify-end">
                        <Link
                            href={`/facilitators/${facilitator.slug}?year=${year}&from=schedule&day=${activeDay}`}
                            className="text-sm font-medium text-teal-600 hover:text-teal-800 flex items-center gap-1"
                        >
                            View full profile <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            )}
        </Modal>
    )
}
