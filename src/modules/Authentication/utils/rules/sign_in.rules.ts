import * as yup from 'yup'

export const ClientLoginSchema = yup.object({
  email: yup.string().trim().required('Email is required !'),
  password: yup.string().trim().required('Password is required !')
})

export type ClientLoginType = yup.InferType<typeof ClientLoginSchema>

export const AdminLoginSchema = yup.object({
  email: yup.string().trim().required('Vui lòng nhập Email hoặc tên đăng nhập !'),
  password: yup.string().trim().required('Vui lòng nhập mật khẩu !')
})

export type AdminLoginType = yup.InferType<typeof AdminLoginSchema>
