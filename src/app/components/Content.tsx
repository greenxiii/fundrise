import React from 'react'
import PaymentOptions from './PaymentDetails';
import Commander from './Commander';
import Divisions from './Divisions';
import Reports from './Reports';
import AboutUs from './AboutUs';
import ImportantFoundries from './ImportantFoundries';
import { FOUNDRIES } from './common/constants';

export default function Content() {
  return (
    <div className="grid gap-30 my-30 mx-auto max-w-[calc(100vw-180px)]">
        <AboutUs />
        <ImportantFoundries data={FOUNDRIES} />
        <PaymentOptions />
        <Commander />
        <Divisions />
        <Reports />
      </div>
  )
}
