import { Autocomplete, Button, Textarea, TextInput } from '@mantine/core'
import { User } from '../../interfaces'
import { DatePickerInput } from '@mantine/dates'
import '@mantine/dates/styles.css'
import { useForm, zodResolver } from '@mantine/form'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { UpdateMeCommandHandler } from '../../services'
import { dataLocation } from 'src/modules/Share/constants/data'

interface Props {
  handleCloseModal: () => void
  profile: User
  updateMeCommandHandler: UpdateMeCommandHandler
}
const EditProfile = ({ handleCloseModal, profile, updateMeCommandHandler }: Props) => {
  const schema = z.object({
    username: z.string().min(5, { message: 'Username should have at least 5 letters' }),
    bio: z.string().max(200, { message: 'Bio must be from 1 to 200 characters' }),
    location: z.string().max(100, { message: 'Location must be between 1 and 100 characters' })
  })
  const formEditProfile = useForm({
    initialValues: {
      username: profile.username,
      date_of_birth: new Date(profile.date_of_birth),
      bio: profile.bio,
      location: profile.location,
      avatar: profile.avatar
    },
    validate: zodResolver(schema)
  })
  const handleFormClose = () => {
    formEditProfile.reset()
    handleCloseModal()
  }
  const handleSubmitForm = (data: any) => {
    const formData = { ...data }
    if (formData.username === profile.username) {
      delete formData.username
    }
    handleUpdateProfile(formData)
  }

  const handleUpdateProfile = (data: any) => {
    updateMeCommandHandler.handle(
      data,
      () => {
        handleCloseModal()
      },
      (error: any) => {
        toast.error(error.response?.data?.message)
        formEditProfile.setErrors({
          username: error.response.data.errors.username?.msg,
          bio: error.response.data.errors.bio?.msg,
          location: error.response.data.errors.location?.msg
        })
      }
    )
  }
  return (
    <div className='flex flex-col justify-between md:gap-6 max-md:gap-4  bg-white p-6 rounded-lg w-[700px]'>
      <div className='flex justify-between items-center w-full'>
        <h2 className='md:text-[20px] max-md:text-[12px] font-Rajdhani font-semibold'>
          Edit Profile
        </h2>
        <Button className='p-2 hover:bg-slate-100 rounded-lg' onClick={handleFormClose}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='md:w-6 md:h-6 max-md:w-5 max-md:h-5 text-[#433c3c]'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </Button>
      </div>
      <form onSubmit={formEditProfile.onSubmit(handleSubmitForm)}>
        <div className='flex flex-col gap-4relative'>
          <TextInput
            mt='sm'
            label='Username'
            placeholder='Username'
            {...formEditProfile.getInputProps('username')}
          />
          <Textarea
            mt='sm'
            label='Bio'
            placeholder='Bio'
            {...formEditProfile.getInputProps('bio')}
          />
          <DatePickerInput
            label='Date of Birth'
            mt='sm'
            value={new Date(formEditProfile.values.date_of_birth)}
            onChange={(value) => {
              if (value) {
                formEditProfile.setFieldValue('date_of_birth', new Date(value))
              }
            }}
            maxDate={new Date()}
          />
          <Autocomplete
            mt={'sm'}
            label='Location'
            placeholder='Select your location'
            data={dataLocation}
            value={formEditProfile.values.location}
            onChange={(value) => formEditProfile.setFieldValue('location', value)}
          />
          <Button type='submit' variant='filled' className='bg-[#049FEC] mt-6'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
