import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Vans from './Pages/Vans/Vans';
import './server';
import VanDetails from './Pages/Vans/VanDetails';
import Layout from './Components/Layout';
import Income from './Pages/Host/Income';
import Reviews from './Pages/Host/Reviews';
import Dashboard from './Pages/Host/Dashboard';
import HostLayout from './Pages/Host/HostLayout';
import HostVans from './Pages/Host/HostVans';
import HostVanDetails from './Pages/Host/HostVanDetails';
import VanHostDetail from './Pages/Host/VanHostDetail';
import VanPricing from './Pages/Host/VanPricing';
import VanPhotos from './Pages/Host/VanPhotos';
import NotFound from './Pages/NotFound';

function App()
{
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route path="/" element={<Home />} />
        <Route path="About" element={<About />} />
        <Route path="host" element={<HostLayout />} >
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="vans" element={<HostVans />} />

          <Route path='vans/:id' element={<HostVanDetails />} >
            <Route index element={<VanHostDetail />} />
            <Route path='pricing' element={<VanPricing />} />
            <Route path='photos' element={<VanPhotos />} />
          </Route>
        </Route>
        <Route path="vans" element={<Vans />} />
        <Route path="/vans/:id" element={<VanDetails />} />
          {/* <Route path="vans">
              <Route index element={<Vans />} />
              <Route path=":id" element={<VanDetail />} />
              </Route> */}
        <Route path='*' element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}

export default App;