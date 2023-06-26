import { Route, Routes } from 'react-router';
import './App.css';
import Products from './components/products';
import BasketCart from './components/basket-cart';

function App() {
  return (
    <div className="App">
      <h1>Alisveris Listem</h1>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/basket' element={<BasketCart/>} />
      </Routes>
    </div>
  );
}

export default App;
