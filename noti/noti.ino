/*********
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com/esp32-cam-take-photo-display-web-server/
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*********/
/*********
  Tobias Hofmann
  The project above was customized in order of a study for the Dualen Hochschule 
  Baden-Württemberg Karlsruhe in April 2020. 
  Information can be found at https://www.reddit.com/r/nodered/comments/g2cndq/project_countmeter_reading_with_a_raspberry_pi/?
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software. 
*********/


#include "WiFi.h"
#include "esp_camera.h"
#include "esp_timer.h"
#include "img_converters.h"
#include "Arduino.h"
#include "soc/soc.h"           // Disable brownout problems
#include "soc/rtc_cntl_reg.h"  // Disable brownout problems
#include "driver/rtc_io.h"
#include <SPI.h>
#include <TFT_eSPI.h>
TFT_eSPI tft = TFT_eSPI();
#include <TFT_eFEX.h>
TFT_eFEX fex = TFT_eFEX(&tft);
#include <ESPAsyncWebServer.h>
#include <StringArray.h>
#include <SPIFFS.h>
#include <FS.h>
#include <PubSubClient.h>

String filelist;
camera_fb_t * fb = NULL;
String incoming;
long current_millis;
long last_capture_millis = 0;
static esp_err_t cam_err;
static esp_err_t card_err;
char strftime_buf[64];
long file_number = 0;
const int Analog_channel_pin= 12;
int ADC_VALUE = 0;
int voltage_value = 0;
// Select camera model
//#define CAMERA_MODEL_WROVER_KIT
//#define CAMERA_MODEL_ESP_EYE
//#define CAMERA_MODEL_M5STACK_PSRAM
//#define CAMERA_MODEL_M5STACK_WIDE
#define CAMERA_MODEL_AI_THINKER
//#define CAMERA_MODEL_M5STACK_NO_PSRAM

#include "camera_pins.h"     //Pin definition for different models

// Replace with your network credentials
const char* ssid = "melonmusk";
const char* password = "sais-iot";

IPAddress ip(192, 168, 0, 10);
IPAddress gateway(192, 168, 0, 1);
IPAddress subnet(255, 255, 255, 0);


// Replace with your MQTT credentials
const char* mqtt_server = "192.168.0.16";      
const char* mqtt_user = "melonmusk";
const char* mqtt_password = "sais-iot";
const char* mqtt_client_id = "noti_1";   //optional

// PubSubClient 
WiFiClient espClient;
PubSubClient client(espClient);


// Deep Sleep definitions (change sleep time here)
#define uS_TO_S_FACTOR 1000000ULL  /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP  1        /* Time ESP32 will go to sleep (in seconds) */

RTC_DATA_ATTR int bootCount = 0;


// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

boolean takeNewPhoto = false;

// Photo File Name to save in SPIFFS
#define FILE_PHOTO "/photo.jpg"


// HTML Website to show the image. Keep in mind the website is only accessable when the ESP is "awake"
const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE HTML><html>
<head>
</head>
<body>
  <div><img src="saved-photo" id="photo" width="70%"></div>
</body>
</html>)rawliteral";



// Method to print the reason by which ESP32 has been awaken from sleep
void print_wakeup_reason(){
  esp_sleep_wakeup_cause_t wakeup_reason;

  wakeup_reason = esp_sleep_get_wakeup_cause();

  switch(wakeup_reason)
  {
    case ESP_SLEEP_WAKEUP_EXT0 : Serial.println("Wakeup caused by external signal using RTC_IO"); break;
    case ESP_SLEEP_WAKEUP_EXT1 : Serial.println("Wakeup caused by external signal using RTC_CNTL"); break;
    case ESP_SLEEP_WAKEUP_TIMER : Serial.println("Wakeup caused by timer"); break;
    case ESP_SLEEP_WAKEUP_TOUCHPAD : Serial.println("Wakeup caused by touchpad"); break;
    case ESP_SLEEP_WAKEUP_ULP : Serial.println("Wakeup caused by ULP program"); break;
    default : Serial.printf("Wakeup was not caused by deep sleep: %d\n",wakeup_reason); break;
  }
}



