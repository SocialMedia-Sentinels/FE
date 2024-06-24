import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import GoogleIcon from '@mui/icons-material/Google'
import { Button } from '@mantine/core'

const UnAuthenticationPage = () => {
  return (
    <Fragment>
      <div className='px-6 py-8 bg-[#313338] relative rounded-2xl'>
        <div className='w-[520px] flex justify-center flex-col m-auto items-center gap-4'>
          <div className='flex items-center flex-col w-full '>
            <h1 className='text-[40px] text-white '>Happening Now</h1>
            <div className='font-medium'>Join today.</div>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <Button
              type='button'
              variant='filled'
              className='bg-white text-black font-normal rounded-3xl flex justify-center items-center'
            >
              <GoogleIcon className='text-[#049FEC]' />
              Sign up with Google
            </Button>
            <div className='m-auto'>or</div>

            <Link
              to={path.register}
              className='m-auto text-white font-bold text-[14px] rounded-3xl px-6 py-3 bg-[#049FEC]'
            >
              Create Account
            </Link>
          </div>
          <div className='font-medium'>
            By signing up, you agree to the{' '}
            <span className='text-[#049FEC] hover:underline hover:cursor-pointer'>
              Terms of Service
            </span>{' '}
            and{' '}
            <span className='text-[#049FEC] hover:underline hover:cursor-pointer'>
              Privacy Policy
            </span>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <span className='text-white font-normal'>Already have an account?</span>
            <Link
              to={path.login}
              className='m-auto text-[#049FEC] font-bold text-[14px] rounded-3xl px-10 py-3 bg-white'
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default UnAuthenticationPage
