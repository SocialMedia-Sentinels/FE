import { Fragment } from 'react'
import { GetListSuggestionQuery } from '../../services'
import { Helmet } from 'react-helmet-async'
import UserCardImage from '../../components/UserCardImage/UserCardImage'
import { UserSuggestionInfoType } from '../../interfaces'
import Pagination from 'src/modules/Share/components/Pagination/Pagination'
import { useForm } from 'react-hook-form'
import { FormFilterSuggestionSchema, FormFilterSuggestionType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import useQuerySuggestionConfig from '../../hooks/useQuerySuggestionConfig'
import { createSearchParams, URLSearchParamsInit, useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { isEmpty, omitBy } from 'lodash'
import InputSearch from 'src/modules/Share/components/InputSearch/InputSearch'
import { Button, Popover } from '@mantine/core'
import Filter from 'src/modules/Share/components/Filter/Filter'

const SuggestionPage = () => {
  const navigate = useNavigate()

  const getListSuggestionQuery = new GetListSuggestionQuery()

  const suggestions = getListSuggestionQuery.fetch() as UserSuggestionInfoType[]

  const FilterEventForm = useForm<FormFilterSuggestionType>({
    resolver: yupResolver(FormFilterSuggestionSchema)
  })
  const querySuggestionConfig = useQuerySuggestionConfig()

  const handleSubmitFormFilter = FilterEventForm.handleSubmit((data) => {
    const config = {
      ...querySuggestionConfig,
      page: 1,
      search: data.search,
      gender: data.gender,
      location: data.location
    }
    navigate({
      pathname: path.suggestions,
      search: createSearchParams(omitBy(config, isEmpty) as URLSearchParamsInit).toString()
    })
  })

  const handleResetFormFilter = () => {
    FilterEventForm.resetField('search')
    FilterEventForm.setValue('gender', '')
    FilterEventForm.setValue('location', '')
  }
  return (
    <Fragment>
      <Helmet>
        <title>Suggestion</title>
        <meta name='description' content='Suggestion page' />
      </Helmet>
      <div className='w-full px-20'>
        {suggestions && suggestions.length > 0 && (
          <div className='flex justify-between items-center pt-[16px] pb-[40px] font-normal relative gap-2 '>
            <form className='ml-auto flex items-center flex-col ' onSubmit={handleSubmitFormFilter}>
              <InputSearch
                classNameInput='bg-white border-[1px] rounded-md md:h-[44px]  max-md:h-[30px]  outline-none pl-8 pr-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-normal text-gray-600 placeholder:font-normal placeholder:text-[14px] max-md:placeholder:text-[12px]'
                name='search'
                placeholder='Search by username'
                register={FilterEventForm.register}
              />
            </form>
            <Popover width={300} trapFocus withArrow shadow='md'>
              <Popover.Target>
                <Button className='bg-[#228BE6]'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='lg:w-6 lg:h-6 md:w-5 md:h-5 max-md:w-4 max-md:h-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
                    />
                  </svg>
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <form onSubmit={handleSubmitFormFilter}>
                  <Filter
                    options={[
                      { id: 'true', name: 'Male' },
                      { id: 'false', name: 'Female' }
                    ]}
                    control={FilterEventForm.control}
                    onResetForm={handleResetFormFilter}
                  />
                </form>
              </Popover.Dropdown>
            </Popover>
          </div>
        )}
        {suggestions && suggestions.length > 0 ? (
          <div className='grid grid-cols-3 gap-20'>
            {suggestions.map((suggestion) => (
              <UserCardImage suggestionUser={suggestion} key={suggestion._id} />
            ))}
          </div>
        ) : (
          <div className='w-full flex items-center flex-wrap justify-center gap-10'>
            <div className='grid gap-4 w-60'>
              <svg
                className='mx-auto'
                xmlns='http://www.w3.org/2000/svg'
                width={168}
                height={164}
                viewBox='0 0 168 164'
                fill='none'
              >
                <g filter='url(#filter0_d_14133_736)'>
                  <path
                    d='M3.99988 81.0083C3.99988 36.7097 39.9078 1 84.0081 1C128.042 1 164 36.6932 164 81.0083C164 99.8046 157.525 117.098 146.657 130.741C131.676 149.653 108.784 161 84.0081 161C59.0675 161 36.3071 149.57 21.3427 130.741C10.4745 117.098 3.99988 99.8046 3.99988 81.0083Z'
                    fill='#F9FAFB'
                  />
                </g>
                <path
                  d='M145.544 77.4619H146.044V76.9619V48.9851C146.044 43.424 141.543 38.9227 135.982 38.9227H67.9223C64.839 38.9227 61.9759 37.3578 60.3174 34.7606L60.3159 34.7583L56.8477 29.3908L56.8472 29.3901C54.9884 26.5237 51.8086 24.7856 48.3848 24.7856H26.4195C20.8584 24.7856 16.3571 29.287 16.3571 34.848V76.9619V77.4619H16.8571H145.544Z'
                  fill='#EEF2FF'
                  stroke='#A5B4FC'
                />
                <path
                  d='M63.9999 26.2856C63.9999 25.7334 64.4476 25.2856 64.9999 25.2856H141.428C143.638 25.2856 145.428 27.0765 145.428 29.2856V33.8571H67.9999C65.7907 33.8571 63.9999 32.0662 63.9999 29.8571V26.2856Z'
                  fill='#A5B4FC'
                />
                <ellipse
                  cx='1.42857'
                  cy='1.42857'
                  rx='1.42857'
                  ry='1.42857'
                  transform='matrix(-1 0 0 1 46.8571 31)'
                  fill='#4F46E5'
                />
                <ellipse
                  cx='1.42857'
                  cy='1.42857'
                  rx='1.42857'
                  ry='1.42857'
                  transform='matrix(-1 0 0 1 38.2859 31)'
                  fill='#4F46E5'
                />
                <ellipse
                  cx='1.42857'
                  cy='1.42857'
                  rx='1.42857'
                  ry='1.42857'
                  transform='matrix(-1 0 0 1 29.7141 31)'
                  fill='#4F46E5'
                />
                <path
                  d='M148.321 126.907L148.321 126.906L160.559 76.3043C162.7 67.5161 156.036 59.0715 147.01 59.0715H14.5902C5.56258 59.0715 -1.08326 67.5168 1.04059 76.3034L1.04064 76.3036L13.2949 126.906C14.9181 133.621 20.9323 138.354 27.8354 138.354H133.764C140.685 138.354 146.681 133.621 148.321 126.907Z'
                  fill='white'
                  stroke='#E5E7EB'
                />
                <path
                  d='M86.3858 109.572C85.2055 109.572 84.2268 108.593 84.2268 107.384C84.2268 102.547 76.9147 102.547 76.9147 107.384C76.9147 108.593 75.9359 109.572 74.7269 109.572C73.5466 109.572 72.5678 108.593 72.5678 107.384C72.5678 96.7899 88.5737 96.8186 88.5737 107.384C88.5737 108.593 87.5949 109.572 86.3858 109.572Z'
                  fill='#4F46E5'
                />
                <path
                  d='M104.954 91.0616H95.9144C94.7053 91.0616 93.7265 90.0829 93.7265 88.8738C93.7265 87.6935 94.7053 86.7147 95.9144 86.7147H104.954C106.163 86.7147 107.141 87.6935 107.141 88.8738C107.141 90.0829 106.163 91.0616 104.954 91.0616Z'
                  fill='#4F46E5'
                />
                <path
                  d='M65.227 91.0613H56.1877C54.9787 91.0613 53.9999 90.0825 53.9999 88.8734C53.9999 87.6931 54.9787 86.7144 56.1877 86.7144H65.227C66.4073 86.7144 67.3861 87.6931 67.3861 88.8734C67.3861 90.0825 66.4073 91.0613 65.227 91.0613Z'
                  fill='#4F46E5'
                />
                <circle cx='142.572' cy={121} r='24.7857' fill='#EEF2FF' stroke='#E5E7EB' />
                <path
                  d='M152.214 130.643L149.535 127.964M150.071 119.928C150.071 115.195 146.234 111.357 141.5 111.357C136.766 111.357 132.928 115.195 132.928 119.928C132.928 124.662 136.766 128.5 141.5 128.5C143.858 128.5 145.993 127.548 147.543 126.007C149.104 124.455 150.071 122.305 150.071 119.928Z'
                  stroke='#4F46E5'
                  strokeWidth='1.6'
                  strokeLinecap='round'
                />
                <defs>
                  <filter
                    id='filter0_d_14133_736'
                    x='1.99988'
                    y={0}
                    width={164}
                    height={164}
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'
                  >
                    <feFlood floodOpacity={0} result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy={1} />
                    <feGaussianBlur stdDeviation={1} />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='BackgroundImageFix'
                      result='effect1_dropShadow_14133_736'
                    />
                    <feBlend
                      mode='normal'
                      in='SourceGraphic'
                      in2='effect1_dropShadow_14133_736'
                      result='shape'
                    />
                  </filter>
                </defs>
              </svg>
              <div>
                <h2 className='text-center text-black text-xl font-semibold leading-loose pb-2'>
                  There’s no data here
                </h2>
                <p className='text-center text-black text-base font-normal leading-relaxed pb-4'>
                  Try changing your filters to <br />
                  see appointments{' '}
                </p>
                <div className='flex gap-3'>
                  <button
                    className='w-full px-3 py-2 rounded-full border border-gray-300 text-gray-900 text-xs font-semibold leading-4'
                    onClick={() => {
                      handleResetFormFilter(), handleSubmitFormFilter()
                    }}
                  >
                    Clear Filter
                  </button>
                  <button className='w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-500 rounded-full text-white text-xs font-semibold leading-4'>
                    Change Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {suggestions && suggestions.length > 0 && (
          <Pagination
            queryConfig={{ ...querySuggestionConfig }}
            pageSize={getListSuggestionQuery.getTotalPage()}
            pathname={path.suggestions}
            className='flex justify-center'
          />
        )}
      </div>
    </Fragment>
  )
}

export default SuggestionPage
