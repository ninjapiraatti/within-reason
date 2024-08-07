import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import ArticleView from "../views/ArticleView.vue"
import NotFoundView from "../views/NotFoundView.vue"
import LoginView from "../views/LoginView.vue"
import ProfileView from "../views/ProfileView.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/login",
			name: "Login",
			component: LoginView,
		},
		{
			path: "/projects/:id",
			component: ArticleView,
		},
		{
			path: "/profile",
			name: "Profile",
			component: ProfileView,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/slides",
			name: "slides",
			meta: { hideHeader: true },
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("../views/SlideDeckView.vue"),
		},
		{
			path: "/:catchAll(.*)",
			component: NotFoundView,
		},
	],
})

export default router
