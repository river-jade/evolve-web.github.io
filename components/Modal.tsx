'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

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
                className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
                onClick={handleBackdropClick}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div
                ref={modalRef}
                className="
                relative w-full md:w-auto md:min-w-[500px] md:max-w-2xl max-h-[85vh] 
                bg-white shadow-2xl overflow-hidden flex flex-col
                rounded-t-2xl md:rounded-2xl
                animate-in slide-in-from-bottom-10 fade-in duration-300
            "
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-stone-100 bg-stone-50/50">
                    <h2 className="font-bold text-lg text-stone-800 line-clamp-1">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-200/50 transition-colors"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto p-4 md:p-6 overscroll-contain">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}
