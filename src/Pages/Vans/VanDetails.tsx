import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Van } from '../../types';
import "../../Styles/VanDetails.css";

const VanDetails = () =>
{
    const params = useParams<Record<string, string>>();
    const [van, setVan] = useState<Van | null>(null);

    const getVanDetails = async (id: string): Promise<Van> =>
    {
        let response: Response = await fetch(`/api/vans/${id}`);
        return (await response.json())?.vans as Van;
    };
    useEffect(() =>
    {
        getVanDetails(params.id!)
            .then((van: Van | null) =>
            {
                if (!van)
                {
                    alert("Van Does Not Exist");
                    return;
                }
                console.log(van);
                setVan(() => van!);
            });
    }, [params.id]);


    return (
        <div className="van-detail-container">
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} alt={`${van.name}`} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    );
};

export default VanDetails;