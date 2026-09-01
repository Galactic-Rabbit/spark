import { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & {
  className?: string
}
export const RecaptchaIcon = (props: Props) => {
  return (
    <svg viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g filter="url(#recaptcha-shield)">
        <path d="M26.4407 24.507L21.3559 19.9308C20.339 20.9477 18.8136 22.9816 14.7458 22.9816C10.678 22.9816 9.15254 20.9477 7.62712 19.4223L11.1864 15.3545H0V27.5579L3.05085 24.507C4.57627 26.0325 9.05085 30.1003 14.7458 30.1003C20.4407 30.1003 24.7458 26.202 26.4407 24.507Z" fill="#B5B6B5"/>
      </g>
      <g filter="url(#recaptcha-blue)">
        <path d="M14.2373 12.3035L10.678 8.23569C7.11865 10.2696 6.44068 13.8289 6.61017 15.3543H0C0 14.3374 0.0980008 11.0415 1.01695 8.74417C2.0339 6.20179 4.23729 4.50688 5.59322 3.65942L2.54238 0.100098H14.2373V12.3035Z" fill="#4D8DF4"/>
      </g>
      <g filter="url(#recaptcha-darkblue)">
        <path d="M18.3051 14.8457L21.8644 11.2865C19.8305 7.72722 15.9322 7.21863 14.2373 7.21866V0.100098C15.7627 0.100105 19.8305 0.608572 21.8644 2.134C23.762 3.55714 25.2543 5.18472 25.9322 6.20167L29.4915 3.15082V14.8457H18.3051Z" fill="#1B3CAC"/>
      </g>
      <defs>
        <filter id="recaptcha-shield" x="0" y="14.3545" width="27.4407" height="15.7456" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1" dy="-1"/>
          <feGaussianBlur stdDeviation="0.5"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"/>
          <feBlend mode="normal" in2="shape" result="effect"/>
        </filter>
        <filter id="recaptcha-blue" x="0" y="-0.899902" width="15.2373" height="16.2544" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1" dy="-1"/>
          <feGaussianBlur stdDeviation="0.5"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
          <feBlend mode="normal" in2="shape" result="effect"/>
        </filter>
        <filter id="recaptcha-darkblue" x="14.1373" y="-1" width="16.4542" height="15.9458" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1" dy="-1"/>
          <feGaussianBlur stdDeviation="0.5"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
          <feBlend mode="normal" in2="shape" result="effect"/>
        </filter>
      </defs>
    </svg>
  )
}
