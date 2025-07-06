import React from 'react'
import { FOUNDRIES } from './common/constants'
import FoundriesCard from './ui/FoundriesCard'


export default function ImportantFoundries({ data }: { data: typeof FOUNDRIES }) {
  return (
    <div className='grid gap-10'>
      <p className='text-1xl text-orange-400'>Важливі збори</p>
      <div className="grid grid-rows-1 grid-cols-6 gap-6">

        {data.map((data, index) => (
          <FoundriesCard key={index} {...data} />
        ))}

      </div>
    </div>
  )
}
