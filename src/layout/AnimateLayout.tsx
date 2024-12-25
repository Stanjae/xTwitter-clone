import { motion } from "motion/react"

const variants = {
    hidden: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  
}
const AnimateLayout = ({children}:any) => {
    
  return (
    <motion.div variants={variants} initial="hidden" animate={'animate'} exit={'exit'} 
    transition={{ duration: 0.3 }}>
        {children}
    </motion.div>
  )
}

export default AnimateLayout