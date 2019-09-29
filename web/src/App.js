import React, { useState, useEffect } from 'react'
import { getViajes, getPrices } from './queries'

import DniInput from './components/DniInput'
import ViajesCard from './components/ViajesCard'
import FAQ from './components/FAQ'
import { Alert, Container } from 'shards-react'

function App() {
  const [user, setUser] = useState({})
  const [prices, setPrices] = useState({ pase: '--', viaje: '--' })
  const [loading, setLoading] = useState(false)

  const getUser = dni => {
    dni = parseInt(dni)
    setLoading(true)
    getViajes({ dni })
      .then(({ getUser }) => {
        setLoading(false)

        if (!getUser) return alert('El usuario no existe')

        setUser({
          dni,
          viajes: getUser.viajes,
        })
        localStorage.setItem('user', dni)
      })
      .catch(console.error)
  }

  useEffect(() => {
    if (!navigator.onLine) return

    getPrices()
      .then(({ getMetadata }) => {
        setPrices({
          pase: getMetadata.pasePrice,
          viaje: getMetadata.viajePrice,
        })
      })
      .catch(console.error)

    let user = localStorage.getItem('user')
    if (user) getUser(user)
  }, [])

  return (
    <Container className="main">
      <h1>PaseTec</h1>

      {!navigator.onLine && (
        <Alert theme="primary">No tenés conexión a internet</Alert>
      )}

      {!user.dni && navigator.onLine && (
        <DniInput loading={loading} callback={getUser} />
      )}

      {user.dni && navigator.onLine && (
        <ViajesCard
          viajePrice={prices.viaje}
          user={user}
          logOut={() => {
            setUser({})
            localStorage.removeItem('user')
          }}
        />
      )}

      <FAQ pasePrice={prices.pase} />
    </Container>
  )
}

export default App
