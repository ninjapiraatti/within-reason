// src/api/apiClient.ts
import type { Prediction, LoginCredentials, User, RegisterUser, Bet } from "@/types"
import axios from "axios"

const jwt = localStorage.getItem("jwt")

const apiClient = axios.create({
	baseURL:
		import.meta.env.VITE_BUILD_ENV === "production"
			? import.meta.env.VITE_BASE_URL_PROD
			: import.meta.env.VITE_BASE_URL_LOCAL,
})

const config = {
	headers: {
		Authorization: `Bearer ${jwt}`,
	},
}

export async function fetchSettingsAPI() {
	const response = await apiClient.get(`/site-settings/1?populate=*`)
	return response.data.data.attributes
}

export async function fetchPredictionsAPI() {
	const response = await apiClient.get("/predictions?populate=*")
	return response.data.data
}

export async function fetchBetsAPI() {
	const response = await apiClient.get("/bets?populate=*")
	return response.data.data
}

export async function fetchArticlesAPI() {
	console.log("apiclient: " + apiClient)
	console.log("prod env: " + import.meta.env.VITE_BASE_URL_PROD)
	console.log("vite build env: " + import.meta.env.VITE_BUILD_ENV)
	const response = await apiClient.get("/articles?populate=*")
	return response.data.data
}

export async function fetchArticleAPI(id: string) {
	const response = await apiClient.get(`/articles/${id}?populate=*`)
	return response.data.data
}

export async function createPredictionAPI(prediction: Prediction): Promise<Prediction> {
	try {
		const response = await apiClient.post("/predictions", { data: prediction }, config)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error("Failed to create prediction")
	}
}

export async function createBetAPI(bet: Bet): Promise<Bet> {
	try {
		const response = await apiClient.post(
			"/bets",
			{
				data: {
					...bet,
					prediction: bet.predictionID,
				},
			},
			config
		)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error("Failed to create bet")
	}
}

// Login function
export async function loginAPI(credentials: LoginCredentials): Promise<{
	jwt: string
	user: User
}> {
	const response = await apiClient.post(`/auth/local`, credentials)
	const userData = response.data
	localStorage.setItem("jwt", userData.jwt)
	localStorage.setItem("user", JSON.stringify(userData.user))
	return { jwt: userData.jwt, user: userData.user }
}

// Register function
export async function registerAPI(user: RegisterUser): Promise<{
	jwt: string
	user: User
}> {
	const response = await apiClient.post(`/auth/local/register`, user)
	const userData = response.data
	localStorage.setItem("jwt", userData.jwt)
	localStorage.setItem("user", JSON.stringify(userData.user))
	return { jwt: userData.jwt, user: userData.user }
}

export async function refreshToken(): Promise<{
	jwt: string
	user: User
}> {
	try {
		const jwt = localStorage.getItem("jwt")

		if (!jwt) {
			throw new Error("No JWT token found")
		}

		const response = await apiClient.post(
			"/auth/refresh-token",
			{},
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		)

		const newJwt = response.data.jwt
		const user = response.data.user
		localStorage.setItem("jwt", newJwt)
		localStorage.setItem("user", JSON.stringify(user))

		return { jwt: newJwt, user }
	} catch (error) {
		throw new Error("Failed to refresh the JWT token")
	}
}
