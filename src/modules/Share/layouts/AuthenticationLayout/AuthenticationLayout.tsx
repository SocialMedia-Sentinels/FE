interface Props {
  children?: React.ReactNode
}
const AuthenticationLayout = ({ children }: Props) => {
  return (
    <div
      className='flex justify-center items-center h-screen'
      style={{
        backgroundImage: 'url("/src/modules/Share/assets/images/landing-background.png")'
      }}
    >
      {children}
    </div>
  )
}

export default AuthenticationLayout
