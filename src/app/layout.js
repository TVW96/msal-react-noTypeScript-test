"use client";
import "./globals.css";
import { msalConfig } from "./utils/authConfig";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import QueryProvider from "@/components/QueryProvider";

const msalinstance = new PublicClientApplication(msalConfig);

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>MSAL Next.js</title>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
			</head>
			<body>
				<MsalProvider instance={msalinstance}>
					<QueryProvider>
						<Navigation />
						{children}
						<Footer />
					</QueryProvider>
				</MsalProvider>
			</body>
		</html>
	);
}
