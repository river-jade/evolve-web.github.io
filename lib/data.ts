// src/lib/data.ts
import data2025 from 'data/workshops-2025.json'
import data2026 from 'data/workshops-2026.json'

import schedule2025 from 'data/schedule-2025.json'
import schedule2026 from 'data/schedule-2026.json'
// Add new years here as they come

import { slugify } from './utils'

export type ScheduleEvent = {
    id: string
    day: string
    venue: string
    start_time: string
    end_time: string
    title: string
    facilitator?: string
    type: 'workshop' | 'break'
}

type RawWorkshop = {
    slug?: string
    facilitator_name: string
    workshop_name: string
    image?: string // local image filename
    image_url?: string
    thumbnail_url?: string
    bio: string
    details: string
    year: string
}

export type Workshop = {
    facilitator: FacilitatorEntry,
    workshop_name: string
    details: string
    year: string
    workshop_slug: string
}

export type FacilitatorEntry = {
    name: string
    slug: string
    image?: string // local image filename
    image_url?: string
    thumbnail_url?: string
    bio: string,
    workshops: {
        title: string
        year: string
        details: string
        slug: string
    }[]
}

const processWorkshops = (data: RawWorkshop[], year): Workshop[] => {
    return data.map(item => ({
        facilitator: {
            name: item.facilitator_name,
            slug: item.slug || slugify(item.facilitator_name),
            image: item.image,
            image_url: item.image_url,
            thumbnail_url: item.thumbnail_url,
            bio: item.bio,
            workshops: []
        },
        workshop_name: item.workshop_name,
        details: item.details,
        year: year,
        workshop_slug: slugify(item.workshop_name)
    }))
}

export function getAllFacilitators(): Record<string, FacilitatorEntry> {
    return Object.values(ALL_WORKSHOPS).flat().reduce((acc, workshop) => {
        const facilitator = workshop.facilitator
        const slug = facilitator.slug
        if (!acc[slug]) {
            acc[slug] = {
            }
        }

        // Update bio / image etc with the latest version if available.
        acc[slug] = {
            ...acc[slug],
            image_url: facilitator.image_url || acc[slug].image_url,
            thumbnail_url: facilitator.thumbnail_url || acc[slug].thumbnail_url,
            image: facilitator.image || acc[slug].image,
            name: facilitator.name || acc[slug].name,
            slug: facilitator.slug || acc[slug].slug,
            bio: facilitator.bio || acc[slug].bio,
            workshops: acc[slug].workshops || []
        }

        acc[slug].workshops.push({
            title: workshop.workshop_name,
            year: workshop.year,
            details: workshop.details,
            slug: workshop.workshop_slug
        })

        return acc
    }, {})
}

export function getFacilitatorBySlug(slug: string): FacilitatorEntry | null {
    return ALL_FACILITATORS[slug];
}

export const ALL_WORKSHOPS = {
    '2025': processWorkshops(data2025 as unknown as RawWorkshop[], '2025'),
    '2026': processWorkshops(data2026 as unknown as RawWorkshop[], '2026'),
}

const ALL_FACILITATORS = getAllFacilitators();

export const ALL_SCHEDULES: Record<string, ScheduleEvent[]> = {
    '2025': schedule2025 as ScheduleEvent[],
    '2026': schedule2026 as ScheduleEvent[],
}
