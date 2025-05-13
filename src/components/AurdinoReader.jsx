import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AurdinoReader = () => {
  const [arduinoData, setArduinoData] = useState('');

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:3001/arduino-data')
        .then(response => {
          setArduinoData(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching Arduino data:', error);
        });
    };

    const interval = setInterval(fetchData, 1000); // fetch every second

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div>
      <h2>Arduino Data:</h2>
      <p>{arduinoData}</p>
    </div>
  );
};

export default AurdinoReader;
