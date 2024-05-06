'use client'
import { useState } from 'react'
import { Listbox } from '@headlessui/react'

const SelectBox = ({ itemCategory, items }) => {
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    name: '-----------',
  })

  return (
    <Listbox
      value={selectedItem}
      onChange={setSelectedItem}
      name={itemCategory}
    >
      <Listbox.Button>{selectedItem.name}</Listbox.Button>
      <Listbox.Options>
        {items.map((item) => (
          <Listbox.Option key={item.id} value={item}>
            {item.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
      <input type="text" name="menu_price" defaultValue={selectedItem?.price} />
    </Listbox>
  )
}

export default SelectBox
