import React from 'react'
import { DIVISIONS } from './common/constants'

export default function Divisions() {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-10'>
        <p className='text-sm md:text-base text-orange-400'>Підрозділи</p>
        {DIVISIONS.map((division) => (
          <div key={division.id} className='bg-[#1c1c1c] p-6 md:p-10 text-white'>
            <div className='flex items-center justify-center bg-[#D9D9D933]  w-[80px] h-[80px] md:w-[100px] md:h-[100px]' >
                <p className='font-bold text-[rgba(0,0,0,0.2)]'>{`ЛОГО`}</p></div>
            <div className='grid gap-3 mt-4'>
              <h3 className='text-xl md:text-2xl font-bold'>{division.name}</h3>
              <p className='text-sm md:text-base'>{division.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}