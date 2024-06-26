/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, Card, Group, rem, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconSend2 } from '@tabler/icons-react'
import { UpdateCommentCommandHandler } from '../../services/Comment/updateComment.command-handler'
import { toast } from 'react-toastify'
interface Props {
  comment: any
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}
const FormEditComment = ({ comment, setIsEdit }: Props) => {
  const formEditComment = useForm({
    initialValues: {
      content: comment.content,
      post_id: comment.post_id,
      comment_id: comment._id
    },
    validate: {
      content: (value) => (value.length > 0 ? null : 'Content is required!')
    }
  })
  const updateCommentCommandHandler = new UpdateCommentCommandHandler()

  const handleUpdateComment = (data: any) => {
    updateCommentCommandHandler.handle(
      { body: data, comment_id: comment._id },
      () => {
        toast.success('Updated comment successfully')
        setIsEdit(false)
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
  return (
    <form onSubmit={formEditComment.onSubmit(handleUpdateComment)}>
      <Card withBorder padding='md'>
        <Card.Section>
          <Textarea
            variant='unstyled'
            placeholder='Write a comment...'
            className='px-4'
            {...formEditComment.getInputProps('content')}
          />
        </Card.Section>
        <Group justify='space-between'>
          <ActionIcon type='submit' variant='subtle' color='dark'>
            <IconSend2 style={{ width: rem(60), height: rem(60) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Card>
    </form>
  )
}

export default FormEditComment
