'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Category = {
  id: string
  title: string
  description: string
}

type CategoryContextType = {
  categories: Category[]
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>
  updateCategory: (id: string, category: Omit<Category, 'id'>) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    // Fetch categories from API
    // For now, we'll use mock data
    setCategories([
      { id: '1', title: 'Music', description: 'Music events and concerts' },
      { id: '2', title: 'Sports', description: 'Sporting events and tournaments' },
    ])
  }, [])

  const addCategory = async (category: Omit<Category, 'id'>) => {
    // In a real app, you would call an API here
    const newCategory = { ...category, id: Date.now().toString() }
    setCategories([...categories, newCategory])
  }

  const updateCategory = async (id: string, updatedCategory: Omit<Category, 'id'>) => {
    // In a real app, you would call an API here
    setCategories(categories.map(cat => cat.id === id ? { ...cat, ...updatedCategory } : cat))
  }

  const deleteCategory = async (id: string) => {
    // In a real app, you would call an API here
    setCategories(categories.filter(cat => cat.id !== id))
  }

  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategories = () => {
  const context = useContext(CategoryContext)
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider')
  }
  return context
}

