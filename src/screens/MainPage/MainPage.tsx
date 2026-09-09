'use client'
import { useState } from 'react'
import { CheckBox } from '@/components/ui/CheckBox/CheckBox'
import Heart from '@/assets/icons/Heart.svg'

export const MainPage = () => {
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(true)
  const [checked3, setChecked3] = useState(false)

  return (
    <div style={{ padding: '40px' }}>
      <h1>Main Page - CheckBox Component Demo</h1>

      <Heart width={48} height={48} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
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
