import React from 'react'
import { Button } from 'shards-react'

export default ({ reset, loading }) => (
  <Button
    pill
    outline
    theme="info"
    onClick={reset}
    disabled={loading}
    className="Reset"
  >
    Volver
  </Button>
)
