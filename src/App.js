import React, { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyAaQEsSSJB-hvoosukQW4ILJD25FFFQmBU",
  authDomain: "learn-react-e62f8.firebaseapp.com",
  databaseURL: "https://learn-react-e62f8.firebaseio.com",
  projectId: "learn-react-e62f8",
  storageBucket: "learn-react-e62f8.appspot.com",
  messagingSenderId: "523538593380",
  appId: "1:523538593380:web:5831ecab8ba93436449171",
  measurementId: "G-49VNZ2GPXJ"
};

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      console.log(response)
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <ul>
      {products.map(product => <li key={product.sku}>{product.title}</li>)}
    </ul>
  );
};

export default App;