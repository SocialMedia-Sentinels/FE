/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateMeForm } from '../../interfaces'
import userService from '../user.service'
import mediaService from 'src/modules/Share/services/Media/media.service'

class UpdateMeCommandHandler {
  private _queryClient
  private _uploadImageMutation
  private _updateMeMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._uploadImageMutation = useMutation(mediaService.uploadImage)
    this._updateMeMutation = useMutation({
      mutationFn: (body: updateMeForm) => userService.updateMe(body)
    })
  }

  upload = async (file: File, handleSuccess: any, handleError: any) => {
    const formData = new FormData()
    formData.append('image', file)
    await this._uploadImageMutation.mutate(formData, {
      onSuccess: (data: any) => {
        handleSuccess(data)
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  handle = async (data: updateMeForm, handleSuccess: any, handleError: any) => {
    await this._updateMeMutation.mutate(data, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['profile']
        })
        this._queryClient.invalidateQueries({
          queryKey: ['user']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._updateMeMutation.isLoading || this._uploadImageMutation.isLoading
  }
}

export { UpdateMeCommandHandler }
