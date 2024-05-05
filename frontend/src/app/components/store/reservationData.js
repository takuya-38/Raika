import { atom } from 'recoil'

export const reservationDataAtom = atom({
  key: 'reservationData',
  default: {
    id: '',
    summary: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
  },
})
