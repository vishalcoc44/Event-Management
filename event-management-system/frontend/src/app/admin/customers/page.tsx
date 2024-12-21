'use client'

import { useState, useEffect } from 'react'
import { useCustomers } from '@/contexts/CustomerContext'
import { useBookings } from '@/contexts/BookingContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function ViewCustomers() {
    const { customers } = useCustomers()
    const { bookings } = useBookings()
    const [customerBookings, setCustomerBookings] = useState<Record<string, typeof bookings>>({})

    useEffect(() => {
        const bookingsByCustomer = customers.reduce((acc, customer) => {
            acc[customer.id] = bookings.filter(booking => booking.customerId === customer.id)
            return acc
        }, {} as Record<string, typeof bookings>)
        setCustomerBookings(bookingsByCustomer)
    }, [customers, bookings])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-white">View Customers</h1>
            <div className="space-y-4">
                {customers.map((customer) => (
                    <Card key={customer.id} className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-white">
                        <CardHeader>
                            <CardTitle>{customer.firstName} {customer.lastName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Email: {customer.email}</p>
                            <p>Contact: {customer.contactNumber}</p>
                            <p>City: {customer.city}</p>
                            <Accordion type="single" collapsible className="mt-4">
                                <AccordionItem value="bookings">
                                    <AccordionTrigger>Bookings</AccordionTrigger>
                                    <AccordionContent>
                                        {customerBookings[customer.id]?.length > 0 ? (
                                            customerBookings[customer.id].map((booking) => (
                                                <div key={booking.id} className="mb-2 p-2 bg-white bg-opacity-10 rounded">
                                                    <p>Event: {booking.eventTitle}</p>
                                                    <p>Tickets: {booking.numberOfTickets}</p>
                                                    <p>Total Price: ${booking.totalPrice}</p>
                                                    <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No bookings for this customer.</p>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

