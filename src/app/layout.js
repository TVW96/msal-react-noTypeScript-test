"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { msalConfig } from "./utils/authConfig";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

const msalinstance = new PublicClientApplication(msalConfig);

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<MsalProvider instance={msalinstance}>
				<Navigation />
				<body className={`${geistSans.variable} ${geistMono.variable}`}>
					{children}
				</body>
				<Footer />
			</MsalProvider>
		</html>
	);
}
