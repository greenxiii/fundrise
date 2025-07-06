import React from 'react'
import Image from 'next/image'
import commanderImage from '@/assets/commander.webp'
import Commas from '@/assets/icons/Commas'

export default function Commander() {
  return (
    <div className='text-white'>
      <div className='grid grid-cols-3'>
        <p className='text-1xl text-orange-400 col-span-1'>Благодійний фонд</p>
        <div className='col-span-2'>
          <p className='text-6xl font-bold break-normal leading-[82px]'>
            <span className='text-orange-400'>{`ПОЛКОВНИК`}</span> <br/>
              {`ОЛЕКСАНДР "САЛІК" ВІННІКОВ`}
          </p>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-45 mt-22 items-stretch'>
        <div className='col-span-1'>
          <span className='  text-sm break-normal'>
            {`Був одним із очільників процесу впровадження стандартів НАТО у військовому управлінні. З 2017 командував першим батальйоном бригади швидкого реагування НГУ, а згодом став заступником командира бригади. В 2019 Ігор Оболєнський пішов з війська і працював на керівних посадах у компаніях МХП та Agrotrade.`}
            <br/><br/>    
            {`Але у перші дні повномасштабного вторгнення залишив крісло топ менеджера й долучився до добровольчого формування «Хартія». У березні 2023-го року став командиром новоствореної 13 бригади НГУ «Хартія».`}
          </span>
          <div className='grid grid-cols-2 gap-5 mt-10'>
            <p className='  text-sm'> {`Кавалер ордену III ступеня "За мужність", лицар ордену Богдана Хмельницького III ступеня`}</p>
            <p className='  text-sm'> {`Кавалер ордену III ступеня "За мужність", лицар ордену Богдана Хмельницького III ступеня`}</p>
          </div>
          <div className='grid mt-20'>
            <Commas />
            <p className='text-5xl text-[#363636]'>{`Якась коротенька цитата`}</p>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <Image src={commanderImage} alt='commander' className='w-full h-full object-cover' fill sizes='(max-width: 768px) 100vw, 50vw'/>
        </div>
      </div>
    </div>
  )
}
