import { useNavigate } from 'react-router-dom'
import { UserFollowingInfoType } from '../../interfaces'
import { Avatar } from '@mantine/core'
interface Props {
  user: UserFollowingInfoType
  setValueTab: React.Dispatch<React.SetStateAction<number>>
}
const CardUser = ({ user, setValueTab }: Props) => {
  const navigate = useNavigate()

  const onShowDetail = (username: string) => {
    setValueTab(1)
    navigate(`/profile/${username}`)
  }
  return (
    <div
      className='flex items-center  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl cursor-pointer'
      role='button'
      onClick={() => onShowDetail(user.username)}
      tabIndex={0}
    >
      <Avatar src={user.avatar} size={100} radius='lg' className='p-4' />
      <p className='text-lg font-Titillium text-[#3e3f5e] font-normal'>{user.username}</p>
    </div>
  )
}

export default CardUser
