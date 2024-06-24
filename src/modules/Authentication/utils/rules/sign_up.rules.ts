import * as yup from 'yup'
export const ClientRegisterSchema = yup.object({
  email: yup.string().trim().required('Email is required !'),
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must be at most 32 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character')
    .matches(/[@#$%^&*!]/, 'Password must contain at least one special character: @#$%^&*!'),
  confirm_password: yup
    .string()
    .trim()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Confirm Password is not match'),
  username: yup.string().trim().required('Username is required'),
  date_of_birth: yup.string().required('Date of birth is required'),
  gender: yup.boolean().required('Gender is required')
})

export type ClientRegisterType = yup.InferType<typeof ClientRegisterSchema>
