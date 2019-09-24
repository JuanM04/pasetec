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

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.sass'

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
            <span>PaseTec</span> <br /> Centro de Control
          </NavbarBrand>
          {portSetted && (
            <Nav navbar>
              {actions.map(action => (
                <NavItem>
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
