import { atom } from 'recoil'

export const reservationDataAtom = atom({
  key: 'reservationData',
  default: {
    summary: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
  },
})
