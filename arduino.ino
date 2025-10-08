/*
  Blynk Cloud-ready soil moisture sketch

  This sketch reads a soil moisture sensor on the analog pin (A0), maps
  the reading to a percentage (0 = dry, 100 = wet), and sends values to
  Blynk Cloud on virtual pins V1 (percent) and V2 (raw ADC).

  It supports ESP8266 and ESP32 boards. For other boards you'll need to
  adapt the WiFi/Blynk includes and connection logic.

  Configure the AUTH token and WiFi credentials below before uploading.
*/

// -------- CONFIGURATION --------
char AUTH_TOKEN[] = "U32-WUZPEtM6YCMtx6DeoYXzdr_4Fr1g"; // <-- set your Blynk Cloud auth token
char WIFI_SSID[]  = "YOUR_WIFI_SSID";        // <-- set your WiFi SSID
char WIFI_PASS[]  = "YOUR_WIFI_PASSWORD";    // <-- set your WiFi password

const int sensorPin = A0; // analog pin connected to moisture sensor

// Calibration values (ADC). Measure and tune for your sensor and board.
int dryVal = 900;   // ADC value when soil is dry
int wetVal = 260;   // ADC value when sensor is in water

// Reporting interval (milliseconds)
const unsigned long REPORT_INTERVAL = 10000UL; // 10 seconds

// -------- ESP8266-specific includes --------
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <BlynkTimer.h>

BlynkTimer timer;

void sendSensor();

void setup() {
  Serial.begin(115200);
  delay(10);

  // Connect to Blynk Cloud (blocks until connected)
  Blynk.begin(AUTH_TOKEN, WIFI_SSID, WIFI_PASS);

  // Schedule periodic sensor reporting
  timer.setInterval(REPORT_INTERVAL, sendSensor);
}

void loop() {
  Blynk.run();
  timer.run();
}

// Read sensor, map to percentage and send to Blynk V1 (percent) and V2 (raw)
void sendSensor() {
  int raw = analogRead(sensorPin);

  // Note: ESP32 ADC range is typically 0-4095; adjust dryVal/wetVal accordingly.
  int v = constrain(raw, wetVal, dryVal);
  int pct = map(v, dryVal, wetVal, 0, 100);
  pct = constrain(pct, 0, 100);

  Serial.print("ADC: "); Serial.print(raw);
  Serial.print("  Moisture: "); Serial.print(pct); Serial.println(" %");

  Blynk.virtualWrite(V1, pct);
  Blynk.virtualWrite(V2, raw);
}

// Remote calibration: write new dry/wet values from Blynk widgets on V10/V11
BLYNK_WRITE(V10) {
  int v = param.asInt();
  if (v > 0) {
    dryVal = v;
    Serial.print("dryVal updated: "); Serial.println(dryVal);
  }
}

BLYNK_WRITE(V11) {
  int v = param.asInt();
  if (v > 0) {
    wetVal = v;
    Serial.print("wetVal updated: "); Serial.println(wetVal);
  }
}
