import React from "react";
import {
	Link,
	LoaderFunctionArgs,
	useLoaderData,
	useLocation,
} from "react-router-dom";
import { Van } from "../../types";
import "../../Styles/VanDetails.css";
import { getVans } from "../../Api";
import { requiresAuth } from "../../utils";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	return requiresAuth(request) ?? (await getVans(params.id));
};

const VanDetails = () => {
	const van = useLoaderData() as Van;
	const location = useLocation();

	const filters: string = location.state?.filter || "";
	const type = location.state?.type || "all";

	return (
		<div className="van-detail-container">
			<Link to={`..${filters}`} relative="path" className="back-button">
				&larr; <span>Back to {type} vans</span>
			</Link>

			<div className="van-detail">
				<img src={van.imageUrl} alt={`${van.name}`} />
				<i className={`van-type ${van.type} selected`}>{van.type}</i>
				<h2>{van.name}</h2>
				<p className="van-price">
					<span>${van.price}</span>/day
				</p>
				<p>{van.description}</p>
				<button className="link-button">Rent this van</button>
			</div>
		</div>
	);
};

export default VanDetails;
