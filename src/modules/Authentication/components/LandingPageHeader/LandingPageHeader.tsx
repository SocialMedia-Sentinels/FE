import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'

const LandingPageHeader = () => {
  return (
    <div className='h-[72px] transition-none top-0 bg-[#0b0b0b] sticky flex sm:px-5'>
      <div className='lg:max-w-[1280px] lg:px-[50px] w-full h-full m-auto'>
        <div className='flex justify-between relative items-center sm:pb-4 sm:pt-5 py-0 h-full'>
          <Link to={path.landing} className='text-inherit'></Link>
          <div className='flex items-center justify-between gap-8'>
            <ul className='lg:flex lg:items-center list-none font-semibold  '>
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  classNames(
                    'cursor-pointer transition-all hover:text-white  duration-300 flex-shrink-0 md:pt-[18px] md:pr-[7px] md:pb-[18px] md:pl-0 lg:py-[10px] lg:px-[14px] uppercase md:text-[14px] text-[#4c4c4c]',
                    {
                      'text-white': isActive
                    }
                  )
                }
              >
                Packs
              </NavLink>
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  classNames(
                    'cursor-pointer transition-all hover:text-white duration-300 flex-shrink-0 md:pt-[18px] md:pr-[7px] md:pb-[18px] md:pl-0 lg:py-[10px] lg:px-[14px] uppercase md:text-[14px] text-[#4c4c4c]',
                    {
                      'text-white': isActive
                    }
                  )
                }
              >
                MARKETPLACE
              </NavLink>
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  classNames(
                    'cursor-pointer transition-all hover:text-white duration-300 flex-shrink-0 md:pt-[18px] md:pr-[7px] md:pb-[18px] md:pl-0 lg:py-[10px] lg:px-[14px] uppercase md:text-[14px] text-[#4c4c4c]',
                    {
                      'text-white': isActive
                    }
                  )
                }
              >
                LEAGUe
              </NavLink>
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  classNames(
                    'cursor-pointer transition-all hover:text-white duration-300 flex-shrink-0 md:pt-[18px] md:pr-[7px] md:pb-[18px] md:pl-0 lg:py-[10px] lg:px-[14px] uppercase md:text-[14px] text-[#4c4c4c]',
                    {
                      'text-white': isActive
                    }
                  )
                }
              >
                MY COLLECTION
              </NavLink>
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  classNames(
                    'cursor-pointer transition-all hover:text-white duration-300 flex-shrink-0 md:pt-[18px] md:pr-[7px] md:pb-[18px] md:pl-0 lg:py-[10px] lg:px-[14px] uppercase md:text-[14px] text-[#4c4c4c]',
                    {
                      'text-white': isActive
                    }
                  )
                }
              >
                QUESTS
              </NavLink>
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  classNames(
                    'cursor-pointer transition-all hover:text-white duration-300 flex-shrink-0 md:pt-[18px] md:pr-[7px] md:pb-[18px] md:pl-0 lg:py-[10px] lg:px-[14px] uppercase md:text-[14px] text-[#4c4c4c]',
                    {
                      'text-white': isActive
                    }
                  )
                }
              >
                RANKING
              </NavLink>
            </ul>
            <Link
              to={path.login}
              className='rounded-full bg-[#181818] px-6 uppercase py-2 text-white text-[14px]'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPageHeader
