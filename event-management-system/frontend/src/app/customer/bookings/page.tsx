'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useBookings } from '@/contexts/BookingContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

export default function CustomerBookings() {
    const { user } = useAuth();
    const { getCustomerBookings } = useBookings();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            if (user) {
                try {
                    const fetchedBookings = getCustomerBookings(user.id)
                    setBookings(fetchedBookings)
                } catch (err) {
                    setError("Failed to fetch bookings.")
                    console.error("Error fetching bookings:", err)
                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }

        fetchBookings()
    }, [user, getCustomerBookings])


    if (loading) {
        return <p className="text-white text-center">Loading bookings...</p>
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>
    }

    if (!user) {
        return <p className="text-white text-center">Please log in to view your bookings.</p>;
    }

    // TEST: Directly render some dummy data to bypass context issues
    const testBookings = [
        { id: "test1", eventTitle: "Test Event 1", numberOfTickets: 2, totalPrice: 20, bookingDate: "2024-04-25" },
        { id: "test2", eventTitle: "Test Event 2", numberOfTickets: 1, totalPrice: 10, bookingDate: "2024-04-26" },
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-black">My Bookings</h1>
            {/* Conditional rendering based on whether you want test data or real data */}
            {bookings.length > 0 ? ( // Use real data if available
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookings.map((booking) => (
                        <Card key={booking.id} className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-black">
                            <CardHeader>
                                <CardTitle>{booking.eventTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Tickets: {booking.numberOfTickets}</p>
                                <p>Total Price: ${booking.totalPrice}</p>
                                <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : testBookings.length > 0 ? ( // Fallback to test data if real data is empty
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {testBookings.map((booking) => (
                        <Card key={booking.id} className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-black">
                            <CardHeader>
                                <CardTitle>{booking.eventTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Tickets: {booking.numberOfTickets}</p>
                                <p>Total Price: ${booking.totalPrice}</p>
                                <p>Booking Date: {booking.bookingDate}</p> {/* No toLocaleDateString on test data */}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-white text-center">No bookings found.</p>
            )}
        </div>
    );
}