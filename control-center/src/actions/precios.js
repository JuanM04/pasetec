import React, { useState, useEffect } from 'react'
import { Button, Container } from 'shards-react'

import Input from '../components/Input'
import Status from '../components/Status'

const { ipcRenderer } = window.require('electron')

export default () => {
  const [pasePrice, setPasePrice] = useState('')
  const [viajePrice, setViajePrice] = useState('')
  const [status, setStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const disabled = loading || (status && status.type !== 'ERROR')

  function getPrices() {
    setLoading(true)
    ipcRenderer.send('get-prices')
  }

  function updatePrices() {
    setLoading(true)
    ipcRenderer.send('update-prices', { pasePrice, viajePrice })
  }

  useEffect(() => {
    ipcRenderer.on('get-prices-res', (_, data) => {
      setPasePrice(data.pasePrice)
      setViajePrice(data.viajePrice)
      setLoading(false)
    })
    ipcRenderer.on('status', (_, data) => setStatus(data))

    return () => ipcRenderer.removeAllListeners()
  }, [])

  useEffect(getPrices, [])

  return (
    <Container className="main">
      <Input
        placeholder="Precio del pase"
        value={pasePrice}
        onChange={pase => setPasePrice(pase)}
        disabled={disabled}
        disabledSubmit
      />
      <Input
        placeholder="Precio del viaje"
        value={viajePrice}
        onChange={viaje => setViajePrice(viaje)}
        disabled={disabled}
        disabledSubmit
      />
      <Button
        theme="primary"
        size="lg"
        onClick={updatePrices}
        disabled={disabled}
      >
        Actualizar
      </Button>
      {status && <Status {...status} />}
    </Container>
  )
}
