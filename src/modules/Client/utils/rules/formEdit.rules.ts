import * as yup from 'yup'

export const FormEditProfileSchema = yup.object({
  username: yup.string().trim().required('Username is required '),
  bio: yup
    .string()
    .trim()
    .min(1, 'Bio must be from 1 to 200 characters')
    .max(200, 'Bio must be from 1 to 200 characters'),
  location: yup.string().trim(),
  date_of_birth: yup
    .string()
    .required('Date of birth is required')
    .test('is_before_today', 'Date of birth must be less than current date !', function (value) {
      if (!value) {
        return true
      }
      const birth = new Date(value)
      const today = new Date()
      return birth < today
    }),
  avatar: yup.string(),
  cover_photo: yup.string()
})

export type FormEditProfileType = yup.InferType<typeof FormEditProfileSchema>
