import { Input, Textarea } from '@mantine/core'
import { useForm, UseFormReturnType } from '@mantine/form'
import { Button } from '@mui/material'
import { CreateTicketCommandHandler } from '../../services/Ticket'
import { toast } from 'react-toastify'
interface FormValues {
  type: number
  mention: null
  topic: string
  content: string
}
interface Props {
  close: () => void
}
const FormHelp = ({ close }: Props) => {
  const formCreateTicket: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      type: 1,
      mention: null,
      topic: '',
      content: ''
    },
    validate: {
      topic: (value) => (value.length > 0 ? null : 'Topic is required'),
      content: (value) => (value.length > 0 ? null : 'Content is required!')
    }
  })
  const createTicketCommandHandler = new CreateTicketCommandHandler()

  const handleCreateTicket = (data: any) => {
    createTicketCommandHandler.handle(
      data,
      () => {
        close()
        toast.success('Submit ticket successfully')
        formCreateTicket.reset()
      },
      (error: any) => {
        toast.error(error.response.data.message)
        formCreateTicket.setErrors({
          topic: error.respone.data.error.topic?.msg,
          content: error.response.data.error.content?.msg
        })
      }
    )
  }
  return (
    <form className='flex flex-col gap-4' onSubmit={formCreateTicket.onSubmit(handleCreateTicket)}>
      <Input.Wrapper label='Topic' size='sm'>
        <Input placeholder='Your topic' {...formCreateTicket.getInputProps('topic')} />
      </Input.Wrapper>
      <Textarea
        label='Content'
        variant='unstyled'
        placeholder='Enter your content'
        autosize
        minRows={4}
        {...formCreateTicket.getInputProps('content')}
      />
      <Button className='w-full !py-1' type='submit' variant='contained' color='info'>
        Submit
      </Button>
    </form>
  )
}

export default FormHelp
