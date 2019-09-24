#include <time.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <SPI.h>
#include <MFRC522.h>

#include "./conf.h"

#define SS_PIN D8
#define RST_PIN D3
MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance.

WiFiClientSecure client;
String serialAcum = "";
bool connecting = false;

// External certificate (CACert.ino)
extern const unsigned char caCert[] PROGMEM;
extern const unsigned int caCertLen;

void useViaje(String UID)
{
  client.print(String("") +
               "POST /api/use-viaje HTTP/1.1\r\n" +
               "Host: " + HOST + "\r\n" +
               "User-Agent: ESP8266\r\n" +
               "Content-Type: text/plain\r\n" +
               "Content-Length: " + UID.length() + "\r\n" +
               "Secret: " + SECRET + "\r\n\r\n" +
               UID);

  while (client.connected())
  {
    String line = client.readStringUntil('\n');
    if (line == "\r")
      break;
  }

  String res = client.readStringUntil('!');
  Serial.print(res);
}

String getUID()
{
  String content = "";
  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  content.toUpperCase();
  return content.substring(1);
}

void setup()
{
  Serial.begin(115200);
  SPI.begin();
  mfrc522.PCD_Init();
  WiFi.begin(NETWORK_SSID, NETWORK_PASSWORD);

  while (WiFi.status() != WL_CONNECTED)
  {
    connecting = true;
    Serial.print("connecting");
    delay(1000);
  }

  // Set time
  configTime(8 * 3600, 0, "pool.ntp.org", "time.nist.gov");
  time_t now = time(nullptr);
  while (now < 8 * 3600 * 2)
  {
    delay(500);
    now = time(nullptr);
  }
  struct tm timeinfo;
  gmtime_r(&now, &timeinfo);

  // Set certificate
  client.setCACert_P(caCert, caCertLen);
}

void loop()
{
  if (WiFi.status() == WL_CONNECTED)
  {
    if (connecting)
    {
      connecting = false;
      client.connect(HOST, 443);
      Serial.print("connected");
    }

    if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial())
      useViaje(getUID());

    delay(500);
  }
  else
  {
    Serial.print("connection-lost");
    connecting = true;
    WiFi.reconnect();
    delay(3000);
  }
}
