import { useQuery } from '@tanstack/react-query'
import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import adminService from '../../services/admin.service'
import { LoadingOverlay, Pagination } from '@mantine/core'
import CardTicket from '../../components/CardTicket/CardTicket'
import NothingFound from 'src/modules/Share/components/NothingFound'
import { Ticket } from '../../interface/Ticket/ticket.type'

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return []
  }
  const head = array.slice(0, size)
  const tail = array.slice(size)
  return [head, ...chunk(tail, size)]
}
const TicketPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [activePage, setActivePage] = useState(1)

  const { data } = useQuery(['tickets'], () => adminService.getAllTickets(), {
    keepPreviousData: true,
    onSuccess: (data) => {
      setTickets(data.data.result)
    }
  })

  const dataTicket = chunk(tickets, 10)

  return (
    <Fragment>
      <Helmet>
        <title>Tickets Management</title>
        <meta name='description' content='This is tickets management page of the project' />
      </Helmet>
      <div className='px-10 py-10 w-full'>
        {data && (
          <LoadingOverlay
            visible={true}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'pink', type: 'bars' }}
          />
        ) &&
        dataTicket.length > 0 ? (
          <div className='grid grid-cols-2 gap-20'>
            {dataTicket[activePage - 1].map((item) => (
              <CardTicket ticket={item} key={item._id} />
            ))}
          </div>
        ) : (
          <NothingFound />
        )}
        <Pagination
          total={dataTicket.length}
          value={activePage}
          onChange={setActivePage}
          className='flex justify-center py-4'
          withEdges
        />
      </div>
    </Fragment>
  )
}

export default TicketPage
