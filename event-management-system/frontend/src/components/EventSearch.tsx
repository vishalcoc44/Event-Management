import { useState } from 'react'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { motion } from 'framer-motion'

export default function EventSearch() {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')

    return (
        <motion.div
            className="mb-8 p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 bg-white bg-opacity-50 border-none placeholder-gray-500 text-gray-800"
            />
            <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-white bg-opacity-50 border-none text-gray-800">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {/* Add more categories dynamically */}
                </SelectContent>
            </Select>
        </motion.div>
    )
}

