/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, rem, TextInput, useMantineTheme } from '@mantine/core'
import { IconArrowRight, IconMail } from '@tabler/icons-react'
import rocket from 'src/modules/Share/assets/images/rocket.png'

interface Props {
  formForgotPassword: any
  handleSubmitForm: (data: any) => void
}
const ForgotPasswordForm = ({ formForgotPassword, handleSubmitForm }: Props) => {
  const theme = useMantineTheme()

  return (
    <div className='px-16 py-10 bg-white w-[484px] rounded-b-md relative'>
      <img src={rocket} alt='rocket' className='top-[-40px] absolute left-[-80px]' />
      <h2 className='text-2xl text-center font-bold text-[#3e3f5e] mb-4'>Forgot password</h2>
      <form
        className='relative flex flex-col gap-2 '
        onSubmit={formForgotPassword.onSubmit(handleSubmitForm)}
      >
        <TextInput
          radius='xl'
          size='md'
          placeholder='Email'
          rightSectionWidth={42}
          leftSection={<IconMail style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
          rightSection={
            <ActionIcon
              size={32}
              radius='xl'
              color={theme.primaryColor}
              variant='filled'
              className='bg-[#049FEC]'
            >
              <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          }
          {...formForgotPassword.getInputProps('email')}
        />
      </form>
    </div>
  )
}

export default ForgotPasswordForm
