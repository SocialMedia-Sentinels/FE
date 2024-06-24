/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useRef } from 'react'
import { Input } from '@mantine/core'
import avatarDefault from 'src/modules/Share/assets/images/375175102_288648613800329_3272443368965320841_n.jpg'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
interface Props {
  onChange?: (file?: File) => void
  previewImage: string
  avatar?: string
  form: any
}

const InputAvatar = ({ onChange, form, previewImage, avatar }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const OnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFormLocal = event.target.files?.[0]
    onChange && onChange(fileFormLocal)
  }

  const handleUploadFile = () => {
    fileInputRef.current?.click()
  }

  return (
    <Fragment>
      <Input
        type='file'
        className='hidden'
        accept='.jpg,.jpeg,.png'
        {...form.getInputProps('avatar')}
        ref={fileInputRef}
        onChange={OnFileChange}
        onClick={(event) => ((event.target as any).value = null)}
      />
      <ButtonCustom
        type='button'
        classNameButton='relative bg-slate-300 rounded-md outline-none w-full pt-[100%]'
        onClick={handleUploadFile}
      >
        <img
          src={previewImage || (avatar && avatar) || avatarDefault}
          alt='avatar'
          className='rounded-md top-0 h-full w-full object-cover object-top absolute'
        />
      </ButtonCustom>
    </Fragment>
  )
}

export default InputAvatar
