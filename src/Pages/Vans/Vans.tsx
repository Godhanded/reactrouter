import React, { useEffect, useState } from 'react';
import "../../Styles/Vans.css";
import { Link } from 'react-router-dom';
import { Van } from '../../types';


const Vans = () =>
{
    const [vans, setVans] = useState<Van[]>([]);

    const getVans = async () =>
    {
        let response: Response = await fetch("/api/vans");
        return await response.json();
    };
    useEffect(() =>
    {
        getVans()
            .then((vans) =>
            {
                console.log(vans.vans as Van[]);
                setVans(() => vans.vans as Van[]);
            });
    }, []);

    const vanElements = vans.map(van => (
        <div key={van.id} className="van-tile">
            <Link
                to={`/vans/${van.id}`}
                aria-label={`View details for ${van.name}, 
                             priced at $${van.price} per day`}
            >
                <img src={van.imageUrl}
                    alt={`${van.name}`} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>.
            </Link>
        </div>
    ));

    return (
        <div className="van-list-container">
            <h1>Explore our Van Options</h1>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    );
};

export default Vans;