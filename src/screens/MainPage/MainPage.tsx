'use client'
import { useState } from 'react'
import { CheckBox } from '@/components/ui/CheckBox/CheckBox'
import Heart from '@/assets/icons/Heart.svg'
import { Modal } from '@/components/ui/Modal'
import SelectBox from '@/components/ui/Select/Select'

export const MainPage = () => {
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(true)
  const [checked3, setChecked3] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSort, setSelectedSort] = useState('')

  const categoryOptions = [
    { value: 'all', label: 'Все категории' },
    { value: 'tech', label: 'Технология' },
    { value: 'design', label: 'Дизайн' },
    { value: 'business', label: 'Бизнес' },
  ]

  const sortOptions = [
    { value: 'newest', label: 'Новое' },
    { value: 'popular', label: 'Популярное' },
    { value: 'trending', label: 'Тренд' },
    { value: 'oldest', label: 'Старое' },
  ]

  return (
    <div style={{ padding: '40px' }}>
      <h1>Main Page - CheckBox Component Demo</h1>
      <Modal title="Demo Modal" open={false} onOpenChange={() => {}}>
        <p>This is a simple modal example.</p>
      </Modal>

      <Heart width={48} height={48} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
        <h2>Select Components Demo</h2>
        <SelectBox
          label="Категория"
          placeholder="Выберите категорию"
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          options={categoryOptions}
        />

        <SelectBox
          label="Сортировка"
          placeholder="Выберите сортировку"
          value={selectedSort}
          onValueChange={setSelectedSort}
          options={sortOptions}
        />

        <h2 style={{ marginTop: '20px' }}>CheckBox Components Demo</h2>
        <CheckBox
          checked={checked1}
          onChange={setChecked1}
          label="Unchecked checkbox with Checkmark.svg"
        />

        <CheckBox
          checked={checked2}
          onChange={setChecked2}
          label="Checked checkbox with Checkmark.svg"
        />

        <CheckBox
          checked={checked3}
          onChange={setChecked3}
          label="Disabled checkbox"
          disabled={true}
        />
      </div>
    </div>
  )
}

//аналогично странице профиля, в зависимости от пропсов, рисуем разные кнопочки
