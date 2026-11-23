'use client'

import { useEffect, useRef, useState } from 'react'

import { Modal } from '@/shared/ui/Modal'

import { CreatePostForm } from './CreatePostForm'
import { EditStep } from './EditStep'

import s from './CreatePostModal.module.css'

type Step = 'upload' | 'edit' | 'details'

const MAX_FILE_SIZE = 20 * 1024 * 1024
const MAX_FILES = 10
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']

const validatePostImages = (files: File[]): string | null => {
  if (files.length === 0) {
    return 'Please select at least one photo'
  }

  if (files.length > MAX_FILES) {
    return 'You can upload up to 10 photos'
  }

  const hasInvalidFile = files.some(
    (file) => !ALLOWED_FILE_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE,
  )

  if (hasInvalidFile) {
    return 'The photo must be less than 20 Mb and have JPEG or PNG format'
  }

  return null
}

export const CreatePostModal = () => {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('upload')
  const [images, setImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [showCloseConfirm, setShowCloseConfirm] = useState(false)
  const [description, setDescription] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const urlsRef = useRef<string[]>([])

  useEffect(() => {
    const urls = urlsRef

    return () => {
      urls.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  const clearImages = () => {
    urlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    urlsRef.current = []

    setImages([])
    setImageUrls([])
    setActiveImageIndex(0)
    setValidationError(null)
    setDescription('')
    setStep('upload')
  }

  const handleSelectFiles = (files: File[]) => {
    const error = validatePostImages(files)

    if (error) {
      setValidationError(error)
      return
    }

    const urls = files.map((file) => URL.createObjectURL(file))

    urlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    urlsRef.current = urls

    setImages(files)
    setImageUrls(urls)
    setActiveImageIndex(0)
    setValidationError(null)
    setStep('edit')
  }

  const handleSaveEditedImage = (file: File, index: number) => {
    const error = validatePostImages([file])

    if (error) {
      setValidationError(error)
      return
    }

    const url = URL.createObjectURL(file)
    const oldUrl = urlsRef.current[index]

    urlsRef.current[index] = url

    setImages((prev) => prev.map((image, i) => (i === index ? file : image)))

    setImageUrls((prev) => prev.map((imageUrl, i) => (i === index ? url : imageUrl)))

    if (oldUrl) {
      URL.revokeObjectURL(oldUrl)
    }

    setValidationError(null)
  }

  const handleRequestClose = () => {
    setShowCloseConfirm(true)
  }

  const handleConfirmClose = () => {
    setShowCloseConfirm(false)
    setOpen(false)
    clearImages()
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (showCloseConfirm) return

    if (nextOpen) {
      setOpen(true)
    } else {
      handleRequestClose()
    }
  }

  const handleBack = () => {
    if (step === 'details') {
      setStep('edit')
      return
    }

    if (step === 'edit') {
      setStep('upload')
      return
    }

    handleRequestClose()
  }

  const handlePublishSuccess = () => {
    setShowCloseConfirm(false)
    setOpen(false)
    clearImages()
  }

  const modalClassName =
    step === 'upload' ? s.uploadModal : step === 'edit' ? s.editModal : s.publicationModal

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Create post
      </button>

      <Modal
        open={open}
        onOpenChange={handleOpenChange}
        modal={false}
        title={step === 'upload' ? 'Add Photo' : step === 'edit' ? 'Editing' : 'Publication'}
        className={modalClassName}
        bodyClassName={s.modalBody}
        showCloseButton={step === 'upload'}
        headerActions={
          step !== 'upload' ? (
            <div className={s.headerActions}>
              <button type="button" className={s.backButton} onClick={handleBack}>
                Back
              </button>

              {step === 'edit' ? (
                <button type="button" className={s.headerButton} onClick={() => setStep('details')}>
                  Next
                </button>
              ) : (
                <button type="submit" form="create-post-form" className={s.headerButton}>
                  Publish
                </button>
              )}
            </div>
          ) : undefined
        }
      >
        {step === 'upload' && (
          <div className={s.uploadContent}>
            <div className={s.uploadPlaceholder} aria-hidden="true">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m3 17 5-5 4 4 3-3 6 6" />
              </svg>
            </div>

            <div className={s.uploadActions}>
              <button
                type="button"
                className={s.selectButton}
                onClick={() => fileInputRef.current?.click()}
              >
                Select from Computer
              </button>

              <input
                ref={fileInputRef}
                className={s.fileInput}
                type="file"
                accept="image/jpeg,image/png"
                multiple
                aria-label="Select photos"
                onChange={(event) => {
                  handleSelectFiles(Array.from(event.target.files ?? []))
                  event.target.value = ''
                }}
              />

              <button
                type="button"
                className={s.draftButton}
                disabled
                title="Drafts are not implemented yet"
              >
                Open Draft
              </button>
            </div>
          </div>
        )}

        {step === 'edit' && (
          <div className={s.editContent}>
            <EditStep
              images={imageUrls}
              activeImageIndex={activeImageIndex}
              onImageChange={setActiveImageIndex}
              onSave={handleSaveEditedImage}
            />
          </div>
        )}

        {step === 'details' && (
          <div className={s.publicationContent}>
            <CreatePostForm
              files={images}
              imageUrls={imageUrls}
              description={description}
              onDescriptionChange={setDescription}
              onSuccess={handlePublishSuccess}
            />
          </div>
        )}

        {validationError && (
          <p role="alert" className={s.error}>
            {validationError}
          </p>
        )}
      </Modal>

      <Modal open={showCloseConfirm} onOpenChange={setShowCloseConfirm} title="Close publication?">
        <p>
          Do you really want to close the creation of a publication? If you close, everything will
          be deleted.
        </p>

        <div className={s.confirmActions}>
          <button
            type="button"
            className={s.continueButton}
            onClick={() => setShowCloseConfirm(false)}
          >
            Continue editing
          </button>

          <button type="button" className={s.discardButton} onClick={handleConfirmClose}>
            Discard
          </button>
        </div>
      </Modal>
    </>
  )
}
