import React from 'react'
import { PAYMENT_OPTIONS } from './common/constants'
import { Button } from './ui/Button'
import CollapseBlock from './ui/CollapseBlock'

export default function PaymentOptions() {
    return (
        <div>
            <div className='grid grid-cols-3'>
                <p className='text-1xl text-orange-400 col-span-1'>Благодійний фонд</p>
                <div className='col-span-2'>
                    <p className='text-white text-6xl font-bold'>Фонд забезпечує дрони, техніку, екіпірування підтримуємо тих, хто тримає небо і землю.</p>
                    <Button variant="outline" className="self-start mt-12">Дізнатись більше</Button>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-6 mt-22'>
                {PAYMENT_OPTIONS.map((option, index) => (
                    <CollapseBlock key={index} title={option.title} content={option.content} />
                ))}
            </div>
        </div>
      )
}
