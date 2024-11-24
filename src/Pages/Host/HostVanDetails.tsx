import React from "react";
import {
	Link,
	LoaderFunctionArgs,
	Outlet,
	useLoaderData,
	useOutletContext,
} from "react-router-dom";
import { Van } from "../../types";
import "../../Styles/HostVanDetail.css";
import HostNav from "../../Components/HostNav";
import { getHostVan } from "../../Api";
import { requiresAuth } from "../../utils";

type ContextType = { van: Van | null };

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	return requiresAuth(request) ?? (await getHostVan(params.id!));
};

const HostVanDetails = () => {
	const van = useLoaderData() as Van;

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

export default HostVanDetails;

export function useVan() {
	return useOutletContext<ContextType>();
}
