import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Container, FormSelect } from 'shards-react'

const { ipcRenderer } = window.require('electron')

export default ({ setPortSetted }) => {
  const [ports, setPorts] = useState([])
  const [portSelected, setPortSelected] = useState('')

  useEffect(() => {
    ipcRenderer.on('ports', (_, portsRes) => {
      // We don't like COM1
      portsRes = portsRes.filter(port => port.comName !== 'COM1')
      setPorts(portsRes)
      if (portsRes.length > 0) setPortSelected(portsRes[0].comName)
    })

    return () => ipcRenderer.removeAllListeners()
  }, [])

  return (
    <Container className="main">
      <p>Elija un puerto</p>
      <FormSelect
        className="PortSelector"
        value={portSelected}
        onChange={e => setPortSelected(e.target.value)}
      >
        {ports.map(({ comName, manufacturer }) => (
          <option value={comName} key={comName}>
            {comName} {manufacturer && `– ${manufacturer}`}
          </option>
        ))}
      </FormSelect>
      <ButtonGroup>
        <Button
          theme="primary"
          onClick={() => {
            ipcRenderer.send('use-port', portSelected)
            setPortSetted(true)
          }}
          disabled={portSelected === ''}
        >
          Elegir
        </Button>
        <Button
          theme="primary"
          outline
          onClick={() => ipcRenderer.send('get-ports')}
        >
          Recargar
        </Button>
      </ButtonGroup>
      <span className="no-scan" onClick={() => setPortSetted(true)}>
        Continuar sin escáner
      </span>
    </Container>
  )
}
