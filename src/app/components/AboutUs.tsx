import React from 'react'

export default function AboutUs() {
    return (
        <div>
            <p className='text-1xl text-orange-400'>Трошки про нас</p>
            <div className='mt-10'>
                <p className='text-7xl text-4xl font-bold text-white'>
                    2 МЕХ.БАТАЛЬЙОН
                    ВИНИК ЯК ДОБРОВОЛЬЧИЙ ПІДРОЗДІЛ
                </p>
                <button> Дізнатись більше</button>
            </div>
            <div className='grid grid-cols-3 gap-10'>
                <div className='p-10 bg-[#1c1c1c] mt-10 break-words text-sm'>
                    <p className='text-white text-1xl '>
                        Пару фактів про вас.Бійці «2-го Механізованого Батальйону» обороняли Харківщину та одні зперших вийшли на кордоніз РФ під час контрнаступу вересні 2022-го
                    </p>
                </div>
                <div className='p-10 bg-[#1c1c1c] mt-10 break-words text-sm'>
                    <p className='text-white text-1xl '>
                        Пару фактів про вас.Бійці «2-го Механізованого Батальйону» обороняли Харківщину та одні зперших вийшли на кордоніз РФ під час контрнаступу вересні 2022-го
                    </p>
                </div>
                <div className='p-10 bg-[#1c1c1c] mt-10 break-words text-sm'>
                    <p className='text-white text-1xl '>
                        Пару фактів про вас.Бійці «2-го Механізованого Батальйону» обороняли Харківщину та одні зперших вийшли на кордоніз РФ під час контрнаступу вересні 2022-го
                    </p>
                </div>
            </div>

        </div>
    )
}
