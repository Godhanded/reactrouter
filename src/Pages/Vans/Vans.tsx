import React, { useEffect, useState } from "react";
import "../../Styles/Vans.css";
import { Link, useSearchParams } from "react-router-dom";
import { Van } from "../../types";
import { getVans } from "../../Api";

const Vans = () => {
  const [vans, setVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  useEffect(() => {
    const loadVans = async () => {
      setLoading(true);
      try {
        const data = await getVans();
        setVans(() => data.vans as Van[]);
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    loadVans();
  }, []);

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
  console.log(vans);
  const displayedVans: Van[] = typeFilter
    ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
    : vans;

  const vanElements = displayedVans.map((van) => (
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

  if (loading) {
    return <h1 aria-live="polite">Loading...</h1>;
  }
  if (error) {
    return <h1 aria-live="assertive">there was an error: {error.message} </h1>;
  }
  return (
    <div className="van-list-container">
      <h1>Explore our Van Options</h1>
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
    </div>
  );
};

export default Vans;
