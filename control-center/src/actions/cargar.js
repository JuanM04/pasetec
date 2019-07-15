import React, { useState, useEffect, useCallback } from 'react'
import { Container } from 'shards-react'

import Info from '../components/Info'
import Input from '../components/Input'
import Reset from '../components/Reset'
import Status from '../components/Status'

const { ipcRenderer } = window.require('electron')





export default ()  => {
  const [info, setInfo] = useState(false)
  const [dniInput, setDniInput] = useState('')
  const [viajesInput, setViajesInput] = useState('')
  const [status, setStatus] = useState(false)
  const [loading, setLoading] = useState(false)



  function reset() {
    setInfo(false)
    setDniInput('')
    setViajesInput('')
    setStatus(false)
    setLoading(false)
  }

  const getUser = useCallback(data => {
    setLoading(true)
    ipcRenderer.send('get-user', data)
  }, [])

  function addViajes(newViajes) {
    setLoading(true)
    ipcRenderer.send('add-viajes', { id: info.id, newViajes })
  }



  useEffect(() => {
    ipcRenderer.on('get-user-res', (_, data) => {
      data.dni = data.dni.toLocaleString('es')
      setInfo(data)
      setViajesInput('')
      setStatus(false)
      setLoading(false)
    })
    ipcRenderer.on('add-viajes-res', (_, viajes) => {
      setStatus({ message: `El usuario ahora tiene ${viajes} viaje${viajes !== 1 ? 's' : ''}` })
    })
    ipcRenderer.on('card-detected', (_, uid) => getUser({ uid }))
    ipcRenderer.on('status', (_, data) => {
      if(!info) setLoading(false)
      setStatus(data)
    })

    return () => ipcRenderer.removeAllListeners()
  }, [info, getUser])



  return (
    <Container className="main">
      {
        !info
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
          <Info {...info} />
          <Input
            placeholder="Viajes a cargar"
            value={viajesInput}
            onChange={viajes => setViajesInput(viajes)}
            submit={() => addViajes(viajesInput)}
            buttonLabel="Cargar"
            disabled={loading || (status && status.type !== 'ERROR')}
          />
        </>
      }
      {
        status && <Status {...status} />
      }
    </Container>
  )
}