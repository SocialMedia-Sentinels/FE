/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import userService from '../user.service'
import { SuggestionsConfig, UserSuggestionInfoType } from '../../interfaces'
import useQuerySuggestionConfig from '../../hooks/useQuerySuggestionConfig'

class GetListSuggestionQuery {
  private _query
  private _querySuggestionConfig

  constructor() {
    this._querySuggestionConfig = useQuerySuggestionConfig()
    this._query = useQuery({
      queryKey: ['suggestion', this._querySuggestionConfig],
      queryFn: () => userService.suggestion(this._querySuggestionConfig as SuggestionsConfig),
      keepPreviousData: true
    })
  }

  fetch() {
    return this._query.data?.data.result.users as UserSuggestionInfoType[]
  }

  getTotalPage() {
    return this._query.data?.data.result.total_page
  }
}

export { GetListSuggestionQuery }
