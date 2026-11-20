'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import s from './ImageSlider.module.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type ImageSliderProps = {
  images: string[]
  /** Класс снаружи — чтобы место использования задало свой размер (например, высоту в карточке) */
  className?: string
  /** contain — фото целиком (с полями); cover — заполняет блок, обрезаясь от центра */
  fit?: 'contain' | 'cover'
  onImageClick?: () => void
}

export const ImageSlider = ({
  images,
  className,
  fit = 'contain',
  onImageClick,
}: ImageSliderProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      navigation={images.length > 1 ? { disabledClass: s.navigationDisabled } : false}
      pagination={images.length > 1 ? { clickable: true } : false}
      className={className ? `${s.slider} ${className}` : s.slider}
    >
      {images.map((image, index) => {
        const imageElement = (
          <Image
            src={image}
            alt={`Post image ${index + 1}`}
            fill
            sizes="(max-width: 490px) 100vw, 490px"
            className={fit === 'cover' ? `${s.image} ${s.cover}` : s.image}
          />
        )

        return (
          <SwiperSlide key={`${image}-${index}`}>
            {onImageClick ? (
              <button
                type="button"
                className={`${s.imageWrapper} ${s.imageButton}`}
                onClick={onImageClick}
                aria-label={`Open details for image ${index + 1}`}
              >
                {imageElement}
              </button>
            ) : (
              <div className={s.imageWrapper}>{imageElement}</div>
            )}
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
