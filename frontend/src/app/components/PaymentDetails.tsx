import React from 'react'
import { Button } from './ui/Button'
import CollapseBlock from './ui/CollapseBlock'

export const PAYMENT_CONTENT = [
    {
        title: 'Реквізити Фонду UAH',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
    },
    {
        title: 'Реквізити Фонду EUR',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
    },
    {
        title: 'Реквізити Фонду USD',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
    },
    {
        title: 'Реквізити Фонду PAYPAL',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
    },
    {
        title: 'Реквізити Crypto',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
    }
]

export const PAYMENT_OPTIONS_CONTENT = {
    section: 'Благодійний фонд',
    title: 'Фонд забезпечує дрони, техніку, екіпірування підтримуємо тих, хто тримає небо і землю.',
    button: 'Дізнатись більше',
    content: PAYMENT_CONTENT,
}

export default function PaymentOptions() {
    return (
        <div>
            <div className='grid grid-cols-3'>
                <p className='text-1xl text-orange-400 col-span-1'>{PAYMENT_OPTIONS_CONTENT.section}</p>
                <div className='col-span-2'>
                    <p className='text-white text-6xl font-bold'>{PAYMENT_OPTIONS_CONTENT.title}</p>
                    <Button variant="outline" className="self-start mt-12">{PAYMENT_OPTIONS_CONTENT.button}</Button>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-6 mt-22'>
                {PAYMENT_OPTIONS_CONTENT.content.map((option, index) => (
                    <CollapseBlock key={index} title={option.title} content={option.content} />
                ))}
            </div>
        </div>
      )
}
