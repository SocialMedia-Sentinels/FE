import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Control, Controller } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'
import { FormFilterSuggestionType } from 'src/modules/Client/utils'
import { Button } from '@mantine/core'
import { dataLocation } from '../../constants/data'

interface Props {
  options: {
    id: string
    name: string
  }[]
  control: Control<FormFilterSuggestionType>
  onResetForm: () => void
}

const Filter = ({ control, onResetForm, options }: Props) => {
  return (
    <div className=' px-6 py-8 shadow-md text-gray-600'>
      <div className='flex flex-col gap-y-6'>
        <Controller
          name='gender'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value = null } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Autocomplete
                disablePortal
                id='suggestion.gender'
                options={options}
                getOptionLabel={(option) => option.name}
                noOptionsText='Không có lựa chọn'
                value={options.find((option) => option.id === value) || null}
                renderInput={(params) => <TextField {...params} label='Select gender' />}
                onChange={(_, option) => onChange(option ? option.id : '')}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name='location'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value = null } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Autocomplete
                disablePortal
                id='suggestion.location'
                options={dataLocation}
                value={dataLocation.find((option) => option === value) || null}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} label='Select location' />}
                onChange={(_, option) => onChange(option ? option : '')}
              />
            </LocalizationProvider>
          )}
        />
      </div>
      <div className='flex justify-between mt-6'>
        <Button
          type='button'
          className='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#da2626] px-4 py-3 rounded-lg'
          onClick={onResetForm}
        >
          Reset
        </Button>
        <Button
          type='submit'
          className='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-3 rounded-lg'
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default Filter
