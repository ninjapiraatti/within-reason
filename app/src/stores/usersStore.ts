import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    currentUser: null,
    tokens: 0,
    jwt: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser,
  },
  actions: {
    setUser(user) {
      this.user = user
    },
    setJwt(jwt) {
      this.jwt = jwt
      localStorage.setItem('jwt', jwt)
    },
    logout() {
      this.user = null
      this.jwt = null
    },
  },
})