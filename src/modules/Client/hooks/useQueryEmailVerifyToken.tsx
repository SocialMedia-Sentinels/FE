import { isUndefined, omitBy } from 'lodash'
import { useQueryParams } from 'src/modules/Share/hooks'
import { EmailVerifyTokenConfig } from '../interfaces/EmailVerifyToken'

export type QueryEmailVerifyTokenConfig = {
  [key in keyof EmailVerifyTokenConfig]: string
}

const useQueryEmailVerifyTokenConfig = () => {
  const queryEmailVerifyTokenParams: QueryEmailVerifyTokenConfig = useQueryParams()
  const queryEmailVerifyTokenConfig: QueryEmailVerifyTokenConfig = omitBy(
    {
      email_verify_token: queryEmailVerifyTokenParams.email_verify_token
    },
    isUndefined
  )
  return queryEmailVerifyTokenConfig
}

export default useQueryEmailVerifyTokenConfig
