import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import ResetPasswordForm from '../../components/ResetPasswordForm'
import { useForm } from '@mantine/form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ResetPasswordCommandHandler } from '../../services'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import path from 'src/modules/Share/constants/path'

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const forgotPasswordToken = params.get('forgot_password_token') || ''

  const formResetPassword = useForm({
    initialValues: {
      password: '',
      confirm_password: '',
      forgot_password_token: forgotPasswordToken
    },
    validate: {
      password: (value) => {
        if (value.length < 6) {
          return 'Password must be at least 6 characters long!'
        }
        if (!/[A-Z]/.test(value)) {
          return 'Password must contain at least one uppercase letter!'
        }
        if (!/[0-9]/.test(value)) {
          return 'Password must contain at least one number!'
        }
        if (!/[@$!%*?&#]/.test(value)) {
          return 'Password must contain at least one special character (@, $, !, %, *, ?, &, or #)!'
        }
        return null
      },
      confirm_password: (value, allValues) => {
        if (value !== allValues.password) {
          return 'Confirm password must match password!'
        } else {
          return value.length > 4 ? null : 'Confirm password is required !'
        }
      }
    }
  })

  const resetPasswordCommandHandle = new ResetPasswordCommandHandler()

  const handleSubmitForm = (data: any) => {
    resetPasswordCommandHandle.handle(
      data,
      () => {
        Swal.fire('Successfully', 'Reset password successfully', 'success').then(() => {
          navigate(path.landing)
        })
      },
      (error: any) => {
        toast.error('Forgot password token is expired or invalid')
        formResetPassword.setErrors({
          password: error.response.data.errors.password?.msg,
          confirm_password: error.response.data.errors.confirm_password?.msg
        })
      }
    )
  }

  return (
    <Fragment>
      <Helmet>
        <title>Reset Password</title>
        <meta name='description' content='This is reset password page of the project' />
      </Helmet>
      <div className='m-auto'>
        <ResetPasswordForm
          formResetPassword={formResetPassword}
          handleSubmitForm={handleSubmitForm}
        />
      </div>
    </Fragment>
  )
}

export default ResetPasswordPage
