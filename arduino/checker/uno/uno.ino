#include <Wire.h>
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

String serialAcum = "";
bool connecting = false;
int connectingAccum = 0;
bool LCDTimeoutOn = false;
unsigned long timeFromLastLCD;

void setLCDDefault()
{
  LCDTimeoutOn = false;
  lcd.clear();
  writeOnLCD(4, 1, "Consulte");
  writeOnLCD(0, 2, "Viajes y precios");
}

void startLCDTimeout()
{
  LCDTimeoutOn = true;
  timeFromLastLCD = millis();
}

// LCD helper
void writeOnLCD(int col, int row, String str)
{
  lcd.setCursor(col, row);
  lcd.print(str);
}

/*
  There's an animation when loading:
  ".   " > "..  " > "... " > "...." (and repeat)
  This function does it.
*/
void connectingDots(int msgCol, String msg)
{
  if (!connecting || connectingAccum == 4)
  {
    connecting = false;
    connectingAccum = 0;
    lcd.clear();
    writeOnLCD(msgCol, 1, msg);
    lcd.setCursor(6, 2);
  }
  lcd.print(".");
  connectingAccum++;
  connecting = true;
}

// When a new message comes in the Serial, this runs
void newWifiStatus(String wifiStatus)
{
  if (wifiStatus.startsWith("res:"))
  {
    String res = wifiStatus.substring(4);
    int resDash = res.indexOf("-");
    String viajes = res.substring(0, resDash);
    String viajePrice = res.substring(resDash + 1);

    lcd.clear();
    writeOnLCD(4, 0, "Consulta");
    writeOnLCD(0, 2, "Viajes: ");
    writeOnLCD(8, 2, viajes);
    writeOnLCD(0, 3, "Precio: $");
    writeOnLCD(9, 3, viajePrice);
    startLCDTimeout();
  }
  else if (wifiStatus == "error")
  {
    lcd.clear();
    writeOnLCD(4, 1, "Error :(");
    writeOnLCD(0, 2, "Intente otra vez");
    startLCDTimeout();
  }
  else if (wifiStatus == "connected")
    setLCDDefault();
  else if (wifiStatus == "connecting")
    connectingDots(3, "Arrancando");
  else if (wifiStatus == "connection-lost")
    connectingDots(2, "Reconectando");
}

void setup()
{
  Serial.begin(115200); // Initiate a serial communication
  lcd.begin(16, 4);     // Initiate LCD 16x4
}

void loop()
{
  // Serial reader
  while (Serial.available() > 0)
  {
    serialAcum.concat(char(Serial.read()));
  }
  if (Serial.available() == 0 && serialAcum != "")
  {
    newWifiStatus(serialAcum);
    serialAcum = "";
  }

  /*
    Timeouts
    LCD = 5s
  */
  if (LCDTimeoutOn && millis() - timeFromLastLCD > 5000)
    setLCDDefault();

  delay(500);
}