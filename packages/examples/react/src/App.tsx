import './App.css'

import { XRPL_TESTNET } from '@xrpl-wallet-standard/app'
import {
  ConnectButton,
  useAccount,
  useConnectionStatus,
  useDisconnect,
  useSignAndSubmitTransaction,
  useSignTransaction,
  useWallet,
} from '@xrpl-wallet-standard/react'

function App() {
  const { wallet: selectedWallet } = useWallet()
  const account = useAccount()
  const status = useConnectionStatus()
  const disconnect = useDisconnect()
  const signTransaction = useSignTransaction()
  const signAndSubmitTransaction = useSignAndSubmitTransaction()

  console.log(status)

  const handleSignTransaction = async () => {
    if (selectedWallet && account) {
      const signedTransaction = await signTransaction(
        {
          TransactionType: 'Invoke',
          Account: account.address,
        },
        XRPL_TESTNET,
      )
      console.log(signedTransaction)
    }
  }

  const handleSignAndSubmitTransaction = async () => {
    const signedTransaction = await signAndSubmitTransaction(
      {
        TransactionType: 'AccountSet',
        Account: account.address,
      },
      XRPL_TESTNET,
    )
    console.log(signedTransaction)
  }

  return (
    <>
      <h1>Wallet</h1>
      <div className="card">
        <ConnectButton />
      </div>
      <div className="card">
        {selectedWallet && (
          <div>
            <h2>{selectedWallet.name}</h2>
            {selectedWallet.accounts.map((account) => (
              <div key={account.address}>{account.address}</div>
            ))}
          </div>
        )}
        {selectedWallet && account && (
          <>
            <button type="button" onClick={() => handleSignTransaction()}>
              SignTransaction
            </button>
            <button type="button" onClick={() => handleSignAndSubmitTransaction()}>
              SignAndSubmitTransaction
            </button>
            <button type="button" onClick={() => disconnect()}>
              Disconnect
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default App
