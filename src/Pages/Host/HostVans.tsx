import React, { Suspense } from "react";
import { Van } from "../../types";
import { Await, Link, useLoaderData } from "react-router-dom";
import "../../Styles/HostVans.css";
import { getHostVans } from "../../Api";

export const loader = async () => ({ vans: getHostVans() });

const HostVans = () => {
	const vansPromise = useLoaderData() as { vans: Van[] };

	const renderVanElements = (vans: Van[]) => {
		const vanList = vans.map((van) => (
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
			<div className="host-vans-list">
				<section>{vanList}</section>
			</div>
		);
	};

	return (
		<section>
			<h1 className="host-vans-title">Your listed vans</h1>
			<Suspense fallback={<h2>Loading vans...</h2> /*or spinner*/}>
				<Await resolve={vansPromise.vans}>
					{(vans: Van[]) => renderVanElements(vans)}
				</Await>
			</Suspense>
		</section>
	);
};

export default HostVans;
