import React from 'react'
import { IoChevronDown } from 'react-icons/io5'

const FilterButtons = ({filterData, flag}: any) => {
  return (
    <div className='border border-gray-300 px-4 py-1 top-3 rounded-md relative cursor-pointer hover:border-gray-400'>
           <p className='text-base tracking-wide text-textColor flex items-center gap-2'> {flag}
           <i className='text-base'><IoChevronDown /></i>
            </p>
    </div>
  )
}

export default FilterButtons