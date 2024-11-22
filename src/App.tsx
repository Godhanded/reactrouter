import React from "react";
// import logo from './logo.svg';
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Vans, { loader as vansLoader } from "./Pages/Vans/Vans";
import "./server";
import VanDetails, {
  loader as vanDetailsLoader,
} from "./Pages/Vans/VanDetails";
import Layout from "./Components/Layout";
import Income from "./Pages/Host/Income";
import Reviews from "./Pages/Host/Reviews";
import Dashboard from "./Pages/Host/Dashboard";
import HostLayout from "./Pages/Host/HostLayout";
import HostVans, { loader as hostVansLoader } from "./Pages/Host/HostVans";
import HostVanDetails, {
  loader as hostVanDetailsLoader,
} from "./Pages/Host/HostVanDetails";
import VanHostDetail from "./Pages/Host/VanHostDetail";
import VanPricing from "./Pages/Host/VanPricing";
import VanPhotos from "./Pages/Host/VanPhotos";
import NotFound from "./Pages/NotFound";
import Error from "./Components/Error";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./Pages/Login";
import { requiresAuth } from "./utils";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="About" element={<About />} />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route
        path="host"
        element={<HostLayout />}
        loader={async ({ request }) => requiresAuth(request)}
      >
        <Route index element={<Dashboard />} />
        <Route path="income" element={<Income />} />
        <Route path="reviews" element={<Reviews />} />
        <Route
          path="vans"
          element={<HostVans />}
          loader={async ({ request }) =>
            requiresAuth(request) ?? (await hostVansLoader())
          }
          errorElement={<Error />}
        />

        <Route
          path="vans/:id"
          element={<HostVanDetails />}
          loader={hostVanDetailsLoader}
        >
          <Route index element={<VanHostDetail />} />
          <Route path="pricing" element={<VanPricing />} />
          <Route path="photos" element={<VanPhotos />} />
        </Route>
      </Route>
      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />
      <Route
        path="/vans/:id"
        element={<VanDetails />}
        loader={vanDetailsLoader}
      />
      {/* <Route path="vans">
            <Route index element={<Vans />} />
            <Route path=":id" element={<VanDetail />} />
            </Route> */}
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
