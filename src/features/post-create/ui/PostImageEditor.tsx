'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

import s from './PostImageEditor.module.css'

const FilerobotImageEditor = dynamic(() => import('react-filerobot-image-editor'), { ssr: false })

const editorTheme = {
  palette: {
    'bg-primary': '#333333',
    'bg-secondary': '#171717',
    'bg-primary-active': '#397DF6',
    'bg-primary-hover': '#444444',

    'accent-primary': '#397DF6',
    'accent-primary-active': '#2F68CC',

    'icons-primary': '#FFFFFF',
    'icons-secondary': '#8D9094',

    'borders-primary': '#4C4C4C',
    'borders-secondary': '#333333',
    'borders-strong': '#666666',

    'light-shadow': 'rgba(0, 0, 0, 0.2)',
    'medium-shadow': 'rgba(0, 0, 0, 0.4)',

    warning: '#FF8099',
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },
}

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
        theme={editorTheme}
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
