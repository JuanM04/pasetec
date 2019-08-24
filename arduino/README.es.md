[English](README.md) | Español

# PaseTec – _Arduino_

Arduino Uno, WeMoS D1 mini y RFID-RC522.

## Preparación

Necesitás tener el [Arduino IDE](https://www.arduino.cc/en/main/software) instalado.

#### Placas ESP8266

- Iniciá el Arduino IDE y andá a _Preferencias_.
- Ingresá `https://arduino.esp8266.com/stable/package_esp8266com_index.json` en _Additional Board Manager URLs_. (Podés poner múltiples URL separándolas con comas).
- Abrí _Boards Manager_ desde el _Tools > Board_ menu e instalá la plataforma `esp8266`.
- Ahora tenés disponible la placa del WeMos D1 mini.

#### Librería MFRC522

- Iniciá el Arduino IDE y andá a _Sketch > Include Library > Manage Libraries..._.
- Buscá `MFRC522` e instalalo.
- Ahora podés usarla.

#### `conf.h`

Dentro de `arduino/bus/wemos/`, necesitarás crear un archivo `conf.h`. Es como un dotenv para Arduino, y debe verse así:

```c++11
#define NETWORK_SSID      "MiRedWifi"
#define NETWORK_PASSWORD  "C0ntr4seÑa"
#define HOST              "ejemplo.com"
#define SECRET            "secreto-api"
```

#### `CACert.ino`

Dentro de `arduino/bus/wemos/`, necesitarás crear un archivo `CACert.ino`. Ahí irá el certificado raiz SSL de tu host. [Acá](GET_CACERT.es.md) hay una guía para obtenerlo.

### Estructura de Archivos

```
arduino/
|-- bus/
  |-- uno/
  |-- wemos/
|-- control-center/
  |-- uno/
```

- **`bus/uno/`**: Contains the code for the Arduino Uno that goes in the bus
- **`bus/wemos/`**: Contains the code for the WeMoS D1 mini that goes in the bus
- **`control-center/uno/`**: Contains the code for the Arduino Uno that goes in the Control Center
- **`*.png`**: Images that contain information about the components used and how are they connected
