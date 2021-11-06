import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Login from './pages/Login'

import './App.css';

function App() {

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    isSessionConnected()
  })

  function isSessionConnected() {
    if (sessionStorage.getItem('authorization') && !sessionStorage.getItem('sessionConnect'))
      fetch("http://localhost:3030/auth", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'authorization': `${sessionStorage.getItem('authorization')}` },
      }).then(async response => {
        const { connection, user } = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        setConnected(connection);
      });
  }

  if (connected) {

    return (
      <BrowserRouter >
        <Header userName={JSON.parse(localStorage.getItem('user')).name.split(' ')[0]} />
        <Router />
        <Footer />
      </BrowserRouter>
    )
  }

  return (
    <Login />
  )
}


export default App;
