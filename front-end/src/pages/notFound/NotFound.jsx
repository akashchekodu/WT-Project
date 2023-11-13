import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";

const NotFound = () => {
	return (
		<section>
			<div className="container notFound__container">
				<h2> Page Not Found </h2>
				<Link to="/" className="btn">
					Go back Home
				</Link>
			</div>
		</section>
	);
};

export default NotFound;
