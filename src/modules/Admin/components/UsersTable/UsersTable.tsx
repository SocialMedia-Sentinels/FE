import React, { useRef, useState } from 'react'
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Avatar,
  Badge
} from '@mantine/core'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconGenderMale,
  IconGenderFemale
} from '@tabler/icons-react'
import NoRecord from 'src/modules/Share/components/NoRecord/NoRecord'
import { getBadgeColor, getVerifyStatus } from 'src/modules/Share/constants/enum'
import ModalCustom from 'src/modules/Share/components/ModalCustom'
import UserCardDetail from '../UserCardDetail/UserCardDetail'
import { UserDetail } from '../../interface/Users/usermanagement.type'

interface ThProps {
  children?: React.ReactNode
  reversed?: boolean
  sorted?: boolean
  onSort?(): void
}

interface UsersTableProps {
  search: string
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  sortBy: keyof UserDetail | null
  reverseSortDirection: boolean
  setSorting: (field: keyof UserDetail) => void
  sortedData: UserDetail[]
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector
  return (
    <Table.Th className='p-0'>
      <UnstyledButton onClick={onSort} className='w-full px-4 py-4 hover:bg-gray-200'>
        <Group>
          <Text fw={700} fz='sm'>
            {children}
          </Text>
          <Center className='w-[21px] h-[21px] rounded-[21px]'>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  )
}

const UsersTable: React.FC<UsersTableProps> = ({
  search,
  handleSearchChange,
  sortBy,
  reverseSortDirection,
  setSorting,
  sortedData
}) => {
  console.log(sortedData)

  const selectedUserRef = useRef<UserDetail | null>(null)
  const [isOpenModalUserDetail, setIsOpenModalUserDetail] = useState<boolean>(false)

  const handleOpenModalUserDetail = (user: UserDetail) => {
    selectedUserRef.current = user
    setIsOpenModalUserDetail(true)
  }

  const handleCloseModalUserDetail = () => {
    selectedUserRef.current = null
    setIsOpenModalUserDetail(false)
  }
  const rows = sortedData?.map((row) => (
    <Table.Tr
      key={row._id}
      className='hover:cursor-pointer'
      onClick={() => handleOpenModalUserDetail(row)}
    >
      <Table.Td className='flex items-center gap-2'>
        <Avatar size={60} radius={'md'} src={row.avatar} />
        <Text>{row.username}</Text>
      </Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.phone_number}</Table.Td>
      <Table.Td>
        {row.gender ? <IconGenderMale color='#4B70F5' /> : <IconGenderFemale color='#FF7ED4' />}
      </Table.Td>
      <Table.Td>{row.location}</Table.Td>
      <Table.Td>
        <Badge color={getBadgeColor(row.verify)}>{getVerifyStatus(row.verify)}</Badge>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <div className=''>
      <ScrollArea className='w-full px-4 py-4'>
        <TextInput
          placeholder='Search by any field'
          mb='md'
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        {rows && rows.length > 0 ? (
          <Table striped highlightOnHover withTableBorder verticalSpacing='xs' className='w-full'>
            <Table.Tbody>
              <Table.Tr>
                <Th
                  sorted={sortBy === 'username'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('username')}
                >
                  Username
                </Th>
                <Th
                  sorted={sortBy === 'email'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('email')}
                >
                  Email
                </Th>
                <Table.Th>Phone number</Table.Th>
                <Table.Th>Gender</Table.Th>
                <Th
                  sorted={sortBy === 'location'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('location')}
                >
                  Location
                </Th>
                <Table.Th className='p-0'>
                  <Text fw={700} fz='sm'>
                    Status
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        ) : (
          <NoRecord />
        )}
      </ScrollArea>
      <ModalCustom isOpenModal={isOpenModalUserDetail}>
        <UserCardDetail
          user={selectedUserRef.current}
          handleCloseModal={handleCloseModalUserDetail}
        />
      </ModalCustom>
    </div>
  )
}

export default UsersTable
