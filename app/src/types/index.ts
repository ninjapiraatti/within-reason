export interface User {
  id: string,
  username: string
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
  Title: string
  Description: string
  AuthorName: string
  AuthorID: string
  Deadline: Date
  Criteria: string
}