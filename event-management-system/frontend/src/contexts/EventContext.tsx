'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Event = {
    id: string
    title: string
    description: string
    category: string
    venueName: string
    venueType: string
    location: string
    numberOfTickets: number
    ticketPrice: number
    startTime: string
    endTime: string
    imageUrl: string
}

type EventContextType = {
    events: Event[]
    addEvent: (eventData: Omit<Event, 'id' | 'imageUrl'>) => Promise<void>
    updateEvent: (id: string, eventData: Partial<Event>) => Promise<void>
    deleteEvent: (id: string) => Promise<void>
}

const EventContext = createContext<EventContextType | undefined>(undefined)

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        const storedEvents = localStorage.getItem('events')
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents))
        }
    }, [])

    const addEvent = async (eventData: Omit<Event, 'id' | 'imageUrl'>) => {
        const newEvent: Event = {
            ...eventData,
            id: Date.now().toString(),
            imageUrl: '/placeholder.svg'
        }
        const updatedEvents = [...events, newEvent]
        setEvents(updatedEvents)
        localStorage.setItem('events', JSON.stringify(updatedEvents))
    }

    const updateEvent = async (id: string, eventData: Partial<Event>) => {
        const updatedEvents = events.map(event =>
            event.id === id ? { ...event, ...eventData } : event
        )
        setEvents(updatedEvents)
        localStorage.setItem('events', JSON.stringify(updatedEvents))
    }

    const deleteEvent = async (id: string) => {
        const updatedEvents = events.filter(event => event.id !== id)
        setEvents(updatedEvents)
        localStorage.setItem('events', JSON.stringify(updatedEvents))
    }

    return (
        <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    )
}

export const useEvents = () => {
    const context = useContext(EventContext)
    if (context === undefined) {
        throw new Error('useEvents must be used within an EventProvider')
    }
    return context
}

