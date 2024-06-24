import { Group, Paper, SimpleGrid, Text } from '@mantine/core'
import { IconHeart, IconMessage2, IconShare, IconBrandStripe } from '@tabler/icons-react'
import classes from './StatsGrid.module.css'
import { Post } from '../../interface/Posts/post.type'

const icons = {
  user: IconMessage2,
  discount: IconShare,
  receipt: IconBrandStripe,
  coin: IconHeart
}
interface Props {
  posts: Post[]
  likes: number
  comments: number
}
const ArticleInteraction = ({ posts, likes, comments }: Props) => {
  const postShare = posts.filter((post) => post.type === 1)

  const data = [
    { title: 'Posts', icon: 'receipt', value: posts.length },
    { title: 'Likes', icon: 'coin', value: likes },
    { title: 'Share', icon: 'discount', value: postShare.length },
    { title: 'Comment', icon: 'user', value: comments }
  ] as const
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon]

    return (
      <Paper withBorder p='md' radius='md' key={stat.title} bg={'#424242'}>
        <Group justify='space-between'>
          <Text size='xs' c='#fff' className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size='1rem' stroke={1.5} />
        </Group>

        <Text className={classes.value}>{stat.value}</Text>

        <Text fz='xs' c='gray' mt={7} className='font-bold'>
          Available in the system
        </Text>
      </Paper>
    )
  })
  return (
    <div>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  )
}

export default ArticleInteraction
