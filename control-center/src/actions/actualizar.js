import React, { useState, useEffect, useCallback } from 'react'
import { Button, Container } from 'shards-react'

import Info from '../components/Info'
import Input from '../components/Input'
import Reset from '../components/Reset'
import Status from '../components/Status'

const { ipcRenderer } = window.require('electron')





export default () => {
  const [info, setInfo] = useState(false)
  const [editing, setEditing] = useState(false)
  const [dniInput, setDniInput] = useState('')
  const [viajesInput, setViajesInput] = useState('')
  const [status, setStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const disabled = loading || (status && status.type !== 'ERROR')



  function reset() {
    setInfo(false)
    setEditing(false)
    setDniInput('')
    setViajesInput('')
    setStatus(false)
    setLoading(false)
  }

  const getUser = useCallback(data => {
    setLoading(true)
    ipcRenderer.send('get-user', data)
  }, [])

  const updateUser = () => {
    setLoading(true)
    ipcRenderer.send('update-user', { ...info, dni: dniInput, viajes: viajesInput })
  }



  useEffect(() => {
    ipcRenderer.on('get-user-res', (_, data) => {
      setInfo(data)
      setDniInput(data.dni)
      setViajesInput(data.viajes)
      setEditing(true)
      setStatus(false)
      setLoading(false)
    })
    ipcRenderer.on('card-detected', (_, uid) => {
      if(editing) setInfo({ ...info, uid })
      else getUser({ uid })
    })
    ipcRenderer.on('status', (_, data) => {
      if(!info) setLoading(false)
      setStatus(data)
    })

    return () => ipcRenderer.removeAllListeners()
  }, [editing, info, getUser])



  return (
    <Container className="main">
      {
        !editing
        ?
        <>
          <p>Escanee un pase o escriba un DNI</p>
          <Input
            placeholder="DNI"
            value={dniInput}
            onChange={dni => setDniInput(dni)}
            submit={() => getUser({ dni: dniInput })}
            buttonLabel="Buscar"
            disabled={loading}
          />
        </>
        :
        <>
          <Reset reset={reset} disabled={loading} />
          <p>Para actualizar la tarjeta, escanee otra</p>
          <Info uid={info.uid} />
          <Input
            placeholder="DNI"
            value={dniInput}
            onChange={dni => setDniInput(dni)}
            disabled={disabled}
            disabledSubmit
          />
          <Input
            placeholder="Viajes"
            value={viajesInput}
            onChange={viajes => setViajesInput(viajes)}
            disabled={disabled}
            disabledSubmit
          />
          <Button
            theme="primary"
            size="lg"
            onClick={updateUser}
            disabled={disabled}
          >
            Actualizar
          </Button>
        </>
      }
      {
        status && <Status {...status} />
      }
    </Container>
  )
}