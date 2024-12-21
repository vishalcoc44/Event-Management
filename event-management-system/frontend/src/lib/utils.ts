import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// In src/lib/utils.js or utils.ts (depending on your setup)
export const formatDate = (date: Date) => {
    // Your implementation of formatting the date
    return new Date(date).toLocaleDateString();
};


