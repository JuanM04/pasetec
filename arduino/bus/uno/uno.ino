#include <Wire.h>
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
#define BUZZER 10

String serialAcum = "";
bool connecting = false;
int connectingAccum = 0;

bool LCDTimeoutOn = false;
unsigned long timeFromLastLCD;
bool BuzzerTimeoutOn = false;
unsigned long timeFromLastBuzzer;

void playBuzzer()
{
  digitalWrite(BUZZER, HIGH);
  BuzzerTimeoutOn = true;
  timeFromLastBuzzer = millis();
}

void setLCDDefault()
{
  LCDTimeoutOn = false;
  lcd.clear();
  writeOnLCD(3, 1, "Escanee su");
  writeOnLCD(6, 2, "Pase");
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
  if (wifiStatus.startsWith("viajes:"))
  {
    String viajes = wifiStatus.substring(7);

    lcd.clear();
    if (viajes != "-1")
    {
      writeOnLCD(2, 1, "Suerte  ^w^/");
      writeOnLCD(0, 3, "Viajes:");
      writeOnLCD(8, 3, viajes);
      playBuzzer();
    }
    else
    {
      writeOnLCD(3, 1, "Sin Viajes");
      writeOnLCD(1, 2, "No puede subir");
    }
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

    else if (wifiStatus == "connecting")
        connectingDots(3, "Arrancando");
  else if (wifiStatus == "connection-lost")
    connectingDots(2, "Reconectando");
}

void setup()
{
  Serial.begin(115200); // Initiate a serial communication
  lcd.begin(16, 4);     // Initiate LCD 16x4
  pinMode(BUZZER, OUTPUT);
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
    LCD = 3s
    Buzzer = .5s
  */
  if (LCDTimeoutOn && millis() - timeFromLastLCD > 3000)
    setLCDDefault();
  if (BuzzerTimeoutOn && millis() - timeFromLastBuzzer > 500)
  {
    digitalWrite(BUZZER, LOW);
    BuzzerTimeoutOn = false;
  }

  delay(500);
}
