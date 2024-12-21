'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEvents } from '@/contexts/EventContext'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function AllEvents() {
    const { events, deleteEvent } = useEvents()
    const { toast } = useToast()
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        setDeletingId(id)
        try {
            await deleteEvent(id)
            toast({
                title: "Event Deleted",
                description: "The event has been successfully deleted.",
                variant: "default",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete the event. Please try again.",
                variant: "destructive",
            })
        } finally {
            setDeletingId(null)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
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
                All Events
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {events.map((event) => (
                        <motion.div key={event.id} variants={itemVariants} layout exit={{ opacity: 0, scale: 0.8 }}>
                            <Card className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500">
                                    <CardTitle className="text-xl font-bold text-white">{event.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 space-y-2">
                                    <p className="text-gray-200">{event.description}</p>
                                    <p className="text-gray-200"><span className="font-semibold">Category:</span> {event.category}</p>
                                    <p className="text-gray-200"><span className="font-semibold">Venue:</span> {event.venueName}</p>
                                    <p className="text-gray-200"><span className="font-semibold">Location:</span> {event.location}</p>
                                    <p className="text-gray-200"><span className="font-semibold">Tickets:</span> {event.numberOfTickets}</p>
                                    <p className="text-gray-200"><span className="font-semibold">Price:</span> ${event.ticketPrice}</p>
                                    <p className="text-gray-200"><span className="font-semibold">Date:</span> {new Date(event.startTime).toLocaleDateString()}</p>
                                    <p className="text-gray-200"><span className="font-semibold">Time:</span> {new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        onClick={() => handleDelete(event.id)}
                                        className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
                                        disabled={deletingId === event.id}
                                    >
                                        {deletingId === event.id ? (
                                            <motion.div
                                                className="w-5 h-5 border-t-2 border-white rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            />
                                        ) : (
                                            <>
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete Event
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

