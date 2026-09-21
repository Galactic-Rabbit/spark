declare module '*.svg' {
  import type { FC, SVGProps } from 'react'
  const SVGComponent: FC<SVGProps<SVGSVGElement>>
  export default SVGComponent
}
