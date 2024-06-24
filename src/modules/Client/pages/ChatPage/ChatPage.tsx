import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import socket from '../../../Share/common/socket'
import { getAccessTokenFromLocalStorage } from 'src/modules/Authentication/utils'
import axios from 'axios'
import connect from 'src/modules/Share/constants/connect'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Helmet } from 'react-helmet-async'
import {
  Avatar,
  BackgroundImage,
  Button,
  Image,
  Input,
  rem,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  UnstyledButton
} from '@mantine/core'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import userService from '../../services/user.service'
import classes from './navbar.module.css'
import {
  IconFileDownload,
  IconFileUpload,
  IconMicrophone,
  IconPhotoPlus,
  IconPlayerStop,
  IconSearch,
  IconSend
} from '@tabler/icons-react'
import { AppContext } from 'src/modules/Share/contexts'

interface Conversation {
  _id: string
  sender_id: string
  content: string
  receiver_id: string
  image_url?: string
  file_url?: string
  voice_url?: string
}

const LIMIT = 10
const PAGE = 1

interface NavbarLinkProps {
  avatar: string
  username: string
  active?: boolean
  hasMessage?: boolean
  userHasMessage?: boolean
  onClick?(): void
}

interface UserChat {
  _id: string
  username: string
  avatar: string
}

function NavbarLink({
  avatar,
  username,
  active,
  hasMessage,
  userHasMessage,
  onClick
}: NavbarLinkProps) {
  if (hasMessage && userHasMessage) {
    console.log('thang nay nhan den minh ne', username)
  }

  return (
    <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
      <Avatar src={avatar} size={40} />
      <Text className='font-semibold font-Rajdhani'>{username}</Text>
      {hasMessage && userHasMessage && (
        <span className='ml-2 text-xs font-semibold text-white bg-red-500 rounded-full px-2'>
          1
        </span>
      )}
    </UnstyledButton>
  )
}

