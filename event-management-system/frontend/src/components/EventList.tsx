'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { useEvents } from '@/contexts/EventContext'
import { useAuth } from '@/contexts/AuthContext'
import { useBookings } from '@/contexts/BookingContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Input } from './ui/input'
import { useToast } from '@/components/ui/use-toast'

interface Event {
    id: string;
    title: string;
    description: string;
    category: string;
    venueName: string;
    location: string;
    numberOfTickets: number;
    ticketPrice: number;
    startTime: string; // or Date if your data uses Date objects
    endTime: string; // or Date
}


export default function EventList() {
    const { events, updateEvent } = useEvents()
    const { user } = useAuth()
    const { addBooking } = useBookings()
    const { toast } = useToast()
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [ticketQuantity, setTicketQuantity] = useState(1)

    const handleBuyTicket = (event: Event) => {
        setSelectedEvent(event)
        setTicketQuantity(1)
    }

    const handleConfirmPurchase = async () => {
        if (selectedEvent && user) {
            const totalPrice = selectedEvent.ticketPrice * ticketQuantity
            const updatedEvent = {
                ...selectedEvent,
                numberOfTickets: selectedEvent.numberOfTickets - ticketQuantity
            }

            await updateEvent(selectedEvent.id, updatedEvent)
            await addBooking({
                eventId: selectedEvent.id,
                eventTitle: selectedEvent.title,
                customerId: user.id,
                customerName: `${user.firstName} ${user.lastName}`, // Template literal for customer name
                customerEmail: user.email, // Email property
                numberOfTickets: ticketQuantity, // Ticket quantity
                totalPrice: totalPrice, // Total price
            })


            setSelectedEvent(null);
            toast({
                title: "Purchase Successful",
                description: `You have successfully purchased ${ticketQuantity} ticket(s) for ${selectedEvent?.title}.`, // Use backticks for template literals
            });

        }
    }

    return (
        <>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
                {events.length === 0 ? (
                    <p className="text-white col-span-3 text-center">No events available.</p>
                ) : (
                    events.map((event) => (
                        <motion.div
                            key={event.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Card className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-white overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500">
                                    <CardTitle>{event.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 space-y-2">
                                    <p>{event.description}</p>
                                    <p><span className="font-semibold">Category:</span> {event.category}</p>
                                    <p><span className="font-semibold">Venue:</span> {event.venueName}</p>
                                    <p><span className="font-semibold">Location:</span> {event.location}</p>
                                    <p><span className="font-semibold">Available Tickets:</span> {event.numberOfTickets}</p>
                                    <p><span className="font-semibold">Price:</span> ${event.ticketPrice}</p>
                                    <p><span className="font-semibold">Date:</span> {new Date(event.startTime).toLocaleDateString()}</p>
                                    <p><span className="font-semibold">Time:</span> {new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}</p>
                                </CardContent>
                                {user && user.role === 'customer' && (
                                    <CardFooter>
                                        <Button
                                            onClick={() => handleBuyTicket(event)}
                                            disabled={event.numberOfTickets === 0}
                                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                        >
                                            {event.numberOfTickets > 0 ? 'Buy Ticket' : 'Sold Out'}
                                        </Button>
                                    </CardFooter>
                                )}
                            </Card>
                        </motion.div>
                    ))
                )}
            </motion.div>

            <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
                <DialogContent className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-800">Purchase Tickets</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-gray-700">Event: {selectedEvent?.title}</p>
                        <p className="text-gray-700">Price per ticket: ${selectedEvent?.ticketPrice}</p>
                        <Input
                            type="number"
                            min="1"
                            max={selectedEvent?.numberOfTickets}
                            value={ticketQuantity}
                            onChange={(e) => setTicketQuantity(parseInt(e.target.value))}
                            className="bg-white bg-opacity-50 border-none placeholder-gray-500 text-gray-800"
                        />
                        <p className="text-gray-700">Total Price: ${selectedEvent ? selectedEvent.ticketPrice * ticketQuantity : 0}</p>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleConfirmPurchase} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Confirm Purchase</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}