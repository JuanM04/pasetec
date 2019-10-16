import React from 'react'
import Link from 'next/link'
import {
  Card,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'shards-react'

import FAQ from 'utils/faq.json'

interface Props {
  pasePrice: number | string
}

export default ({ pasePrice }: Props) => (
  <Card className="FAQ">
    <h3>Preguntas Frecuentes</h3>
    <ListGroup flush>
      {FAQ.map(({ question, answer }, i) => (
        <ListGroupItem key={i}>
          <ListGroupItemHeading>{question}</ListGroupItemHeading>
          <ListGroupItemText>
            {answer.replace('PASE_PRICE', '$' + pasePrice)}
          </ListGroupItemText>
        </ListGroupItem>
      ))}
      <ListGroupItem>
        <ListGroupItemHeading>
          Me interesa la idea. ¿Dónde consigo más información? ¿Quiénes hicieron
          esto? ¿Puedo hacer un Pas-?
        </ListGroupItemHeading>
        <ListGroupItemText>
          Shh, demasiadas preguntas. <i>Todo</i> lo que se sabe de PaseTec está{' '}
          <Link href="/info">
            <a>aquí</a>
          </Link>
          . Sentite libre de leer (e incluso de preguntar).
        </ListGroupItemText>
      </ListGroupItem>
    </ListGroup>
  </Card>
)
