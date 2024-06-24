import { Box, Modal } from '@mui/material'
interface Props {
  isOpenModal: boolean
  children: React.ReactNode
}

const ModalCustom = ({ isOpenModal, children }: Props) => {
  return (
    <Modal
      className='!z-50 h-screen flex items-center justify-center'
      open={isOpenModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='flex items-center justify-center'>{children}</Box>
    </Modal>
  )
}

export default ModalCustom
