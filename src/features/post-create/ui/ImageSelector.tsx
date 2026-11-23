'use client'

import Image from 'next/image'
import s from './ImageSelector.module.css'

type ImageSelectorProps = {
  images: string[]
  activeIndex: number
  onChange: (index: number) => void
}

export const ImageSelector = ({ images, activeIndex, onChange }: ImageSelectorProps) => {
  return (
    <div className={s.container}>
      {images.map((image, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onChange(index)}
          className={`${s.thumbnail} ${index === activeIndex ? s.active : ''}`}
          aria-label={`Edit image ${index + 1}`}
          aria-pressed={index === activeIndex}
        >
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            fill
            sizes="72px"
            unoptimized
            className={s.image}
          />
        </button>
      ))}
    </div>
  )
}
