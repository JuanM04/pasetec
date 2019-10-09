import React, { useState, useEffect } from 'react'
import nookies from 'nookies'
import storage from 'utils/simpleStorage'
import apolloClient, { GET_VIAJES, GET_PRICES } from 'utils/apollo'

import { DniInput, FAQ, ViajesCard } from 'components'
import { Alert, Container } from 'shards-react'

function App(props) {
  const [online, setOnline] = useState(true)
  const [prices, setPrices] = useState(props.prices)
  const [user, setUser] = useState(props.user)
  const [loading, setLoading] = useState(false)

  const getUser = dni => {
    dni = parseInt(dni)
    setLoading(true)

    apolloClient
      .query({
        query: GET_VIAJES,
        variables: { dni },
      })
      .then(({ data: { getUser } }) => {
        setLoading(false)

        if (!getUser) alert('El usuario no existe')
        else setUser(getUser)
      })
      .catch(console.error)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const online = navigator.onLine
      setOnline(online)
      window.addEventListener('online', () => setOnline(true))
      window.addEventListener('offline', () => setOnline(false))

      if (online) {
        storage.set('query-prices', prices)
        storage.set('last-online', new Date().toISOString())
      } else {
        setPrices(storage.get('query-prices'))
        setUser(storage.get('query-user'))
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    storage.set('query-user', user)

    if (!user.dni) return
    nookies.set({}, 'user', user.dni.toString(), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    })
  }, [user])

  return (
    <Container className="App">
      <h1>PaseTec</h1>

      {!online && (
        <Alert theme="primary">
          No tenés conexión a internet
          <br />
          Últimos datos guardados:{' '}
          {new Date(storage.get('last-online')).toLocaleDateString('es')}
        </Alert>
      )}

      {!user.dni && online && <DniInput loading={loading} callback={getUser} />}

      {user.dni && (
        <ViajesCard
          viajePrice={prices.viajePrice || '--'}
          user={user}
          logOut={() => {
            setUser({})
            nookies.destroy({}, 'user')
          }}
        />
      )}

      <FAQ pasePrice={prices.pasePrice || '--'} />
    </Container>
  )
}

App.getInitialProps = async ctx => {
  try {
    const prices = await apolloClient.query({ query: GET_PRICES })

    let user = {}
    const { user: dni } = nookies.get(ctx)
    if (dni)
      user = await apolloClient.query({
        query: GET_VIAJES,
        variables: { dni: parseInt(dni) },
      })

    return {
      prices: prices.data ? prices.data.getMetadata : {},
      user: user.data ? user.data.getUser : {},
    }
  } catch (error) {
    console.error(error)
    nookies.destroy(ctx, 'user')
    return {
      prices: {},
      user: {},
    }
  }
}

export default App
