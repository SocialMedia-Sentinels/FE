import { FileInput } from '@mantine/core'
import { Button } from '@mui/material'
interface Props {
  handleCloseModalUploadAvatar: () => void
  handleChangeAvatar: (file: File) => void
}
const FormUploadAvatar = ({ handleCloseModalUploadAvatar, handleChangeAvatar }: Props) => {
  return (
    <div className='flex flex-col justify-between items-center md:gap-6 max-md:gap-4  bg-white p-6 rounded-lg w-[400px]'>
      <h2 className='text-[20px] font-Rajdhani font-semibold'>Change Profile Photo</h2>
      <FileInput
        placeholder='Choose your new profile avatar'
        accept='image/png,image/jpg,image/jpeg'
        onChange={(files) => handleChangeAvatar(files as File)}
      />

      <Button onClick={handleCloseModalUploadAvatar}>Cancel</Button>
    </div>
  )
}

export default FormUploadAvatar
