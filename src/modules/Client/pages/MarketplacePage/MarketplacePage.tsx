import { Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

const MarketplacePage = () => {
  const [days, setDays] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)

  useEffect(() => {
    const countDownDate = new Date('Jan 1, 2025 00:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()

      const distance = countDownDate - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setDays(days)
      setHours(hours)
      setMinutes(minutes)
      setSeconds(seconds)

      if (distance < 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  return (
    <Fragment>
      <Helmet>
        <title>Marketplace</title>
        <meta name='description' content='Marketplace' />
      </Helmet>
      <div className='h-[580px] flex justify-center items-center px-2 bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 w-full'>
        <div className=' mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
          <div className='py-4 px-6'>
            <h2 className='text-4xl font-bold text-gray-800'>Coming Soon</h2>
            <p className='mt-2 text-lg text-gray-600'>
              We are working hard to bring you an amazing website. Stay tuned!
            </p>
          </div>
          <div className='py-4 px-6'>
            <div className='flex flex-wrap gap-4 justify-center items-center'>
              <div className='border rounded-lg px-4 py-2'>
                <div id='days' className='font-bold font-mono text-2xl text-gray-800'>
                  {days}d
                </div>
              </div>
              <div className='border rounded-lg px-4 py-2'>
                <div id='hours' className='font-bold font-mono text-2xl text-gray-800'>
                  {hours}h
                </div>
              </div>
              <div className='border rounded-lg px-4 py-2'>
                <div id='minutes' className='font-bold font-mono text-2xl text-gray-800'>
                  {minutes}m
                </div>
              </div>
              <div className='border rounded-lg px-4 py-2'>
                <div id='seconds' className='font-bold font-mono text-2xl text-gray-800'>
                  {seconds}s
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default MarketplacePage
