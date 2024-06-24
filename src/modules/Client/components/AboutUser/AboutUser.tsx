import { formatDateToReadable } from 'src/modules/Share/utils/utils'
import { User } from '../../interfaces'
import { Button } from '@mui/material'
import ModalCustom from 'src/modules/Share/components/ModalCustom'
import EditProfile from '../EditProfile'
import { UpdateMeCommandHandler } from '../../services'
import { IconMailFast, IconRosetteDiscountCheckFilled } from '@tabler/icons-react'
import ButtonCustom from 'src/modules/Share/components/ButtonCustom'

interface Props {
  profile: User
  isMe: boolean
  isOpenModal: boolean
  // handleSubmit: (data: any) => void
  handleOpenModal: () => void
  handleCloseModal: () => void
  updateMeCommandHandler: UpdateMeCommandHandler
  handleResendVerifyEmail: () => Promise<void>
}
const AboutUser = ({
  profile,
  isMe,
  isOpenModal,
  handleOpenModal,
  handleCloseModal,
  updateMeCommandHandler,
  handleResendVerifyEmail
}: Props) => {
  return (
    <div className='grid grid-cols-2 gap-10 mt-4'>
      <div className='col-span-1 relative bg-[#fff] py-8 px-7 rounded-xl shadow-[rgba(94,92,154,.06)_0px_0px_40px_0px]'>
        <div className='flex justify-between items-center'>
          <p className='text-base font-bold text-[#3e3f5e] font-Titillium'>About Me</p>
          {isMe && (
            <Button onClick={handleOpenModal}>
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
                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                />
              </svg>
            </Button>
          )}
          <ModalCustom isOpenModal={isOpenModal}>
            <EditProfile
              profile={profile}
              // handleSubmit={handleSubmit}
              updateMeCommandHandler={updateMeCommandHandler}
              handleCloseModal={handleCloseModal}
            />
          </ModalCustom>
        </div>
        <div className='mt-7'>
          <p className='text-sm font-bold font-Titillium'>{profile?.bio}</p>
          <div className='mt-4 flex flex-col gap-4'>
            <div className='flex items-end '>
              <p className='w-[120px] text-sm text-[#8f91ac] font-Rajdhani'>Email</p>
              <p className='text-sm text-[#8f91ac] font-Rajdhani'>{profile?.email}</p>
              {profile?.verify ? (
                <IconRosetteDiscountCheckFilled color='#0054a6' className='ml-2' />
              ) : (
                isMe && (
                  <ButtonCustom
                    classNameButton='px-1 bg-[#4299e1] rounded-md ml-10 flex justify-center items-center font-Titillium text-[#ecf5fc]'
                    onClick={handleResendVerifyEmail}
                  >
                    Resend <IconMailFast color='#ecf5fc' />
                  </ButtonCustom>
                )
              )}
            </div>
            <div className='flex'>
              <p className='w-[120px] text-sm text-[#8f91ac] font-Rajdhani'>Phone number</p>
              <p className='text-sm text-[#8f91ac] font-Rajdhani'>
                {profile?.location ? profile.phone_number : 'N/A'}
              </p>
            </div>
            <div className='flex'>
              <p className='w-[120px] text-sm text-[#8f91ac] font-Rajdhani'>Birthday</p>
              <p className='text-sm text-[#8f91ac] font-Rajdhani'>
                {profile?.date_of_birth ? formatDateToReadable(profile.date_of_birth) : 'N/A'}
              </p>
            </div>
            <div className='flex'>
              <p className='w-[120px] text-sm text-[#8f91ac] font-Rajdhani'>Gender</p>
              <p className='text-sm text-[#8f91ac] font-Rajdhani'>
                {profile?.gender ? 'Male' : 'Female'}
              </p>
            </div>
            <div className='flex'>
              <p className='w-[120px] text-sm text-[#8f91ac] font-Rajdhani'>Location</p>
              <p className='text-sm text-[#8f91ac] font-Rajdhani'>
                {profile?.location ? profile.location : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 relative bg-[#fff] py-8 px-7 rounded-xl shadow-[rgba(94,92,154,.06)_0px_0px_40px_0px]'>
        <p className='text-base font-bold text-[#3e3f5e] font-Titillium'>More Stats</p>
        <div className='mt-7 flex flex-col gap-4'>
          <div className='flex'>
            <div
              className='flex justify-center items-center flex-shrink-0 w-12 h-12 rounded-[50%] mr-4'
              style={{
                background: 'linear-gradient(-145deg,#41efff,#615dfa)'
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#000000'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M12 15l8.385 -8.415a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z' />
                <path d='M16 5l3 3' />
                <path d='M9 7.07a7 7 0 0 0 1 13.93a7 7 0 0 0 6.929 -6' />
              </svg>
            </div>
            <div className=''>
              <p className='text-[#adafca] text-xs font-bold uppercase'>Joined</p>
              <p className='mt-2 text-base font-bold font-Rajdhani'>
                {formatDateToReadable(profile?.created_at)}
              </p>
            </div>
          </div>
          <div className='flex'>
            <div
              className='flex justify-center items-center flex-shrink-0 w-12 h-12 rounded-[50%] mr-4'
              style={{
                background: 'linear-gradient(-145deg,#41efff,#615dfa)'
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#000000'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M12 15l8.385 -8.415a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z' />
                <path d='M16 5l3 3' />
                <path d='M9 7.07a7 7 0 0 0 1 13.93a7 7 0 0 0 6.929 -6' />
              </svg>
            </div>
            <div className=''>
              <p className='text-[#adafca] text-xs font-bold uppercase'>Last update</p>
              <p className='mt-2 text-base font-bold font-Rajdhani'>
                {formatDateToReadable(profile?.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUser
