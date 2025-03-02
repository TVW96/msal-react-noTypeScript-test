"use client";

import React from "react";
import Link from "next/link";
import "./navigation.sass";

function navigation() {
	return (
		<div className="navigation">
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/login">Login</Link>
				</li>
				<li>
					<Link href="/about">About</Link>
				</li>
			</ul>
		</div>
	);
}

export default navigation;
