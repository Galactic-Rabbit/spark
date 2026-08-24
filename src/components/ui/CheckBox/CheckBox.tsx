'use client'
import * as Checkbox from '@radix-ui/react-checkbox';
import s from './CheckBox.module.css'
import {ReactNode, useId} from 'react';
import {CheckmarkIcon} from '@/components/icons/CheckmarkIcon/CheckmarkIcon';


type Props = {
  checked: boolean,
  onChange: (checked: boolean) => void,
  id?: string,
  label: string | ReactNode,
  className?: string,
}

export const CheckBox = ({checked, onChange, label, id, className}: Props) => {
  const defaultId = useId()
  const newId = id ?? defaultId


  return (
    <div className={`${s.checkContainer} ${className}`}>
      <Checkbox.Root id={newId}
                     className={s.checkboxRoot}
                     checked={checked}
                     onCheckedChange={(value) => onChange(value === true)}>
        <Checkbox.Indicator>
          <CheckmarkIcon className={s.icon} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={newId} className={'text-small'}>
        {label}
      </label>
    </div>
  );
};

