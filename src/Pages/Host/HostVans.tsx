import React, { useEffect, useState } from 'react';
import { Van } from '../../types';
import { Link } from 'react-router-dom';
import "../../Styles/HostVans.css";
const HostVans = () =>
{
  const [vans, setVans] = useState<Van[] | null>(null);
  const getHostVans = async (): Promise<Van[] | null> =>
  {
    const response = await fetch("/api/host/vans");
    return (await response.json())?.vans as Van[];
  };
  useEffect(() =>
  {
    getHostVans()
      .then(vans => setVans(vans));
  }, []);

  const vanList = vans?.map(van =>
  (<Link
    to={`/host/vans/${van.id}`}
    key={van.id}
    className="host-van-link-wrapper"
  >
    <div className="host-van-single" key={van.id}>
      <img src={van.imageUrl} alt={`${van.name}`} />
      <div className="host-van-info">
        <h3>{van.name}</h3>
        <p>${van.price}/day</p>
      </div>
    </div>
  </Link>)
  );
  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        {
          vans ? (
            <section>
              {vanList}
            </section>

          ) : (
            <h2>Loading...</h2>
          )
        }
      </div>
    </section>
  );
};

export default HostVans;