/* eslint-disable prettier/prettier */
/* eslint-disable import/named */
import { useContext, useState } from 'react'
import { AppContext } from '../../contexts/app.context'
import {
  clearTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage
} from 'src/modules/Authentication/utils/auth'
import { createSearchParams, URLSearchParamsInit, useNavigate } from 'react-router-dom'
import path from '../../constants/path'
import { UserLogoutCommandHandler } from 'src/modules/Authentication/services'
import { toast } from 'react-toastify'
import { GetMeQuery } from 'src/modules/Client/services'
import ModalCustom from '../ModalCustom'
import ChangePassword from '../ChangePassword'
import avatar from '../../../Share/assets/images/5cc101f5-7f03-46ac-95f6-d0ea32c31400.jpg'
import { Avatar, Menu, rem } from '@mantine/core'
import { IconUser, IconLogout, IconLockSquareRounded } from '@tabler/icons-react'
import useQuerySearchConfig from 'src/modules/Client/hooks/useQuerySearchConfig'
import { isEmpty, omitBy } from 'lodash'

export default function Header() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const refreshToken = getRefreshTokenFromLocalStorage()
  const userLogoutCommandHandler = new UserLogoutCommandHandler()
  const handleLogout = () => {
    userLogoutCommandHandler.handle(
      { refresh_token: refreshToken },
      () => {
        setIsAuthenticated(false)
        clearTokenFromLocalStorage()
        navigate(path.landing)
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: any) => {
        toast.error(error.response?.data?.message)
      }
    )
  }

  const getProfileQuery = new GetMeQuery(isAuthenticated)
  const profile = getProfileQuery.fetch()
  const [isOpenModalChangePassword, setIsOpenModalChangePassword] = useState<boolean>(false)
  const handleOpenModalChangePassword = () => {
    setIsOpenModalChangePassword(true)
  }
  const handleCloseModalChangePassword = () => {
    setIsOpenModalChangePassword(false)
  }
  const querySearchConfig = useQuerySearchConfig()

  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const config = {
      ...querySearchConfig,
      page: 1,
      content: searchQuery,
      limit: querySearchConfig.limit || 10
    }
    navigate({
      pathname: path.search,
      search: createSearchParams(omitBy(config, isEmpty) as URLSearchParamsInit).toString()
    })
    setSearchQuery('')
  }

  const handleNavigateToProfile = () => {
    navigate(`${path.profile}/${profile.username}`)
  }

  return (
    <header className='w-full sticky top-0 h-[72px] border-[1px] bg-white shadow-bottom transition-all z-50'>
      <div className='w-full lg:max-w-full md:max-w-[786px] sm:max-w-[640px] flex items-center justify-between h-full px-6 overflow-hidden text-black'>
        <div className='flex justify-center flex-1 text-[#26C6DA]'>
          <form onSubmit={handleSubmit} className='relative w-full max-w-xl'>
            <div className='absolute inset-y-0 flex items-center pl-1'>
              <svg aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' className='w-6 h-6'>
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <input
              name='search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='block w-[200px] sm:w-[400px] lg:w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none leading-5 focus:border-[#26C6DA] focus:rounded-lg !pl-8 text-gray-700'
              type='text'
              placeholder='Search'
              aria-label='Search'
            />
          </form>
        </div>
        <ul className='flex items-center flex-shrink-0 space-x-6'>
          {profile && (
            <li className='relative flex gap-3 items-center'>
              <span>{profile.username}</span>

              <Menu
                shadow='md'
                width={200}
                transitionProps={{ transition: 'scale-y', duration: 150 }}
              >
                <Menu.Target>
                  <Avatar src={profile?.avatar || avatar} alt='avatar' className='cursor-pointer' />
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
                    onClick={handleNavigateToProfile}
                  >
                    Profile
                  </Menu.Item>

                  <Menu.Item
                    leftSection={
                      <IconLockSquareRounded style={{ width: rem(14), height: rem(14) }} />
                    }
                    component='button'
                    onClick={handleOpenModalChangePassword}
                    className='hover:bg-gray-100'
                  >
                    Change Password
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
            </li>
          )}
        </ul>
        <ModalCustom isOpenModal={isOpenModalChangePassword}>
          <ChangePassword handleCloseModal={handleCloseModalChangePassword} />
        </ModalCustom>
      </div>
    </header>
  )
}
