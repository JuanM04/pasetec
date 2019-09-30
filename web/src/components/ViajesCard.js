import React from 'react'
import { Button, Card, CardBody, Col, Row } from 'shards-react'

export default ({ user: { viajes, dni }, viajePrice, logOut }) => (
  <Card className="Board">
    <CardBody>
      <Row className="top">
        <Col>
          <span className="big">{viajes}</span>
          <span className="small">viajes</span>
        </Col>
        <Col>
          <span className="big">${viajePrice}</span>
          <span className="small">por viaje</span>
        </Col>
      </Row>
      <hr />
      <Row className="bottom">
        <Col>
          <span>DNI: {dni.toLocaleString('es')}</span>
        </Col>
        <Col xs="4">
          <Button theme="primary" pill outline size="sm" onClick={logOut}>
            Salir
          </Button>
        </Col>
      </Row>
    </CardBody>
  </Card>
)
