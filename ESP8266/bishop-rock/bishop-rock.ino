#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DNSServer.h>
#include <LittleFS.h>
#include <FastLED.h>

// ------------------------
// NeoPixel / FastLED Config
// ------------------------
#define PIN 5
#define NUMPIXELS 17
#define TAIL_LENGTH 7
#define INTERP_STEPS 4

CRGB leds[NUMPIXELS];
int fadePattern[TAIL_LENGTH] = { 0, 5, 50, 255, 50, 5, 0 };

// ------------------------
// Hardware Inputs
// ------------------------
const int runPin = 4;  // Switch
int potVal;            // Potentiometer

// ------------------------
// Wi-Fi & Captive Portal
// ------------------------
ESP8266WebServer server(80);
DNSServer dnsServer;
const byte DNS_PORT = 53;
const char* AP_SSID = "Bishop_Rock";

// ------------------------
// Config Variables
// ------------------------
int onOff = 0;       // 0 = Off, 1 = On
int speed = 10;      // store as int*10, e.g., 10 = 1x
int brightness = 2;  // 0-4

// ------------------------
// Effect Variables
// ------------------------
int runMode = 0;  // 0 = sweep, 1 = pulse
unsigned long sequenceStartTime = 0;
unsigned long lastActionTime = 0;
int frameDelay = 20;

enum SequenceStep { STEP_IDLE,
                    STEP_ONE,
                    STEP_WAIT,
                    STEP_TWO };
SequenceStep currentStep = STEP_IDLE;

// ------------------------
// Config Helpers
// ------------------------
void saveConfig() {
  File file = LittleFS.open("/config.txt", "w");
  if (!file) {
    Serial.println("Failed to open config.txt");
    return;
  }
  file.printf("onOff=%d\nspeed=%d\nbrightness=%d\n", onOff, speed, brightness);
  file.close();
  Serial.println("Config saved!");
}

void loadConfig() {
  if (!LittleFS.exists("/config.txt")) return;
  File file = LittleFS.open("/config.txt", "r");
  if (!file) {
    Serial.println("Failed to open config.txt");
    return;
  }
  while (file.available()) {
    String line = file.readStringUntil('\n');
    line.trim();
    if (line.startsWith("onOff=")) onOff = line.substring(6).toInt();
    else if (line.startsWith("speed=")) speed = line.substring(6).toInt();
    else if (line.startsWith("brightness=")) brightness = line.substring(11).toInt();
  }
  file.close();
  Serial.printf("Config loaded: onOff=%d, speed=%d, brightness=%d\n", onOff, speed, brightness);
}

// ------------------------
// API Handlers
// ------------------------
void handleGetConfig() {
  String json = "{\"onOff\":" + String(onOff)
                + ",\"speed\":" + String(speed)
                + ",\"brightness\":" + String(brightness) + "}";
  server.send(200, "application/json", json);
}

void handleSetOnOff() {
  if (server.hasArg("value")) {
    onOff = server.arg("value").toInt();
    saveConfig();
  }
  server.send(200, "application/json", "{\"success\":true}");
}

void handleSetSpeed() {
  if (server.hasArg("value")) {
    speed = server.arg("value").toInt();
    saveConfig();
  }
  server.send(200, "application/json", "{\"success\":true}");
}

void handleSetBrightness() {
  if (server.hasArg("value")) {
    brightness = server.arg("value").toInt();
    saveConfig();
  }
  server.send(200, "application/json", "{\"success\":true}");
}

// ------------------------
// Web File Serving
// ------------------------
String getContentType(String filename) {
  if (server.hasArg("download")) return "application/octet-stream";
  else if (filename.endsWith(".htm") || filename.endsWith(".html")) return "text/html";
  else if (filename.endsWith(".css")) return "text/css";
  else if (filename.endsWith(".js")) return "application/javascript";
  else if (filename.endsWith(".png")) return "image/png";
  else if (filename.endsWith(".gif")) return "image/gif";
  else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "image/jpeg";
  else if (filename.endsWith(".ico")) return "image/x-icon";
  else return "text/plain";
}

void handleWebRequest() {
  String path = server.uri();
  if (path.endsWith("/")) path += "index.html";
  String contentType = getContentType(path);

  if (LittleFS.exists(path)) {
    File file = LittleFS.open(path, "r");
    server.streamFile(file, contentType);
    file.close();
  } else {
    server.send(404, "text/plain", "404: Not Found");
  }
}

