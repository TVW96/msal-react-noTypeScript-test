"use client";

import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../utils/authConfig";
import { callMsGraph, getCalendarEvents, getUserPhoto } from "../utils/graph";

export function User({ userdata, photo }) {
	if (!userdata) {
		return null;
	}

	return (
		<div>
			<h2>{userdata.displayName}</h2>
			<p>{userdata.jobTitle}</p>
			<p>{userdata.mail}</p>
			<p>{userdata.mobilePhone}</p>
			<img src={photo} alt="User" />
		</div>
	);
}

function page() {
	const { instance } = useMsal();
	const [userData, setUserInfo] = useState(null);
	const [photo, setPhoto] = useState();
	const [eventList, setEventList] = useState([]);
	const [updatedEvent, setUpdatedEvent] = useState(null);

	const handleLogin = async () => {
		try {
			const response = await instance.loginPopup(loginRequest);
			const userData = await callMsGraph(response.accessToken);
			setUserInfo(userInfo);
			const eventList = await getCalendarEvents(response.accessToken);
			setEventList(eventList);
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
			<h1>Login Page</h1>
			<p>Sign in to view and manage your user account.</p>
			<button type="button" onClick={handleLogin}>
				Sign in
			</button>
		</div>
	);
}

export default page;
