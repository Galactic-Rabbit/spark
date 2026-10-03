import { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & {
  className?: string
}
export const RecaptchaSpinnerIcon = (props: Props) => {
  return (
    <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2 2C6.19126 2.20312 14.659 5.0875 15 15"
        stroke="#4D8DF4"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}
