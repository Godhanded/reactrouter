import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Van } from "../../types";
import "../../Styles/VanDetails.css";

const VanDetailsBrowserRouter = () => {
	const params = useParams<Record<string, string>>();
	const [van, setVan] = useState<Van | null>(null);
	const location = useLocation();
	console.log(location);
	const getVanDetails = async (id: string): Promise<Van> => {
		let response: Response = await fetch(`/api/vans/${id}`);
		return (await response.json())?.vans as Van;
	};
	useEffect(() => {
		getVanDetails(params.id!).then((van) => {
			if (!van) {
				alert("Van Does Not Exist");
				return;
			}
			console.log(van);
			setVan(() => van!);
		});
	}, [params.id]);

	const filters: string = location.state?.filter || "";
	const type = location.state?.type || "all";
	return (
		<div className="van-detail-container">
			<Link to={`..${filters}`} relative="path" className="back-button">
				&larr; <span>Back to {type} vans</span>
			</Link>
			{van ? (
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
			) : (
				<h2>Loading...</h2>
			)}
		</div>
	);
};

export default VanDetailsBrowserRouter;
