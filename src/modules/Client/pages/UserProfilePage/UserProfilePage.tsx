import { Avatar, Box, Button, styled, Tab, Tabs } from '@mui/material'
import { Fragment, useState } from 'react'
import avatar from '../../../Share/assets/images/5cc101f5-7f03-46ac-95f6-d0ea32c31400.jpg'
import ButtonCustom from 'src/modules/Share/components/ButtonCustom'
import {
  FollowUserCommandHandler,
  GetListFollowerQuery,
  GetListFollowingQuery,
  GetUserDetailQuery,
  UnFollowUserCommandHandler,
  UpdateMeCommandHandler
} from '../../services'
import { useNavigate, useParams } from 'react-router-dom'
import FollowedList from '../../components/FollowedList'
import AboutUser from '../../components/AboutUser'
import { BackgroundImage, Dialog, Group, Input, Loader, Modal, Text } from '@mantine/core'
import background from 'src/modules/Share/assets/images/375175102_288648613800329_3272443368965320841_n.jpg'
import ModalCustom from 'src/modules/Share/components/ModalCustom'
import FormUploadAvatar from '../../components/FormUploadAvatar'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import ListPost from '../../components/ListPost'
import userService from '../../services/user.service'
import { IconInfoOctagon, IconMessage, IconSend } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import FormReport from '../../components/FormReport/FormReport'
import { Helmet } from 'react-helmet-async'
import HttpStatusCode from 'src/modules/Share/constants/httpStatusCode.enum'
import path from 'src/modules/Share/constants/path'
import socket from '../../../Share/common/socket'
import { getAccessTokenFromLocalStorage } from 'src/modules/Authentication/utils'

interface StyledTabProps {
  label: string
}
interface StyledTabsProps {
  children?: React.ReactNode
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
}

interface StyledTabsProps {
  children?: React.ReactNode
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }} />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7'
  }
})

interface StyledTabProps {
  label: string
}

