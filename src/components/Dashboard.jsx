// import { useState, useEffect } from "react";
// import { database } from "../firebase";
// import { ref, onValue, set } from "firebase/database";

// export default function Dashboard() {
//   const [combinedData, setCombinedData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchWithTimeout = (url, timeout = 6000) => {
//       return Promise.race([
//         fetch(url),
//         new Promise((_, reject) =>
//           setTimeout(() => reject(new Error("Request timed out")), timeout)
//         ),
//       ]);
//     };

//     const fetchAndCombineData = async () => {
//       try {
//         // 1. Get QR data from Firebase
//         const dbRef = ref(database, "ScannedData");
//         onValue(dbRef, async (snapshot) => {
//           const scanned = snapshot.val();
//           const qrEntries = scanned ? Object.values(scanned).slice(0, 2) : [];

//           let productCodes = ["", ""]; // default empty
//           let quantities = [4, 3];     // fallback values

//           try {
//             const res = await fetchWithTimeout("http://10.10.127.40:3001/data", 6000);
//             const arduinoData = await res.json();

//             if (
//               Array.isArray(arduinoData.productCode) &&
//               Array.isArray(arduinoData.quantity)
//             ) {
//               productCodes = arduinoData.productCode;
//               quantities = arduinoData.quantity;
//             }
//           } catch (err) {
//             console.warn("⚠️ Arduino fetch failed or timed out, using fallback:", err.message);
//           }

//           const combined = qrEntries.map((entry, index) => ({
//             timestamp: entry.timestamp,
//             qrCode: entry.qrCode,
//             productCode: productCodes[index] || "N/A",
//             quantity: quantities[index] || 0,
//           }));

//           await set(ref(database, "CombinedData"), combined);
//           setCombinedData(combined);
//           setLoading(false);
//         });
//       } catch (error) {
//         console.error("Error:", error);
//         setLoading(false);
//       }
//     };

//     fetchAndCombineData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <h2 className="text-lg font-medium text-gray-500">Loading dashboard...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold text-lime-600 mb-4">Dashboard</h2>
//       <table className="min-w-full bg-white border border-gray-300 rounded shadow">
//         <thead className="bg-lime-500 text-white">
//           <tr>
//             <th className="p-3">Timestamp</th>
//             <th className="p-3">QR Code</th>
//             <th className="p-3">Product Code</th>
//             <th className="p-3">Quantity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {combinedData.map((item, i) => (
//             <tr key={i} className="border-t hover:bg-lime-50">
//               <td className="p-3">{new Date(item.timestamp).toLocaleString()}</td>
//               <td className="p-3">{item.qrCode}</td>
//               <td className="p-3">{item.productCode}</td>
//               <td className="p-3">{item.quantity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react';

// const Dashboard = () => {
//   const [productCode, setProductCode] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchArduinoData = async () => {
//       try {
//         const response = await fetch("http://10.10.127.40:3001/data");
        
//         const data = await response.json();
//         setProductCode(data.productCode);
//         setQuantity(data.quantity);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     const interval = setInterval(fetchArduinoData, 2000); // Poll every 2 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">📦 Arduino Product Dashboard</h1>
//       {loading ? (
//         <p>Loading data from Arduino...</p>
//       ) : (
//         <div className="bg-white shadow-lg p-4 rounded-lg max-w-sm">
//           <p><strong>Product Code:</strong> {productCode}</p>
//           <p><strong>Quantity:</strong> {quantity}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;






import { useState, useEffect } from "react";
import { database } from "../firebase"; // Ensure this path is correct
import { ref, onValue } from "firebase/database";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(database, "ScannedData");
    onValue(dbRef, (snapshot) => {
      const scannedData = snapshot.val();
      if (scannedData) {
        setData(scannedData); // Set the fetched data
      }
      setLoading(false); // Set loading to false once data is fetched
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold text-gray-600">Loading scanned data...</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-lime-600 mb-6">Scanned Data</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white text-left border-collapse">
          <thead>
            <tr className="bg-lime-500 text-white">
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">QR Code</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id) => (
              <tr key={id} className="border-t hover:bg-lime-100">
                <td className="px-4 py-2">{new Date(data[id].timestamp).toLocaleString()}</td>
                <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
  <a href={data[id].qrCode} target="_blank" rel="noopener noreferrer">
    {data[id].qrCode}
  </a>
</td>              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

