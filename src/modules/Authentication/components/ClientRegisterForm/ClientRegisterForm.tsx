/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Button, Chip, Group, PasswordInput, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import '@mantine/dates/styles.css'
import { UserRegisterCommandHandler } from '../../services'
import { dataLocation } from 'src/modules/Share/constants/data'
import rocket from 'src/modules/Share/assets/images/rocket.png'

interface Props {
  formRegister: any
  handleSubmit: (data: any) => void
  userRegisterCommandHandler: UserRegisterCommandHandler
}
const ClientRegisterForm = ({ formRegister, handleSubmit, userRegisterCommandHandler }: Props) => {
  return (
    <div className='p-10 bg-white w-[484px] rounded-b-md '>
      <img src={rocket} alt='rocket' className='top-[-8px] absolute left-[-80px]' />
      <h2 className='text-2xl text-center font-bold text-[#3e3f5e]'>Create an account</h2>
      <form className='grid grid-cols-2 gap-4' onSubmit={formRegister.onSubmit(handleSubmit)}>
        <TextInput
          mt='sm'
          label='Email'
          placeholder='Email'
          {...formRegister.getInputProps('email')}
        />
        <TextInput
          mt='sm'
          label='Username'
          placeholder='Username'
          {...formRegister.getInputProps('username')}
        />
        <Chip.Group {...formRegister.getInputProps('gender')}>
          <div className='mt-4 '>
            <label>Gender</label>
            <Group justify='start' mt={'xs'}>
              <Chip value='1'>Male</Chip>
              <Chip value='0'>Female</Chip>
            </Group>
          </div>
        </Chip.Group>
        <TextInput
          mt={'sm'}
          label='Phone number'
          placeholder='Enter your phone number'
          hideControls
          {...formRegister.getInputProps('phone_number')}
        />

        <PasswordInput
          mt='sm'
          label='Password'
          placeholder='Password'
          {...formRegister.getInputProps('password')}
        />
        <PasswordInput
          mt='sm'
          label='Confirm Password'
          placeholder='Confirm Password'
          {...formRegister.getInputProps('confirm_password')}
        />
        <Autocomplete
          mt={'sm'}
          label='Location'
          placeholder='Select your location'
          data={dataLocation}
          onChange={(value) => formRegister.setFieldValue('location', value)}
        />
        <DatePickerInput
          mt='sm'
          label='Date of birth'
          defaultValue={new Date()}
          onChange={(value) => formRegister.setFieldValue('date_of_birth', value)}
          excludeDate={(date) => date < new Date(new Date().getFullYear() - 10)}
        />

        <Button
          type='submit'
          variant='filled'
          className='bg-[#049FEC] col-span-2'
          loading={userRegisterCommandHandler.isLoading()}
        >
          Submit
        </Button>
      </form>
    </div>
  )
}

export default ClientRegisterForm
