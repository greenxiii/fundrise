import React from 'react'
import ReportCard from './ReportCard'
import { Report } from '@/lib/contentful'

interface ReportsGridCardsProps {
  reports: Report[]
}

export default function ReportsGridCards({ reports }: ReportsGridCardsProps) {
  return (
    <div className="grid grid-cols-6 gap-6">
        {reports?.map((data, index) => (
          <ReportCard key={index} {...data} />
        ))}
      </div>
  )
}

