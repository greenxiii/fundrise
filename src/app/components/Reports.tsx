import React from 'react'
import GridCards from './ui/GridCards'

export const REPORTS_CONTENT = {
    section: 'Звіти',
    title: 'ПРОЗОРІ ЗВІТИ — НАША ВІДПОВІДАЛЬНІСТЬ',
}

export default function Reports() {
    return (
        <div className='grid gap-10 text-white'>
            <div className='grid gap-10 grid-cols-3'>
                <p className='text-1xl text-orange-400 col-span-1'>{REPORTS_CONTENT.section}</p>
                <div className='col-span-2'>
                    <p className='text-6xl font-bold break-normal leading-[82px]'>
                        {REPORTS_CONTENT.title} <br />
                        <span className='text-orange-400'>{`ВІДПОВІДАЛЬНІСТЬ`}</span> 
                    </p>
                </div>
            </div>

            <GridCards />
        </div>
    )
}

