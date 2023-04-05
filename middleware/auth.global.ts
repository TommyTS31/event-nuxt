import Cookies from 'js-cookie'
const verify_token_address = "http://localhost:5000/auth/verify";

export async function is_user_logged_in() {
  const token  = Cookies.get('access_token')
  if (!token){
    return false
  }
  const verification_request = await fetch(verify_token_address, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + token ,
    },
  });
  const verification = await verification_request.json()
  return verification;
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth_status = await is_user_logged_in()
   if ((to.path === "/manage_api" || to.path === "/dashboard" || to.path === "/new_event") && !auth_status.logged) {
     return navigateTo("/login")
   }
});