const ChatPage = () => {
  const { hasMessage, setHasMessage } = useContext(AppContext)
  const [active, setActive] = useState(-1)
  const [search, setSearch] = useState('')
  const [userHasMessage, setUserHasMessage] = useState<{ [key: string]: boolean }>({})

  const [streamRecording, setStreamRecording] = useState<boolean>(false)

  const audioChunk = useRef<Blob[]>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const queryClient = useQueryClient()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const [isInputFileVisible, setIsInputFileVisible] = useState(true)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
  }
  const onSelectFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile)
      setSelectedImage(imageUrl)
      setSelectedFiles((previousFiles) => previousFiles.concat(selectedFile))
      setIsInputFileVisible(false)
    }
  }
  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      sendFile(selectedFile)
    }
  }
  const handleRemoveImage = () => {
    setSelectedImage('')
    setSelectedFiles([])
    if (inputFileRef.current) {
      inputFileRef.current.value = ''
    }
    setIsInputFileVisible(true)
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
  const [value, setValue] = useState('')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })
  const [receiver, setReceiver] = useState('')
  const setUserSendMessage = (user_id: string) => {
    setUserHasMessage((prevState) => ({
      ...prevState,
      [user_id]: true
    }))
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      const { payload } = data
      if (payload.sender_id === receiver || payload.receiver_id === receiver) {
        setConversations((messages: any) => [payload, ...messages])
        setActive(0)
      } else {
        setActive((prevActive) => prevActive + 1)
      }
      setHasMessage(true)
      setUserSendMessage(payload.sender_id)
      queryClient.invalidateQueries(['users-chat'])
    })
    return () => {
      socket.off('receive_message')
      // socket.disconnect()
    }
  }, [receiver])

  useEffect(() => {
    if (receiver) {
      axios
        .get(`/conversations/receivers/${receiver}`, {
          baseURL: connect.baseUrl,
          headers: {
            Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`
          },
          params: {
            limit: LIMIT,
            page: PAGE
          }
        })
        .then((res) => {
          const { conversations, page, total_page } = res.data.result
          setConversations(conversations)
          setPagination({ page, total_page })
        })
    }
  }, [receiver])

  const fetchMoreConversations = () => {
    if (receiver && pagination.page < pagination.total_page) {
      axios
        .get(`/conversations/receivers/${receiver}`, {
          baseURL: connect.baseUrl,
          headers: {
            Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`
          },
          params: {
            limit: LIMIT,
            page: pagination.page + 1
          }
        })
        .then((res) => {
          const { conversations, page, total_page } = res.data.result
          setConversations((prev) => [...prev, ...conversations])
          setPagination({ page, total_page })
        })
    }
  }

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    if (selectedFiles && selectedFiles.length > 0) {
      formData.append('image', selectedFiles[0])
    }

    try {
      let imageUrl = ''
      if (selectedFiles && selectedFiles.length > 0) {
        const response = await axios.post('/medias/upload-image', formData, {
          baseURL: connect.baseUrl,
          headers: {
            Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        imageUrl = response.data.result[0].url
      }

      const conversation = {
        content: value,
        sender_id: JWTInfo.user_id,
        receiver_id: receiver,
        image_url: imageUrl
      }

      socket.emit('send_message', {
        payload: conversation
      })

      setConversations((conversations: any) => [
        {
          ...conversation,
          _id: new Date().getTime()
        },
        ...conversations
      ])
      setValue('')
      setSelectedImage('')
      setSelectedFiles([])
      queryClient.invalidateQueries(['users-chat'])
      setActive(0)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const sendFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await axios.post('/medias/upload-file', formData, {
        baseURL: connect.baseUrl,
        headers: {
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      const conversation = {
        sender_id: JWTInfo.user_id,
        receiver_id: receiver,
        file_url: response.data.result[0].url
      }

      socket.emit('send_message', {
        payload: conversation
      })

      setConversations((conversations: any) => [
        {
          ...conversation,
          _id: new Date().getTime()
        },
        ...conversations
      ])
      setSelectedImage('')
      setSelectedFiles([])
      queryClient.invalidateQueries(['users-chat'])
      setActive(0)
    } catch (error) {
      console.error('Error sending file:', error)
    }
  }
  const sendFileAudio = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await axios.post('/medias/upload-file', formData, {
        baseURL: connect.baseUrl,
        headers: {
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      const conversation = {
        sender_id: JWTInfo.user_id,
        receiver_id: receiver,
        voice_url: response.data.result[0].url
      }
      socket.emit('send_message', {
        payload: conversation
      })
      setConversations((conversations: any) => [
        {
          ...conversation,
          _id: new Date().getTime()
        },
        ...conversations
      ])
      setSelectedImage('')
      setSelectedFiles([])
      queryClient.invalidateQueries(['users-chat'])
      setActive(0)
    } catch (error) {
      console.error('Error sending file:', error)
    }
  }

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunk.current.push(e.data)
        }
      }
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunk.current, { type: 'audio/wav' })
        const fileName = `recording_${new Date().getTime()}.wav`
        const audioFile = new File([audioBlob], fileName, { type: 'audio/wav' })
        await sendFileAudio(audioFile)
        audioChunk.current = []
      }
      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setStreamRecording(true)
    } catch (error) {
      console.log('Error accessing the microphone', error)
    }
  }
  const stopRec = async () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      setStreamRecording(false)
    } else {
      console.log('No active recording found')
    }
    await navigator.mediaDevices.getUserMedia({ audio: false })
  }
  const setCurrentChat = (user_id: string) => {
    setReceiver(user_id)
  }

  const { data, error } = useQuery({
    queryKey: ['users-chat'],
    queryFn: () => userService.chatUsers(),
    keepPreviousData: true
  })

  const chat_data = data?.data.result as UserChat[]
  const filteredUsers = chat_data?.filter((user) => {
    return user.username.toLowerCase().startsWith(search.toLowerCase())
  })

  const chat_users = filteredUsers?.map((user, index) => (
    <NavbarLink
      {...user}
      key={user._id}
      active={index === active}
      onClick={() => {
        setActive(index)
        setValue('')
        setCurrentChat(user._id)
      }}
      hasMessage={hasMessage}
      userHasMessage={userHasMessage[user._id]}
    />
  ))

  return (
    <Fragment>
      <Helmet>
        <title>Chat</title>
        <meta name='description' content='Chat' />
      </Helmet>
      {!error ? (
        <div className='flex w-[80%] m-auto border shadow-xl rounded-xl'>
          <div className='w-[30%] border-r-1 border-[#eaeaf5] bg-[#fff]'>
            <div className='flex justify-between items-center py-4 px-3 '>
              <Text className='text-black font-bold font-Rajdhani text-2xl'>Chat</Text>
            </div>
            <ScrollArea h={500}>
              <TextInput
                placeholder='Search '
                mb='md'
                radius='xl'
                p={'sm'}
                leftSection={
                  <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
                value={search}
                onChange={handleSearchChange}
              />
              <div className={classes.navbarMain}>
                <Stack justify='center' gap={0}>
                  {chat_users}
                </Stack>
              </div>
            </ScrollArea>
          </div>
          <div className='w-full px-3'>
            <div
              id='scrollableDiv'
              style={{
                height: 500,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                width: '100%'
              }}
            >
              <InfiniteScroll
                dataLength={conversations.length}
                next={fetchMoreConversations}
                style={{ display: 'flex', flexDirection: 'column-reverse' }}
                inverse={true}
                hasMore={pagination.page < pagination.total_page}
                loader={<h4>Loading...</h4>}
                scrollableTarget='scrollableDiv'
              >
                {conversations.map((conversation) => (
                  <div
                    key={conversation._id}
                    className={`my-2 p-3 rounded-md max-w-xs ${
                      conversation.sender_id === JWTInfo.user_id
                        ? 'bg-green-200 self-end'
                        : 'bg-red-200 self-start'
                    }`}
                  >
                    <Text className='font-Rajdhani font-semibold'>{conversation.content}</Text>
                    {conversation.image_url && (
                      <Image
                        radius='md'
                        h={200}
                        w='auto'
                        fit='contain'
                        src={conversation.image_url}
                      />
                    )}
                    {conversation.file_url && (
                      <Text className='font-Rajdhani font-bold flex'>
                        <IconFileDownload />
                        <a href={conversation.file_url} target='_blank' rel='noreferrer'>
                          File
                        </a>
                      </Text>
                    )}
                    {conversation.voice_url && (
                      <Text className='font-Rajdhani font-bold flex'>
                        <audio controls>
                          <source src={conversation.voice_url} type='audio/wav' />
                          Your browser does not support the audio element.
                        </audio>
                      </Text>
                    )}
                  </div>
                ))}
              </InfiniteScroll>
            </div>
            <div className='flex flex-nowrap w-full mt-6 '>
              {selectedImage && (
                <BackgroundImage
                  className='relative shadow-lg w-20 h-20 flex justify-end items-start'
                  src={selectedImage}
                  radius='sm'
                >
                  <Button
                    className='top-0 right-0 !rounded-full !bg-[#3E4042] !p-0 !min-w-0'
                    onClick={handleRemoveImage}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4 text-[#7E8184]'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                    </svg>
                  </Button>
                </BackgroundImage>
              )}
            </div>
            {receiver && (
              <div className='flex items-center  marquee'>
                <div className='flex flex-row justify-center items-center '>
                  <label className='cursor-pointer'>
                    <IconFileUpload />
                    <input
                      type='file'
                      ref={inputFileRef}
                      name='files'
                      multiple={false}
                      onChange={onSelectFile}
                      accept='.pdf, .txt, .xls, .xlsx, .mp4, .webm, .mov'
                      className='hidden'
                    />
                  </label>
                </div>
                {!streamRecording ? (
                  <IconMicrophone
                    className='hover:cursor-pointer'
                    onClick={() => {
                      startRec()
                      setHasMessage(false)
                    }}
                  />
                ) : (
                  <IconPlayerStop className='hover:cursor-pointer text-red-700' onClick={stopRec} />
                )}
                <form onSubmit={send} className='flex flex-nowrap w-full'>
                  <Input
                    radius='xl'
                    placeholder='Write a message'
                    className='mr-2 w-full'
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    onClick={() => setHasMessage(false)}
                  />
                  {isInputFileVisible && (
                    <div className='flex flex-row justify-center items-center gap-4 mr-2'>
                      <label className='cursor-pointer font-Titillium '>
                        <IconPhotoPlus />
                        <input
                          type='file'
                          ref={inputFileRef}
                          name='images'
                          multiple
                          onChange={onSelectFileImage}
                          accept='image/png, image/jpeg'
                          className='hidden'
                        />
                      </label>
                    </div>
                  )}
                  <Button
                    type='submit'
                    radius='xl'
                    className='bg-[#23d2e2]'
                    disabled={!selectedImage && value.trim() === ''}
                  >
                    <IconSend />
                  </Button>
                </form>
              </div>
            )}
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
            <h1 className='mt-3 font-semibold text-gray-800 text-3xl'></h1>
            <p className='mt-4 text-gray-500 dark:text-gray-400'>
              The current user account is not verify. Please access the email you registered with
              and verify it
            </p>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default ChatPage
