import React from 'react'
import { Alert, Col, Row } from 'shards-react'



export default ({ type, message }) => {
  let content = {}

  switch (type) {
    case 'USER_CREATED':
      content = {
        theme: 'success',
        message: 'Usuario creado'
      }
      break
    case 'USER_UPDATED':
      content = {
        theme: 'success',
        message: 'Usuario actualizado'
      }
      break
    case 'PRICES_UPDATED':
      content = {
        theme: 'success',
        message: 'Precios actualizados'
      }
      break
    case 'ERROR':
      content = {
        theme: 'danger',
        message: message || 'Ha habido un error; fijate si tenés conexión a internet'
      }
      break
    default:
      content = {
        theme: 'success',
        message
      }
  }



  return(
    <Row className="Status">
      <Col>
        <Alert theme={content.theme}>
          {content.message}
        </Alert>
      </Col>
    </Row>
  )
}