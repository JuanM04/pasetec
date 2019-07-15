import React from 'react'
import slugify from 'slugify'
import { Button, Col, FormGroup, FormInput, InputGroup, InputGroupAddon, Row } from 'shards-react'

function integrify(str) {
  str = slugify(str, { remove: /[^\d]+/g })
  return parseInt(str) || ''
}



export default ({ placeholder, value, onChange, submit, disabled, disabledSubmit, disabledTyping, buttonLabel }) => (
  <Row className="Input">
    <Col>
      <FormGroup>
        <label>{placeholder}</label>
        <InputGroup>
          <FormInput
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(integrify(e.target.value))}
            onKeyPress={e => {
              if(disabledSubmit) return
              if(e.which !== 13 && e.keyCode !== 13) return
              submit()
            }}
            disabled={disabled || disabledTyping}
          />
          {
            buttonLabel && (
              <InputGroupAddon type="append">
                <Button theme="primary" onClick={submit} disabled={disabled || disabledSubmit}>{buttonLabel}</Button>
              </InputGroupAddon>
            )
          }
        </InputGroup>
      </FormGroup>
    </Col>
  </Row>
)