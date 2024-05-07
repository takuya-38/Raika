'use client'
import { useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
// import {
//   Listbox,
//   ListboxButton,
//   ListboxOption,
//   ListboxOptions,
//   Transition,
// } from '@headlessui/react'
// import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { MENU_LIST } from '@/features/registrations/constants/formItem'
import { useRecoilValue } from 'recoil'
import { menusAtom } from '@/app/components/store/menus'
import styles from '@/features/registrations/components/Registrations/Registrations.module.css'

const SelectBox = ({ itemCategory, selectedData }) => {
  const [selectedItem, setSelectedItem] = useState(selectedData || null)
  const menus = useRecoilValue(menusAtom)

  useEffect(() => {
    setSelectedItem(selectedData || null)
  }, [selectedData])

  return (
    <Listbox
      value={selectedItem}
      onChange={setSelectedItem}
      name={itemCategory}
    >
      <div className={styles.selectBoxContainer}>
        <Listbox.Button className={styles.listboxButton}>
          <span className={styles.listboxButtonText}>
            {selectedItem.name ||
              MENU_LIST.find((menu) => menu.id === selectedItem.menu_id)?.name}
          </span>
          <span className={styles.listboxButtonIcon}>
            <ChevronUpDownIcon
              className={styles.listboxButtonIconSvg}
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <input
          type="text"
          name={`price_${itemCategory}`}
          defaultValue={selectedItem?.price || ''}
          className={styles.inputPrice}
        />

        <Transition
          leave={styles.transitionLeave}
          leaveFrom={styles.transitionLeaveFrom}
          leaveTo={styles.transitionLeaveTo}
        >
          <Listbox.Options className={styles.listboxOptions}>
            {menus.map((menu, menuIdx) => (
              <Listbox.Option
                key={menuIdx}
                className={({ active }) =>
                  `${styles.listboxOption} ${
                    active ? styles.listboxOptionActive : ''
                  }`
                }
                value={menu}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`${styles.listboxOptionText} ${
                        selected ? styles.listboxOptionTextSelected : ''
                      }`}
                    >
                      {menu.name}
                    </span>
                    {selected ? (
                      <span className={styles.listboxOptionIcon}>
                        <CheckIcon
                          className={styles.listboxOptionIconSvg}
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
    // <div className={styles.container}>
    //   <Listbox
    //     value={selectedItem}
    //     onChange={setSelectedItem}
    //     name={itemCategory}
    //   >
    //     <ListboxButton className={styles.listboxButton}>
    //       {selectedItem.name ||
    //         MENU_LIST.find((menu) => menu.id === selectedItem.menu_id)?.name}
    //       <ChevronDownIcon className={styles.chevronIcon} aria-hidden="true" />
    //     </ListboxButton>
    // <Transition
    //   leave={styles.transitionLeave}
    //   leaveFrom={styles.transitionLeaveFrom}
    //   leaveTo={styles.transitionLeaveTo}
    // >
    //   <ListboxOptions className={styles.listboxOptions}>
    //     {menus.map((menu) => (
    //       <ListboxOption
    //         key={menu.id}
    //         value={menu}
    //         className={({ selected, active }) =>
    //           `${styles.listboxOption} ${selected ? styles.selected : ''} ${active ? styles.active : ''}`
    //         }
    //       >
    //         <CheckIcon
    //           className={`${styles.checkIcon} ${selected ? styles.visible : styles.invisible}`}
    //         />
    //         <div className={styles.optionText}>{menu.name}</div>
    //       </ListboxOption>
    //     ))}
    //   </ListboxOptions>
    // </Transition>
    //   </Listbox>
    // </div>
  )
}

export default SelectBox
