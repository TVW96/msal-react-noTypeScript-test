"use client";

import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { logoutRequest } from "../utils/authConfig";
import { callMsGraph, getCalendarEvents, getUserPhoto, updateCalendarEvent } from "../utils/graph";
import { User } from "../login/page";
import "./user_account.sass";

function page() {
	const { instance } = useMsal();
	const [userData, setUserInfo] = useState(null);
	const [photo, setPhoto] = useState();
	const [eventList, setEventList] = useState([]);
	const [updatedEvent, setUpdatedEvent] = useState(null);

	const eventListItems = eventList.map((event) => (
		<li key={event.id}>
			{event.subject} - {event.start.dateTime}
		</li>
	));

	const logout = async () => {
		try {
			await instance.logoutRedirect(logoutRequest);
		} catch (error) {
			console.error(error);
		}
	};

	const getUserData = async () => {
		try {
			const currentAccounts = instance.getAllAccounts();
			if (currentAccounts.length === 0) {
				throw new Error("No account found. User mus sign in.");
			}

			const activeAccount = currentAccounts[0];

			const response = await instance.acquireTokenSilent({
				account: activeAccount,
				scopes: ["User.Read"],
			});
			
			const userData = await callMsGraph(response.accessToken);
			console.log(userData);
			setUserInfo(userData);

			const photoUrl = await getUserPhoto(response.accessToken);
			console.log(photoUrl);
			setPhoto(photoUrl);
		} catch (error) {
			console.error("Erroro acquiring token:", error);

			if (error.name === "InteractionRequiredAuthError") {
				await instance.loginPopup(); // If silent token acquisition fails, prompt login
			}
		}
	}

	const User = ({ userdata, photo }) => {
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

	return (
		<div>
			<header>
				<h1>User Account</h1>
				<p>View and manage your user account.</p>
			</header>
			<content>
				<p>Content goes here.</p>
				<button type="button" onClick={logout}>
					Sign out
				</button>
			</content>
			<main>
				<div className="button-container">
					<button type='button' onClick={getCalendarEvents}>Outlook Calendar</button>
					<button type='button' onClick={getUserData}>Profile</button>
				</div>
				<div className="content-container">
					<div className="user-profile">
						<h2>User Profile</h2>
						{userData ? (
							<User userdata={userData} photo={photo} />
						) : (
							<p>User profile shown here.</p>
						)}
						<User userdata={userData} photo={photo} />
					</div>
					<div className="event-list">
						<h2>Calendar Events</h2>
						{eventList.length > 0 ? (
							<ul>{eventListItems}</ul>
						) : (
							<p>Events show here.</p>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}

export default page;
