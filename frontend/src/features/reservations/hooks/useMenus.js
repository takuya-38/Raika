'use client'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { menusAtom } from '@/app/components/store/menus'
import { fetchMenus } from '@/features/reservations/api/fetchMenu'
import { auth } from '@/lib/FirebaseConfig'

export const useMenusData = () => {
  const setMenus = useSetRecoilState(menusAtom)
  useEffect(() => {
    const getMenus = async () => {
      try {
        const idToken = await auth.currentUser.getIdToken()
        const data = await fetchMenus(idToken)
        setMenus(data)
      } catch (error) {
        console.error('Error fetching menus:', error)
      }
    }
    getMenus()
  }, [])
}
