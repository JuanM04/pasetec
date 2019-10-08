import React from 'react'
import {
  Card,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'shards-react'

import FAQ from 'utils/faq.json'

export default ({ pasePrice }) => (
  <Card className="FAQ">
    <h3>F.A.Q.</h3>
    <ListGroup flush>
      {FAQ.map(({ question, answer }, i) => (
        <ListGroupItem key={i}>
          <ListGroupItemHeading>{question}</ListGroupItemHeading>
          <ListGroupItemText>
            {answer.replace('PASE_PRICE', '$' + pasePrice)}
          </ListGroupItemText>
        </ListGroupItem>
      ))}
    </ListGroup>
  </Card>
)
