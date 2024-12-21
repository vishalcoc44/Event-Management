'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEvents } from '@/contexts/EventContext'
import { useCategories } from '@/contexts/CategoryContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function AddEvent() {
    const router = useRouter()
    const { addEvent } = useEvents()
    const { categories } = useCategories()
    const [event, setEvent] = useState({
        title: '',
        description: '',
        category: '',
        venueName: '',
        venueType: '',
        location: '',
        numberOfTickets: '',
        ticketPrice: '',
        startTime: '',
        endTime: '',
        image: null as File | null,
    })
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target
        if (name === 'image' && files) {
            setEvent({ ...event, image: files[0] })
        } else {
            setEvent({ ...event, [name]: value })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            await addEvent({
                ...event,
                numberOfTickets: parseInt(event.numberOfTickets),
                ticketPrice: parseFloat(event.ticketPrice),
            })
            alert('Event added successfully')
            router.push('/') // Redirect to home page after successful addition
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Add Event</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        name="title"
                        placeholder="Event Title"
                        value={event.title}
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-50"
                    />
                    <Input
                        name="description"
                        placeholder="Event Description"
                        value={event.description}
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-50"
                    />
                    <Select
                        value={event.category}
                        onValueChange={(value) => setEvent({ ...event, category: value })}
                    >
                        <SelectTrigger className="bg-white bg-opacity-50">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input
                        name="venueName"
                        placeholder="Venue Name"
                        value={event.venueName}
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-50"
                    />
                    <Input
                        name="venueType"
                        placeholder="Venue Type"
                        value={event.venueType}
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-50"
                    />
                    <Input
                        name="location"
                        placeholder="Location"
                        value={event.location}
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-50"
                    />
                    <Input
                        name="numberOfTickets"
                        type="number"
                        placeholder="Number of Tickets"
                        value={event.numberOfTickets}
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-50"
                    />
                    <Input
                        name="ticketPrice"
                        type="number"
                        step="0.01"
                        placeholder="Ticket Price"
                        value={event.ticketPrice}
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-50"
                    />
                    <Input
                        name="startTime"
                        type="datetime-local"
                        value={event.startTime}
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-50"
                    />
                    <Input
                        name="endTime"
                        type="datetime-local"
                        value={event.endTime}
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-50"
                    />
                    <Input
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="bg-white bg-opacity-50"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">Add Event</Button>
                </form>
            </CardContent>
        </Card>
    )
}

