import React, { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'

const FilterButtons = ({filterData, flag}: any) => {
    const [filter, setFilter] = useState(null)
    const [filterMenu, setFilterMenu] = useState(false)


  return (
    <div className='border border-gray-300 px-4 py-1 top-3 rounded-md relative cursor-pointer hover:border-gray-400'>
           <p className='text-base tracking-wide text-textColor flex items-center gap-2'> {!filterMenu  && flag}
           <i className='text-base text-textColor duration-150 transition-all ease-in-out'><IoChevronDown /></i>
            </p>
    </div>
  )
}

export default FilterButtons