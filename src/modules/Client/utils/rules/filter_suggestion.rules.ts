import * as yup from 'yup'

export const FormFilterSuggestionSchema = yup.object({
  location: yup.string(),
  gender: yup.string(),
  search: yup.string().trim()
})

export type FormFilterSuggestionType = yup.InferType<typeof FormFilterSuggestionSchema>
