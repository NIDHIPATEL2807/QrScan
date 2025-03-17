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
                <td className="px-4 py-2">{data[id].qrCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
