import React from "react";
import { Van } from "../../types";
import { Link, useLoaderData } from "react-router-dom";
import "../../Styles/HostVans.css";
import { getHostVans } from "../../Api";
import { requiresAuth } from "../../utils";

export const loader = async () => await getHostVans();

const HostVans = () => {
	const vans = useLoaderData() as Van[];

	const vanList = vans?.map((van) => (
		<Link to={`${van.id}`} key={van.id} className="host-van-link-wrapper">
			<div className="host-van-single" key={van.id}>
				<img src={van.imageUrl} alt={`${van.name}`} />
				<div className="host-van-info">
					<h3>{van.name}</h3>
					<p>${van.price}/day</p>
				</div>
			</div>
		</Link>
	));
	return (
		<section>
			<h1 className="host-vans-title">Your listed vans</h1>
			<div className="host-vans-list">
				<section>{vanList}</section>
			</div>
		</section>
	);
};

export default HostVans;
