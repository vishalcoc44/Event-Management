'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type User = {
    id: string
    role: 'admin' | 'customer'
    email: string
    firstName: string
    lastName: string
}

type AuthContextType = {
    user: User | null
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [users, setUsers] = useState<(User & { password: string })[]>([
        { id: '1', role: 'admin', email: 'admin@example.com', password: 'password', firstName: 'Admin', lastName: 'User' },
        { id: '2', role: 'customer', email: 'customer@example.com', password: 'password', firstName: 'Test', lastName: 'User' }
    ])

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = async (email: string, password: string) => {
        const foundUser = users.find(u => u.email === email && u.password === password)
        if (foundUser) {
            const { password, ...userWithoutPassword } = foundUser
            setUser(userWithoutPassword)
            localStorage.setItem('user', JSON.stringify(userWithoutPassword))
            return true
        }
        return false
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const register = async (userData: Omit<User, 'id'> & { password: string }) => {
        const newUser = { ...userData, id: Date.now().toString() }
        setUsers([...users, newUser])
        return true
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}