import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Cart from './Components/Cart';
import Login from './UserLoginComponent/Login';
import Users from './Components/Users';
import CartProductList from './Components/CartProductList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/user' element={<Users />} />
          <Route path="/" element={<Dashboard />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/cartProductList' element={<CartProductList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
