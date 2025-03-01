"use client";

import React from "react";
import "./footer.sass";

function footer() {
	return (
		<footer>
			<ul>
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/login">Login</a>
				</li>
				<li>
					<a href="/about">About</a>
				</li>
			</ul>
		</footer>
	);
}

export default footer;
