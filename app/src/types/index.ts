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

export interface Project {
	name: string
	image: string
	video: string
	description: string
	link: string
	externalLink: string
}
