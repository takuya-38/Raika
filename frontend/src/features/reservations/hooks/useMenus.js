'use client'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { menusAtom } from '@/app/components/store/menus'
import { fetchMenus } from '@/features/reservations/api/fetchMenu'

export const useMenusData = () => {
  const setMenus = useSetRecoilState(menusAtom)
  useEffect(() => {
    const getMenus = async () => {
      try {
        const data = await fetchMenus()
        setMenus(data)
      } catch (error) {
        console.error('Error fetching menus:', error)
      }
    }
    getMenus()
  }, [])
}
