import http from 'src/modules/Share/utils/http'

const mediaService = {
  uploadImage: (body: FormData) =>
    http.post('/medias/upload-image', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),

  uploadVideo: (body: FormData) =>
    http.post('/medias/upload-video', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

export default mediaService
