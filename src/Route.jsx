import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QRScanner from "./components/QRScanner";
import Dashboard from "./components/Dashboard"; // Assuming you have a Dashboard component
import { useState } from "react";

const AppRoutes = () => {
  const [scannedData, setScannedData] = useState("");

  return (
    <Router>
      <nav className="flex justify-between bg-gray-800 p-4 text-white">
        <h1 className="text-xl font-bold">Electronic Vending Machine</h1>
        <div>
          <Link to="/" className="mr-4 hover:underline">Home</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </div>
      </nav>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<QRScanner onScan={setScannedData} />} />
          <Route path="/dashboard" element={<Dashboard scannedData={scannedData} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
