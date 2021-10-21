import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Login from './pages/Login'

import './App.css';

const Render = true ? <Login /> :
  <BrowserRouter >
    <Header />
    <Router />
    <Footer />
  </BrowserRouter>;

function App() {
  return Render;
}

export default App;
