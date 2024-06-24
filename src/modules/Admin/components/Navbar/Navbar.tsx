/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import path from 'src/modules/Share/constants/path'
import { IconBrandStripe, IconLayoutDashboard, IconTicket, IconUsers } from '@tabler/icons-react'
import UserButton from '../UserButton/UserButton'
import { GetMeQuery } from 'src/modules/Client/services'
import { useContext } from 'react'
import { AppContext } from 'src/modules/Share/contexts'
import { UserLogoutCommandHandler } from 'src/modules/Authentication/services'
import {
  clearTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage
} from 'src/modules/Authentication/utils'
import { toast } from 'react-toastify'

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const getMeQuery = new GetMeQuery(isAuthenticated)
  const profile = getMeQuery.fetch()
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
      (error: any) => {
        toast.error(error.response?.data?.message)
      }
    )
  }

  return (
    <aside className='h-screen sticky top-0 z-30 flex-shrink-0 overflow-y-auto bg-white transition-all overflow-hidden shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-[250px] flex flex-col'>
      <div>
        <div className='h-[72px] flex items-center px-6 text-black border-b-[1px] border-gray-300 bg-[#615dfa] justify-between'>
          <Link
            to={path.home}
            className='text-lg font-bold text-black flex items-center justify-between'
          >
            <img
              src='/src/modules/Share/assets/images/Sentinels_logo.png'
              alt='logo'
              width={40}
              height={40}
            />
            <span className='text-[#fff] ml-4 font-Titillium font-black text-[20px] '>
              SENTINELS
            </span>
          </Link>
        </div>
      </div>
      <div className='flex-grow p-6'>
        <ul className='flex flex-col gap-2 text-black'>
          <li className='py-2'>
            <NavLink
              to={path.dashboard}
              className={({ isActive }) =>
                classNames(
                  'flex w-full h-[48px] items-center text-sm font-semibold overflow-hidden transition-all px-4 py-2 rounded-lg hover:text-white hover:bg-[#615DFA]',
                  {
                    'text-white bg-[#615DFA]': isActive
                  }
                )
              }
            >
              <IconLayoutDashboard />

              <span className='overflow-hidden ml-4'>Dashboard</span>
            </NavLink>
          </li>
          <li className='py-2'>
            <NavLink
              to={path.users}
              className={({ isActive }) =>
                classNames(
                  'flex w-full h-[48px] items-center text-sm font-semibold overflow-hidden transition-all px-4 py-2 rounded-lg hover:text-white hover:bg-[#615DFA]',
                  {
                    'text-white bg-[#615DFA]': isActive
                  }
                )
              }
            >
              <IconUsers />

              <span className='overflow-hidden ml-4'>Users</span>
            </NavLink>
          </li>
          <li className='py-2'>
            <NavLink
              to={path.posts}
              className={({ isActive }) =>
                classNames(
                  'flex w-full h-[48px] items-center text-sm font-semibold overflow-hidden transition-all px-4 py-2 rounded-lg hover:text-white hover:bg-[#615DFA]',
                  {
                    'text-white bg-[#615DFA]': isActive
                  }
                )
              }
            >
              <IconBrandStripe />
              <span className='overflow-hidden ml-4'>Posts</span>
            </NavLink>
          </li>
          <li className='py-2'>
            <NavLink
              to={path.ticket}
              className={({ isActive }) =>
                classNames(
                  'flex w-full h-[48px] items-center text-sm font-semibold overflow-hidden transition-all px-4 py-2 rounded-lg hover:text-white hover:bg-[#615DFA]',
                  {
                    'text-white bg-[#615DFA]': isActive
                  }
                )
              }
            >
              <IconTicket />
              <span className='overflow-hidden ml-4'>Tickets</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='border-t border-gray-300 py-4 mt-auto'>
        {profile && <UserButton profile={profile} handleLogout={handleLogout} />}
      </div>
    </aside>
  )
}

export default Navbar
