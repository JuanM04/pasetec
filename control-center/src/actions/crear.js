import React, { useState, useEffect } from 'react'
import { Container } from 'shards-react'

import Info from '../components/Info'
import Input from '../components/Input'
import Status from '../components/Status'

const { ipcRenderer } = window.require('electron')

export default () => {
  const [info, setInfo] = useState({ uid: '-' })
  const [dniInput, setDniInput] = useState('')
  const [status, setStatus] = useState(false)
  const [loading, setLoading] = useState(true)

  function newCard(uid) {
    setInfo({ uid })
    setDniInput('')
    setLoading(false)
    setStatus(false)
  }

  function createUser(data) {
    setLoading(true)
    ipcRenderer.send('create-user', data)
  }

  useEffect(() => {
    ipcRenderer.on('card-detected', (_, uid) => newCard(uid))
    ipcRenderer.on('status', (_, data) => setStatus(data))

    return () => ipcRenderer.removeAllListeners()
  }, [])

  return (
    <Container className="main">
      <p>Escanee un pase para crear un nuevo usuario</p>
      <Info {...info} />
      <Input
        placeholder="DNI"
        value={dniInput}
        onChange={dni => setDniInput(dni)}
        submit={() => createUser({ uid: info.uid, dni: dniInput })}
        buttonLabel="Crear"
        disabled={loading}
        disabledSubmit={info.uid === '-' || dniInput === ''}
      />
      {status && <Status {...status} />}
    </Container>
  )
}
