import React, { useState, useEffect } from 'react'
import nookies from 'nookies'
import apolloClient, { GET_VIAJES, GET_PRICES } from 'utils/apollo'

import { DniInput, FAQ, ViajesCard } from 'components'
import { Alert, Container } from 'shards-react'

function App({ prices, user: userProps }) {
  const [online, setOnline] = useState(true)
  const [user, setUser] = useState(userProps)
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

        if (!getUser) return alert('El usuario no existe')
        setUser({
          dni,
          viajes: getUser.viajes,
        })
      })
      .catch(console.error)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') setOnline(navigator.onLine)
  }, [])

  useEffect(() => {
    if (!user.dni) return
    nookies.set({}, 'user', user.dni.toString(), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    })
  }, [user])

  return (
    <Container className="App">
      <h1>PaseTec</h1>

      {!online && <Alert theme="primary">No tenés conexión a internet</Alert>}

      {!user.dni && online && <DniInput loading={loading} callback={getUser} />}

      {user.dni && online && (
        <ViajesCard
          viajePrice={prices.viaje}
          user={user}
          logOut={() => {
            setUser({})
            nookies.destroy({}, 'user')
          }}
        />
      )}

      <FAQ pasePrice={prices.pase} />
    </Container>
  )
}

App.getInitialProps = async ctx => {
  try {
    const {
      data: { getMetadata: prices },
    } = await apolloClient.query({ query: GET_PRICES })

    let { user: dni } = nookies.get(ctx)
    let user = {}
    if (dni) {
      let res = await apolloClient.query({
        query: GET_VIAJES,
        variables: { dni: parseInt(dni) },
      })
      user = {
        ...res.data.getUser,
        dni,
      }
    }

    return {
      prices: {
        pase: prices.pasePrice,
        viaje: prices.viajePrice,
      },
      user,
    }
  } catch (error) {
    console.error(error)
    nookies.destroy(ctx, 'user')
    return {
      prices: {
        pase: '--',
        viaje: '--',
      },
      user: {},
    }
  }
}

export default App
