import { motion } from 'framer-motion'
import React from 'react'
import { BsEmojiWink, BsEmojiFrown} from 'react-icons/bs'

const AlertMessages= ({type}: any) => {
  return (
    <motion.div 
    initial = {{translateX : 200, opacity: 0}}
    animate = {{translateX : 0, opacity: 1}}
    exit = {{translateX: 200, opacity: 0}}
    key = {type}
    className={`fixed top-12 right-12 p-4 rounded-md flex backdrop-blur-md items-center justify-center text-gray-500  shadow-md ${ type === "success" && "bg-green-400"} ${type === "danger" && "bg-red-500"}`}>{type === "success" && (
        <div className='items-center flex gap-4 justify-center'>
        <i className='text-3xl text-white'>
            <BsEmojiWink />
            </i>
        <p className='text-xl font-semibold text-primary'>Data is saved</p>
        </div>
        

    )}
    {type === "danger" && (
        <div className='items-center flex gap-4 justify-center'>
        <i className='text-3xl text-white'>
            <BsEmojiFrown />
            </i>
        <p className='text-xl font-semibold text-primary'>Something went wrong with your input information, please try again later.</p>
        </div>
        

    )}
    </motion.div>
  )
}

export default AlertMessages