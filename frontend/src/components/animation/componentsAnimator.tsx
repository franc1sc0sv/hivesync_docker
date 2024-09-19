import { AnimatePresence, motion } from "framer-motion";

interface AnimatorProps {
    children: React.ReactNode
}

export const ComponentsAnimator: React.FC<AnimatorProps> = ({ children }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}