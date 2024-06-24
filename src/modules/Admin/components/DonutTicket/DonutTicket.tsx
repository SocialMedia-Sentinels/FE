import { DonutChart } from '@mantine/charts'
import { Text } from '@mantine/core'
import { Ticket } from '../../interface/Ticket/ticket.type'
interface Props {
  tickets: Ticket[]
}
const DonutTicket = ({ tickets }: Props) => {
  const ticketCounts = tickets.reduce(
    (acc, ticket) => {
      if (ticket.type === 1) {
        acc.feedback += 1
      } else if (ticket.type === 0) {
        acc.report += 1
      }
      return acc
    },
    { feedback: 0, report: 0 }
  )

  const data = [
    { name: 'Feedback', value: ticketCounts.feedback, color: 'indigo.6' },
    { name: 'Report', value: ticketCounts.report, color: 'red.6' }
  ]

  return (
    <div className='flex justify-center items-center'>
      <DonutChart withLabelsLine withLabels data={data} size={300} thickness={30} />
      <Text className='font-bold text-2xl'>Ticket</Text>
    </div>
  )
}

export default DonutTicket
