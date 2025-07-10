import React from 'react'
import Image from 'next/image'
import commanderImage from '@/assets/commander.webp'
import Commas from '@/assets/icons/Commas'

export const COMMANDER_CONTENT = {
  header: {
    title: {
      selected: 'ПОЛКОВНИК',
      main: 'ОЛЕКСАНДР "САЛІК" ВІННІКОВ',
    },
    subtitle: 'Олександр "Салік" Вінніков',
    section: 'Благодійний фонд',
  },
  description: `Був одним із очільників процесу впровадження стандартів НАТО у військовому управлінні. З 2017 командував першим батальйоном бригади швидкого реагування НГУ, а згодом став заступником командира бригади. В 2019 Ігор Оболєнський пішов з війська і працював на керівних посадах у компаніях МХП та Agrotrade. <br /><br />
  Але у перші дні повномасштабного вторгнення залишив крісло топ менеджера й долучився до добровольчого формування «Хартія». У березні 2023-го року став командиром новоствореної 13 бригади НГУ «Хартія».`,
  leftText: `Кавалер ордену III ступеня "За мужність", лицар ордену Богдана Хмельницького III ступеня`,
  rightText: `Кавалер ордену III ступеня "За мужність", лицар ордену Богдана Хмельницького III ступеня`,
  quote: `Якась коротенька цитата`,
}

export default function Commander() {
  return (
    <div className="text-white">
      <div className="grid grid-cols-3">
        <p className="text-xl text-orange-400 col-span-1"> {COMMANDER_CONTENT.header.section} </p>
        <div className="col-span-2">
          <p className="text-6xl font-bold leading-[82px] break-normal">
            <span className="text-orange-400 uppercase">{COMMANDER_CONTENT.header.title.selected}</span>
            <br />
            {COMMANDER_CONTENT.header.title.main}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mt-20 items-stretch">
        <div>
          <span className="text-sm break-normal"> {COMMANDER_CONTENT.description} </span>
          <div className="grid grid-cols-2 gap-5 mt-10">
            <p className="text-sm"> {COMMANDER_CONTENT.leftText} </p>
            <p className="text-sm"> {COMMANDER_CONTENT.rightText} </p>
          </div>
          <div className="grid mt-20">
            <Commas />
            <p className="text-5xl text-[#363636]"> {COMMANDER_CONTENT.quote} </p>
          </div>
        </div>
        <div className="relative overflow-hidden min-h-[600px]">
          <Image
            src={commanderImage}
            alt="commander"
            className="w-full h-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  )
}
