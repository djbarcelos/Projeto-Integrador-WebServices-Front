import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import Header from './layout/Header';
import Footer from './layout/Footer';

import './App.css';

function App() {
  return (
      <BrowserRouter >
        <Header />  
        <Router/>
        <Footer />

      </BrowserRouter>
  );
}

export default App;
