'use client'

import { createContext, useContext, useState } from 'react'

const TabContext = createContext()

export const useTabContext = () => useContext(TabContext)

export const TabProvider = ({ children }) => {
  const [value, setValue] = useState('1')

  return (
    <TabContext.Provider value={{ value, setValue }}>
      {children}
    </TabContext.Provider>
  )
}
