import { Avatar, Card, Group, Paper, Text, TypographyStylesProvider } from '@mantine/core'
import { Comment } from 'src/modules/Client/interfaces'
import { formatTimeToReadable } from 'src/modules/Share/utils'

interface Props {
  comment: Comment
}
const CommentOfPost = ({ comment }: Props) => {
  return (
    <Paper withBorder radius='md' className='py-5 px-8'>
      <Group className='mb-2' justify='space-between'>
        <Group>
          <Avatar src={comment.user.avatar} alt='Jacob Warnhalter' radius='xl' />
          <div>
            <Text fz='sm'>{comment.user.username}</Text>
            <Text fz='xs' c='dimmed'>
              {formatTimeToReadable(comment.created_at)}
            </Text>
          </div>
        </Group>
      </Group>
      <TypographyStylesProvider className='pl-[54px] pt-3 text-base'>
        <Text className='font-semibold'>{comment.content}</Text>
      </TypographyStylesProvider>

      {comment.comment_reply[0].content && (
        <Card className='pl-[54px] mt-4'>
          {comment.comment_reply.map((reply, index) => (
            <Card.Section className='my-2 ' key={index}>
              <Group className='mb-2' justify='space-between'>
                <Group>
                  <Avatar src={reply.user.avatar} alt='Jacob Warnhalter' radius='xl' />
                  <div>
                    <Text fz='sm'>{reply.user.username}</Text>
                    <Text fz='xs' c='dimmed'>
                      reply at {formatTimeToReadable(reply.created_at)}
                    </Text>
                  </div>
                </Group>
              </Group>
              <TypographyStylesProvider className='pl-[54px] pt-3 text-base'>
                <Text className='font-semibold'>{reply.content}</Text>
              </TypographyStylesProvider>
            </Card.Section>
          ))}
        </Card>
      )}
    </Paper>
  )
}

export default CommentOfPost
