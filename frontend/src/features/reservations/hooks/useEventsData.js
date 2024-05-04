'use client'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { eventsAtom } from '@/app/components/store/events'

export const useEventsData = () => {
  const setEvents = useSetRecoilState(eventsAtom)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:3001/google_calendar')
        const data = await res.json()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }

    fetchEvents()
  }, [])
}
