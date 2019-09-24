import React, { useState, useEffect } from 'react'
import slugify from 'slugify'
import {
  Alert,
  Button,
  Card,
  CardBody,
  Container,
  Col,
  FormInput,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
} from 'shards-react'

import FAQ from './faq.json'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.sass'

const fetchOptions = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

function App() {
  const [userInfo, setUserInfo] = useState(false)
  const [prices, setPrices] = useState({ pase: '--', viaje: '--' })
  const [dniInput, setDniInput] = useState('')
  const [loading, setLoading] = useState(false)

  function getUser(dni) {
    setLoading(true)
    fetch('/api/get-user', {
      ...fetchOptions,
      body: JSON.stringify({ dni }),
    })
      .then(res => res.json())
      .then(user => {
        if (!user) alert('Usuario no encontrado')
        else {
          setDniInput('')
          localStorage.setItem('user', user.dni)
        }

        setLoading(false)
        setUserInfo(user)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    if (!navigator.onLine) return

    fetch('/api/get-prices', fetchOptions)
      .then(res => res.json())
      .then(res => setPrices({ pase: res.pasePrice, viaje: res.viajePrice }))
      .catch(err => console.error(err))

    let dni = localStorage.getItem('user')
    if (dni) getUser(parseInt(dni))
  }, [])

  return (
    <Container className="main">
      <h1>PaseTec</h1>

      {!navigator.onLine && (
        <Alert theme="primary">No tenés conexión a internet</Alert>
      )}

      {!userInfo && navigator.onLine && (
        <InputGroup>
          <FormInput
            placeholder="DNI"
            value={dniInput}
            onChange={e =>
              setDniInput(
                parseInt(slugify(e.target.value, { remove: /[^\d]+/g })) || ''
              )
            }
            onKeyPress={e => {
              if (loading || dniInput === '') return
              if (e.which !== 13 && e.keyCode !== 13) return
              getUser(dniInput)
            }}
            disabled={loading}
          />
          <InputGroupAddon type="append">
            <Button
              disabled={loading || dniInput === ''}
              onClick={() => getUser(dniInput)}
            >
              Ingresar
            </Button>
          </InputGroupAddon>
        </InputGroup>
      )}

      {userInfo && navigator.onLine && (
        <Card className="Board">
          <CardBody>
            <Row className="top">
              <Col>
                <span className="big">{userInfo.viajes}</span>
                <span className="small">viajes</span>
              </Col>
              <Col>
                <span className="big">${prices.viaje}</span>
                <span className="small">por viaje</span>
              </Col>
            </Row>
            <hr />
            <Row className="bottom">
              <Col>
                <span>DNI: {parseInt(userInfo.dni).toLocaleString('es')}</span>
              </Col>
              <Col xs="4">
                <Button
                  theme="primary"
                  pill
                  outline
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem('user')
                    setUserInfo(false)
                  }}
                >
                  Salir
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}

      <Card className="FAQ">
        <h3>F.A.Q.</h3>
        <ListGroup flush>
          {FAQ.map(({ question, answer }, i) => (
            <ListGroupItem key={i}>
              <ListGroupItemHeading>{question}</ListGroupItemHeading>
              <ListGroupItemText>
                {answer.replace('PASE_PRICE', `$${prices.pase}`)}
              </ListGroupItemText>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    </Container>
  )
}

export default App
