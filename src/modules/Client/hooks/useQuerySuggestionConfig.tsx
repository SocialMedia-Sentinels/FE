import { useQueryParams } from 'src/modules/Share/hooks'
import { isUndefined, omitBy } from 'lodash'
import { SuggestionsConfig } from '../interfaces'
export type QuerySuggestionConfig = {
  [key in keyof SuggestionsConfig]: string
}
const useQuerySuggestionConfig = () => {
  const querySuggestionParams: QuerySuggestionConfig = useQueryParams()
  const querySuggestionConfig: QuerySuggestionConfig = omitBy(
    {
      search: querySuggestionParams.search,
      gender: querySuggestionParams.gender,
      location: querySuggestionParams.location,
      page: querySuggestionParams.page || 1,
      limit: querySuggestionParams.limit || 9
    },
    isUndefined
  )
  return querySuggestionConfig
}

export default useQuerySuggestionConfig
