import React, { Suspense } from "react";
import "../../Styles/Vans.css";
import {
	Link,
	useSearchParams,
	useLoaderData,
	LoaderFunctionArgs,
	Await,
} from "react-router-dom";
import { Van } from "../../types";
import { getVans } from "../../Api";
import { requiresAuth } from "../../utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const vans = getVans();
	//if you want an object to load before page is readey, await it eg return requiresAuth(request) ?? { vans,user: await getuser() };
	//page wont render until getUser is resolved even if vans isnt
	return requiresAuth(request) ?? { vans };
	//defere is now deprecated, return an object promise
	// return requiresAuth(request) ?? defer({ vans });
};
const Vans = () => {
	const dataPromise = useLoaderData() as { vans: Promise<Van[]> };
	const [searchParams, setSearchParams] = useSearchParams();

	const typeFilter = searchParams.get("type");

	const handleFilterChange = (key: string, value: string | null): void => {
		setSearchParams((prevParams) => {
			if (value === null) {
				prevParams.delete(key);
			} else {
				prevParams.set(key, value);
			}
			return prevParams;
		});
	};

	const renderVanElements = (displayedVans: Van[]) => {
		return displayedVans.map((van) => (
			<div key={van.id} className="van-tile">
				<Link
					to={`${van.id}`}
					state={{ filter: `?${searchParams.toString()}`, type: van.type }}
					aria-label={`View details for ${van.name}, 
								 priced at $${van.price} per day`}
				>
					<img src={van.imageUrl} alt={`${van.name}`} />
					<div className="van-info">
						<h3>{van.name}</h3>
						<p>
							${van.price}
							<span>/day</span>
						</p>
					</div>
					<i className={`van-type ${van.type} selected`}>{van.type}</i>.
				</Link>
			</div>
		));
	};

	return (
		<div className="van-list-container">
			<h1>Explore our Van Options</h1>
			<Suspense fallback={<h2>Loading ...</h2>}>
				<Await resolve={dataPromise.vans}>
					{(vans: Van[]) => {
						const displayedVans: Van[] = typeFilter
							? vans.filter((van) => van.type.toLowerCase() === typeFilter)
							: vans;

						const vanElements = renderVanElements(displayedVans);

						return (
							<>
								<div className="van-list-filter-buttons">
									<button
										// onClick={() => setSearchParams({ type: "simple" })}
										onClick={() => handleFilterChange("type", "simple")}
										className={`van-type simple ${typeFilter === "simple" ? "selected" : null}`}
									>
										Simple
									</button>
									<button
										// onClick={() => setSearchParams({ type: "luxury" })}
										onClick={() => handleFilterChange("type", "luxury")}
										className={`van-type luxury ${typeFilter === "luxury" ? "selected" : null}`}
									>
										Luxury
									</button>
									<button
										onClick={() => handleFilterChange("type", "rugged")}
										className={`van-type rugged ${typeFilter === "rugged" ? "selected" : null}`}
									>
										Rugged
									</button>
									{typeFilter && (
										<button
											// onClick={() => setSearchParams({})}
											onClick={() => handleFilterChange("type", null)}
											className="van-type clear-filters"
										>
											Clear filter
										</button>
									)}
									{/* <Link 
						to="?type=simple"
						className="van-type simple"
					>Simple</Link>
					<Link 
						to="?type=luxury"
						className="van-type luxury"
					>Luxury</Link>
					<Link 
						to="?type=rugged"
						className="van-type rugged"
					>Rugged</Link>
					<Link 
						to="."
						className="van-type clear-filters"
					>Clear filter</Link> */}
								</div>
								<div className="van-list">{vanElements}</div>
							</>
						);
					}}
				</Await>
			</Suspense>
		</div>
	);
};

export default Vans;
