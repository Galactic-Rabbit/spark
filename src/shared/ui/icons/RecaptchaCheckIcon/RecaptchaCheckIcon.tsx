import { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & {
  className?: string
}
export const RecaptchaCheckIcon = (props: Props) => {
  return (
    <svg viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M22.0355 0C22.8113 0.744897 23.5691 1.51023 24.3387 2.26226V2.26321C19.0046 7.59253 13.671 12.9233 8.3341 18.2507C5.56224 15.4727 2.78041 12.6865 0.0147363 9.91468L0 9.91611V9.90137C0.0656004 9.91564 0.0646496 9.79156 0.126922 9.77255C0.841871 9.05713 1.55159 8.336 2.26701 7.62057C4.29112 9.64087 6.31237 11.6645 8.33457 13.6867C12.9033 9.12605 17.4716 4.5654 22.0355 0Z"
        fill="#19983B"
        fillOpacity="0.901702"
      />
    </svg>
  )
}
