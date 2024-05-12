import React from 'react'
import '@/app/globals.css'
import { Reservations } from '@/features/reservations/components/Reservations/Reservations'

const page = () => {
  return (
    <div className="container">
      {/* <div className="pageTitleWrapper">
        <span className="pageTitle">Calendar</span>
      </div> */}
      <Reservations />
    </div>
  )
}

export default page
