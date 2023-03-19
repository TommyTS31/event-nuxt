export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = false
  if ((to.path === "/manage_api" || to.path === "/dashboard" || to.path === "/new_event") && !isLoggedIn) {
    return navigateTo("/login")
  }
});
