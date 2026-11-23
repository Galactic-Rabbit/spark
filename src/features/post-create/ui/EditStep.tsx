'use client'

import { ImageSelector } from './ImageSelector'
import { PostImageEditor } from './PostImageEditor'

type EditStepProps = {
  images: string[]
  activeImageIndex: number
  onImageChange: (index: number) => void
  onSave: (file: File, index: number) => void
}

export const EditStep = ({ images, activeImageIndex, onImageChange, onSave }: EditStepProps) => {
  const currentImageUrl = images[activeImageIndex]

  if (!currentImageUrl) return null

  return (
    <div>
      <ImageSelector images={images} activeIndex={activeImageIndex} onChange={onImageChange} />

      <PostImageEditor
        key={currentImageUrl}
        imageUrl={currentImageUrl}
        onSave={(file) => onSave(file, activeImageIndex)}
      />
    </div>
  )
}
