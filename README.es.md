[English](README.md) | Español

# PaseTec

Un sistema electrónico de transporte escolar.

## Cómo funciona

El sistema entero puede ser dividido en tres partes "independientes":

- **[Arduino](/arduino)**: Acá va todo el codigo dentro de los Arduinos y otros aparatos.
- **[Centro de Control](/control-center)**: El Centro de Control es un panel de control para manejar todos los datos.
- **[Web](/web)**: Puede ser subdividido en dos partes más (y está todo junto por practicidad):
  - **API**: todos los endpoint que obtienen o modifican datos de la base de datos;
  - **Página**: donde el usuario puede ver su información.

### Flujo de los Datos

![Flujo](data-flow.png)

## Recursos

- **Diseño**: Archivo de Figma [aquí](https://www.figma.com/file/DkmXx82ARM2QYjc8GLEAHy/PaseTec).
- **Cajas de Arduino**: Modelos 3D _próximamente_.