'use client'

import { PostImageEditor } from './PostImageEditor'

type EditStepProps = {
  imageUrl: string
  onSave: (file: File) => void
}

export const EditStep = ({ imageUrl, onSave }: EditStepProps) => {
  return <PostImageEditor imageUrl={imageUrl} onSave={onSave} />
}
