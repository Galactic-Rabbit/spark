'use client'

import { EditStep } from '@features/post-create/ui/EditStep'
import { useState } from 'react'
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'
import { CreatePostForm } from './CreatePostForm'
import { UploadStep } from './UploadStep'

type CreatePostStep = 'upload' | 'edit' | 'details'

export const CreatePostModal = () => {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<CreatePostStep>('upload')
  const [images, setImages] = useState<File[]>([])

  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleSelectFiles = (files: File[]) => {
    setImages(files)
    setStep('edit')
    setImageUrl(URL.createObjectURL(files[0]))
  }

  const handleSaveEditedImage = (editedFile: File) => {
    setImages((previousImages) => {
      const updatedImages = [...previousImages]

      updatedImages[0] = editedFile

      return updatedImages
    })

    setStep('details')
  }

  const handlePublishSuccess = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl)
    }

    setImageUrl(null)
    setImages([])
    setStep('upload')
    setOpen(false)
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Create post
      </Button>

      <Modal open={open} onOpenChange={setOpen} title="Create post" modal={false}>
        {step === 'upload' && <UploadStep onSelectFiles={handleSelectFiles} />}

        {step === 'edit' && imageUrl && (
          <EditStep imageUrl={imageUrl} onSave={handleSaveEditedImage} />
        )}

        {step === 'details' && <CreatePostForm files={images} onSuccess={handlePublishSuccess} />}
      </Modal>
    </>
  )
}
