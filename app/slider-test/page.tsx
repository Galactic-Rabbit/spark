import { ImageSlider } from '@shared/ui/ImageSlider'

export default function SliderTestPage() {
  const images = ['/images/test1.jpg', '/images/test2.jpg', '/images/test3.jpg']

  return (
    <main>
      <ImageSlider images={images} />
    </main>
  )
}
