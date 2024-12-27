import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'


const AccordionItem = ({ item, isOpen, onClick }) => (
  <div className="border border-gray-200 rounded-md overflow-hidden">
    <motion.button
      className="flex justify-between items-center w-full px-4 py-3 bg-white text-left"
      onClick={onClick}
      initial={false}
      animate={{ backgroundColor: isOpen ? 'rgb(243, 244, 246)' : 'rgb(255, 255, 255)' }}
    >
      <span className="font-medium">{item.title}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </motion.div>
    </motion.button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <div className="px-4 py-3 text-gray-700 bg-gray-50">
            {item.content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

 const Accordion = ({ items, className = "" }) => {
  const [openItem, setOpenItem] = useState(null)

  const handleItemClick = (index) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <div className={`w-full max-w-md mx-auto space-y-2 ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openItem === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  )
}

export default Accordion;
