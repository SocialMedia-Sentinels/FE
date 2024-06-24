/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreatePostTypeBody } from '../../utils'
import postService from './post.service'
import mediaService from 'src/modules/Share/services/Media/media.service'

class CreatePostCommandHandler {
  private _queryClient
  private _createPostMutation
  private _uploadImageMutation
  private _uploadVideoMutation
  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(mediaService.uploadImage)
    this._uploadVideoMutation = useMutation(mediaService.uploadVideo)
    this._createPostMutation = useMutation({
      mutationFn: (body: CreatePostTypeBody) => postService.createPost(body)
    })
  }

  handleCreatePostWithImage = async (
    data: CreatePostTypeBody,
    files: File[],
    handleSuccess: any,
    handleError: any
  ) => {
    try {
      if (files.length === 0) {
        data.medias = []
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

        data.medias = mediaData
      }

      this._createPostMutation.mutate(data, {
        onSuccess: () => {
          this._queryClient.invalidateQueries({
            queryKey: ['my-posts']
          })
          this._queryClient.refetchQueries({
            queryKey: ['new-feeds']
          })
          handleSuccess()
        },
        onError: (error: any) => {
          handleError(error)
        }
      })
    } catch (error) {
      handleError(error)
    }
  }
  handleCreatePostWithVideo = async (
    data: CreatePostTypeBody,
    files: File[],
    handleSuccess: any,
    handleError: any
  ) => {
    try {
      if (files.length === 0) {
        data.medias = []
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

        data.medias = mediaData
      }

      this._createPostMutation.mutate(data, {
        onSuccess: () => {
          this._queryClient.invalidateQueries({
            queryKey: ['my-posts']
          })
          this._queryClient.refetchQueries({
            queryKey: ['new-feeds']
          })
          handleSuccess()
        },
        onError: (error: any) => {
          handleError(error)
        }
      })
    } catch (error) {
      handleError(error)
    }
  }

  share = async (data: CreatePostTypeBody, handleSuccess: any, handleError: any) => {
    return this._createPostMutation.mutate(data, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['posts']
        })
        this._queryClient.invalidateQueries({
          queryKey: ['new-feeds']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
  isLoading() {
    return this._createPostMutation.isLoading
  }
}

export { CreatePostCommandHandler }
