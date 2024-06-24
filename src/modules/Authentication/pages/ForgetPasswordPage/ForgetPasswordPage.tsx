import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import ForgotPasswordForm from '../../components/ForgotPasswordForm'
import { ForgotPasswordCommandHandler } from '../../services'
import { useForm } from '@mantine/form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'

const ForgetPasswordPage = () => {
  const navigate = useNavigate()
  const formForgotPassword = useForm({
    initialValues: { email: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email is required !')
    }
  })
  const forgotPasswordCommandHandle = new ForgotPasswordCommandHandler()
  const handleSubmitForm = (data: any) => {
    forgotPasswordCommandHandle.handle(
      data,
      () => {
        Swal.fire('Successfully', 'Please check your email to reset password', 'success').then(
          () => {
            navigate(path.landing)
          }
        )
      },
      (error: any) => {
        toast.error(error.response?.data?.message)
        formForgotPassword.setErrors({
          email: error.response.data.errors.email?.msg
        })
      }
    )
  }

  return (
    <Fragment>
      <Helmet>
        <title>Forget Password</title>
        <meta name='description' content='This is forget password page of the project' />
      </Helmet>
      <div className='m-auto'>
        <ForgotPasswordForm
          formForgotPassword={formForgotPassword}
          handleSubmitForm={handleSubmitForm}
        />
      </div>
    </Fragment>
  )
}

export default ForgetPasswordPage
