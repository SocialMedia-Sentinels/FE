import { useContext, useEffect } from 'react'
import Header from '../../components/Header'
import SideBar from '../../components/Sidebar/Sidebar'
import socket from '../../common/socket'
import { getAccessTokenFromLocalStorage } from 'src/modules/Authentication/utils'
import { AppContext } from '../../contexts'

interface Props {
  children?: React.ReactNode
}
const HomeLayout = ({ children }: Props) => {
  const { setHasMessage } = useContext(AppContext)
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
  useEffect(() => {
    socket.auth = {
      _id: JWTInfo.user_id
    }
    socket.connect()
    socket.on('receive_message', () => {
      setHasMessage(true)
    })
  })

  return (
    <div className='flex w-full relative '>
      <SideBar />
      <div className='flex flex-col flex-1'>
        <Header />
        <div className='p-6 flex items-center justify-center'>{children}</div>
      </div>
    </div>
  )
}

export default HomeLayout
