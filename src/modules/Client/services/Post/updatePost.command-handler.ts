/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import postService from './post.service'
import { updatePostForm } from '../../interfaces/Post'
import mediaService from 'src/modules/Share/services/Media/media.service'

class UpdatePostCommandHandler {
  private _queryClient
  private _updatePostMutation
  private _uploadImageMutation
  private _uploadVideoMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(mediaService.uploadImage)
    this._uploadVideoMutation = useMutation(mediaService.uploadVideo)
    this._updatePostMutation = useMutation({
      mutationFn: ({ body, post_id }: { body: updatePostForm; post_id: string }) =>
        postService.updatePost(body, post_id)
    })
  }

  handleUpdatePostWithImage = async (
    data: { body: updatePostForm; post_id: string },
    files: File[],
    handleSuccess: any,
    handleError: any
  ) => {
    try {
      if (files.length == 0) {
        data.body.medias = []
      } else {
        const form = new FormData()
        files.forEach((file) => {
          form.append('image', file)
        })
        const uploadImageResponse = await this._uploadImageMutation.mutateAsync(form)
        const mediaData = uploadImageResponse.data.result.map(
          (item: { type: number; url: string }) => ({
            type: item.type,
            url: item.url
          })
        )
        data.body.medias = mediaData
      }
      await this._updatePostMutation.mutateAsync(data)
      this._queryClient.invalidateQueries({
        queryKey: ['newFeeds']
      })
      this._queryClient.invalidateQueries({
        queryKey: ['post-detail']
      })
      handleSuccess()
    } catch (error) {
      handleError(error)
    }
  }
  handleUpdatePostWithVideo = async (
    data: { body: updatePostForm; post_id: string },
    files: File[],
    handleSuccess: any,
    handleError: any
  ) => {
    try {
      if (files.length == 0) {
        data.body.medias = []
      } else {
        const form = new FormData()
        files.forEach((file) => {
          form.append('video', file)
        })
        const uploadVideoResponse = await this._uploadVideoMutation.mutateAsync(form)
        const mediaData = uploadVideoResponse.data.result.map(
          (item: { type: number; url: string }) => ({
            type: item.type,
            url: item.url
          })
        )
        data.body.medias = mediaData
      }
      await this._updatePostMutation.mutateAsync(data)
      this._queryClient.invalidateQueries({
        queryKey: ['newFeeds']
      })
      this._queryClient.invalidateQueries({
        queryKey: ['post-detail']
      })
      handleSuccess()
    } catch (error) {
      handleError(error)
    }
  }

  handle = async (
    data: { body: updatePostForm; post_id: string },
    handleSuccess: any,
    handleError: any
  ) => {
    await this._updatePostMutation.mutate(data, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['newFeeds']
        })
        this._queryClient.invalidateQueries({
          queryKey: ['post-detail']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._updatePostMutation.isLoading
  }
}

export { UpdatePostCommandHandler }
