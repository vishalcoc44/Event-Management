'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCategories } from '@/contexts/CategoryContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AddCategory() {
    const { addCategory } = useCategories()
    const [category, setCategory] = useState({ title: '', description: '' })
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            await addCategory(category)
            setCategory({ title: '', description: '' })
            alert('Category added successfully')
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Add Category</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Category Title"
                        value={category.title}
                        onChange={(e) => setCategory({ ...category, title: e.target.value })}
                        required
                        className="bg-white bg-opacity-50"
                    />
                    <Input
                        placeholder="Category Description"
                        value={category.description}
                        onChange={(e) => setCategory({ ...category, description: e.target.value })}
                        required
                        className="bg-white bg-opacity-50"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">Add Event Category</Button>
                </form>
            </CardContent>
        </Card>
    )
}

