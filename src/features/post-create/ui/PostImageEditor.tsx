'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import s from './PostImageEditor.module.css'

const FilerobotImageEditor = dynamic(() => import('react-filerobot-image-editor'), { ssr: false })

type PostImageEditorProps = {
  imageUrl: string
  onSave: (file: File) => void
}

export const PostImageEditor = ({ imageUrl, onSave }: PostImageEditorProps) => {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div className={s.editorContainer}>
      <FilerobotImageEditor
        source={imageUrl}
        savingPixelRatio={1}
        previewPixelRatio={1}
        observePluginContainerSize
        onSave={(editedImageObject) => {
          const canvas = editedImageObject.imageCanvas

          if (!canvas) return

          canvas.toBlob((blob) => {
            if (!blob) return

            const file = new File([blob], editedImageObject.fullName ?? 'edited-image.png', {
              type: blob.type,
            })

            onSave(file)
          }, 'image/png')
        }}
        onClose={() => setIsOpen(false)}
        tabsIds={['Adjust', 'Filters', 'Finetune']}
        defaultTabId="Adjust"
        defaultToolId="Crop"
      />
    </div>
  )
}
