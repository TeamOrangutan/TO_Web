import {Routes, Route} from 'react-router-dom'
import { ErrorPage } from '../pages/ErrorPage';
import { Home, Products, Histories, AboutUs } from '../pages/NavBar';
import { UpdateProducts } from '../pages/actions/updateProducts';


export const AppRoutes = () => {
  return (
    <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/Products" element={<Products />} errorElement={<ErrorPage/>} />
      <Route path="/Histories" element={<Histories />} errorElement={<ErrorPage/>} />
      <Route path="/AboutUs" element={<AboutUs />} errorElement={<ErrorPage/>} />
      
      <Route path="/Product/:productid" element={<UpdateProducts />} errorElement={<ErrorPage/>} />

    </Routes>
  );
};
