'use client'

import Link from 'next/link'
import type { Workshop, FacilitatorEntry } from 'lib/data'
import Modal from './Modal'

const PLACEHOLDER_IMAGE = '/images/evolve-logo.jpg'

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
                        <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wide mb-1">Hosted by</h3>
                        <button
                            onClick={() => {
                                onClose()
                                // Small timeout to allow transition if needed
                                setTimeout(() => onFacilitatorClick(workshop.facilitator), 50)
                            }}
                            className="text-lg font-bold text-gray-800 hover:text-teal-700 hover:underline flex items-center gap-2"
                        >
                            <img
                                src={workshop.facilitator.image ? `/images/facilitator-images/${workshop.facilitator.image}` : PLACEHOLDER_IMAGE}
                                alt=""
                                className="w-8 h-8 rounded-full object-cover bg-stone-100"
                            />
                            {workshop.facilitator.name}
                        </button>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wide mb-2">About the Workshop</h3>
                        <div className="prose prose-stone leading-relaxed text-gray-700">
                            {workshop.details}
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                        <Link
                            href={`/workshops/${year}#${workshop.workshop_slug}`}
                            className="text-sm font-medium text-teal-600 hover:text-teal-800 flex items-center gap-1"
                        >
                            All workshops <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            )}
        </Modal>
    )
}
