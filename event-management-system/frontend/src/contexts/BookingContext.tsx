'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Booking = {
  id: string
  eventId: string
  eventTitle: string
  customerId: string
  customerName: string
  customerEmail: string
  numberOfTickets: number
  totalPrice: number
  bookingDate: string
}

type BookingContextType = {
  bookings: Booking[]
  addBooking: (bookingData: Omit<Booking, 'id' | 'bookingDate'>) => Promise<void>
  getCustomerBookings: (customerId: string) => Booking[]
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings')
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings))
  }, [bookings]);

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'bookingDate'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      bookingDate: new Date().toISOString()
    }
    setBookings(prevBookings => [...prevBookings, newBooking])
  }

  const getCustomerBookings = (customerId: string) => {
    return bookings.filter(booking => booking.customerId === customerId)
  }

  return (
      <BookingContext.Provider value={{ bookings, addBooking, getCustomerBookings, setBookings }}>
        {children}
      </BookingContext.Provider>
  )
}

export const useBookings = () => {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider')
  }
  return context
}