import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <motion.footer
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 mt-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto text-center">
                <motion.h2
                    className="text-2xl font-bold mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    About Us
                </motion.h2>
                <motion.p
                    className="mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    We are dedicated to bringing you the best events in town, creating unforgettable experiences for all.
                </motion.p>
                <motion.h2
                    className="text-2xl font-bold mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Contact Us
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <p>Email: contact@eventmanagement.com</p>
                    <p>Phone: (123) 456-7890</p>
                </motion.div>
            </div>
        </motion.footer>
    )
}

