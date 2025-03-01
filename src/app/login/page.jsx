"use client";

import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../utils/authConfig";
import { callMsGraph } from "../utils/graph";

function page() {
	const { instance } = useMsal();
	const [userInfo, setUserInfo] = useState(null);
	const [photo, setPhoto] = useState();
	const [events, setEvents] = useState([]);
	const [updatedEvent, setUpdatedEvent] = useState(null);

	function User({ userInfo }) {
		if (!userInfo) {
			return null;
		}

		return (
			<div>
				<h2>{userInfo.displayName}</h2>
				<p>{userInfo.jobTitle}</p>
				<p>{userInfo.mail}</p>
				<p>{userInfo.mobilePhone}</p>
				<img src={photo} alt="User" />
			</div>
		);
	}

	const handleLogin = async () => {
		try {
			const response = await instance.loginPopup(loginRequest);
			const userData = await callMsGraph(response.accessToken);
			setUserInfo(userInfo);
			const eventList = await getCalendarEvents(response.accessToken);
			setEvents(eventList);
			const photoUrl = await getUserPhoto(response.accessToken);
			setPhoto(photoUrl);
			// For use in Postman
			console.log(`token: ${response.accessToken}`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<p>Sign in to view and manage your user account.</p>
			<button type="button" onClick={handleLogin}>
				Sign in
			</button>
		</div>
	);
}

export default page;
