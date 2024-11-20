import React from "react";
import { useVan } from "./HostVanDetails";

const VanPricing = () => {
  const { van } = useVan();
  return (
    <h3 className="host-van-price">
      ${van?.price}
      <span>/day</span>
    </h3>
  );
};

export default VanPricing;
