import React from 'react'
import { DIVISIONS } from './common/constants'

export default function Divisions() {
  return (
    <div>
      <div className='grid grid-cols-4 gap-10'>
        <p className='text-1xl text-orange-400'>Підрозділи</p>
        {DIVISIONS.map((division) => (
          <div key={division.id} className='bg-[#1c1c1c] p-10 text-white'>
            <div className='flex items-center justify-center bg-[#D9D9D933]  w-[100px] h-[100px]' >
                <p className='font-bold text-[rgba(0,0,0,0.2)]'>{`ЛОГО`}</p></div>
            <div className='grid gap-3 mt-4'>
              <h3 className='text-2xl font-bold'>{division.name}</h3>
              <p className='text-sm'>{division.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}