const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: '#333',
    '&.Mui-selected': {
      color: '#635ee7'
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)'
    }
  })
)
const UserProfilePage = () => {
  const navigate = useNavigate()
  const [opened, { open, close: closeFirst }] = useDisclosure(false)
  const [openedClosure, { toggle, close: closeSecond }] = useDisclosure(false)
  const [valueTab, setValueTab] = useState(0)
  const [value, setValue] = useState('')

  const { username } = useParams()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setValueTab(newValue)
  }
  const getUserDetail = new GetUserDetailQuery(username as string)
  const profileUser = getUserDetail.fetch()
  const isMe = getUserDetail.isMe()
  const isFollowing = getUserDetail.isFollowing()
  const isLoading = getUserDetail.isLoading()
  const error = getUserDetail.getError()

  const followUserCommandHandler = new FollowUserCommandHandler(profileUser?._id as string)
  const unFollowUserCommandHandler = new UnFollowUserCommandHandler(username as string)
  const handleFollowUser = () => {
    followUserCommandHandler.handle(
      {},
      () => {},
      (error: any) => {
        console.log(error)
      }
    )
  }
  const handleUnFollowUser = () => {
    unFollowUserCommandHandler.handle(
      {},
      () => {},
      (error: any) => {
        console.log(error)
      }
    )
  }

  const [isOpenModalUploadAvatar, setIsOpenModalUploadAvatar] = useState<boolean>(false)
  const [isOpenModalUploadCoverPhoto, setIsOpenModalUploadCoverPhoto] = useState<boolean>(false)
  const [isOpenModalEditProfile, setIsOpenModalEditProfile] = useState<boolean>(false)

  const handleOpenModal = () => {
    setIsOpenModalEditProfile(true)
  }
  const handleCloseModal = () => {
    setIsOpenModalEditProfile(false)
  }
  const handleOpenModalUploadAvatar = () => {
    setIsOpenModalUploadAvatar(true)
  }
  const handleCloseModalUploadAvatar = () => {
    setIsOpenModalUploadAvatar(false)
  }

  const handleOpenModalUploadCoverPhoto = () => {
    setIsOpenModalUploadCoverPhoto(true)
  }
  const handleCloseModalUploadCoverPhoto = () => {
    setIsOpenModalUploadCoverPhoto(false)
  }

  const updateMeCommandHandler = new UpdateMeCommandHandler()

  const handleResendVerifyEmail = async () => {
    try {
      await userService.resendVerifyEmail()
      toast.success('Resend Verification')
    } catch (error: any) {
      toast.error(error)
    }
  }
  const handleChangeAvatar = (file: File) => {
    updateMeCommandHandler.upload(
      file,
      (data: any) => {
        const updatedProfileData = {
          avatar: data.data.result[0].url as string
        }
        updateMeCommandHandler.handle(
          updatedProfileData,
          () => {},
          (error: any) => {
            toast.error(error.response.data.message)
          }
        )
        handleCloseModalUploadAvatar()
      },
      (error: any) => {
        toast.error(error.response.data.message)
      }
    )
  }
  const handleChangeCoverPhoto = (file: File) => {
    updateMeCommandHandler.upload(
      file,
      (data: any) => {
        const updatedProfileData = {
          cover_photo: data.data.result[0].url as string
        }
        updateMeCommandHandler.handle(
          updatedProfileData,
          () => {},
          (error: any) => {
            toast.error(error.response.data.message)
          }
        )
        handleCloseModalUploadCoverPhoto()
      },
      (error: any) => {
        toast.error(error.response.data.message)
      }
    )
  }
  const getListFollowing = new GetListFollowingQuery(username as string)
  const followingList = getListFollowing.fetch()
  const getListFollower = new GetListFollowerQuery(username as string)
  const followerList = getListFollower.fetch()

  if (isLoading) {
    return <Loader />
  }

  const token = getAccessTokenFromLocalStorage()
  const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(jsonPayload)
  }
  const JWTInfo = parseJwt(token)

  const send = (e: any) => {
    e.preventDefault()
    const conversation = {
      content: value,
      sender_id: JWTInfo.user_id,
      receiver_id: profileUser?._id
    }
    socket.emit('send_message', {
      payload: conversation
    })
    setValue('')
  }
  return (
    <Fragment>
      <Helmet>
        <title>User Profile</title>
        <meta name='description' content='User Profile' />
      </Helmet>
      {profileUser ? (
        <div className='w-full'>
          <div className='bg-white border-b-2 shadow-[rgba(94,92,154,.06)_0px_0px_40px_0px] mb-2 pb-2'>
            <BackgroundImage
              src={profileUser?.cover_photo || background}
              radius='md'
              className={classNames('h-[300px]', {
                'cursor-pointer': isMe
              })}
              onClick={isMe ? handleOpenModalUploadCoverPhoto : undefined}
            />

            <div className='relative pr-6 h-[126px] flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <Avatar
                  src={profileUser.avatar || avatar}
                  alt="it's me"
                  sx={{ width: 150, height: 150 }}
                  className={classNames('rounded-full ', {
                    'cursor-pointer': isMe
                  })}
                  onClick={isMe ? handleOpenModalUploadAvatar : undefined}
                />
                <ModalCustom isOpenModal={isOpenModalUploadAvatar}>
                  <FormUploadAvatar
                    handleCloseModalUploadAvatar={handleCloseModalUploadAvatar}
                    handleChangeAvatar={handleChangeAvatar}
                  />
                </ModalCustom>
                <ModalCustom isOpenModal={isOpenModalUploadCoverPhoto}>
                  <FormUploadAvatar
                    handleCloseModalUploadAvatar={handleCloseModalUploadCoverPhoto}
                    handleChangeAvatar={handleChangeCoverPhoto}
                  />
                </ModalCustom>
                <div className='flex flex-col '>
                  <div className='flex items-center gap-4'>
                    <p className='text-2xl font-Titillium text-[#3e3f5e] font-bold'>
                      {profileUser.username}
                    </p>
                    {!isMe ? (
                      isFollowing ? (
                        <ButtonCustom
                          onClick={handleUnFollowUser}
                          classNameButton='px-4 py-[6px] rounded-lg bg-[#e93726] text-[14px] font-semibold text-white font-Rajdhani'
                          isLoading={unFollowUserCommandHandler.isLoading()}
                        >
                          UnFollow
                        </ButtonCustom>
                      ) : (
                        <ButtonCustom
                          onClick={handleFollowUser}
                          classNameButton='px-4 py-[6px] rounded-lg bg-[#0095f6] text-[14px] font-semibold text-white font-Rajdhani'
                          isLoading={followUserCommandHandler.isLoading()}
                        >
                          Follow
                        </ButtonCustom>
                      )
                    ) : null}
                    {!isMe && (
                      <>
                        <Group justify='center'>
                          <Button onClick={toggle} variant='contained' size='small'>
                            <IconMessage />
                          </Button>
                        </Group>

                        <Dialog
                          opened={openedClosure}
                          withCloseButton
                          onClose={closeSecond}
                          size='lg'
                          radius='md'
                        >
                          <Text size='sm' mb='xs' fw={500}>
                            Send message
                          </Text>

                          <Group>
                            <form onSubmit={send} className='flex flex-nowrap w-full '>
                              <Input
                                radius='xl'
                                placeholder='Write a message'
                                className='mr-4 w-full'
                                onChange={(e) => setValue(e.target.value)}
                                value={value}
                              />
                              <Button
                                type='submit'
                                variant='contained'
                                size='small'
                                onClick={closeSecond}
                                disabled={value.trim() === ''}
                              >
                                <IconSend />
                              </Button>
                            </form>
                          </Group>
                        </Dialog>
                      </>
                    )}
                  </div>
                  <div className='flex  items-center gap-4'>
                    <p className='text-xs uppercase text-[#adafca] font-bold font-Rajdhani'>
                      <span className='text-black'>{profileUser.follower.length}</span> follower
                    </p>
                    <p className='text-xs uppercase text-[#adafca] font-bold font-Rajdhani'>
                      <span className='text-black'>{profileUser.following.length}</span> following
                    </p>
                  </div>
                </div>
              </div>
              {!isMe && (
                <Button
                  className='flex justify-center items-center font-Rajdhani '
                  size='small'
                  variant='outlined'
                  color='error'
                  startIcon={<IconInfoOctagon />}
                  onClick={open}
                >
                  Report
                </Button>
              )}
            </div>
          </div>

          <div className=''>
            <Box sx={{ bgcolor: '#fff' }}>
              <StyledTabs value={valueTab} onChange={handleChange} aria-label='styled tabs example'>
                <StyledTab label='Post' />
                <StyledTab label='About' />
                <StyledTab label='Following' />
                <StyledTab label='Follower' />
              </StyledTabs>
            </Box>
            <Box role='Post' hidden={valueTab !== 0}>
              <ListPost profileUser={profileUser} isMe={isMe} username={username} />
            </Box>
            <Box role='About' hidden={valueTab !== 1}>
              <AboutUser
                profile={profileUser}
                isMe={isMe}
                isOpenModal={isOpenModalEditProfile}
                handleResendVerifyEmail={handleResendVerifyEmail}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                updateMeCommandHandler={updateMeCommandHandler}
              />
            </Box>
            <Box role='Following' hidden={valueTab !== 2}>
              <FollowedList followingList={followingList} setValueTab={setValueTab} />
            </Box>
            <Box role='Follower' hidden={valueTab !== 3}>
              <FollowedList followingList={followerList} setValueTab={setValueTab} />
            </Box>
          </div>
          <Modal
            opened={opened}
            onClose={closeFirst}
            title='Report'
            overlayProps={{
              backgroundOpacity: 0.55,
              blur: 3
            }}
          >
            <FormReport profile={profileUser} close={closeFirst} />
          </Modal>
        </div>
      ) : error.response.status === HttpStatusCode.NotFound ? (
        <div className=' flex items-center  px-6 py-12 mx-auto'>
          <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='w-16 h-16 '
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M3 7v4a1 1 0 0 0 1 1h3' />
              <path d='M7 7v10' />
              <path d='M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z' />
              <path d='M17 7v4a1 1 0 0 0 1 1h3' />
              <path d='M21 7v10' />
            </svg>
            <h1 className='mt-3 font-semibold text-gray-800 text-3xl'>
              {error.response.data.message}
            </h1>
            <p className='mt-4 text-gray-500 dark:text-gray-400'>
              The page you are looking for doesn't exist. Here are some helpful links:
            </p>
            <button
              onClick={() => navigate(path.home)}
              className='mt-6 w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600'
            >
              Take me home
            </button>
          </div>
        </div>
      ) : (
        <div className=' flex items-center  px-6 py-12 mx-auto'>
          <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='w-16 h-16'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
              <path d='M6 21v-2a4 4 0 0 1 4 -4h3.5' />
              <path d='M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
              <path d='M17 21l4 -4' />
            </svg>
            <h1 className='mt-3 font-semibold text-gray-800 text-3xl'>
              {error.response.data.message}
            </h1>
            <p className='mt-4 text-gray-500 dark:text-gray-400'>
              The current user account is locked and cannot access this user. Here are some helpful
              links:
            </p>
            <button
              onClick={() => navigate(path.home)}
              className='mt-6 w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600'
            >
              Take me home
            </button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default UserProfilePage
