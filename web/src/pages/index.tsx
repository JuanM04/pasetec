import React, { useState, useEffect } from 'react'
import nookies from 'nookies'
import storage from 'utils/simpleStorage'
import apolloClient, { GET_VIAJES, GET_PRICES } from 'utils/apollo'

import { DniInput, FAQ, ViajesCard } from 'components'
import { Alert, Container } from 'shards-react'

type User = false | BaseUser
type Prices = false | BasePrices

interface Props {
  prices: Prices
  user: User
}

function App(props: Props) {
  const [online, setOnline] = useState(true)
  const [prices, setPrices] = useState(props.prices)
  const [user, setUser] = useState(props.user)
  const [loading, setLoading] = useState(false)

  const getUser = (dni: string) => {
    setLoading(true)

    apolloClient
      .query({
        query: GET_VIAJES,
        variables: { dni: parseInt(dni) },
      })
      .then(res => {
        const user: User = res.data.user
        setLoading(false)
        if (!user) alert('El usuario no existe')
        else setUser(user)
      })
      .catch(console.error)
  }

  // Runs on each loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const online = navigator.onLine
      setOnline(online)
      window.addEventListener('online', () => setOnline(true))
      window.addEventListener('offline', () => setOnline(false))

      // Offline support: saves and reads queries
      if (online) {
        storage.set('query-prices', prices)
        storage.set('last-online', new Date().toISOString())
      } else {
        setPrices(storage.get('query-prices'))
        setUser(storage.get('query-user'))
      }
    }
  }, [])

  // Runs when "user" is modified
  useEffect(() => {
    if (typeof window === 'undefined') return
    storage.set('query-user', user)

    if (!user) return
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

      {!user && online && <DniInput loading={loading} callback={getUser} />}

      {user && (
        <ViajesCard
          viajePrice={prices ? prices.viajePrice : '--'}
          user={user}
          logOut={() => {
            setUser(false)
            nookies.destroy({}, 'user')
          }}
        />
      )}

      <FAQ pasePrice={prices ? prices.pasePrice : '--'} />
    </Container>
  )
}

App.getInitialProps = async ctx => {
  try {
    let user: User = false,
      prices: Prices = false

    const pricesRes = await apolloClient.query({ query: GET_PRICES })
    if ('data' in pricesRes) prices = pricesRes.data.metadata

    // "If there's a user in the cookies, get it"
    const { user: dni } = nookies.get(ctx)
    if (dni) {
      const userRes = await apolloClient.query({
        query: GET_VIAJES,
        variables: { dni: parseInt(dni) },
      })
      if ('data' in userRes) user = userRes.data.user
    }

    return { prices, user }
  } catch (error) {
    console.error(error)
    nookies.destroy(ctx, 'user')
    return {
      prices: false,
      user: false,
    }
  }
}

export default App
