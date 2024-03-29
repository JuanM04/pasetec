import React, { useState } from 'react'
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'shards-react'

import Cargar from './actions/cargar'
import Crear from './actions/crear'
import Actualizar from './actions/actualizar'
import Precios from './actions/precios'

import PortSelector from './components/PortSelector'

const actions = [
  { name: 'Cargar', component: Cargar },
  { name: 'Crear', component: Crear },
  { name: 'Actualizar', component: Actualizar },
  { name: 'Precios', component: Precios },
]

export default () => {
  const [portSetted, setPortSetted] = useState(false)
  const [actionSelected, setActionSelected] = useState(actions[0])

  return (
    <>
      <Navbar theme="primary" type="light" expand>
        <Container>
          <NavbarBrand href="#">
            <h1>PaseTec</h1> <span>Centro de Control</span>
          </NavbarBrand>
          {portSetted && (
            <Nav navbar>
              {actions.map(action => (
                <NavItem key={action.name}>
                  <NavLink
                    active={action.name === actionSelected.name}
                    href="#"
                    onClick={() => setActionSelected(action)}
                  >
                    {action.name}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          )}
        </Container>
      </Navbar>

      {portSetted ? (
        <actionSelected.component />
      ) : (
        <PortSelector setPortSetted={setPortSetted} />
      )}
    </>
  )
}
