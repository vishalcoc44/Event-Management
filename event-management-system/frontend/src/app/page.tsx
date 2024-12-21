'use client'

import { useState } from 'react'
import Header from '../components/Header'
import EventSearch from '../components/EventSearch'
import EventList from '../components/EventList'
import Footer from '../components/Footer'
import AuthModal from '../components/AuthModal'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

export default function Home() {
    const { user, logout } = useAuth()
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [authType, setAuthType] = useState<'login' | 'register'>('login')

    const handleAuthClick = (type: 'login' | 'register') => {
        setAuthType(type)
        setShowAuthModal(true)
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
            <Header
                onRegisterClick={() => handleAuthClick('register')}
                onLoginClick={() => handleAuthClick('login')}
                user={user}
                onLogout={logout}
            />
            <motion.main
                className="flex-grow container mx-auto px-4 py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <EventSearch />
                <EventList />
            </motion.main>
            <Footer />
            {showAuthModal && (
                <AuthModal
                    type={authType}
                    onClose={() => setShowAuthModal(false)}
                />
            )}
        </div>
    )
}