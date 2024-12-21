import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

interface HeaderProps {
    onRegisterClick: () => void
    onLoginClick: () => void
    user: { role: 'admin' | 'customer' } | null
    onLogout: () => void
}

export default function Header({ onRegisterClick, onLoginClick, user, onLogout }: HeaderProps) {
    return (
        <header className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-white">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Event Management System
                    </motion.span>
                </Link>
                <nav>
                    {user?.role === 'admin' && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, staggerChildren: 0.1 }}
                            className="space-x-4"
                        >
                            <Link href="/admin/register" className="text-white hover:text-pink-200 transition-colors">Register Admin</Link>
                            <Link href="/admin/category" className="text-white hover:text-pink-200 transition-colors">Add Category</Link>
                            <Link href="/admin/categories" className="text-white hover:text-pink-200 transition-colors">All Categories</Link>
                            <Link href="/admin/event" className="text-white hover:text-pink-200 transition-colors">Add Event</Link>
                            <Link href="/admin/events" className="text-white hover:text-pink-200 transition-colors">All Events</Link>
                            <Link href="/admin/bookings" className="text-white hover:text-pink-200 transition-colors">Event Bookings</Link>
                            <Link href="/admin/customers" className="text-white hover:text-pink-200 transition-colors">View Customers</Link>
                        </motion.div>
                    )}
                    {user?.role === 'customer' && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link href="/customer/bookings" className="text-white hover:text-pink-200 transition-colors mr-4">Event Bookings</Link>
                        </motion.div>
                    )}
                    {user ? (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white">Logout</Button>
                        </motion.div>
                    ) : (
                        <>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block mr-2">
                                <Button onClick={onRegisterClick} className="bg-purple-500 hover:bg-purple-600 text-white">Register Customer</Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                                <Button onClick={onLoginClick} className="bg-pink-500 hover:bg-pink-600 text-white">Login</Button>
                            </motion.div>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