//--------------------------- void setup
void setup() {
  // Serial port for debugging purposes
  Serial.begin(115200);

  Serial.setDebugOutput(false);


  //Deep Sleep startup messages
  delay(500);
  //Increment boot number and print it every reboot
  ++bootCount;
  Serial.println("Boot number: " + String(bootCount));

  //Print the wakeup reason for ESP32
  print_wakeup_reason();  

  tft.begin();
  tft.setRotation(3);  // 0 & 2 Portrait. 1 & 3 landscape
  tft.fillScreen(TFT_BLACK);
  tft.setCursor(35,55);
  tft.setTextColor(TFT_WHITE);
  tft.setTextSize(1);
  tft.println("noti");
  // Connect to Wi-Fi
 //WiFi.config(ip, gateway, subnet);

   WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  //testline
  Serial.println("Connecting to MQTT");
  
 //Configure and connect MQTT
  client.setServer(mqtt_server, 1883);
  client.connect(mqtt_client_id, mqtt_user, mqtt_password);

  //testline
  Serial.println("Successfully Connected To MQTT");


  // checking SPI Flash File System 
  if (!SPIFFS.begin(true)) {
    Serial.println("An Error has occurred while mounting SPIFFS");
    ESP.restart();
  }
  else {
    delay(500);
    Serial.println("SPIFFS mounted successfully");
  }
  fex.listSPIFFS();
  // Print ESP32 Local IP Address
  Serial.println("WiFi connected");
  Serial.print("IP Address: http://");
  Serial.println(WiFi.localIP());

  // Turn-off the 'brownout detector'
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);

  // OV2640 camera module
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  if (psramFound()) {
    config.frame_size = FRAMESIZE_QVGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_QVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
    //config.vflip = 1;
  }
  // Camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    ESP.restart();
  }

  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/html", index_html);
  });

  server.on("/capture", HTTP_GET, [](AsyncWebServerRequest * request) {
    takeNewPhoto = true;
    request->send_P(200, "text/plain", "Taking Photo");
  });

  server.on("/saved-photo", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, FILE_PHOTO, "image/jpg", false);
  });

  
  // start server and take photo
  server.begin();
  Serial.println("TakePhoto=1");
  
}


//---------------------------- void loop
void loop() {
  if (takeNewPhoto) {
    capturePhotoSaveSpiffs();
    takeNewPhoto = false;
  }
  delay(1);
  //esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  Serial.println("Setup ESP32 to sleep for " + String(TIME_TO_SLEEP) +
  " Seconds");

  // send message via MQTT to Broker to signal "awake" and "asleep" states
  char Buffer[]="abc";              //awake state "abc"
  Serial.println(Buffer);
  client.publish("TestTopic_Count", Buffer);  //enter personal MQTT-Topic
  Serial.println("Wait 0.5 second until image download");
  delay(500);                 //wait 15s so the image can be downloaded
  Buffer[1] ='d';               //asleep state "adc"
  Serial.println(Buffer);
  client.publish("TestTopic_Count", Buffer);  //enter personal MQTT-Topic
  //delay(100);
  //int sensorValue = analogRead(Analog_channel_pin);
  //if(sensorValue > 20){
  //  char SoundBuffer[]="trig";
  //  client.publish("TestTopic_Sound", SoundBuffer);
  //}
  takeNewPhoto = true; 
  //ADC_VALUE = analogRead(Analog_channel_pin);
}

// Check if photo capture was successful
bool checkPhoto( fs::FS &fs ) {
  File f_pic = fs.open( FILE_PHOTO );
  unsigned int pic_sz = f_pic.size();
  return ( pic_sz > 100 );
}

// Capture Photo and Save it to SPIFFS
void capturePhotoSaveSpiffs( void ) {
  camera_fb_t * fb = NULL; // pointer
  bool ok = 0; // Boolean indicating if the picture has been taken correctly

  do {
    // Take a photo with the camera
    Serial.println("Taking a photo...");

    fb = esp_camera_fb_get();
    
    if (!fb) {
      Serial.println("Camera capture failed");
      return;
    }

    // Photo file name
    Serial.printf("Picture file name: %s\n", FILE_PHOTO);
    File file = SPIFFS.open(FILE_PHOTO, FILE_WRITE);

    // Insert the data in the photo file
    if (!file) {
      Serial.println("Failed to open file in writing mode");
    }
    else {
      file.write(fb->buf, fb->len); // payload (image), payload length
      Serial.print("The picture has been saved in ");
      Serial.print(FILE_PHOTO);
      Serial.print(" - Size: ");
      Serial.print(file.size());
      Serial.println(" bytes");
    }
    // Close the file
    file.close();
  fex.drawJpg((const uint8_t*)fb->buf, fb->len, 0, 0);
    esp_camera_fb_return(fb);
    // check if file has been correctly saved in SPIFFS
    ok = checkPhoto(SPIFFS);
  } while ( !ok );
}
