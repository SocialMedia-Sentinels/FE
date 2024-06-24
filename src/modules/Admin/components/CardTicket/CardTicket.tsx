import { Text, Avatar, Group, Title, ThemeIcon } from '@mantine/core'
import { Ticket } from '../../interface/Ticket/ticket.type'
import { formatTimeToDayMonth, formatTimeToHourMinute } from 'src/modules/Share/utils'
import { Link } from 'react-router-dom'
import { IconAlertCircleFilled, IconAt, IconPhoneCall } from '@tabler/icons-react'
interface Props {
  ticket: Ticket
}
const CardTicket = ({ ticket }: Props) => {
  const bgColor = ticket.type === 1 ? 'bg-[#5AB2FF]' : 'bg-[#E72929]'
  const textColor = ticket.type === 1 ? 'text-[#111]' : 'text-[#F3F7EC]'

  return (
    <div className={`flex float-left p-0 px-[20px] ${bgColor} m-[10px]`}>
      <div className='px-4 mr-[20px] relative  float-left flex-col flex justify-center items-center'>
        <h2 className={`text-[40px] text-center ${textColor} font-Rajdhani`}>
          {formatTimeToDayMonth(ticket.created_at)}
        </h2>
        <p className={`${textColor} text-[14px] text-center font-Rajdhani`}>
          {formatTimeToHourMinute(ticket.created_at)}
        </p>
        <span className='up-border p-[14px] bg-[#f8f8fb] rounded-full absolute top-[-8px] right-[-35px]'></span>
        <span className='down-border p-[14px] bg-[#f8f8fb] rounded-full absolute bottom-[-13px] right-[-35px]'></span>
      </div>

      <div className='py-10 pl-5 border-l-4 border-dotted '>
        <Group wrap='nowrap'>
          <Avatar src={ticket.user[0].avatar} size={80} radius='md' />
          <div className={`font-Rajdhani ${textColor} font-bold`}>
            <Text fz='lg' fw={500}>
              {ticket.user[0].username}
            </Text>
            <Group wrap='nowrap' gap={10} mt={3}>
              <IconAt stroke={1.5} size='1rem' />
              <Text fz='xs'>{ticket.user[0].email}</Text>
            </Group>
            <Group wrap='nowrap' gap={10} mt={5}>
              <IconPhoneCall stroke={1.5} size='1rem' />
              <Text fz='xs'>{ticket.user[0].phone_number}</Text>
            </Group>
          </div>
        </Group>
        <Group wrap='nowrap' justify='space-between'>
          <Title className={`font-Rajdhani text-[40px] ${textColor}`}>{ticket.topic}</Title>
          {ticket.mention[0] && (
            <Group wrap='nowrap'>
              <ThemeIcon variant='outline' color='rgba(255, 255, 255, 1)'>
                <IconAlertCircleFilled style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
              <Link
                className='text-white flex justify-center items-center'
                to={`/profile/${ticket.mention[0].username}`}
              >
                {ticket.mention[0].username}
              </Link>
            </Group>
          )}
        </Group>
        <p className={`${textColor} font-Rajdhani text-[14px]`}>{ticket.content}</p>
      </div>
    </div>
  )
}

export default CardTicket
