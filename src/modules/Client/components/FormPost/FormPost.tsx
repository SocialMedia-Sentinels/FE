import { Modal, Switch, Textarea, TagsInput, BackgroundImage } from '@mantine/core'
import { useState } from 'react'
import { Avatar, Button } from '@mui/material'
import { CreatePostCommandHandler } from '../../services'
import { toast } from 'react-toastify'
import { useForm, UseFormReturnType } from '@mantine/form'
import { User } from '../../interfaces'
import { IconPhotoScan, IconVideo } from '@tabler/icons-react'

interface Props {
  profileUser?: User
  opened: boolean
  open: () => void
  close: () => void
}
interface FormValues {
  type: number
  audience: number
  content: string
  parent_id: null
  hashtags: string[]
  medias: string[]
}
const FormPost = ({ profileUser, open, opened, close }: Props) => {
  const formCreatePost: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      type: 0,
      audience: 0,
      content: '',
      parent_id: null,
      hashtags: [],
      medias: []
    },
    validate: {
      content: (value) => (value.length > 0 ? null : 'Content is required!')
    }
  })

  const [switchLabel, setSwitchLabel] = useState<string>('Everyone')
  const [showImageUpload, setShowImageUpload] = useState<boolean>(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedFilesImage, setSelectedFilesImage] = useState<File[]>([])

  const [showVideoUpload, setShowVideoUpload] = useState<boolean>(false)
  const [selectedVideo, setSelectedVideo] = useState<string>('')
  const [selectedFileVideo, setSelectedFileVideo] = useState<File[]>([])

  const createPostCommandHandler = new CreatePostCommandHandler()
  const handleCreatePost = (data: any) => {
    if (selectedFilesImage.length > 0) {
      createPostCommandHandler.handleCreatePostWithImage(
        data,
        selectedFilesImage,
        () => {
          toast.success('Create post successfully')
          formCreatePost.reset()
          setSelectedImages([])
          setSelectedFilesImage([])
          close()
          window.location.reload()
        },
        (error: any) => {
          toast.error(error.response.data.message)
          formCreatePost.setErrors({
            content: error.response.data.error.content?.msg
          })
        }
      )
    } else if (selectedFileVideo.length > 0) {
      createPostCommandHandler.handleCreatePostWithVideo(
        data,
        selectedFileVideo,
        () => {
          toast.success('Create post successfully')
          formCreatePost.reset()
          setSelectedVideo('')
          setSelectedFileVideo([])
          close()
          window.location.reload()
        },
        (error: any) => {
          toast.error(error.response.data.message)
          formCreatePost.setErrors({
            content: error.response.data.error.content?.msg
          })
        }
      )
    }
  }
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked
    formCreatePost.setFieldValue('audience', isChecked ? 1 : 0)
    setSwitchLabel(isChecked ? 'Follower' : 'Everyone')
  }
  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFilesArray = Array.from(event.target.files as FileList)
    setSelectedFilesImage((previousFiles) => previousFiles.concat(selectedFilesArray))
    const imagesArray = selectedFilesArray.map((file) => URL.createObjectURL(file))
    setSelectedImages((previousImages) => previousImages.concat(imagesArray))
  }

  const handleRemoveImage = (image: string) => {
    const index = selectedImages.indexOf(image)
    if (index > -1) {
      const updatedImages = selectedImages.filter((_, i) => i !== index)
      const updatedFiles = selectedFilesImage.filter((_, i) => i !== index)
      setSelectedImages(updatedImages)
      setSelectedFilesImage(updatedFiles)
    }
  }
  const onSelectFileVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFileVideo(Array.from(event.target.files as FileList))
    if (event.target.files) {
      setSelectedVideo(URL.createObjectURL(event.target.files[0] as File))
    }
  }
  const handleRemoveVideo = () => {
    setSelectedVideo('')
    setSelectedFileVideo([])
  }
  const handleTagsChange = (tags: string[]) => {
    formCreatePost.setFieldValue('hashtags', tags)
  }

  return (
    <div className='flex justify-center items-center w-full gap-2'>
      <Modal
        size={'xl'}
        opened={opened}
        onClose={() => {
          close()
          setShowImageUpload(false)
          setShowVideoUpload(false)
          setSelectedImages([])
          setSelectedFilesImage([])
          setSelectedVideo('')
          setSelectedFileVideo([])
        }}
        title='Create Post'
        centered
      >
        <form className='flex flex-col gap-4' onSubmit={formCreatePost.onSubmit(handleCreatePost)}>
          <Switch
            checked={formCreatePost.values.audience === 1}
            label={switchLabel}
            classNames={{
              label: 'text-[12px] font-normal text-[#3e3f5e]',
              track: ' w-[2px]'
            }}
            onChange={handleSwitchChange}
          />
          <Textarea
            variant='unstyled'
            placeholder='What do you think?'
            autosize
            minRows={4}
            {...formCreatePost.getInputProps('content')}
          />
          <div className='flex justify-start items-center'>
            <IconVideo
              size={'50'}
              onClick={() => {
                setShowImageUpload(false),
                  setShowVideoUpload(true),
                  setSelectedImages([]),
                  setSelectedFilesImage([])
              }}
              style={{
                border: showVideoUpload ? '1px solid' : 'none',
                borderRadius: '10px',
                backgroundColor: showVideoUpload ? '#A1DD70' : '#fff'
              }}
            />
            <IconPhotoScan
              size={'50'}
              onClick={() => {
                setShowImageUpload(true),
                  setShowVideoUpload(false),
                  setSelectedFileVideo([]),
                  setSelectedVideo('')
              }}
              style={{
                border: showImageUpload ? '1px solid' : 'none',
                borderRadius: '10px',
                backgroundColor: showImageUpload ? '#A1DD70' : '#fff'
              }}
            />
          </div>
          {showImageUpload && (
            <div className='flex flex-row justify-center items-center gap-4'>
              {selectedImages.length < 4 && (
                <label className='cursor-pointer font-Titillium border text-[12px] p-10 rounded-lg'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-10 h-10'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                  </svg>

                  <input
                    type='file'
                    name='images'
                    multiple
                    onChange={onSelectFile}
                    accept='image/png, image/jpeg'
                    className='hidden'
                  />
                </label>
              )}
              {selectedImages &&
                selectedImages.map((image, index) => {
                  return (
                    <BackgroundImage
                      className='relative shadow-lg w-48 h-48 flex justify-end items-start'
                      src={image}
                      key={index}
                      radius='sm'
                    >
                      <Button
                        className='top-2 right-1 !rounded-full !bg-[#3E4042] !p-0 !min-w-0'
                        onClick={() => handleRemoveImage(image)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6 text-[#7E8184]'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6 18 18 6M6 6l12 12'
                          />
                        </svg>
                      </Button>
                    </BackgroundImage>
                  )
                })}
            </div>
          )}
          {showVideoUpload && (
            <div className='flex justify-center items-center gap-4'>
              {selectedVideo == '' && (
                <label className='cursor-pointer font-Titillium border text-[12px] p-10 rounded-lg'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-10 h-10'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                  </svg>

                  <input
                    type='file'
                    name='images'
                    multiple
                    onChange={onSelectFileVideo}
                    accept='video/mp4, video/quicktime'
                    className='hidden'
                  />
                </label>
              )}
              {selectedFileVideo &&
                selectedFileVideo.map((video, index) => {
                  return (
                    <div className='relative w-60'>
                      <video
                        className='shadow-lg'
                        src={URL.createObjectURL(video)}
                        key={index}
                        controls
                      />
                      <Button
                        className='top-0 right-0 !absolute !rounded-full !bg-black !p-0 !min-w-0'
                        onClick={handleRemoveVideo}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6 text-[#7E8184]'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6 18 18 6M6 6l12 12'
                          />
                        </svg>
                      </Button>
                    </div>
                  )
                })}
            </div>
          )}
          <TagsInput
            variant='unstyled'
            placeholder='Enter hashtag'
            value={formCreatePost.values.hashtags}
            onChange={handleTagsChange}
          />
          <Button className='w-full !py-1' type='submit' variant='contained' color='primary'>
            Create
          </Button>
        </form>
      </Modal>
      <div
        className='px-3 py-1 flex items-end flex-row justify-start relative border-2 w-full rounded-3xl'
        role='button'
        onClick={open}
      >
        <div className='w-full flex items-center gap-2'>
          <Avatar src={profileUser?.avatar} />
          <span>What do you think?</span>
        </div>
      </div>
    </div>
  )
}

export default FormPost
