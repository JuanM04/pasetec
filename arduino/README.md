# PaseTec – _Arduino_

Arduino Uno, WeMoS D1 mini and RFID-RC522.

## Setup

You'll need the [Arduino IDE](https://www.arduino.cc/en/main/software) installed.

#### ESP8266 Boards

- Start the Arduino IDE and open _Preferences_.
- Enter `https://arduino.esp8266.com/stable/package_esp8266com_index.json` in _Additional Board Manager URLs_. (You can put multiple URLs separated by commas).
- Open _Boards Manager_ from _Tools > Board_ menu and install  `esp8266`  platform.
- Now you are able to select it when uploading to the WeMos D1 mini.

#### MFRC522 Library

- Start the Arduino IDE and go to _Sketch > Include Library > Manage Libraries..._.
- Search `MFRC522` and install it.
- Now you are able to use it.

### conf.h

In `arduino/bus/wemos/`, you'll need to create a `conf.h` file. Is like a dotenv for Arduino, and should look like this:

```c++11
#define NETWORK_SSID      "MyWiFiNetwork"
#define NETWORK_PASSWORD  "coolP44SW00RD"
#define ENDPOINT          "http://example.com/api"
#define SECRET            "api-secret"
```

### File Structure

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
