import { useForm, UseFormReturnType } from '@mantine/form'
import { NewFeed } from '../../interfaces/Post'
import { BackgroundImage, Button, Switch, TagsInput, Textarea } from '@mantine/core'
import { useState } from 'react'
import { UpdatePostCommandHandler } from '../../services'
import { toast } from 'react-toastify'
interface FormValues {
  type: number
  audience: number
  content: string
  parent_id: string
  hashtags: string[]
}
interface Props {
  post: NewFeed
}
const FormEditPost = ({ post }: Props) => {
  const [showImageUpload] = useState<boolean>(post.medias[0].type === 0)
  const [selectedImages] = useState<string[]>(
    post.medias[0].type === 0 ? post.medias.map((media) => media.url) : []
  )

  const [selectedVideo] = useState<string>(post.medias[0].type === 1 ? post.medias[0].url : '')

  const [showVideoUpload] = useState<boolean>(post.medias[0].type === 1)

  const formEditPost: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      type: post.type,
      audience: post.audience,
      content: post.content,
      parent_id: post.parent_id as string,
      hashtags: post.hashtags.map((hashtag) => hashtag.name)
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

  const handleEditPost = (data: any) => {
    console.log(data)

    updatePostCommandHandler.handle(
      { body: data, post_id: post._id },
      () => {
        toast.success('Updated post successfully')
        formEditPost.reset()
        close()
        window.location.reload()
      },
      (error: any) => {
        toast.error(error.response.data.message)
      }
    )
  }
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

      {showImageUpload && selectedImages && (
        <div className='flex flex-row justify-center items-center gap-4'>
          {selectedImages.map((image, index) => {
            return (
              <BackgroundImage
                className='relative shadow-lg w-48 h-48 flex justify-end items-start'
                src={image}
                key={index}
                radius='sm'
              />
            )
          })}
        </div>
      )}

      {showVideoUpload && selectedVideo && (
        <div className='relative w-60 mx-auto'>
          <video className='shadow-lg' src={selectedVideo} controls />
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
