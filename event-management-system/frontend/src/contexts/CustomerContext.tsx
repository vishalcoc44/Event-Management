'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Customer = {
    id: string
    firstName: string
    lastName: string
    email: string
    contactNumber: string
    city: string
}

type CustomerContextType = {
    customers: Customer[]
    addCustomer: (customer: Omit<Customer, 'id'>) => Promise<void>
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [customers, setCustomers] = useState<Customer[]>([])

    useEffect(() => {
        // Fetch customers from API
        // For now, we'll use mock data
        setCustomers([
            {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                contactNumber: '1234567890',
                city: 'New York'
            },
        ])
    }, [])

    const addCustomer = async (customer: Omit<Customer, 'id'>) => {
        // In a real app, you would call an API here
        const newCustomer = { ...customer, id: Date.now().toString() }
        setCustomers([...customers, newCustomer])
    }

    return (
        <CustomerContext.Provider value={{ customers, addCustomer }}>
            {children}
        </CustomerContext.Provider>
    )
}

export const useCustomers = () => {
    const context = useContext(CustomerContext)
    if (context === undefined) {
        throw new Error('useCustomers must be used within a CustomerProvider')
    }
    return context
}

