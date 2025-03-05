import { useEffect } from "react";
import getExploreDetails from "./getExploreDetails";
import Carousel from "./Carousel";

const Explore = () => {
	useEffect(() => {
		getExploreDetails();
	}, []);
	return (
		<>
			<Carousel />
		</>
	);
};

export default Explore;
