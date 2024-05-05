'use client'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import styles from '@/features/registrations/components/Registrations/Registrations.module.css'

const RadioBtn = ({ itemCategory, itemNames }) => {
  const [value, setValue] = useState('startup')

  return (
    <RadioGroup value={value} onChange={setValue} name={itemCategory}>
      <RadioGroup.Label>{itemCategory}</RadioGroup.Label>
      {itemNames.map((itemName) => (
        <RadioGroup.Option key={itemName} value={itemName}>
          {({ checked }) => (
            <span className={checked ? styles.tmp : ''}>{itemName}</span>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  )
}

export default RadioBtn
