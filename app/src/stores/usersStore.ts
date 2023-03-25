import { defineStore } from 'pinia'
import { refreshToken } from '@/api/apiClient'
import type { User } from '@/types'

export const useUsersStore = defineStore('users', {
  state: () => ({
    user: null as User | null,
    tokens: 0,
    jwt: '',
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    logOut() {
      this.user = null
      this.jwt = ''
      localStorage.setItem('jwt', "")
      localStorage.setItem('user', "")
    },
    setUser(user: User) {
      this.user = user
    },
    setJwt(jwt: string) {
      this.jwt = jwt
    },
    async initializeAuth() {
      const jwt = localStorage.getItem('jwt')
      const storedUser = localStorage.getItem('user')
  
      if (jwt && storedUser) {
        this.setJwt(jwt)
        this.setUser(JSON.parse(storedUser))
      } else {
        try {
          const response = await refreshToken()
          const { jwt, user } = response
  
          localStorage.setItem('jwt', jwt)
          localStorage.setItem('user', JSON.stringify(user))
  
          this.setJwt(jwt)
          this.setUser(user)
        } catch (error) {
          console.error((error as Error).message)
        }
      }
    },
  },
})