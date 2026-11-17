'use client'

import Link from 'next/link'
import type { Workshop, FacilitatorEntry } from 'lib/data'
import Modal from './Modal'
import { Icon } from './Icon'

const PLACEHOLDER_IMAGE = '/images/evolve-placeholder.png'

type Props = {
    workshop: Workshop | null
    onClose: () => void
    onFacilitatorClick: (f: FacilitatorEntry) => void
    year: string
}

export const WorkshopModal = ({ workshop, onClose, onFacilitatorClick, year }: Props) => {
    return (
        <Modal
            isOpen={!!workshop}
            onClose={onClose}
            title={workshop?.workshop_name}
        >
            {workshop && (
                <div className="space-y-6">
                    <div>
                        <h3 className="label mb-2">Hosted by</h3>
                        <button
                            onClick={() => {
                                onClose()
                                // Small timeout to allow transition if needed
                                setTimeout(() => onFacilitatorClick(workshop.facilitator), 50)
                            }}
                            className="text-lg font-semibold text-forest hover:underline decoration-sage decoration-2 underline-offset-4 flex items-center gap-2"
                        >
                            <img
                                src={workshop.facilitator.image ? `/images/facilitator-images/${workshop.facilitator.image}` : PLACEHOLDER_IMAGE}
                                alt=""
                                className="w-8 h-8 rounded-pill object-cover bg-sand"
                            />
                            {workshop.facilitator.name}
                        </button>
                    </div>

                    <div>
                        <h3 className="label mb-2">About the Workshop</h3>
                        <div className="prose text-forest">
                            {workshop.details}
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                        <Link
                            href={`/workshops/${year}#${workshop.workshop_slug}`}
                            className="text-small font-semibold text-forest hover:underline decoration-sage decoration-2 underline-offset-4 flex items-center gap-2"
                        >
                            All workshops <Icon name="arrowRight" size={16} />
                        </Link>
                    </div>
                </div>
            )}
        </Modal>
    )
}
