"use client"
import * as Checkbox from '@radix-ui/react-checkbox';
import Ok from './ok-sq.svg'
import Image from 'next/image'
import s from './CheckBox.module.css'

type Props = {
  checked: boolean,
  onChange: (checked: boolean) => void,
  text: string,
}

/**
 * @example
 * Принимает пропсы калбэка и стейта
 * <CheckBox
 * checked={checked}
 * onChange={changeChecked}
 * text={"любой текст"}/>
 */
export const CheckBox = ({checked, onChange, text}: Props) => {
  return (
    <div>
      <Checkbox.Root className={s.checkboxRoot} checked={checked} onCheckedChange={onChange}>
        <div className={s.checkBox}>
          <Checkbox.Indicator>
            <Image src={Ok} alt=""/>
            <div className={s.bgIndicator}/>
          </Checkbox.Indicator>
        </div>
      </Checkbox.Root>
      <label htmlFor="c1" className={'text-small'}>
        {text}
      </label>
    </div>
  );
};

