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
}

export const ImageSlider = ({ images }: ImageSliderProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      navigation={images.length > 1}
      pagination={images.length > 1 ? { clickable: true } : false}
      className={s.slider}
    >
      {images.map((image, index) => (
        <SwiperSlide key={`${image}-${index}`}>
          <div className={s.imageWrapper}>
            <Image
              src={image}
              alt={`Post image ${index + 1}`}
              fill
              sizes="(max-width: 490px) 100vw, 490px"
              className={s.image}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
