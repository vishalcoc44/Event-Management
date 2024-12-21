'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useAuth } from '@/contexts/AuthContext'

interface AuthModalProps {
    type: 'login' | 'register'
    onClose: () => void
}

export default function AuthModal({ type, onClose }: AuthModalProps) {
    const { login, register } = useAuth()
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
        if (type === 'login') {
            const success = await login(formData.email, formData.password)
            if (success) {
                onClose()
            } else {
                setError('Invalid email or password')
            }
        } else {
            try {
                const success = await register({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    role: 'customer'
                })
                if (success) {
                    alert('Registration successful. Please log in.')
                    onClose()
                } else {
                    setError('Registration failed. Please try again.')
                }
            } catch (error: any) {
                setError(error.message)
            }
        }
    }

    return (
        <AnimatePresence>
            <Dialog open={true} onOpenChange={onClose}>
                <DialogContent className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-800">
                            {type === 'login' ? 'Login' : 'Register Customer'}
                        </DialogTitle>
                    </DialogHeader>
                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {type === 'register' && (
                            <>
                                <Input name="firstName" placeholder="First Name" onChange={handleChange} required className="bg-white bg-opacity-50" />
                                <Input name="lastName" placeholder="Last Name" onChange={handleChange} required className="bg-white bg-opacity-50" />
                                <Input name="contactNumber" placeholder="Contact Number" onChange={handleChange} required className="bg-white bg-opacity-50" />
                                <Input name="city" placeholder="City" onChange={handleChange} required className="bg-white bg-opacity-50" />
                                <Input name="pincode" placeholder="Pincode" onChange={handleChange} required className="bg-white bg-opacity-50" />
                                <Input name="street" placeholder="Street" onChange={handleChange} required className="bg-white bg-opacity-50" />
                            </>
                        )}
                        <Input name="email" type="email" placeholder="Email" onChange={handleChange} required className="bg-white bg-opacity-50" />
                        <Input name="password" type="password" placeholder="Password" onChange={handleChange} required className="bg-white bg-opacity-50" />
                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                {type === 'login' ? 'Login' : 'Register'}
                            </Button>
                        </motion.div>
                    </motion.form>
                </DialogContent>
            </Dialog>
        </AnimatePresence>
    )
}

