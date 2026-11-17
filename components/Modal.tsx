'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icon'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Handle click outside
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose()
        }
    }

    if (!isOpen) return null

    // Portal to body to ensure it sits on top of everything
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-forest/70 backdrop-blur-sm transition-opacity"
                onClick={handleBackdropClick}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div
                ref={modalRef}
                className="
                relative w-full md:w-auto md:min-w-[500px] md:max-w-2xl max-h-[85vh] 
                bg-paper text-forest overflow-hidden flex flex-col
                rounded-t-md md:rounded-md
                animate-in slide-in-from-bottom-10 fade-in duration-300
            "
            >
                {/* Header */}
                <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-line bg-sand">
                    <h2 className="font-display text-heading-2 text-forest line-clamp-1">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-forest rounded-pill hover:bg-leaf/50 transition-colors"
                        aria-label="Close"
                    >
                        <Icon name="close" size={20} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto p-6 overscroll-contain">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}
