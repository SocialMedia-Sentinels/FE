import { useContext, useEffect, useState } from 'react'
import useQueryEmailVerifyTokenConfig from '../../hooks/useQueryEmailVerifyToken'
import { VerifyEmailCommandHandler } from '../../services/VerifyEmail/verifyEmail.command-handler'
import { AuthResponse } from 'src/modules/Authentication/interfaces'
import {
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage
} from 'src/modules/Authentication/utils'
import { AppContext } from 'src/modules/Share/contexts'

const VerifyEmailPage = () => {
  const { setIsAuthenticated } = useContext(AppContext)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const queryEmailVerifyTokenConfig = useQueryEmailVerifyTokenConfig()
  const isValidData = queryEmailVerifyTokenConfig.email_verify_token && !isSuccess

  useEffect(() => {
    if (isValidData) {
      const verifyEmailCommandHandler = new VerifyEmailCommandHandler()
      const body = {
        email_verify_token: queryEmailVerifyTokenConfig.email_verify_token as string
      }

      verifyEmailCommandHandler.handle(
        body,
        (response: AuthResponse) => {
          setIsSuccess(true)
          setAccessTokenToLocalStorage(response.result.access_token)
          setRefreshTokenToLocalStorage(response.result.refresh_token)
          setIsAuthenticated(true)
          setIsLoading(false)
        },
        (error: any) => {
          if (
            error.response.status === 401 ||
            error.response.status === 404 ||
            error.response.status === 422
          ) {
            setIsSuccess(false)
            setIsLoading(false)
          }
        }
      )
    }
  }, [queryEmailVerifyTokenConfig.email_verify_token, isSuccess])

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='flex h-[calc(100vh-80px)] w-full items-center justify-center bg-white p-5'>
        {isLoading && !isSuccess && (
          <div className='flex flex-col items-center'>
            <div className='flex space-x-2 justify-center items-center bg-white'>
              <span className='sr-only'>Loading...</span>
              <div className='h-5 w-5 bg-[#25C6DA] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
              <div className='h-5 w-5 bg-[#25C6DA] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
              <div className='h-5 w-5 bg-[#25C6DA] rounded-full animate-bounce'></div>
            </div>
            <h1 className='mt-5 text-[20px] font-bold text-slate-800 lg:text-[30px]'>
              Processing request
            </h1>
          </div>
        )}
        {isSuccess && isLoading && (
          <div className='text-center'>
            <div className='inline-flex rounded-full bg-[#c6ffe2] p-4'>
              <div className='rounded-full bg-[#97f0c3] stroke-[#49ec90] p-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 text-[#108e36]/80 text-[16px] font-bold'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                </svg>
              </div>
            </div>
            <h1 className='mt-5 text-[20px] font-bold text-slate-800 lg:text-[30px]'>
              Email already verified
            </h1>
          </div>
        )}
        {isSuccess && !isLoading && (
          <div className='text-center'>
            <div className='inline-flex rounded-full bg-[#c6ffe2] p-4'>
              <div className='rounded-full bg-[#97f0c3] stroke-[#49ec90] p-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 text-[#108e36]/80 text-[16px] font-bold'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                </svg>
              </div>
            </div>
            <h1 className='mt-5 text-[20px] font-bold text-slate-800 lg:text-[30px]'>
              Verify Email Successfully
            </h1>
          </div>
        )}
        {!isSuccess && !isLoading && (
          <div className='text-center'>
            <div className='inline-flex rounded-full bg-[#f6c5ce] p-4'>
              <div className='rounded-full bg-[#ff98aa] stroke-[#f6c5ce] p-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 text-[#FF003F]/80 text-[16px] font-bold'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
                  />
                </svg>
              </div>
            </div>
            <h1 className='mt-5 text-[20px] font-bold text-slate-800 lg:text-[30px]'>
              Token is incorrect or user cannot be found
            </h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyEmailPage
