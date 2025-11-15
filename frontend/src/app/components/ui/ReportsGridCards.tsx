'use client'

import React from 'react'
import ReportCard from './ReportCard'
import { Report } from '@/lib/contentful'

interface ReportsGridCardsProps {
  reports: Report[]
  onOpenModal: (report: Report) => void
}

export default function ReportsGridCards({ reports, onOpenModal }: ReportsGridCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {reports?.map((data, index) => (
          <ReportCard key={index} {...data} onOpenModal={onOpenModal} />
        ))}
      </div>
  )
}

