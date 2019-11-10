import { withKnobs } from '@storybook/addon-knobs'
import { Box } from '@tpdewolf/styled-primitives'

import { Button } from '@/components/atoms'
import { useModal } from '@/context/ModalContext'

import { Modal } from '.'

export default {
  title: 'Molecules|Modal',
  decorators: [
    withKnobs,
    (storyFn: any) => {
      return (
        <>
          <ModalButton>Open modal</ModalButton>
          {storyFn()}
        </>
      )
    },
  ],
  component: Modal,
}

const ModalButton: React.FC = ({ children }) => {
  const modalStore = useModal()
  return <Button onClick={() => modalStore.show('storybook')}>{children}</Button>
}

export const component = () => {
  return (
    <Modal id="storybook">
      <Box p={50}>Content of modal</Box>
    </Modal>
  )
}
