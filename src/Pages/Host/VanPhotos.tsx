import React from "react";
import { useVan } from "./HostVanDetails";

const VanPhotos = () => {
	const { van } = useVan();
	return (
		<img
			src={van?.imageUrl}
			alt={van?.name}
			className="host-van-detail-image"
		/>
	);
};

export default VanPhotos;
