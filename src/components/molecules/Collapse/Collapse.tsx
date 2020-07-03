import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'

interface Props {
  isOpen?: boolean
  maxHeight?: number
}

const duration = 0.8

export const Collapse: FC<Props> = ({ children, isOpen = false }) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.section
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration, ease: [0.04, 0.62, 0.23, 0.98] }}>
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  )
}
