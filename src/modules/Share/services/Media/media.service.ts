import http from 'src/modules/Share/utils/http'

const mediaService = {
  uploadImage: async (body: FormData) =>
    await http.post('/medias/upload-image', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),

  uploadVideo: async (body: FormData) =>
    await http.post('/medias/upload-video', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

export default mediaService
