import "./Carousel.css";

const Carousel = () => {
	return (
		<div className="slider">
			<div className="list">
				<div className="item active">
					<img src="fuji.jpg" alt="fuji" />
					<div className="content">
						<p>Mt.Fuji</p>
						<h2>Mt.Fuji</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
							laboriosam odio quo hic molestias odit blanditiis consequuntur
							minus facere inventore fugiat voluptas beatae, consequatur nulla
							perspiciatis sequi sed, nemo earum.
						</p>
					</div>
				</div>
				<div className="item">
					<img src="fuji.jpg" alt="fuji" />
					<div className="content">
						<p>Mt.Fuji</p>
						<h2>Slider 2</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
							laboriosam odio quo hic molestias odit blanditiis consequuntur
							minus facere inventore fugiat voluptas beatae, consequatur nulla
							perspiciatis sequi sed, nemo earum.
						</p>
					</div>
				</div>
				<div className="item">
					<img src="fuji.jpg" alt="fuji" />
					<div className="content">
						<p>Mt.Fuji</p>
						<h2>Mt.Fuji</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
							laboriosam odio quo hic molestias odit blanditiis consequuntur
							minus facere inventore fugiat voluptas beatae, consequatur nulla
							perspiciatis sequi sed, nemo earum.
						</p>
					</div>
				</div>
				<div className="item">
					<img src="fuji.jpg" alt="fuji" />
					<div className="content">
						<p>Mt.Fuji</p>
						<h2>Mt.Fuji</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
							laboriosam odio quo hic molestias odit blanditiis consequuntur
							minus facere inventore fugiat voluptas beatae, consequatur nulla
							perspiciatis sequi sed, nemo earum.
						</p>
					</div>
				</div>
			</div>

			<div className="arrows">
				<button id="prev">{"<"}</button>
				<button id="prev">{">"}</button>
			</div>

			<div className="thumbnail">
				<div className="item active">
					<img src="fuji.jpg" alt="fuji" />
					<div className="content">Slider Name</div>
				</div>
				<div className="item">
					<img src="fuji.jpg" alt="fuji" />
					<div className="content">Slider Name</div>
				</div>
				<div className="item">
					<img src="fuji.jpg" alt="fuji" />
					<div className="content">Slider Name</div>
				</div>
				<div className="item">
					<img src="fuji.jpg" alt="fuji" />
					<div className="content">Slider Name</div>
				</div>
			</div>
		</div>
	);
};

export default Carousel;
