'use client'

import Link from 'next/link'
import type { FacilitatorEntry } from 'lib/data'
import Modal from './Modal'
import { Icon } from './Icon'

const PLACEHOLDER_IMAGE = '/images/evolve-placeholder.png'

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
                                className="w-full aspect-square object-cover rounded-md bg-sand"
                            />
                        </div>
                        <div className="flex-1">
                            {facilitator.bio ? (
                                <div className="prose text-small text-forest whitespace-pre-wrap">
                                    {facilitator.bio}
                                </div>
                            ) : (
                                <p className="text-ink-soft italic">No bio provided.</p>
                            )}
                        </div>
                    </div>

                    {/* Other Workshops by this person */}
                    {facilitator.workshops && facilitator.workshops.length > 0 && (
                        <div className="pt-4 border-t border-line">
                            <h3 className="label mb-3">Workshops at Evolve</h3>
                            <ul className="space-y-2">
                                {facilitator.workshops.map(w => (
                                    <li key={w.slug}>
                                        <span className="font-medium text-forest block">{w.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="pt-2 flex justify-end">
                        <Link
                            href={`/facilitators/${facilitator.slug}?year=${year}&from=schedule&day=${activeDay}`}
                            className="text-small font-semibold text-forest hover:underline decoration-sage decoration-2 underline-offset-4 flex items-center gap-2"
                        >
                            View full profile <Icon name="arrowRight" size={16} />
                        </Link>
                    </div>
                </div>
            )}
        </Modal>
    )
}
