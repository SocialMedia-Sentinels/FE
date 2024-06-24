import { BackgroundImage, Button, Card, Switch, TagsInput, Text, Textarea } from '@mantine/core'
import { useForm, UseFormReturnType } from '@mantine/form'
import { NewFeed } from '../../interfaces/Post'
import { useState } from 'react'
import { CreatePostCommandHandler } from '../../services'
import { toast } from 'react-toastify'
interface FormValues {
  type: number
  audience: number
  content: string
  parent_id: string
  hashtags: string[]
  medias: string[]
}
interface Props {
  post: NewFeed
}
const FormShare = ({ post }: Props) => {
  const formSharePost: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      type: 1,
      audience: 0,
      content: '',
      parent_id: post._id,
      hashtags: [],
      medias: []
    },
    validate: {
      content: (value) => (value.length > 0 ? null : 'Content is required!')
    }
  })
  const [switchLabel, setSwitchLabel] = useState<string>('Everyone')
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked
    formSharePost.setFieldValue('audience', isChecked ? 1 : 0)
    setSwitchLabel(isChecked ? 'Follower' : 'Everyone')
  }
  const handleTagsChange = (tags: string[]) => {
    formSharePost.setFieldValue('hashtags', tags)
  }
  const createPostCommandHandler = new CreatePostCommandHandler()
  const handleSharePost = (data: any) => {
    createPostCommandHandler.share(
      data,
      () => {
        toast.success('Shared post successfully')
        formSharePost.reset()
        close()
        window.location.reload()
      },
      (error: any) => {
        toast.error(error.response.data.message)
      }
    )
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={formSharePost.onSubmit(handleSharePost)}>
      <Switch
        checked={formSharePost.values.audience === 1}
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
        {...formSharePost.getInputProps('content')}
      />
      <Card shadow='sm' radius='md' withBorder>
        <Text className='font-bold text-[#3e3f5e] mb-4'>{post.content}</Text>
        <div className='flex flex-row justify-center items-center gap-4'>
          {post.medias.length > 0 &&
            post.medias[0].type == 0 &&
            post.medias.map((image, index) => {
              return (
                <BackgroundImage
                  className='relative shadow-lg w-48 h-48 flex justify-end items-start'
                  src={image.url}
                  key={index}
                  radius='sm'
                ></BackgroundImage>
              )
            })}
          {post.medias.length > 0 &&
            post.medias[0].type == 1 &&
            post.medias.map((video, index) => {
              return (
                <video controls key={index}>
                  <source src={video.url} type='video/mp4' />
                </video>
              )
            })}
        </div>
      </Card>
      <TagsInput
        variant='unstyled'
        placeholder='Enter hashtag'
        value={formSharePost.values.hashtags}
        onChange={handleTagsChange}
      />
      <Button className='w-full !py-1 bg-[#3572EF]' type='submit' variant='filled'>
        Create
      </Button>
    </form>
  )
}

export default FormShare
