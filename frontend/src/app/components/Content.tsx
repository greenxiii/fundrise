import React from 'react'
import PaymentOptions from './PaymentDetails';
import Reports from './Reports';
import AboutUs from './AboutUs';
import ImportantFoundries from './ImportantFoundries';
import FAQ from './FAQ';

export default function Content() {
  return (
    <div className="grid gap-50 my-30 mx-auto max-w-[calc(100vw-180px)]">
        <AboutUs />
        <PaymentOptions />
        <ImportantFoundries />
        {/* <Commander /> */}
        {/* <Divisions /> */}
        <Reports />
        <FAQ />
      </div>
  )
}
