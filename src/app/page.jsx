'use client';
import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Container from "../components/container";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./utils/authConfig";

export default function Home() {
	const { instance } = useMsal();
	const [userToken, setUserToken] = useState();
	const handleLogin = async () => {
		try {
			const response = await instance.loginPopup(loginRequest);
			// For use in Postman
			console.log(`token: ${response.accessToken}`);
			setUserToken(response.accessToken);
			window.location.href = "/user_account";
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div>
			<h1 className={styles.title}>Introduction to MSAL (microsoft authentication library)</h1>
			<Container
				page="Home"
				title="Welcome"
				description="This is a sample application that demonstrates how to use MSAL.js with Next.js."
				body={
					<div>
						<p>
							To get started, sign in with your Microsoft account by clicking the
							button below.
						</p>
						<p>
							After signing in, you will be able to view your profile picture and
							calendar events.
						</p>
					</div>
				}
			/>
			<div style={{
				display: "flex",
				justifyContent: "center",
			}}>
				<button type='button'
					style={{
						backgroundColor: "#f0f0f0",
						borderRadius: "5px",
						boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
						cursor: 'pointer'
					}}
					onClick={handleLogin}
				>
					<Image
						src="/msal-nextjs.png"
						alt="MSAL.js with Next.js"
						width={200}
						height={50}
					/>
				</button>
			</div>
		</div>
	);
}
