/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'

interface Props {
  register: UseFormRegister<any>
  id: string
  name: string
  type?: string
  label?: string
  placeholder?: string
  autoComplete?: string
  className: string
  classNameInput: string
  error?: string
  children?: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
}

const Input = ({
  register,
  id,
  name,
  type = 'text',
  label,
  placeholder,
  autoComplete,
  className,
  classNameInput,
  error,
  children,
  isLoading,
  disabled
}: Props) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className='mb-2'>
          {label}
        </label>
      )}
      {isLoading && isLoading ? (
        <Skeleton className='h-[34px]' />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          id={id}
          className={classNameInput}
          {...register(name)}
          disabled={disabled}
        />
      )}
      {children && children}
      <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error}</span>
    </div>
  )
}

export default Input
