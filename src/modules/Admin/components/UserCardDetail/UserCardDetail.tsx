/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Badge, Button, Group, Text, ThemeIcon } from '@mantine/core'
import { IconAt, IconMapPin, IconPhoneCall } from '@tabler/icons-react'
import ButtonCustom from 'src/modules/Share/components/ButtonCustom'
import { getBadgeColor, getVerifyStatus } from 'src/modules/Share/constants/enum'
import { UserDetail } from '../../interface/Users/usermanagement.type'
import Swal from 'sweetalert2'
import { BanUserCommandHandler, UnBanUserCommandHandler } from '../../services'
import { toast } from 'react-toastify'

interface Props {
  user: UserDetail | null
  handleCloseModal: () => void
}

const UserCardDetail = ({ user, handleCloseModal }: Props) => {
  const banUserCommandHandler = new BanUserCommandHandler()

  const handleBanUser = () => {
    Swal.fire({
      title: 'Are you sure you want to ban this user?',
      text: 'You will not be able to undo once confirmed!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed && user) {
        banUserCommandHandler.handle(
          { user_id: user?._id },
          () => {
            handleCloseModal()
            toast.success('Ban user successfully!')
          },
          (error: any) => {
            Swal.fire('Error!', error.message, 'error')
          }
        )
      }
    })
  }

  const unBanUserCommandHandler = new UnBanUserCommandHandler()
  const handleUnBanUser = () => {
    Swal.fire({
      title: 'Are you sure you want to un ban this user?',
      text: 'You will not be able to undo once confirmed!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed && user) {
        unBanUserCommandHandler.handle(
          { user_id: user?._id },
          () => {
            handleCloseModal()
            toast.success('UnBan user successfully!')
          },
          (error: any) => {
            Swal.fire('Error!', error.message, 'error')
          }
        )
      }
    })
  }
  return (
    <div className='flex flex-col justify-between gap-6 bg-white p-6 rounded-lg w-[500px]'>
      <div className='flex justify-between items-center w-full'>
        <h2 className='md:text-[20px] max-md:text-[12px] font-semibold'>Profile User</h2>
        <ButtonCustom
          classNameButton='p-2 hover:bg-slate-100 rounded-lg'
          onClick={handleCloseModal}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='md:w-6 md:h-6 max-md:w-5 max-md:h-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </ButtonCustom>
      </div>
      <Group wrap='nowrap' className='flex w-full justify-between items-end'>
        <Group wrap='nowrap'>
          <Avatar src={user?.avatar} size={94} radius='md' />
          <div>
            <Group wrap='nowrap'>
              <Text fz='lg' fw={500} className=''>
                {user?.username}
              </Text>
              <Badge color={getBadgeColor(user?.verify)}>{getVerifyStatus(user?.verify)}</Badge>
            </Group>
            <Group wrap='nowrap' gap={10} mt={3}>
              <IconAt stroke={1.5} size='1rem' className='' />
              <Text fz='xs' c='dimmed'>
                {user?.email}
              </Text>
            </Group>

            <Group wrap='nowrap' gap={10} mt={5}>
              <IconPhoneCall stroke={1.5} size='1rem' className='' />
              <Text fz='xs' c='dimmed'>
                {user?.phone_number}
              </Text>
            </Group>
            <Group wrap='nowrap' gap={10} mt={5}>
              <IconMapPin stroke={1.5} size='1rem' className='' />
              <Text fz='xs' c='dimmed'>
                {user?.location}
              </Text>
            </Group>
          </div>
        </Group>

        {user?.verify != 2 ? (
          <Button className='bg-[#E72929] hover:bg-[#510909] ' onClick={handleBanUser}>
            Ban
          </Button>
        ) : (
          <Button className='bg-[#5AB2FF] ' onClick={handleUnBanUser}>
            UnBan
          </Button>
        )}
      </Group>
      <Group wrap='nowrap'>
        <div className='text-center px-2'>
          <ThemeIcon variant='light' size='xl' color='indigo'>
            <Text ta='center' fz='lg' fw={500}>
              {user?.posts}
            </Text>
          </ThemeIcon>

          <Text className='font-Rajdhani text-base font-bold'>Posts</Text>
        </div>
        <div className='text-center px-2'>
          <ThemeIcon variant='light' size='xl' color='indigo'>
            <Text ta='center' fz='lg' fw={500}>
              {user?.follower.length}
            </Text>
          </ThemeIcon>

          <Text className='font-Rajdhani text-base font-bold'>Follower</Text>
        </div>
        <div className='text-center px-2'>
          <ThemeIcon variant='light' size='xl' color='indigo'>
            <Text ta='center' fz='lg' fw={500}>
              {user?.following.length}
            </Text>
          </ThemeIcon>
          <Text className='font-Rajdhani text-base font-bold'>Following</Text>
        </div>
        <div className='text-center px-2'>
          <ThemeIcon variant='light' size='xl' color='red'>
            <Text ta='center' fz='lg' fw={500}>
              {user?.tickets}
            </Text>
          </ThemeIcon>
          <Text className='font-Rajdhani text-base font-bold'>Report</Text>
        </div>
      </Group>
    </div>
  )
}

export default UserCardDetail
