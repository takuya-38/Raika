'use client'

import { useTabContext } from '@/app/components/provider/tabProvider.js'
import { Tabs, Tab, Box } from '@mui/material'
import styles from './AnalysisHeader.module.css'

export default function Header() {
  const { value, setValue } = useTabContext()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box className={styles.headerBox}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Home" value="1" />
        <Tab label="About" value="2" />
        <Tab label="Articles" value="3" />
      </Tabs>
    </Box>
  )
}
