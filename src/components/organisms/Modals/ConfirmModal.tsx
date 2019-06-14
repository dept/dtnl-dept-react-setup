import { FC } from 'react'

import { Box, Button, Column, Contain, Heading, Row, Text } from '@/components/atoms'
import { Modal } from '@/components/molecules/Modal'
import { useModal } from '@/context/ModalContext'

interface ConfirmationModalProps {
  title: string
  description: string
  modalName: string
  onDecline?: () => void
  onConfirm?: () => void
}

export const ConfirmModal: FC<ConfirmationModalProps> = ({
  title,
  description,
  modalName,
  onDecline,
  onConfirm,
}) => {
  const modalStore = useModal()

  const handleCloseModal = () => modalStore.hide(modalName)

  const handleConfirm = () => {
    handleCloseModal()
    if (onConfirm) {
      onConfirm()
    }
  }

  const handleDismiss = () => {
    handleCloseModal()
    if (onDecline) {
      onDecline()
    }
  }

  return (
    <Modal isOpen={modalStore.isShown(modalName)} onDismiss={() => handleDismiss()}>
      <Contain>
        <Box maxWidth={675} pt={['m']} pb={['xs', null, 'm']}>
          <Row>
            <Column>
              <Box mb={['xs', null, 's']}>
                <Heading fontSize={['s', null, 'm']}>{title}</Heading>
              </Box>
              <Box mb={['xs', null, 's']}>
                <Text>{description}</Text>
              </Box>
            </Column>
          </Row>
          <Row alignItems="center">
            <Column my={5} col={[12, 4]}>
              <Button block variant="secondary" onClick={() => handleDismiss()}>
                Terug
              </Button>
            </Column>
            <Column my={5} col={[12, 4]}>
              <Button block onClick={() => handleConfirm()}>
                Bevestigen
              </Button>
            </Column>
          </Row>
        </Box>
      </Contain>
    </Modal>
  )
}
