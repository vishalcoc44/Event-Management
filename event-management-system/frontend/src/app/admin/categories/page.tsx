'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCategories } from '@/contexts/CategoryContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AllCategories() {
    const { categories, deleteCategory, updateCategory } = useCategories()
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState({ title: '', description: '' })

    const handleEdit = (id: string, title: string, description: string) => {
        setEditingId(id)
        setEditForm({ title, description })
    }

    const handleUpdate = async (id: string) => {
        await updateCategory(id, editForm)
        setEditingId(null)
    }

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            await deleteCategory(id)
        }
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white mb-4">All Categories</h1>
            {categories.map((category) => (
                <Card key={category.id} className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
                    <CardContent className="p-4">
                        {editingId === category.id ? (
                            <div className="space-y-2">
                                <Input
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="bg-white bg-opacity-50"
                                />
                                <Input
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    className="bg-white bg-opacity-50"
                                />
                                <Button onClick={() => handleUpdate(category.id)} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Save</Button>
                                <Button onClick={() => setEditingId(null)} className="ml-2 bg-gray-500 text-white">Cancel</Button>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-bold text-white">{category.title}</h2>
                                <p className="text-gray-200">{category.description}</p>
                                <div className="mt-2">
                                    <Button onClick={() => handleEdit(category.id, category.title, category.description)} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Edit</Button>
                                    <Button onClick={() => handleDelete(category.id)} className="ml-2 bg-red-500 text-white">Delete</Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

