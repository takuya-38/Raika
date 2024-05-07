'use client'
import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import styles from '@/features/registrations/components/Registrations/Registrations.module.css'
import Image from 'next/image'

const RadioBtn = ({ itemCategory, src, itemNames, selectedData }) => {
  const [value, setValue] = useState(selectedData)

  useEffect(() => {
    setValue(selectedData)
  }, [selectedData])

  return (
    <RadioGroup
      className={styles.radioBtnContainer}
      value={value}
      onChange={setValue}
      name={itemCategory}
    >
      <RadioGroup.Label className={styles.inputLabel}>
        <Image src={src} alt={itemCategory} width={24} height={24} />
      </RadioGroup.Label>
      <div className={styles.radioBtnBox}>
        {itemNames.map((itemName) => (
          <RadioGroup.Option key={itemName} value={itemName}>
            {({ checked }) => (
              <span
                className={`${checked ? styles.tmp : ''} ${styles.radioBtn} ${styles.input}`}
              >
                {itemName}
              </span>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

export default RadioBtn
