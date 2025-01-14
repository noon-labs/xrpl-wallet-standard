import type { XRPLWallet } from '@xrpl-wallet-standard/app'
import styled from 'styled-components'
import { useConnect, useWallets } from '../../../hooks'

const WalletListContainer = styled.ul`
  padding: 0;
  margin: 0;
`

const WalletItem = styled.li`
  list-style: none;
  display: flex;
`

const WalletButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  margin-top: 8px;
  background-color: #262626;
  border-radius: 8px;
  border: none;
  color: white;
  transition: background-color 0.2s;
  font-size: 14px;
  
  &:hover {
    background-color: #3c3c3c;
  }
`

const WalletIcon = styled.img`
  height: 24px;
  width: 24px;
  border-radius: 8px;
`

const WalletName = styled.span`
  font-size: 14px;
  font-weight: 400;
`

type Props = {
  onConnectSuccess: () => void
  onConnectError: (error: Error) => void
}

export const WalletList = ({ onConnectSuccess, onConnectError }: Props) => {
  const wallets = useWallets()
  const { connect } = useConnect()

  const handleConnect = async (wallet: XRPLWallet) => {
    try {
      await connect(wallet)
      onConnectSuccess()
    } catch (error: any) {
      onConnectError(error)
    }
  }

  return (
    <WalletListContainer>
      {wallets.map((wallet) => (
        <WalletItem key={wallet.name}>
          <WalletButton onClick={() => handleConnect(wallet)}>
            <WalletIcon src={wallet.icon} alt={wallet.name} />
            <WalletName>{wallet.name}</WalletName>
          </WalletButton>
        </WalletItem>
      ))}
    </WalletListContainer>
  )
}
