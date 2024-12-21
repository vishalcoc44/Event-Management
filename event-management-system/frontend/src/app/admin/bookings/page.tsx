'use client'

import { useBookings } from '@/contexts/BookingContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function EventBookings() {
    const { bookings } = useBookings()
    const [expandedBookings, setExpandedBookings] = useState<string[]>([])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const bookingVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    }

    const expandVariants = {
        hidden: { height: 0, opacity: 0 },
        visible: { height: "auto", opacity: 1, transition: { duration: 0.3 } }
    }

    // Toggle booking expanded state
    const toggleBooking = (id: string) => {
        setExpandedBookings((prevState) =>
            prevState.includes(id)
                ? prevState.filter((bookingId) => bookingId !== id)
                : [...prevState, id]
        )
    }

    return (
        <motion.div
            className="container mx-auto px-4 py-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1
                className="text-4xl font-bold text-white mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                Event Bookings
            </motion.h1>
            <AnimatePresence>
                {bookings.map((booking) => (
                    <motion.div key={booking.id} variants={bookingVariants}>
                        <Card className="mb-4 overflow-hidden bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border-none">
                            <CardHeader
                                className="bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer"
                                onClick={() => toggleBooking(booking.id)}
                            >
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-xl font-bold text-white">
                                        {booking.eventTitle}
                                    </CardTitle>
                                    {expandedBookings.includes(booking.id) ? (
                                        <ChevronUp className="text-black" />
                                    ) : (
                                        <ChevronDown className="text-white" />
                                    )}
                                </div>
                            </CardHeader>
                            <AnimatePresence>
                                {expandedBookings.includes(booking.id) && (
                                    <motion.div
                                        variants={expandVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                    >
                                        <CardContent className="pt-4">
                                            <motion.p className="text-black mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                                                <span className="font-semibold">Customer:</span> {booking.customerName}
                                            </motion.p>
                                            <motion.p className="text-black mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                                <span className="font-semibold">Email:</span> {booking.customerEmail}
                                            </motion.p>
                                            <motion.p className="text-black mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                                <span className="font-semibold">Tickets:</span> {booking.numberOfTickets}
                                            </motion.p>
                                            <motion.p className="text-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                                <span className="font-semibold">Total Price:</span> ${booking.totalPrice}
                                            </motion.p>
                                        </CardContent>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    )
}
