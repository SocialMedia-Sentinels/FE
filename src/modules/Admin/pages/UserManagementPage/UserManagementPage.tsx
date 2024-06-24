import { Fragment, useEffect, useState } from 'react'
import { Pagination } from '@mantine/core'
import { Helmet } from 'react-helmet-async'
import UsersTable from '../../components/UsersTable/UsersTable'
import { useQuery } from '@tanstack/react-query'
import adminService from '../../services/admin.service'
import { UserDetail } from '../../interface/Users/usermanagement.type'
import { chunk } from 'src/modules/Share/constants/enum'

function filterData(data: UserDetail[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    (['username', 'email', 'location'] as (keyof UserDetail)[]).some(
      (key) => item[key]?.toString().toLowerCase().includes(query)
    )
  )
}

function sortData(
  data: UserDetail[],
  payload: { sortBy: keyof UserDetail | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy].toString())
      }

      return a[sortBy].toString().localeCompare(b[sortBy].toString())
    }),
    payload.search
  )
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<UserDetail[]>([])
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState<UserDetail[]>([])
  const [sortBy, setSortBy] = useState<keyof UserDetail | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const [activePage, setActivePage] = useState(1)

  useQuery({
    queryKey: ['users'],
    queryFn: () => adminService.getAllUsers(),
    keepPreviousData: true,
    onSuccess: (data) => {
      setUsers(data.data.result)
      setSortedData(data.data.result)
    }
  })

  useEffect(() => {
    setSortedData(sortData(users, { sortBy, reversed: reverseSortDirection, search }))
  }, [users, sortBy, reverseSortDirection, search])

  const setSorting = (field: keyof UserDetail) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(sortData(users, { sortBy, reversed: reverseSortDirection, search: value }))
  }
  const dataUser = chunk(sortedData, 10)
  const currentPageData = dataUser[activePage - 1] || undefined

  return (
    <Fragment>
      <Helmet>
        <title>Users Management</title>
        <meta name='description' content='This is users management page of the project' />
      </Helmet>
      <div className='w-full px-6 py-4'>
        <UsersTable
          search={search}
          handleSearchChange={handleSearchChange}
          sortBy={sortBy}
          reverseSortDirection={reverseSortDirection}
          setSorting={setSorting}
          sortedData={currentPageData}
        />
        {sortedData.length > 0 && (
          <Pagination
            total={dataUser.length}
            value={activePage}
            onChange={setActivePage}
            className='flex justify-center py-4'
            withEdges
          />
        )}
      </div>
    </Fragment>
  )
}

export default UserManagementPage
