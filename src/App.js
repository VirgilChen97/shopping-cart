import React, { useEffect, useState } from 'react';
import ElevateAppBar from './component/Appbar';
import ItemList from './component/ItemList';
import { Container } from '@material-ui/core';

/*const firebaseConfig = {
  apiKey: "AIzaSyAaQEsSSJB-hvoosukQW4ILJD25FFFQmBU",
  authDomain: "learn-react-e62f8.firebaseapp.com",
  databaseURL: "https://learn-react-e62f8.firebaseio.com",
  projectId: "learn-react-e62f8",
  storageBucket: "learn-react-e62f8.appspot.com",
  messagingSenderId: "523538593380",
  appId: "1:523538593380:web:5831ecab8ba93436449171",
  measurementId: "G-49VNZ2GPXJ"
};*/

const App = () => {
  const [data, setData] = useState({});
  const [cart, setCart] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <ElevateAppBar cart={cart} setCart={setCart} items={data}/>
      <ItemList cart={cart} setCart={setCart} items={data} />
    </Container>
  );
};

export default App;