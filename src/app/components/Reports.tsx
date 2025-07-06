import React from 'react'
import { REPORTS } from './common/constants'
import ImportantFoundries from './ImportantFoundries'

export default function Reports() {
    return (
        <div className='text-white'>
            <div className='grid grid-cols-3'>
                <p className='text-1xl text-orange-400 col-span-1'>Звіти</p>
                <div className='col-span-2'>
                    <p className='text-6xl font-bold break-normal leading-[82px]'>
                        {`ПРОЗОРІ ЗВІТИ — НАША`} <br />
                        <span className='text-orange-400'>{`ВІДПОВІДАЛЬНІСТЬ`}</span> 
                    </p>
                </div>
            </div>

            <ImportantFoundries data={REPORTS} />
        </div>
    )
}

