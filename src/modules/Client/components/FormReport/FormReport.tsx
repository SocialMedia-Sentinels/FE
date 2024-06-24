import { Combobox, Input, InputBase, Text, Textarea, useCombobox } from '@mantine/core'
import { useForm, UseFormReturnType } from '@mantine/form'
import { User } from '../../interfaces'
import { CreateTicketCommandHandler } from '../../services/Ticket'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Button } from '@mui/material'
interface FormValues {
  type: number
  mention: string
  topic: string
  content: string
}
interface Props {
  profile: User
  close: () => void
}
const data = ['Fake', 'Posting inappropriate content', 'Trouble', 'Other']
const FormReport = ({ profile, close }: Props) => {
  const formCreateTicket: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      type: 0,
      mention: profile._id,
      topic: '',
      content: ''
    },
    validate: {
      topic: (value) => (value.length > 0 ? null : 'Topic is required'),
      content: (value) => (value.length > 0 ? null : 'Content is required!')
    }
  })
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  })
  const [value, setValue] = useState<string>('')
  const options = data.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ))
  const createTicketCommandHandler = new CreateTicketCommandHandler()
  const handleCreateTicket = (data: any) => {
    createTicketCommandHandler.handle(
      data,
      () => {
        close()
        toast.success('Report successfully')
        formCreateTicket.reset()
      },
      (error: any) => {
        toast.error(error.response.data.message)
        formCreateTicket.setErrors({
          content: error.response.data.error.content?.msg
        })
      }
    )
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={formCreateTicket.onSubmit(handleCreateTicket)}>
      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          setValue(val)
          combobox.closeDropdown()
          formCreateTicket.setFieldValue('topic', val)
        }}
      >
        <Combobox.Target>
          <InputBase
            component='button'
            type='button'
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents='none'
            onClick={() => combobox.toggleDropdown()}
          >
            {value || <Input.Placeholder>Topic</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      {formCreateTicket.errors.topic && (
        <Text color='red' size='sm'>
          {formCreateTicket.errors.topic}
        </Text>
      )}
      <Textarea
        variant='unstyled'
        placeholder='Reason'
        autosize
        minRows={4}
        {...formCreateTicket.getInputProps('content')}
      />
      <Button className='w-full !py-1' type='submit' variant='contained' color='warning'>
        Report
      </Button>
    </form>
  )
}

export default FormReport
