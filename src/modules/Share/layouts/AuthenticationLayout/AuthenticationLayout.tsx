import { BackgroundImage } from '@mantine/core'
import background from 'src/modules/Share/assets/images/landing-background.png'
interface Props {
  children?: React.ReactNode
}
const AuthenticationLayout = ({ children }: Props) => {
  return (
    <BackgroundImage src={background} className='flex justify-center items-center h-screen'>
      {children}
    </BackgroundImage>
  )
}

export default AuthenticationLayout
