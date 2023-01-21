import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'

const FilterButtons = ({filterData, flag}: any) => {
    const [filterName, setFilterName] = useState(null)
    const [filterMenu, setFilterMenu] = useState(false)


  return (
    <div className='border border-gray-300 px-4 py-1 top-3 rounded-md relative cursor-pointer hover:border-gray-400'>
           <p className='text-base tracking-wide text-textColor flex items-center gap-2' onClick={()=>setFilterMenu(!filterMenu)}> {!filterName  && flag }
           <IoChevronDown className={`text-base text-textColor duration-150 transition-all ease-in-out ${filterMenu ? "rotate-180" : "rotate-0"}` }/>
            </p>
            {filterData && filterMenu && (
            <motion.div className='w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-1'>
                {filterData?.map((data: string)=>(
                    <div key={data.name} 
                    className="flex items-center gap-2 py-1 px-4 hover:bg-gray-200">
                        {(flag === "Artists" || flag === "Album") && (
                            <img src="" alt="" />
                        )}
                        
                    </div>
                ))}

            </motion.div>
            )}

    </div>
  )
}

export default FilterButtons