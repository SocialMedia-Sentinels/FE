/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from '@mantine/form'
import ButtonCustom from '../ButtonCustom'
import { PasswordInput, Button } from '@mantine/core'
import { UserChangePasswordCommandHandler } from 'src/modules/Authentication/services'
import { toast } from 'react-toastify'
interface Props {
  handleCloseModal: () => void
}

const ChangePassword = ({ handleCloseModal }: Props) => {
  const formChangePassword = useForm({
    initialValues: { old_password: '', password: '', confirm_password: '' },
    validate: {
      old_password: (value) => (value.length > 5 ? null : 'Password is required !'),
      password: (value) => (value.length > 5 ? null : 'Password is required !'),
      confirm_password: (value, allValues) => {
        if (value !== allValues.password) {
          return 'Confirm password must match password!'
        } else {
          return value.length > 4 ? null : 'Confirm password is required !'
        }
      }
    }
  })
  const userChangePasswordCommandHandler = new UserChangePasswordCommandHandler()

  const handleSubmit = (data: any) => {
    userChangePasswordCommandHandler.handle(
      data,
      () => {
        handleCloseModal()
      },
      (error: any) => {
        toast.error(error.response?.data?.message)
      }
    )
  }
  return (
    <div className='flex flex-col justify-between md:gap-6 max-md:gap-4 items-center bg-white p-6 rounded-lg w-[480px]'>
      <div className='flex justify-between items-center w-full'>
        <h2 className='md:text-[20px] max-md:text-[12px] font-semibold'>Change Password</h2>
        <ButtonCustom
          classNameButton='p-2 hover:bg-slate-100 rounded-lg'
          onClick={handleCloseModal}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='md:w-6 md:h-6 max-md:w-5 max-md:h-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </ButtonCustom>
      </div>
      <form className='w-full ' onSubmit={formChangePassword.onSubmit(handleSubmit)}>
        <div className='flex flex-col gap-4relative'>
          <PasswordInput
            mt='xl'
            placeholder='Password'
            {...formChangePassword.getInputProps('old_password')}
          />
          <PasswordInput
            mt='xl'
            placeholder='New Password'
            {...formChangePassword.getInputProps('password')}
          />
          <PasswordInput
            mt='xl'
            placeholder='Confirm Password'
            {...formChangePassword.getInputProps('confirm_password')}
          />
          <Button type='submit' variant='filled' className='bg-[#049FEC] mt-6'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
