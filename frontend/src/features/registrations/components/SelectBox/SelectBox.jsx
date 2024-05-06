'use client'
import { useEffect, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { MENU_LIST } from '@/features/registrations/constants/formItem'
import { useRecoilValue } from 'recoil'
import { menusAtom } from '@/app/components/store/menus'

const SelectBox = ({ itemCategory, selectedData }) => {
  const [selectedItem, setSelectedItem] = useState(selectedData || null)
  const menus = useRecoilValue(menusAtom)

  useEffect(() => {
    setSelectedItem(selectedData || null)
  }, [selectedData])

  return (
    <div>
      <Listbox
        value={selectedItem}
        onChange={setSelectedItem}
        name={itemCategory}
      >
        <Listbox.Button>
          {selectedItem.name ||
            MENU_LIST.find((menu) => menu.id === selectedItem.menu_id)?.name}
        </Listbox.Button>
        <Listbox.Options>
          {menus.map((menu) => (
            <Listbox.Option key={menu.id} value={menu}>
              {menu.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
        <input
          type="text"
          name={`price_${itemCategory}`}
          defaultValue={selectedItem?.price || ''}
        />
      </Listbox>
    </div>
  )
}

export default SelectBox