// Captive portal detection redirects
void handleCaptivePortalRedirects() {
  server.on("/generate_204", []() {
    server.sendHeader("Location", "/");
    server.send(302, "text/html", "");
  });
  server.on("/fwlink", []() {
    server.sendHeader("Location", "/");
    server.send(302, "text/html", "");
  });
  server.on("/hotspot-detect.html", []() {
    server.sendHeader("Location", "/");
    server.send(302, "text/html", "");
  });
  server.on("/captiveportal.html", []() {
    server.sendHeader("Location", "/");
    server.send(302, "text/html", "");
  });
}

// ------------------------
// FastLED Effects
// ------------------------
void runSweepEffect() {
  for (int head = 0; head < NUMPIXELS; ++head) {
    for (int interpStep = 0; interpStep < INTERP_STEPS; ++interpStep) {
      fill_solid(leds, NUMPIXELS, CRGB::Black);
      for (int i = 0; i < TAIL_LENGTH; ++i) {
        int index = (head - i + NUMPIXELS) % NUMPIXELS;
        int b1 = fadePattern[i];
        int b2 = (i + 1 < TAIL_LENGTH) ? fadePattern[i + 1] : 0;
        int bInterp = b1 + ((b2 - b1) * interpStep) / INTERP_STEPS;
        int adjBrightness = map(brightness, 0, 4, 50, 255);
        leds[index] = CRGB((bInterp * adjBrightness) / 255,
                           (bInterp * adjBrightness) / 255,
                           (bInterp * adjBrightness) / 255);
      }
      FastLED.show();
      delay(frameDelay);
    }
  }
  FastLED.clear();
  FastLED.show();
}

void pulseAllPixels() {
  int maxBrightness = map(brightness, 0, 4, 50, 255);
  int steps = 50;
  int delayMs = frameDelay / 2;
  for (int i = 0; i <= steps; ++i) {
    fill_solid(leds, NUMPIXELS, CRGB((maxBrightness * i) / steps, (maxBrightness * i) / steps, (maxBrightness * i) / steps));
    FastLED.show();
    delay(delayMs);
  }
  for (int i = steps; i >= 0; --i) {
    fill_solid(leds, NUMPIXELS, CRGB((maxBrightness * i) / steps, (maxBrightness * i) / steps, (maxBrightness * i) / steps));
    FastLED.show();
    delay(delayMs);
  }
  FastLED.clear();
  FastLED.show();
}

// ------------------------
// Setup
// ------------------------
void setup() {
  Serial.begin(115200);
  delay(500);
  LittleFS.begin();
  loadConfig();

  // Hardware
  pinMode(A0, INPUT);
  pinMode(runPin, INPUT_PULLUP);

  // FastLED
  FastLED.addLeds<WS2812B, PIN, GRB>(leds, NUMPIXELS);
  FastLED.clear();
  FastLED.show();

  // Start SoftAP
  WiFi.softAP(AP_SSID);
  Serial.println("AP Started: " + String(AP_SSID));

  // Start DNS Server for captive portal
  dnsServer.start(DNS_PORT, "*", WiFi.softAPIP());

  // API routes
  server.on("/api/config", HTTP_GET, handleGetConfig);
  server.on("/api/onoff", HTTP_GET, handleSetOnOff);
  server.on("/api/speed", HTTP_GET, handleSetSpeed);
  server.on("/api/brightness", HTTP_GET, handleSetBrightness);

  // Captive portal redirects
  handleCaptivePortalRedirects();

  // Serve LittleFS files
  server.onNotFound(handleWebRequest);

  server.begin();
  sequenceStartTime = millis();
  currentStep = STEP_ONE;
}

// ------------------------
// Main loop
// ------------------------
void loop() {
  unsigned long now = millis();

  // Read potentiometer for frameDelay
  potVal = analogRead(A0);
  frameDelay = map(potVal, 0, 1023, 2, 40);

  // Read switch to select runMode
  runMode = digitalRead(runPin) ? 1 : 0;

  // Run effects if on
  if (onOff == 0) {
    FastLED.clear();
    FastLED.show();
  } else {
    switch (currentStep) {
      case STEP_ONE:
        sequenceStartTime = now;
        if (runMode == 0) runSweepEffect();
        else pulseAllPixels();
        lastActionTime = now;
        currentStep = STEP_WAIT;
        break;
      case STEP_WAIT:
        if (now - lastActionTime >= 1000) currentStep = STEP_TWO;
        break;
      case STEP_TWO:
        if (runMode == 0) runSweepEffect();
        else pulseAllPixels();
        currentStep = STEP_IDLE;
        break;
      case STEP_IDLE:
        if (now - sequenceStartTime >= 15000) currentStep = STEP_ONE;
        break;
    }
  }

  dnsServer.processNextRequest();
  server.handleClient();
  delay(10);
}
