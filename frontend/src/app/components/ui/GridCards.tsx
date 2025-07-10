import React from 'react'
import { IMPORTANT_FOUNDRIES_CONTENT } from '../ImportantFoundries'
import FoundriesCard from './FoundriesCard'
import foundriesImage from '@/assets/block.webp'

export const FOUNDRIES = [
    {
      title: 'Назва Збору',
      description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
      button: 'Задонатити',
      image: foundriesImage,
      variant: 'horizontal',
      size: 'medium',
    },
    {
      title: 'Назва Збору',
      description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
      button: 'Задонатити',
      image: foundriesImage,
      variant: 'horizontal',
      size: 'medium',
    },
    {
      title: 'Назва Збору',
      description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
      button: 'Задонатити',
      image: foundriesImage,
      variant: 'vertical',
      size: 'small',
    },
    {
      title: 'Назва Збору',
      description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
      button: 'Задонатити',
      image: foundriesImage,
      variant: 'vertical',
      size: 'small',
    },
    {
      title: 'Назва Збору',
      description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
      button: 'Задонатити',
      image: foundriesImage,
      variant: 'vertical',
      size: 'small',
  
    },
  ]

export default function GridCards() {
  return (
    <div className="grid grid-rows-1 grid-cols-6 gap-6">
        {IMPORTANT_FOUNDRIES_CONTENT.foundries.map((data, index) => (
          <FoundriesCard key={index} {...data} />
        ))}
      </div>
  )
}
