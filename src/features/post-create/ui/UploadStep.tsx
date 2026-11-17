'use client'

import { ChangeEvent, useRef } from 'react'
import { Button } from '@/shared/ui/Button'

type UploadStepProps = {
  onSelectFiles: (files: File[]) => void
}

export const UploadStep = ({ onSelectFiles }: UploadStepProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])

    if (files.length === 0) return

    onSelectFiles(files)

    event.target.value = ''
  }

  return (
    <div>
      <h2>Add photos</h2>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
      />

      <Button type="button" variant="primary" onClick={() => inputRef.current?.click()}>
        Select photos
      </Button>
    </div>
  )
}
