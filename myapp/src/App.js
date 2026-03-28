import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductCRUD from './components/ProductCRUD';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/crud" element={<ProductCRUD />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
