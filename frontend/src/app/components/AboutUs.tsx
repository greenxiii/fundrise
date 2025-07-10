import React from 'react'
import { Button } from './ui/Button'

export const ABOUT_US_CONTENT = {
    section: 'Трошки про нас',
    header: {
        title: `2 МЕХ.БАТАЛЬЙОН`,
        subtitle: 'ВИНИК ЯК ДОБРОВОЛЬЧИЙ ПІДРОЗДІЛ',
    },
    descriptionBlocks: [
        {
            value: 'Пару фактів про вас.Бійці «2-го Механізованого Батальйону» обороняли Харківщину та одні зперших вийшли на кордоніз РФ під час контрнаступу вересні 2022-го',
        },
        {
            value: 'Пару фактів про вас.Бійці «2-го Механізованого Батальйону» обороняли Харківщину та одні зперших вийшли на кордоніз РФ під час контрнаступу вересні 2022-го',
        },
        {
            value: 'Пару фактів про вас.Бійці «2-го Механізованого Батальйону» обороняли Харківщину та одні зперших вийшли на кордоніз РФ під час контрнаступу вересні 2022-го',
        }
    ],
    button: 'Дізнатись більше',
}

export default function AboutUs() {
    return (
        <div>
            <p className='text-1xl text-orange-400'>{ABOUT_US_CONTENT.section}</p>
            <div className='relative mt-10'>
                <span className='text-7xl text-4xl font-bold text-white'>
                    <p>{ABOUT_US_CONTENT.header.title}</p>
                    <p>{ABOUT_US_CONTENT.header.subtitle}</p>
                    <Button variant='outline' className='absolute right-0 bottom-0'>{ABOUT_US_CONTENT.button}</Button>
                </span>
               
            </div>
            <div className='grid grid-cols-3 gap-10'>
                {ABOUT_US_CONTENT.descriptionBlocks.map((block, index) => (
                    <div key={index} className='p-10 bg-[#1c1c1c] mt-10 break-words text-sm'>
                        <p className='text-white text-1xl '>
                            {block.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
