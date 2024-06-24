import { Button, PasswordInput } from '@mantine/core'
interface Props {
  formResetPassword: any
  handleSubmitForm: (data: any) => void
}
const ResetPasswordForm = ({ handleSubmitForm, formResetPassword }: Props) => {
  return (
    <div className='px-16 py-10 bg-white w-[484px] rounded-b-md relative'>
      <img
        className='absolute top-[-40px] left-[-80px]'
        src='/src/modules/Share/assets/images/rocket.png'
        alt='rocket'
      />
      <h2 className='text-2xl text-center font-bold text-[#3e3f5e] mb-4'>Forgot password</h2>
      <form
        className='relative flex flex-col gap-2'
        onSubmit={formResetPassword.onSubmit(handleSubmitForm)}
      >
        <PasswordInput
          mt='sm'
          label='New Password'
          placeholder='Password'
          {...formResetPassword.getInputProps('password')}
        />
        <PasswordInput
          mt='sm'
          label='Confirm Password'
          placeholder='Confirm Password'
          {...formResetPassword.getInputProps('confirm_password')}
        />

        <Button variant='filled' type='submit' className='bg-[#049FEC] mt-6 '>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default ResetPasswordForm
