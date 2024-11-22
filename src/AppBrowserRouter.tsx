import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import "./server";
import Layout from "./Components/Layout";
import Income from "./Pages/Host/Income";
import Reviews from "./Pages/Host/Reviews";
import Dashboard from "./Pages/Host/Dashboard";
import HostLayout from "./Pages/Host/HostLayout";
import VanHostDetail from "./Pages/Host/VanHostDetail";
import VanPricing from "./Pages/Host/VanPricing";
import VanPhotos from "./Pages/Host/VanPhotos";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import VansBrowserRouter from "./Pages/Vans/VansBrowserRouter";
import AuthGuard from "./Components/AuthGuard";
import HostVansBrowserRouter from "./Pages/Host/HostVansBrowserRouter";
import VanDetailsBrowserRouter from "./Pages/Vans/VanDetailsBrowserRouter";
import HostVanDetailsBrowserRouter from "./Pages/Host/HostVanDetailsBrowserRouter";

function AppBrowserRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="About" element={<About />} />
					<Route path="login" element={<Login />} />
					<Route path="host" element={<HostLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="income" element={<Income />} />
						<Route path="reviews" element={<Reviews />} />
						<Route path="vans" element={<HostVansBrowserRouter />} />

						<Route path="vans/:id" element={<HostVanDetailsBrowserRouter />}>
							<Route index element={<VanHostDetail />} />
							<Route path="pricing" element={<VanPricing />} />
							<Route path="photos" element={<VanPhotos />} />
						</Route>
					</Route>
					<Route path="vans" element={<VansBrowserRouter />} />
					<Route path="/vans/:id" element={<VanDetailsBrowserRouter />} />
					<Route element={<AuthGuard />}>
						<Route path="protected" element={<h1>Super secret info here</h1>} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppBrowserRouter;
