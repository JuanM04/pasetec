import React from 'react'
import { Col, Row } from 'shards-react'



export default ({ dni, uid, viajes }) => (
  <Row className="Info">
    <Col>
      <Param label="DNI" data={dni && dni.toLocaleString('es')} />
      <Param label="UID" data={uid} />
      <Param label="Viajes" data={viajes} />
    </Col>
  </Row>
)



const Param = ({ label, data }) => (
  data || data === 0
  ?
  <p><b>{label}:</b> {data}</p>
  :
  <></>
)