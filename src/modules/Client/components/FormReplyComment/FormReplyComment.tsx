/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, Card, Group, rem, Textarea } from '@mantine/core'
import { IconSend2 } from '@tabler/icons-react'
import { Comment } from '../../interfaces'
import { useForm } from '@mantine/form'
import { CreateCommentCommandHandler } from '../../services'
import { toast } from 'react-toastify'
interface Props {
  comment: Comment
  setIsReply: React.Dispatch<React.SetStateAction<boolean>>
}
const FormReplyComment = ({ comment, setIsReply }: Props) => {
  const formReplyComment = useForm({
    initialValues: {
      content: '',
      post_id: comment.post_id,
      parent_id: comment._id
    },
    validate: {
      content: (value) => (value.length > 0 ? null : 'Content is required!')
    }
  })
  const createCommentCommandHandle = new CreateCommentCommandHandler()
  const handleCreateComment = (data: any) => {
    createCommentCommandHandle.handle(
      data,
      () => {
        toast.success('Create comment successfully')
        setIsReply(false)
        formReplyComment.reset()
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
  return (
    <form className='w-full' onSubmit={formReplyComment.onSubmit(handleCreateComment)}>
      <Group justify='space-between' wrap='nowrap'>
        <Card withBorder padding='md' className='w-full'>
          <Card.Section>
            <Textarea
              variant='unstyled'
              placeholder='Write a comment...'
              className='px-4'
              {...formReplyComment.getInputProps('content')}
            />
          </Card.Section>
        </Card>
        <ActionIcon
          type='submit'
          variant='subtle'
          color='dark'
          disabled={formReplyComment.getInputProps('content').value === ''}
        >
          <IconSend2 style={{ width: rem(60), height: rem(60) }} stroke={1.5} />
        </ActionIcon>
      </Group>
    </form>
  )
}

export default FormReplyComment
