const NoRecord = () => {
  return (
    <div className='flex w-full items-center justify-center'>
      <div className='text-center'>
        <div className='inline-flex rounded-full bg-[#c6f8ff] p-4 overflow-hidden'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-16 h-16'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
            />
          </svg>
        </div>
        <h1 className='mt-5 lg:text-[40px] md:text-[20px] max-md:text-[14px] font-bold text-slate-800'>
          No Record
        </h1>
      </div>
    </div>
  )
}

export default NoRecord
