// #include <Keypad.h>
// #include <SPI.h>
// #include <Wire.h>
// #include <LiquidCrystal_I2C.h> // Include the LiquidCrystal_I2C library

// #define ROW_NUM 4 // four rows
// #define COLUMN_NUM 4 // four columns

// char keys[ROW_NUM][COLUMN_NUM] = {
//     {'1', '2', '3', 'A'},
//     {'4', '5', '6', 'B'},
//     {'7', '8', '9', 'C'},
//     {'*', '0', '#', 'D'}
// };

// byte pin_rows[ROW_NUM] = {33, 25, 26, 14}; // Row pins
// byte pin_column[COLUMN_NUM] = {27, 13, 23, 4}; // Column pins

// Keypad keypad = Keypad(makeKeymap(keys), pin_rows, pin_column, ROW_NUM, COLUMN_NUM);

// bool isKeypadActive = false; // State to activate keypad
// String barcodeData = ""; // Variable to store barcode data
// String productCode = ""; // Variable to store product code
// String quantity = ""; // Variable to store quantity
// bool enteringProductCode = false;
// bool enteringQuantity = false;

// int binaryPins[4] = {16, 17, 18, 19}; // Pin 16 is MSB, pin 19 is LSB
// const int productCodeOutputPin = 15; // Pin to hold high logic after product code entry
// const int quantityOutputPin = 2; // Pin to hold high logic after quantity entry
// bool productCodeOutputActive = false; // State for product code output pin
// bool quantityOutputActive = false; // State for quantity output pin

// // Initialize the LCD with the I2C address (0x27 is commonly used)
// LiquidCrystal_I2C lcd(0x27, 16, 2); // Address, Columns, Rows

// void setup() {
//     Serial.begin(115200); // Main serial for debugging
//     Serial1.begin(9600); // Serial1 for barcode scanner (adjust baud rate as needed)

//     // Initialize LCD
//     lcd.init(); // Initialize LCD
//     lcd.backlight(); // Turn on the backlight
//     lcd.clear(); // Clear the LCD screen
//     lcd.setCursor(0, 0); // Set cursor to the first row, first column
//     lcd.print("Scan QR/Barcode"); // Display initial message

//     keypad.setDebounceTime(50); // Optional: Set keypad debounce time

//     // Set binary output pins as OUTPUT
//     for (int i = 0; i < 4; i++) {
//         pinMode(binaryPins[i], OUTPUT);
//         digitalWrite(binaryPins[i], LOW); // Initialize all binary pins to LOW
//     }

//     pinMode(productCodeOutputPin, OUTPUT); // Set product code output pin
//     pinMode(quantityOutputPin, OUTPUT); // Set quantity output pin
//     digitalWrite(productCodeOutputPin, LOW); // Initialize product code pin to LOW
//     digitalWrite(quantityOutputPin, LOW); // Initialize quantity output pin to LOW
// }

// void loop() {
//     if (!isKeypadActive) {
//         // Simulate Barcode Scanning
//         if (barcodeData.length() == 0) {
//             barcodeData = "123456"; // Simulated barcode data
//             delay(1000); // Optional: Add delay to simulate scanning
//         }

//         if (barcodeData.length() > 0) {
//             Serial.println("Scanned Code: " + barcodeData);
//             isKeypadActive = true; // Activate keypad
//             enteringProductCode = true; // Start entering product code
//             productCodeOutputActive = false;
//             quantityOutputActive = false;
//             digitalWrite(productCodeOutputPin, LOW); // Reset output pin when new scan starts
//             digitalWrite(quantityOutputPin, LOW); // Reset quantity output pin when new scan starts
            
//             // Clear and update display immediately after scanning
//             lcd.clear();
//             lcd.setCursor(0, 0);
//             lcd.print("Product Code:"); // Display Product Code prompt
//             delay(100); // Optional: Give some time for the user to see the prompt
//         }
//     } else if (enteringProductCode) {
//         // Step 2: Enter Product Code
//         char key = keypad.getKey();
//         if (key) {
//             if (key == 'D') { // Finish entering product code
//                 Serial.println("Product Code: " + productCode);
//                 int productCodeNum = productCode.toInt();
//                 if (productCodeNum >= 0 && productCodeNum <= 15) {
//                     setBinaryOutput(productCodeNum); // Output binary equivalent
//                 } else {
//                     Serial.println("Invalid Product Code for 4-bit output");
//                 }

