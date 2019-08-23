#include <Wire.h>
#include <LiquidCrystal_I2C.h>



LiquidCrystal_I2C lcd(0x27, 2, 1, 0, 4, 5, 6, 7, 3, POSITIVE); // Ser LCD I2C address

String serialAcum = "";
bool connecting = false;
int connectingAccum = 0;
bool LCDTimeoutOn = false;
unsigned long timeFromLastLCD;





void setLCDDefault() {
  LCDTimeoutOn = false;
  lcd.clear();
  lcd.setCursor(1, 1);
  lcd.print("Escanee su Tarjeta");
}

void startLCDTimeout() {
  LCDTimeoutOn = true;
  timeFromLastLCD = millis();
}



void newWifiStatus(String wifiStatus) {
  if (wifiStatus.startsWith("viajes:")) {
    String viajes = wifiStatus.substring(7);

    lcd.clear();
    if(viajes != "-1") {
      lcd.setCursor(9, 0);
      lcd.print("Buen Viaje!");
      lcd.setCursor(0, 2);
      lcd.print("Viajes Restantes:");
      lcd.setCursor(0, 3);
      lcd.print(viajes);
    } else {
      lcd.setCursor(5, 0);
      lcd.print("No tiene Viajes");
      lcd.setCursor(0, 2);
      lcd.print("Carge mas en");
      lcd.setCursor(0, 3);
      lcd.print("Cooperadora");
    }
    startLCDTimeout();
  }
  else if (wifiStatus == "error") {
    lcd.setCursor(6, 1);
    lcd.print("Error :(");
    lcd.setCursor(1, 2);
    lcd.print("Escanee nuevamente");
    startLCDTimeout();
  }
  else if(wifiStatus == "connected") {
    setLCDDefault();
  }
  else if (wifiStatus == "connecting") {
    if(!connecting || connectingAccum == 4) {
      connectingAccum = 0;
      lcd.clear();
      lcd.setCursor(0, 1);
      lcd.print("Iniciando el Sistema");
      lcd.setCursor(8, 2);
    }
    lcd.print(".");
    connectingAccum++;
    connecting = true;
  }
  else if (wifiStatus == "connection-lost") {
    if(!connecting || connectingAccum == 4) {
      connectingAccum = 0;
      lcd.clear();
      lcd.setCursor(4, 1);
      lcd.print("Reconectando");
      lcd.setCursor(8, 2);
    }
    lcd.print(".");
    connectingAccum++;
    connecting = true;
  }
}





void setup() {
  Serial.begin(115200);     // Initiate a serial communication
  lcd.begin(20, 4);         // Initiate LCD 20x4
}



void loop() {
  while(Serial.available() > 0) {
    serialAcum.concat(char(Serial.read()));
  }
  if(Serial.available() == 0 && serialAcum != "") {
    newWifiStatus(serialAcum);
    serialAcum = "";
  }

  if(LCDTimeoutOn && millis() - timeFromLastLCD > 5000) setLCDDefault();

  delay(500);
}