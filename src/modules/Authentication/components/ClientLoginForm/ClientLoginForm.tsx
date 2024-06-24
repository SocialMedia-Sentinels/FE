/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { UserLoginCommandHandler } from '../../services'
import rocket from 'src/modules/Share/assets/images/rocket.png'
interface Props {
  formLogin: any
  handleLogin: (data: any) => void
  userLoginCommandHandler: UserLoginCommandHandler
}
const ClientLoginForm = ({ formLogin, handleLogin, userLoginCommandHandler }: Props) => {
  return (
    <div className='px-16 py-10 bg-white w-[484px] rounded-b-md '>
      <img src={rocket} alt='rocket' className='top-[-8px] absolute left-[-80px]' />
      <h2 className='text-2xl text-center font-bold text-[#3e3f5e]'>Account Login</h2>
      <form className='relative flex flex-col' onSubmit={formLogin.onSubmit(handleLogin)}>
        <TextInput
          mt='sm'
          label='Email'
          placeholder='Email'
          {...formLogin.getInputProps('email')}
        />
        <PasswordInput
          label='Password'
          mt='sm'
          placeholder='Password'
          {...formLogin.getInputProps('password')}
        />
        <Link
          to={path.forget_password}
          className='mt-4 mb-2 mr-auto text-[#049FEC] text-[14px] hover:underline'
        >
          Forgot password ?
        </Link>
        <Button
          type='submit'
          variant='filled'
          className='bg-[#049FEC]'
          loading={userLoginCommandHandler.isLoading()}
        >
          Log In
        </Button>
      </form>
    </div>
  )
}

export default ClientLoginForm
