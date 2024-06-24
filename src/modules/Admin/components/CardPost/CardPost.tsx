import { Avatar, Box, Card, Group, Text } from '@mantine/core'
import classes from './CardPost.module.css'
import { Post } from '../../interface/Posts/post.type'
interface Props {
  post: Post
  onClick: () => void
}
const CardPost = ({ post, onClick }: Props) => {
  return (
    <Card
      withBorder
      padding='lg'
      radius='md'
      className={classes.card}
      shadow='md'
      onClick={onClick}
    >
      <Box w={200}>
        <Text truncate='end'>{post.content}</Text>
      </Box>
      <Group mt='lg' wrap='nowrap'>
        <Avatar src={post.user.avatar} radius='sm' size={'lg'} />
        <div>
          <Text fw={500}>{post.user.username}</Text>
          <Text fz='xs' c='dimmed'>
            {post.user.email}
          </Text>
        </div>
      </Group>
      <Card.Section className={classes.footer}>
        <Group justify='space-between'>
          <Text fz='xs' c='dimmed'>
            {post.likes} people liked this
          </Text>
          <Group gap={0}></Group>
        </Group>
      </Card.Section>
    </Card>
  )
}

export default CardPost
