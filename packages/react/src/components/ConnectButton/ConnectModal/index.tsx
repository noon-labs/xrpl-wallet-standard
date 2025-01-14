import { blackA, gray, mauve } from '@radix-ui/colors'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { WalletList } from '../WalletList'

const CloseButton = styled.button`
  font-family: inherit;
  padding: 0;
  border: none;
  border-radius: 100%;
  height: 24px;
  width: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  top: 16px;
  right: 16px;
  
  &:focus {
    outline: none;
  }
`

const overlayShow = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`

type StyleProps = {
  overlay?: React.CSSProperties
  content?: React.CSSProperties
  title?: React.CSSProperties
}

type Props = {
  trigger: React.ReactNode
  styles?: StyleProps
}

const DialogOverlay = styled(Dialog.Overlay)<{ customStyle?: React.CSSProperties }>`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  ${(props) => props.customStyle && { ...props.customStyle }}
`

const DialogContent = styled(Dialog.Content)<{ customStyle?: React.CSSProperties }>`
  background-color: #121212;
  border: 1px solid #262626;
  border-radius: 16px;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.32);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  max-height: 85vh;
  padding: 16px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  ${(props) => props.customStyle && { ...props.customStyle }}
`

const DialogTitle = styled(Dialog.Title)<{ customStyle?: React.CSSProperties }>`
  margin: 0;
  text-align: left;
  font-weight: 400;
  color: white;
  font-size: 14px;
  margin-bottom: 24px;
  ${(props) => props.customStyle && { ...props.customStyle }}
`

export const ConnectModal = ({ trigger, styles }: Props) => {
  const [open, setOpen] = useState(false)

  const handleConnectSuccess = () => {
    setOpen(false)
  }
  const handleConnectError = (error: any) => {
    console.error(error.message)
    setOpen(false)
  }

  const preventOpenAutoFocus = (e: Event) => {
    e.preventDefault()
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay customStyle={styles?.overlay} />
        <DialogContent
          customStyle={styles?.content}
          aria-describedby={undefined}
          onOpenAutoFocus={preventOpenAutoFocus}
        >
          <DialogTitle customStyle={styles?.title}>Connect a wallet</DialogTitle>
          <Dialog.Description />
          <WalletList onConnectSuccess={handleConnectSuccess} onConnectError={handleConnectError} />
          <Dialog.Close asChild>
            <CloseButton aria-label="Close">
              <Cross2Icon width={24} height={24} />
            </CloseButton>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
