export const msalConfig = {
	auth: {
		clientId: "2f16c342-d69a-41e1-9c9f-f67b2b33a9f6", // Replace with your Azure AD App Registration Client ID
		authority: "https://login.microsoftonline.com/common", // Can be "organizations", "consumers", or tenant ID
		redirectUri: "http://localhost:3000/user_account", // Match this with the redirect URI in Azure Portal
	},
};

export const loginRequest = {
	scopes: ["User.Read", "Calendars.ReadWrite"], // Minimum scope for retrieving user profile info

};

export const logoutRequest = {
	postLogoutRedirectUri: "http://localhost:3000/", // Redirect to home page after logout
};
