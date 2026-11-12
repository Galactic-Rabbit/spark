import { Button } from '@/shared/ui/Button'
import Image from 'next/image'

type PreviewImage = {
  id: string
  url: string
}

type PostImagesPreviewProps = {
  previews: PreviewImage[]
  onRemove: (index: number) => void
}

export const PostImagesPreview = ({ previews, onRemove }: PostImagesPreviewProps) => {
  return (
    <div>
      {previews.map((preview, index) => (
        <div key={preview.id}>
          <Image src={preview.url} alt="Post preview" width={120} height={120} unoptimized />

          <Button type="button" onClick={() => onRemove(index)} style={{ color: 'white' }}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  )
}
