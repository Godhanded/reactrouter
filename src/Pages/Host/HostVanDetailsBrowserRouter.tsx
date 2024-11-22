import React, { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Van } from "../../types";
import "../../Styles/HostVanDetail.css";
import HostNav from "../../Components/HostNav";

type ContextType = { van: Van | null };

const HostVanDetailsBrowserRouter = () => {
	const { id } = useParams();
	const [van, setVan] = useState<Van | null>(null);
	const getHostVans = async (id: string): Promise<Van | null> => {
		const response = await fetch(`/api/host/vans/${id}`);
		return (await response.json())?.vans as Van;
	};

	useEffect(() => {
		getHostVans(id!).then((van) => setVan(van));
	}, [id]);

	return (
		<>
			{van ? (
				<>
					<section>
						<Link to=".." relative="path" className="back-button">
							&larr; <span>Back to all vans</span>
						</Link>

						<div className="host-van-detail-layout-container">
							<div className="host-van-detail">
								<img src={van.imageUrl} alt={van.name} />
								<div className="host-van-detail-info-text">
									<i className={`van-type van-type-${van.type}`}>{van.type}</i>
									<h3>{van.name}</h3>
									<h4>${van.price}/day</h4>
								</div>
							</div>
							<HostNav />
							<Outlet context={{ van } satisfies ContextType} />
						</div>
					</section>
				</>
			) : (
				<h1>Loading...</h1>
			)}
		</>
	);
};

export default HostVanDetailsBrowserRouter;

export function useVan() {
	return useOutletContext<ContextType>();
}
