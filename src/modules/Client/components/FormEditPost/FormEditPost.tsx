/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/media-has-caption */
import { useForm, UseFormReturnType } from '@mantine/form'
import { NewFeed } from '../../interfaces/Post'
import { BackgroundImage, Button, Switch, TagsInput, Textarea } from '@mantine/core'
import { useState } from 'react'
import { UpdatePostCommandHandler } from '../../services'
import { toast } from 'react-toastify'
import { IconPhotoScan, IconVideo } from '@tabler/icons-react'
interface FormValues {
  type: number
  audience: number
  content: string
  parent_id: string
  hashtags: string[]
  medias: Object[]
}
interface Props {
  post: NewFeed
  closeModal: () => void
}
const FormEditPost = ({ post, closeModal }: Props) => {
  // console.log(post)

  const [showImageUpload, setShowImageUpload] = useState<boolean>(
    post.medias.length > 0 && post.medias[0].type === 0
  )
  const [selectedImages, setSelectedImages] = useState<string[]>(
    post.medias.length > 0 && post.medias[0].type === 0 ? post.medias.map((media) => media.url) : []
  )
  const [selectedFilesImage, setSelectedFilesImage] = useState<File[]>([])

  const [showVideoUpload, setShowVideoUpload] = useState<boolean>(
    post.medias.length > 0 && post.medias[0].type === 1
  )
  const [selectedVideo, setSelectedVideo] = useState<string>(
    post.medias.length > 0 && post.medias[0].type === 1 ? post.medias[0].url : ''
  )
  const [selectedFileVideo, setSelectedFileVideo] = useState<File[]>([])

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFilesArray = Array.from(event.target.files as FileList)
    if (selectedFilesArray.length > 4) {
      toast.error('You can only upload 4 images at a time')
      return
    }
    setSelectedFilesImage((previousFiles) => previousFiles.concat(selectedFilesArray))
    const imagesArray = selectedFilesArray.map((file) => URL.createObjectURL(file))
    setSelectedImages((previousImages) => previousImages.concat(imagesArray))

    const newMedias = selectedFilesArray.map((file) => ({
      type: 0,
      url: URL.createObjectURL(file)
    }))
    formEditPost.setFieldValue('medias', [...formEditPost.values.medias, ...newMedias])
  }

  const handleRemoveImage = (image: string) => {
    const index = selectedImages.indexOf(image)
    if (index > -1) {
      const updatedImages = selectedImages.filter((_, i) => i !== index)
      const updatedFiles = selectedFilesImage.filter((_, i) => i !== index)
      setSelectedImages(updatedImages)
      setSelectedFilesImage(updatedFiles)

      const updatedMedias = formEditPost.values.medias.filter((media: any) => media.url !== image)
      formEditPost.setFieldValue('medias', updatedMedias)
    }
  }
  const onSelectFileVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFileVideo(Array.from(event.target.files as FileList))
    if (event.target.files) {
      const videoUrl = URL.createObjectURL(event.target.files[0] as File)
      setSelectedVideo(videoUrl)
      formEditPost.setFieldValue('medias', [
        ...formEditPost.values.medias,
        { type: 1, url: videoUrl }
      ])
    }
  }
  const handleRemoveVideo = () => {
    setSelectedVideo('')
    setSelectedFileVideo([])
    const updatedMedias = formEditPost.values.medias.filter((media: any) => media.type !== 1)
    formEditPost.setFieldValue('medias', updatedMedias)
  }
  const formEditPost: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      type: post.type,
      audience: post.audience,
      content: post.content,
      parent_id: post.parent_id as string,
      hashtags: post.hashtags.map((hashtag) => hashtag.name),
      medias: post.medias.map((medias) => medias)
    },
    validate: {
      content: (value) => (value.length > 0 ? null : 'Content is required!')
    }
  })
  const [switchLabel, setSwitchLabel] = useState<string>('Everyone')
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked
    formEditPost.setFieldValue('audience', isChecked ? 1 : 0)
    setSwitchLabel(isChecked ? 'Follower' : 'Everyone')
  }
  const handleTagsChange = (tags: string[]) => {
    formEditPost.setFieldValue('hashtags', tags)
  }
  const updatePostCommandHandler = new UpdatePostCommandHandler()

  const handleEditPost = async (data: any) => {
    try {
      if (selectedFilesImage.length > 0) {
        await updatePostCommandHandler.handleUpdatePostWithImage(
          { body: data, post_id: post._id },
          selectedFilesImage,
          () => {
            formEditPost.reset()
            closeModal()
            setSelectedImages([])
            setSelectedFilesImage([])
          },
          (error: any) => {
            toast.error(error)
          }
        )
      } else if (selectedFileVideo.length > 0) {
        await updatePostCommandHandler.handleUpdatePostWithVideo(
          { body: data, post_id: post._id },
          selectedFileVideo,
          () => {
            formEditPost.reset()
            closeModal()
            setSelectedVideo('')
            setSelectedFileVideo([])
          },
          (error: any) => {
            toast.error(error)
          }
        )
      } else {
        await updatePostCommandHandler.handle(
          { body: data, post_id: post._id },
          () => {
            formEditPost.reset()
            closeModal()
          },
          (error: any) => {
            toast.error(error.response.data.message)
          }
        )
      }
    } catch (error) {
      toast.error('Failed to update post')
    }
  }

  // console.log('selectedFilesImage', selectedFilesImage)

  // console.log('selectedImages', selectedImages)
  // console.log('selectedFilesImage', selectedFilesImage)

  return (
    <form className='flex flex-col gap-4' onSubmit={formEditPost.onSubmit(handleEditPost)}>
      <Switch
        checked={formEditPost.values.audience === 1}
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
        {...formEditPost.getInputProps('content')}
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
          {selectedImages.length < 1 && (
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
                    className='top-2 right-1 !rounded-full !bg-[#3E4042] !p-0 !min-w-0 w-6 h-6'
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
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
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
          {selectedVideo && (
            // eslint-disable-next-line react/jsx-key
            <div className='relative w-60'>
              <video className='shadow-lg' src={selectedVideo} controls />
              <Button
                className='top-0 right-0 !absolute !rounded-full !bg-black !p-0 !min-w-0 w-6 h-6'
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
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                </svg>
              </Button>
            </div>
          )}
        </div>
      )}
      <TagsInput
        variant='unstyled'
        placeholder='Enter hashtag'
        value={formEditPost.values.hashtags}
        onChange={handleTagsChange}
      />
      <Button className='w-full !py-1 bg-[#3572EF]' type='submit' variant='filled'>
        Update
      </Button>
    </form>
  )
}

export default FormEditPost
