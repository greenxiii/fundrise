import React from 'react'
import GridCards from './ui/GridCards'
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

export const IMPORTANT_FOUNDRIES_CONTENT = {
  section: 'Важливі збори',
  foundries: FOUNDRIES,
}

export default function ImportantFoundries() {
  return (
    <div className='grid gap-10'>
      <p className='text-1xl text-orange-400'>{IMPORTANT_FOUNDRIES_CONTENT.section}</p>
      <GridCards />
    </div>
  )
}
