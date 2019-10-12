import React, { useState } from 'react'
import slugify from 'slugify'
import { Button, FormInput, InputGroup, InputGroupAddon } from 'shards-react'

interface Props {
  loading: boolean
  callback(dni: string): void
}

export default (props: Props) => {
  const { loading, callback } = props
  const [dniInput, setDniInput] = useState('')

  return (
    <InputGroup>
      <FormInput
        placeholder="DNI"
        value={dniInput}
        onChange={e =>
          setDniInput(slugify(e.target.value, { remove: /[^\d]+/g }) || '')
        }
        onKeyPress={e => {
          if (loading || dniInput === '') return
          if (e.which !== 13 && e.keyCode !== 13) return
          callback(dniInput)
        }}
        disabled={loading}
      />
      <InputGroupAddon type="append">
        <Button
          disabled={loading || dniInput === ''}
          onClick={() => callback(dniInput)}
        >
          Ingresar
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}
