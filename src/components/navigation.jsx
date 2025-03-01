"use client";

import React from "react";
import Link from "next/link";
import "./navigation.sass";

function navigation() {
	return (
		<nav>
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
		</nav>
	);
}

export default navigation;
