import { Avatar, Group, Paper, Text, TypographyStylesProvider } from '@mantine/core'
import { Comment } from '../../interfaces'
import { formatTimeToReadable } from 'src/modules/Share/utils'
interface Props {
  comment: Comment
}
const CardComment = ({ comment }: Props) => {
  return (
    <Paper withBorder radius='md' className='py-5 px-8'>
      <Group>
        <Avatar src={comment.user.avatar} alt='Jacob Warnhalter' radius='xl' />
        <div>
          <Text fz='sm'>{comment.user.username}</Text>
          <Text fz='xs' c='dimmed'>
            {formatTimeToReadable(comment.created_at)}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className='pl-[54px] pt-3 text-base'>
        <Text>{comment.content}</Text>
      </TypographyStylesProvider>
    </Paper>
  )
}

export default CardComment
