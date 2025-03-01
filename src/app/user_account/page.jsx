"use client";

import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { logoutRequest } from "../utils/authConfig";
import { callMsGraph } from "../utils/graph";
import { User } from "../login/page";

function page() {
	const { instance } = useMsal();
	const [user, setUser] = useState(null);
	const [photo, setPhoto] = useState();
	const [events, setEvents] = useState([]);
	const [updatedEvent, setUpdatedEvent] = useState(null);

	const logout = async () => {
		try {
			await instance.logoutRedirect(logoutRequest);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<header>
				<h1>User Account</h1>
				<p>View and manage your user account.</p>
			</header>
			<content>
				<p>Content goes here.</p>
				<User userInfo={user} />
				<button type="button" onClick={logout}>
					Sign out
				</button>
			</content>
		</div>
	);
}

export default page;
