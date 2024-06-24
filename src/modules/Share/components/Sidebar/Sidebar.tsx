import { Link, NavLink } from 'react-router-dom'
import path from '../../constants/path'
import classNames from 'classnames'
import { Button } from '@mui/material'
import { IconHelp } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { Modal } from '@mantine/core'
import FormHelp from 'src/modules/Client/components/FormHelp/FormHelp'
import { useContext } from 'react'
import { AppContext } from '../../contexts'

const SideBar = () => {
  const { hasMessage } = useContext(AppContext)

  const [opened, { open, close }] = useDisclosure(false)

  return (
    <aside className='h-screen sticky top-0 z-30 flex-shrink-0 overflow-y-auto bg-white flex flex-col transition-all overflow-hidden shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-[250px]'>
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
          <span className='text-[#fff] ml-4 font-Titillium font-black text-[20px]'>SENTINELS</span>
        </Link>
      </div>
      <div className='flex-grow p-6'>
        <ul className='flex flex-col gap-2 text-black'>
          <li className='py-2'>
            <NavLink
              to={path.home}
              className={({ isActive }) =>
                classNames(
                  'flex w-full h-[48px] items-center text-sm font-semibold overflow-hidden transition-all px-4 py-2 rounded-lg hover:text-white hover:bg-[#615DFA]',
                  {
                    'text-white bg-[#615DFA]': isActive
                  }
                )
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M7.833 12.278l4.445 -4.445' />
                <path d='M10.055 14.5l2.223 -2.222' />
                <path d='M12.278 16.722l.555 -.555' />
                <path d='M19.828 14.828a4 4 0 0 0 0 -5.656l-5 -5a4 4 0 0 0 -5.656 0l-5 5a4 4 0 0 0 0 5.656l6.171 6.172h3.314l6.171 -6.172z' />
              </svg>

              <span className='overflow-hidden ml-4'>Home</span>
            </NavLink>
          </li>
          <li className='py-2'>
            <NavLink
              to={path.chat}
              className={({ isActive }) =>
                classNames(
                  'flex w-full h-[48px] items-center text-sm font-semibold overflow-hidden transition-all px-4 py-2 rounded-lg hover:text-white hover:bg-[#615DFA]',
                  {
                    'text-white bg-[#615DFA]': isActive
                  }
                )
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z'
                />
              </svg>
              <span className='overflow-hidden ml-4'>Chat</span>
              {hasMessage && (
                <span className='ml-auto text-xl font-semibold text-white bg-red-500 rounded-full w-2 h-2 '></span>
              )}
            </NavLink>
          </li>
          <li className='py-2'>
            <NavLink
              to={path.bookmarks}
              className={({ isActive }) =>
                classNames(
                  'flex w-full h-[48px] items-center text-sm font-semibold overflow-hidden transition-all px-4 py-2 rounded-lg hover:text-white hover:bg-[#615DFA]',
                  {
                    'text-white bg-[#615DFA]': isActive
                  }
                )
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
                />
              </svg>

              <span className='overflow-hidden ml-4'>Bookmarks</span>
            </NavLink>
          </li>
          <li className='py-2'>
            <NavLink
              to={path.suggestions}
              className={({ isActive }) =>
                classNames(
                  'flex w-full h-[48px] items-center text-sm font-semibold overflow-hidden transition-all px-4 py-2 rounded-lg hover:text-white hover:bg-[#615DFA]',
                  {
                    'text-white bg-[#615DFA]': isActive
                  }
                )
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z'
                />
              </svg>

              <span className='overflow-hidden ml-4'>Suggestions</span>
            </NavLink>
          </li>
          {/* <li className='py-2'>
            <NavLink
              to={path.marketplace}
              className={({ isActive }) =>
                classNames(
                  'flex w-full h-[48px] items-center text-sm font-semibold overflow-hidden transition-all px-4 py-2 rounded-lg hover:text-white hover:bg-[#615DFA]',
                  {
                    'text-white bg-[#615DFA]': isActive
                  }
                )
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M3 21l18 0' />
                <path d='M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4' />
                <path d='M5 21l0 -10.15' />
                <path d='M19 21l0 -10.15' />
                <path d='M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4' />
              </svg>

              <span className='overflow-hidden ml-4'>Marketplace</span>
            </NavLink>
          </li> */}
        </ul>
      </div>
      <div className='flex justify-center items-center p-6'>
        <Button
          className='flex justify-center items-center font-Rajdhani  m-auto'
          size='small'
          variant='outlined'
          tabIndex={-1}
          color='info'
          startIcon={<IconHelp />}
          onClick={open}
        >
          Feedback
        </Button>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title='Help'
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}
      >
        <FormHelp close={close} />
      </Modal>
    </aside>
  )
}

export default SideBar
