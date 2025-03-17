import { useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { database } from "../firebase"; // Ensure this path is correct
import { ref, set } from "firebase/database";

const QRScanner = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  // Save Scanned Data to Firebase
  const saveData = (scannedData) => {
    const newScanRef = ref(database, "ScannedData/" + Date.now()); // Using timestamp as a unique ID
    set(newScanRef, {
      qrCode: scannedData,
      timestamp: Date.now(),
    })
      .then(() => {
        console.log("QR Code data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  useEffect(() => {
    let codeReader;
    if (scanning) {
      codeReader = new BrowserMultiFormatReader();
      codeReader
        .decodeFromVideoDevice(undefined, "video", (result, err) => {
          if (result) {
            alert("✅ QR Scanned: " + result.text);
            onScan(result.text); // Pass QR code data to parent component
            saveData(result.text); // Save scanned data in Firebase
            setScanning(false); // Stop scanning after successful read
          }
          if (err) {
            setError("Scanning...");
          }
        })
        .catch((err) => setError(err.message));
    }

    return () => {
      if (codeReader) codeReader.reset(); // Stop camera when unmounting
    };
  }, [scanning, onScan]);

  return (
    <div className="p-6 flex flex-col items-center bg-gradient-to-r from-lime-400 via-lime-300 to-lime-100 rounded-xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
        <span role="img" aria-label="scanner">📱</span>
        <span>QR Scanner</span>
      </h2>
      <button
        onClick={() => setScanning(true)}
        className="px-6 py-3 bg-lime-600 text-white rounded-md shadow-md hover:bg-lime-700 transition-all duration-200 flex items-center space-x-2"
      >
        <span role="img" aria-label="camera">📷</span>
        <span>Start QR Scan</span>
      </button>
      <div className="mt-4 w-full relative">
        <video
          id="video"
          width="100%"
          height="auto"
          className="border-4 border-lime-600 rounded-md shadow-xl"
        />
        {scanning && (
          <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 rounded-md">
            <span className="text-white font-semibold text-xl">Scanning...</span>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default QRScanner;
