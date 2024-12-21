'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterAdmin() {
    const { register } = useAuth()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contactNumber: '',
        city: '',
        pincode: '',
        street: '',
    })
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            await register({ ...formData, role: 'admin' })
            alert('Admin registered successfully')
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Register Admin</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="firstName" placeholder="First Name" onChange={handleChange} required className="bg-white bg-opacity-50" />
                    <Input name="lastName" placeholder="Last Name" onChange={handleChange} required className="bg-white bg-opacity-50" />
                    <Input name="email" type="email" placeholder="Email" onChange={handleChange} required className="bg-white bg-opacity-50" />
                    <Input name="password" type="password" placeholder="Password" onChange={handleChange} required className="bg-white bg-opacity-50" />
                    <Input name="contactNumber" placeholder="Contact Number" onChange={handleChange} required className="bg-white bg-opacity-50" />
                    <Input name="city" placeholder="City" onChange={handleChange} required className="bg-white bg-opacity-50" />
                    <Input name="pincode" placeholder="Pincode" onChange={handleChange} required className="bg-white bg-opacity-50" />
                    <Input name="street" placeholder="Street" onChange={handleChange} required className="bg-white bg-opacity-50" />
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">Register Admin</Button>
                </form>
            </CardContent>
        </Card>
    )
}

