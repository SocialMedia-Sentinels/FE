import { useQueryParams } from 'src/modules/Share/hooks'
import { isUndefined, omitBy } from 'lodash'
import { NewFeedsConfig } from '../interfaces/Post'

export type QueryPostConfig = {
  [key in keyof NewFeedsConfig]: string
}

const useQueryPostConfig = () => {
  const queryEventParams: QueryPostConfig = useQueryParams()
  const queryEventConfig: QueryPostConfig = omitBy(
    {
      limit: queryEventParams.limit || 10,
      page: queryEventParams.page || 1,
      sort: queryEventParams.sort || 'none'
    },
    isUndefined
  )
  return queryEventConfig
}

export default useQueryPostConfig
