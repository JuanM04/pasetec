import React from 'react'
import Link from 'next/link'
import { Container } from 'shards-react'

export default () => (
  <Container className="Info">
    <header>
      <h1>PaseTec</h1>
      <span>Un sistema electrónico de transporte escolar</span>
    </header>
    <section>
      <h2>El Proyecto</h2>
      <p>
        Los chicos de la Escuela Técnica Nº 2 Mercedes V. de Labbe (E.E.S.T. Nº
        2) disponen de un colectivo que los lleva desde la escuela hasta el
        campo de deportes. Estos solían ir a Cooperadora (una oficinita dentro
        de la escuela), comprar boletos a papel, y el día de educación física
        subir al colectivo con este.
      </p>
      <p>
        Ahora tienen <i>llaveros</i>: estos permiten guardar múltiples boletos
        en un objeto simple y que se puede llevar con las llaves. La idea es que
        los chicos a) compren varios boletos de un saque y los guarden o b) los
        papás al pagar la cuota mensual de Cooperadora, carguen los boletos del
        mes. Con este sistema se facilita la contabilidad y registro de cuentas,
        ya que las compras quedan registradas, y se elimina un gasto en papel
        (lo cual ayuda al medio ambiente). No solo eso, los chicos disponen de
        una <i>estación de consultas</i> en el pasillo y una app para consultar
        su saldo y el precio del boleto.
      </p>
      <h4>Detalles técnicos</h4>
      <p>
        PaseTec dispone de varios Arduinos, servidores gratuitos, y una base de
        datos. El proyecto está documentado (en inglés y en español) en{' '}
        <a href="https://github.com/JuanM04/pasetec">este repositorio</a> de
        GitHub. Está bajo la licencia MIT, lo que le permite a cualquier otra
        persona a descargar, modificar y usar el sistema. Si alguien lo usa y
        encuentra un error, se le ocurrió una mejora, o escribió código que
        quiere compartir, puede hacerlo desde GitHub. Todo será bienvenido.
      </p>
      <h5>Glosario</h5>
      <ul>
        <li>
          <b>PaseTec</b>: el sistema en su totalidad.
        </li>
        <li>
          <b>Pase</b>: llavero o tarjeta donde se cargan viajes.
        </li>
        <li>
          <b>Viaje</b>: es el saldo; un viaje equivale a una ida y vuelta al
          campo de deportes.
        </li>
        <li>
          <b>Centro de Control</b>: el software de donde se cargan los viajes
          (que se encuentra en Cooperadora).
        </li>
        <li>
          <b>Consultor</b>: estación de consulta en los pasillos.
        </li>
        <li>
          <Link href="/">
            <a>
              <b>App</b>
            </a>
          </Link>
        </li>
      </ul>
      <p>
        El sistema se basa en un Consultor que devuelve los viajes del usuario y
        el precio del pase; el Centro de Control en Cooperadora para crear y
        actualizar usuarios, cargar viajes, y cambiar los precios; y una caja
        para cobrar los viajes dentro del colectivo. Todos los datos pasan un
        servidor, que pide datos a la base de datos y los devuelve.
      </p>
      <p>
        Yo, usuario, tengo que 1) ir a Cooperadora a cargar viajes (para esto
        necesito saber mi DNI o llevar mi pase) y 2) subirme al colectivo. Yo,
        la escuela, tengo a una persona en cooperadora (no experta en
        computación) que use el software (sí, hay que hacer una mínima
        capacitación, pero es intuitivo). ¿Por qué no una caja más a la que le
        metés billetes y te carga los viajes? Porque no existe algo sencillo que
        lo haga y no tenemos la experiencia como para hacerlo.
      </p>
    </section>
    <section>
      <h2>El Proceso</h2>
      <h4>Génesis</h4>
      <p>
        Alrededor de julio de 2019, el profesor Gonzalo Vitale (en la materia de
        electrónica) nos puso en grupos con el fin de "idear un proyecto y
        llevar a cabo hasta fin de año". Nosotros (Ángel Petti, Tomás Totis,
        Emilia Sanz y Juan Martín Seery; todos de 4º año), luego de un rato de
        pensar, se nos ocurrió la idea que hoy está funcionando en la escuela.
        Pensamos a grosso modo cómo sería, presupuestamos los componentes y
        empezamos. Conseguimos financiamiento por parte de la Cooperadora, y
        mandamos a pedir los componentes.
      </p>
      <p>
        En paralelo estábamos dieñando la caja y creando el sistema. Para la
        caja tomamos medidas en el colectivo, medimos los componentes con
        calibre y la diseñamos en 3D (modelos en el repositorio). El modelo
        cambió mucho en el tiempo, mientras nos dábamos cuenta de qué materiales
        usar, dónde iría, etcétera. Aprendimos cómo usar{' '}
        <a href="https://www.tinkercad.com/">Tinkercad</a>, modelado 3D, y cómo
        organizar muchos cables en muy poco espacio.
      </p>
      <p>
        Por otro lado, el sistema: fue un prueba y error intenso, principalmente
        por nuestro poco conociemento sobre Arduino. Obviando que el diseño del
        sistema fue variando (bruscamente) a lo largo del tiempo, la idea se
        mantuvo. Tampoco vamos a escribir veinte páginas sobre cómo lo hicimos,
        pero finalmente aprendimos de electrónica, Arduino y transmisión de
        datos.
      </p>
      <h4>"Funcionando"</h4>
      <p>
        A todo esto, llegamos a octubre. <i>Teníamos</i> que prensentar el
        proyecto. De un momento a otro, nos encontramos usando todas nuestras
        horas de clases durante tres días para terminar esto. Llegó el día de
        exponer y el sistema de carga no funcionaba, y lo arreglamos justo antes
        de presentar. Además, habían ciertos errores mínimamente graves, que
        graciosamente los fuimos solucionando dentro de la exposición.
      </p>
      <p>
        Poco después, empezamos a hacer pruebas posta: pusimos la caja en el
        colectivo y empezamos a probar el sistema solo con nuestro curso.
        <br />
        <b>W.I.P.</b>
      </p>
    </section>
  </Container>
)
