/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs } from '@mantine/core'
import { Fragment, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import path from 'src/modules/Share/constants/path'
import { UserLoginCommandHandler, UserRegisterCommandHandler } from '../../services'
import { AppContext } from 'src/modules/Share/contexts'
import { useForm } from '@mantine/form'
import ClientLoginForm from '../../components/ClientLoginForm'
import ClientRegisterForm from '../../components/ClientRegisterForm'
import { Helmet } from 'react-helmet-async'
import sentinels from 'src/modules/Share/assets/images/Sentinels_logo.png'
const LandingPage = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)
  // Login
  const formLogin = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email is required !'),
      password: (value) => (value.length > 5 ? null : 'Password is required !')
    }
  })
  const userLoginCommandHandler = new UserLoginCommandHandler()
  const handleLogin = (data: any) => {
    userLoginCommandHandler.handle(
      data,
      () => {
        setIsAuthenticated(true)
        navigate(path.home)
      },
      (error: any) => {
        toast.error(error.response?.data?.message)
        formLogin.setErrors({
          email: error.response.data.errors.email?.msg,
          password: error.response.data.errors.password?.msg
        })
      }
    )
  }
  // Register
  const formRegister = useForm({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
      username: '',
      date_of_birth: new Date(),
      location: '',
      phone_number: '',
      gender: 0
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email is required !'),
      password: (value) => (value.length > 5 ? null : 'Password is required !'),
      confirm_password: (value, allValues) => {
        if (value !== allValues.password) {
          return 'Confirm password must match password!'
        } else {
          return value.length > 4 ? null : 'Confirm password is required !'
        }
      },
      username: (value) => (value.length > 5 ? null : 'Username is required and min 5 character !'),
      phone_number: (value) =>
        /^[0-9]{10}$/.test(value)
          ? null
          : 'Phone number is required and must be a valid 10-digit number!'
    }
  })
  const userRegisterCommandHandler = new UserRegisterCommandHandler()
  const handleSubmit = (data: any) => {
    userRegisterCommandHandler.handle(
      data,
      () => {
        setIsAuthenticated(true)
        navigate(path.home)
      },
      (error: any) => {
        toast.error(error.response?.data?.message)
        formRegister.setErrors({
          email: error.response.data.errors.email?.msg,
          password: error.response.data.errors.password?.msg,
          confirm_password: error.response.data.errors.confirm_password?.msg,
          username: error.response.data.errors.username?.msg,
          date_of_birth: error.response.data.errors.date_of_birth?.msg
        })
      }
    )
  }
  return (
    <Fragment>
      <Helmet>
        <title>SENTINELS</title>
        <meta name='description' content='This is landing page of the project' />
      </Helmet>
      <div className='w-[580px] absolute left-[12%] top-[16%]'>
        <div className='flex justify-center'>
          <img src={sentinels} alt='logo' width={100} height={100} />
        </div>
        <h2 className='text-center uppercase text-[#fff] mt-7 text-2xl font-serif-'>Welcome to</h2>
        <h1 className='text-center font-Titillium text-8xl font-black uppercase text-[#fff]'>
          sentinels
        </h1>
        <p className='text-lg font-medium text-[#fff] text-center mt-8 m-auto'>
          The next generation social network & community! Connect with your friends!
        </p>
      </div>
      <div className='w-[484px] absolute right-[80px]'>
        <Tabs defaultValue='login'>
          <Tabs.List justify='center'>
            <Tabs.Tab value='login'>
              <span className='text-white'>Login</span>
            </Tabs.Tab>
            <Tabs.Tab value='register'>
              <span className='text-white'>Register</span>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='login'>
            <ClientLoginForm
              formLogin={formLogin}
              handleLogin={handleLogin}
              userLoginCommandHandler={userLoginCommandHandler}
            />
          </Tabs.Panel>
          <Tabs.Panel value='register'>
            <ClientRegisterForm
              formRegister={formRegister}
              handleSubmit={handleSubmit}
              userRegisterCommandHandler={userRegisterCommandHandler}
            />
          </Tabs.Panel>
        </Tabs>
      </div>
    </Fragment>
  )
}

export default LandingPage