//                 productCodeOutputActive = true;
//                 digitalWrite(productCodeOutputPin, HIGH); // Set product code output pin HIGH

//                 enteringProductCode = false;
//                 enteringQuantity = true; // Start entering quantity
//                 lcd.clear();
//                 lcd.setCursor(0, 0);
//                 lcd.print("Quantity:");
//             } else if (key == '#') { // Exit process
//                 Serial.println("Exiting Process...");
//                 resetProcess(); // Reset everything and return to scanning
//             } else {
//                 productCode += key; // Append key to product code
//                 Serial.println("Key Pressed: " + String(key));

//                 // Update LCD to show the entered product code
//                 lcd.clear();
//                 lcd.setCursor(0, 0);
//                 lcd.print("Product Code:");
//                 lcd.setCursor(0, 1);
//                 lcd.print(productCode); // Display entered product code
//             }
//         }
//     } else if (enteringQuantity) {
//         // Step 3: Select Quantity
//         char key = keypad.getKey();
//         if (key) {
//             if (key == 'D') { // Finish entering quantity
//                 Serial.println("Quantity: " + quantity);
//                 int quantityNum = quantity.toInt();
//                 if (quantityNum >= 0 && quantityNum <= 15) {
//                     setBinaryOutput(quantityNum); // Output binary equivalent
//                 } else {
//                     Serial.println("Invalid Quantity for 4-bit output");
//                 }

//                 // Set output on pin 2 after quantity is entered
//                 quantityOutputActive = true;
//                 digitalWrite(quantityOutputPin, HIGH); // Set quantity output pin HIGH

//                 enteringQuantity = false; // Finish the process
//                 lcd.clear();
//                 lcd.setCursor(0, 0);
//                 lcd.print("Data Stored!");

//                 // Log stored data
//                 Serial.println("Stored Data:");
//                 Serial.println("Barcode: " + barcodeData);
//                 Serial.println("Product Code: " + productCode);
//                 Serial.println("Quantity: " + quantity);

//                 // Reset for next operation
//                 resetProcess(); // Reset everything and return to scanning
//             } else if (key == '#') { // Exit process
//                 Serial.println("Exiting Process...");
//                 resetProcess(); // Reset everything and return to scanning
//             } else {
//                 quantity += key; // Append key to quantity
//                 Serial.println("Key Pressed: " + String(key));

//                 // Update LCD to show the entered quantity
//                 lcd.clear();
//                 lcd.setCursor(0, 0);
//                 lcd.print("Quantity:");
//                 lcd.setCursor(0, 1);
//                 lcd.print(quantity); // Display entered quantity
//             }
//         }
//     }
// }

// // Function to set binary output
// void setBinaryOutput(int num) {
//     for (int i = 0; i < 4; i++) {
//         digitalWrite(binaryPins[i], (num >> (3 - i)) & 1); // Extract each bit, MSB first
//     }
// }

// // Function to reset the process and go back to scanning
// void resetProcess() {
//     isKeypadActive = false;
//     productCode = "";
//     quantity = "";
//     barcodeData = "";

//     // Reset binary outputs to 0
//     for (int i = 0; i < 4; i++) {
//         digitalWrite(binaryPins[i], LOW);
//     }

//     // Reset output pins only when a new barcode is scanned
//     digitalWrite(productCodeOutputPin, LOW); // Reset the productCodeOutputPin when a new barcode is scanned
//     productCodeOutputActive = false;

//     digitalWrite(quantityOutputPin, LOW); // Reset the quantityOutputPin when a new barcode is scanned
//     quantityOutputActive = false;

//     // Display scanning prompt again
//     lcd.clear();
//     lcd.setCursor(0, 0);
//     lcd.print("Scan QR/Barcode");
// }
