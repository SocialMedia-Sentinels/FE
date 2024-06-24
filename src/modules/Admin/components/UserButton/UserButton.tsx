import { Avatar, Group, Menu, rem, Text } from '@mantine/core'
import { IconChevronRight, IconLogout, IconUser } from '@tabler/icons-react'
import { User } from 'src/modules/Client/interfaces'
import path from 'src/modules/Share/constants/path'
interface Props {
  profile: User
  handleLogout: () => void
}
const UserButton = ({ profile, handleLogout }: Props) => {
  return (
    <Menu
      position='right-start'
      shadow='md'
      width={200}
      transitionProps={{ transition: 'scale-y', duration: 150 }}
    >
      <Menu.Target>
        <Group className='hover:cursor-pointer'>
          <Avatar src={profile?.avatar} radius='xl' />
          <div style={{ flex: 1 }}>
            <Text size='sm' fw={500}>
              {profile?.username}
            </Text>

            <Text c='dimmed' size='xs'>
              {profile?.email}
            </Text>
          </div>
          <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
        </Group>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component='a'
          href={`${path.profile}/${profile.username}`}
          leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
        >
          Profile
        </Menu.Item>

        <Menu.Item
          color='red'
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          component='button'
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserButton
