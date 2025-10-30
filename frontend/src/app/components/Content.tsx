import React from 'react'
import PaymentOptions from './PaymentDetails';
import Reports from './Reports';
import AboutUs from './AboutUs';
import ImportantFoundries from './ImportantFoundries';
import FAQ from './FAQ';
import Vacancies from './Vacancies';
import Contact from './Contact';

export default function Content() {
  return (
    <div className="grid gap-20 md:gap-30 lg:gap-50 my-10 md:my-20 lg:my-30 mx-auto px-4 sm:px-6 md:px-8 w-full max-w-7xl">
        <AboutUs />
        <PaymentOptions />
        <ImportantFoundries />
        {/* <Commander /> */}
        {/* <Divisions /> */}
        <Reports />
        <FAQ />
        <Vacancies />
        <Contact />
      </div>
  )
}
