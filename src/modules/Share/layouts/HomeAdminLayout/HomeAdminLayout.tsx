import Navbar from 'src/modules/Admin/components/Navbar/Navbar'

interface Props {
  children?: React.ReactNode
}
const HomeAdminLayout = ({ children }: Props) => {
  return (
    <div className='flex relative'>
      <Navbar />
      {children}
    </div>
  )
}

export default HomeAdminLayout
