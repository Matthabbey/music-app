import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'

const FilterButtons = ({filterData, flag}: any) => {
    const [filterName, setFilterName] = useState<any>(null)
    const [filterMenu, setFilterMenu] = useState(false)
    const [{artistFilter, albumFilter, filterTerm, languageFilter}, dispatch]: any = useStateValue()

    const handleUpdateFilterButton =(name: any) =>{
        setFilterMenu(false)
        setFilterName(name)

        if(flag === "Artist"){
            dispatch({type: actionType.SET_ALL_ARTISTFILTER, artistFilter: name})
        }
        if(flag === "Album"){
            dispatch({type: actionType.SET_ALL_ALBUMFILTER, albumFilter: name})
        }
        if(flag === "Language"){
            dispatch({type: actionType.SET_ALL_LANGUAGEFILTER, languageFilter: name})
        }
        if(flag === "Categories"){
            dispatch({type: actionType.SET_ALL_FILTERTERM, filterTerm : name})
        }
    }


  return (
    <div className='border border-gray-300 px-4 py-1 top-1 rounded-md relative cursor-pointer hover:border-gray-400'>
           <p className='text-base tracking-wide text-textColor flex items-center gap-2' onClick={()=>setFilterMenu(!filterMenu)}> {!filterName  && flag }
            {filterName && ( <> {filterName.length > 15 ? `${filterName.slice(0, 14)}...` : filterName}</> )}
           <IoChevronDown className={`text-base text-textColor duration-150 transition-all ease-in-out ${filterMenu ? "rotate-180" : "rotate-0"}` }/>
            </p>
            {filterData && filterMenu && (
            <motion.div 
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 50}}
            className='w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-1'>
                {filterData?.map((data: any)=>(
                    <div key={data.name} 
                    className="flex items-center gap-2 py-1 px-4 hover:bg-gray-200" onClick={()=>handleUpdateFilterButton(data.name)}>
                        {(flag === "Artists" || flag === "Album") && (
                            <img src={data.imageURL} alt="" />
                        )}
                        <p className='w-full'>{data.name.length > 15 ? `${data.name.slice(0, 15)}`: data.name}</p>
                        
                    </div>
                ))}

            </motion.div>
            )}

    </div>
  )
}

export default FilterButtons