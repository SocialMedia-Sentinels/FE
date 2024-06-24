import { useQueryParams } from 'src/modules/Share/hooks'
import { isUndefined, omitBy } from 'lodash'
import { SearchConfig } from '../interfaces'
export type QuerySearchConfig = {
  [key in keyof SearchConfig]: string
}
const useQuerySearchConfig = () => {
  const querySearchParams: QuerySearchConfig = useQueryParams()
  const querySearchConfig: QuerySearchConfig = omitBy(
    {
      content: querySearchParams.content,
      page: querySearchParams.page || 1,
      limit: querySearchParams.limit || 10
    },
    isUndefined
  )
  return querySearchConfig
}

export default useQuerySearchConfig
