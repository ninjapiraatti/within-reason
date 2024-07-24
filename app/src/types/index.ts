export enum Status {
	Open = "open",
	ResolvedTrue = "resolved true",
	ResolvedFalse = "resolved false",
	Cancelled = "cancelled",
}

export interface User {
	id: string
	username: string
	email: string
}

export interface RegisterUser {
	email: string
	username: string
	password: string
}

export interface LoginCredentials {
	identifier: string
	password: string
}

export interface Prediction {
	title: string
	description: string
	deadline: Date
	criteria: string
	authorName: string
	authorID: string
	statusPrediction: Status
	referees: User[]
	bets: Bet[]
}

export interface Bet {
	userID: string
	back: boolean
	amount: number
	odds: number
	statusBet: Status
	predictionID: string
}

export interface ArticleAttributes {
	title: string
	ingress: string
	image: string
	video: string
	body: string
	wasm: string
}

export interface CompanyAttributes {
	title: string
	companydata: Record<string, unknown>
}

export type Article = StrapiResponse<ArticleAttributes>
export type Company = StrapiResponse<CompanyAttributes>

export interface StrapiResponse<T> {
	id: number
	attributes: T
	imageUrl: string
	meta: Record<string, unknown>
}
