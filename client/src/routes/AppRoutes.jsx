import {Routes, Route} from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Cart from '../components/Cart';
import Categoryitems from '../components/Categoryitems';
import Home from '../components/Home';
import Listproducts from '../components/Listproducts';
import Details from '../components/Details';
import OrderDetail from '../components/OrderDetail';
import Adminpanel from '../components/Adminpanel/AdminPanel';
import HeroOrder from '../components/HeroOrder';
import ProtectedAdmin from './protectedAdmin';
import ProtectedRoute from './ProtectedRoute';


export default function AppRoutes() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order-detail" element={<OrderDetail />} />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/Categoryitems/:name" element={<Categoryitems />} />
        <Route path="/product/:model" element={<Listproducts/>}/>
        <Route path="/product-details/:id" element={<Details />} />
        <Route path="/admin" element={
    <ProtectedAdmin>
      <Adminpanel />
    </ProtectedAdmin> } />
        <Route path="/hero-order" element={<HeroOrder />} />

      </Routes>
    </>  
    );  
}