'use client'

import { useEffect, useRef } from 'react'

type EditedImagePreviewProps = {
  file: File
}

export const EditedImagePreview = ({ file }: EditedImagePreviewProps) => {
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const url = URL.createObjectURL(file)
    const image = imageRef.current

    if (image) {
      image.src = url
    }

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])

  return (
    <img
      ref={imageRef}
      alt="Edited photo preview"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      }}
    />
  )
}
