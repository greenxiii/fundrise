import React from 'react'
import PaymentOptions from './PaymentDetails';
import Commander from './Commander';
import Divisions from './Divisions';
import Reports from './Reports';
import AboutUs from './AboutUs';
import ImportantFoundries from './ImportantFoundries';

export default function Content() {
  return (
    <div className="grid gap-50 my-30 mx-auto max-w-[calc(100vw-180px)]">
        <AboutUs />
        <ImportantFoundries />
        <PaymentOptions />
        <Commander />
        <Divisions />
        <Reports />
      </div>
  )
}
