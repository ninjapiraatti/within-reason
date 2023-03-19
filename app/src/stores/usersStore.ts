import { defineStore } from 'pinia'
import { refreshToken } from '@/api/apiClient'

interface User {
  id: number;
  username: string;
  email: string;
  // other user properties if needed
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    user: null,
    tokens: 0,
    jwt: '',
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    logout() {
      this.user = null
      this.jwt = ''
    },
    setUser(user: User | null) {
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
          const { jwt, user } = response.data
  
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