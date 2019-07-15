String serialAcum = "";





void newWifiStatus(String wifiStatus) {
  if (wifiStatus.startsWith("viajes:")) {
    String viajes = wifiStatus.substring(7);

    if(viajes != "-1") {
      // TODO: Viajes
    } else {
      // TODO: No viajes
      for (size_t i = 0; i <= atoi(viajes[0]); i++)
      {
        digitalWrite(LED_BUILTIN, HIGH);
        delay(1000);
        digitalWrite(LED_BUILTIN, LOW);
        delay(500);
      }
      delay(3000);
    }
  }
  else if (wifiStatus == "error") {
    // TODO: Re-escaneá
  }
  else if(wifiStatus == "connected") {
    // TODO: Escanea aquí
    digitalWrite(LED_BUILTIN, HIGH);
  }
  else if (wifiStatus == "connecting") {
    // TODO: Encendiendo...
  }
  else if (wifiStatus == "connection-lost") {
    // TODO: Reconectando...
  }
}





void setup() {
  Serial.begin(115200);     // Initiate a serial communication
  pinMode(LED_BUILTIN, OUTPUT);
}



void loop() {
  while(Serial.available() > 0) {
    serialAcum.concat(char(Serial.read()));
  }
  if(Serial.available() == 0 && serialAcum != "") {
    newWifiStatus(serialAcum);
    serialAcum = "";
  }

  delay(500);
}