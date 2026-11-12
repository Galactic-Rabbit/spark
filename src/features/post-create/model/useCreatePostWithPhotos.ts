import { useCreatePostMutation } from '../api/useCreatePost.mutation'
import { useUploadPostImagesMutation } from '../api/useUploadPostImages.mutation'

type CreatePostWithPhotosPayload = {
  description: string
  files: File[]
}

export const useCreatePostWithPhotos = () => {
  const uploadImages = useUploadPostImagesMutation()
  const createPost = useCreatePostMutation()

  const createPostWithPhotos = async ({ description, files }: CreatePostWithPhotosPayload) => {
    const uploadedData = await uploadImages.mutateAsync(files)

    if (!uploadedData) {
      throw new Error('Failed to upload images')
    }

    const childrenMetadata = uploadedData.images.map((image) => ({
      uploadId: image.uploadId,
    }))

    await createPost.mutateAsync({
      description,
      childrenMetadata,
    })
  }

  return {
    createPostWithPhotos,
    isPending: uploadImages.isPending || createPost.isPending,
    isError: uploadImages.isError || createPost.isError,
    error: uploadImages.error || createPost.error,
  }
}
