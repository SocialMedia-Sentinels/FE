import { useState } from 'react'
import { ResListFollowingType } from '../../interfaces'
import CardUser from '../CardUser'
import { Pagination, rem, TextInput } from '@mantine/core'
import { chunk } from 'src/modules/Share/constants/enum'
import { IconSearch } from '@tabler/icons-react'
interface Props {
  followingList: ResListFollowingType
  setValueTab: React.Dispatch<React.SetStateAction<number>>
}

const FollowedList = ({ followingList, setValueTab }: Props) => {
  const [activePage, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setPage(1)
  }
  if (!followingList) {
    return <div>Loading...</div>
  }
  const filteredUsers = followingList.users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  )
  const data = chunk(filteredUsers, 9)
  let items
  if (data.length > 0) {
    items = data[activePage - 1].map((item) => (
      <CardUser user={item} key={item._id} setValueTab={setValueTab} />
    ))
  }
  console.log('data', data)

  return (
    <div className=''>
      <TextInput
        placeholder='Search by any field'
        mb='md'
        mt={'md'}
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
        className='w-[25%] ml-auto'
      />
      <div className='mt-4'>
        <div className='grid grid-cols-3 gap-20'>{items}</div>
        {data.length === 0 && (
          <div className='flex w-full items-center justify-center'>
            <p className='text-lg font-bold font-Rajdhani'>No user</p>
          </div>
        )}
        <Pagination
          total={data.length}
          value={activePage}
          onChange={setPage}
          mt='md'
          className='flex justify-center'
          withEdges
        />
      </div>
    </div>
  )
}

export default FollowedList
