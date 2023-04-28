<template>
  <div
    class="w-full max-w-sm p-4 bg-white border border-gray-200 shadow sm:p-6 md:p-8 font-sans"
  >
    <FormSectionHeading
      heading="Sign Up"
      note="Enter your details to create an account"
    />
    <div v-if="validationArray != 0" class="border border-red-600 rounded p-3 shadow">
      <div class="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 text-red-600"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <ul class="list-disc p-3">
        <li v-for="problem in validationArray">{{ problem }}</li>
      </ul>
    </div>
    <form>
      <div class="mb-5">
        <div>
          <FormInputBox
            label="First Name"
            placeholder="John"
            inputType="text"
            v-model="user.first_name"
          />
        </div>
        <div>
          <FormInputBox
            label="Last Name"
            placeholder="Doe"
            inputType="text"
            v-model="user.last_name"
          />
        </div>
        <div>
          <FormInputBox
            label="Email Address"
            placeholder="name@company.com"
            inputType="email"
            v-model="user.email"
          />
        </div>
        <div>
          <FormInputBox
            label="Password"
            placeholder="•••••••••••"
            inputType="password"
            v-model="user.password"
          />
        </div>
        <div>
          <FormInputBox
            label="Confirm Password"
            placeholder="•••••••••••"
            inputType="password"
            v-model="confirmPassword"
          />
        </div>
      </div>
      <div class="text-sm font-medium text-gray-400 my-3">
        Already have an account?
        <NuxtLink href="/login" class="text-secondary hover:underline">Sign In</NuxtLink>
      </div>
      <FormSubmitButton buttonText="Create an Account" @click="register" />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const config = useRuntimeConfig();
const user = ref({ first_name: "", last_name: "", email: "", password: "" });
const confirmPassword = ref("");

const validationArray = ref([]);

function validateInput() {
  validationArray.value = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.value.email)) {
    validationArray.value.push("Email field in wrong email format");
  }
  if (user.value.email.length === 0) {
    validationArray.value.push("Email field cannot be empty");
  }
  if (user.value.password.length === 0) {
    validationArray.value.push("Password field cannot be empty");
  }
  if (user.value.password != confirmPassword.value) {
    validationArray.value.push("Passwords do not match");
  }
  if (user.value.email.length === 0) {
    validationArray.value.push("Email field cannot be empty");
  }
  if (user.value.first_name.length === 0) {
    validationArray.value.push("First name field cannot be empty");
  }
  if (user.value.last_name.length === 0) {
    validationArray.value.push("Last name field cannot be empty");
  }
}

async function register() {
  validateInput();
  if (validationArray.value.length != 0) {
    return;
  } else {
    try {
      const { data: response } = await useFetch("/auth/register", {
        baseURL: config.public.baseURL,
        method: "POST",
        body: { user: user.value },
      });
      const authCookie = useCookie("access_token");
      authCookie.value = response.value.token;
      router.push("/your_preferences");
    } catch {
      validationArray.value.push("User with the same email already exists");
    }
  }
}

// export default {
//   data() {
//     return {
//       user: {
//         first_name: "",
//         last_name: "",
//         email: "",
//         password: "",
//       },
//     };
//   },
//   methods: {
//     async register() {
//       const config = useRuntimeConfig();

//       const { data: response } = await useFetch("/auth/register", {
//         baseURL: config.public.baseURL,
//         method: "POST",
//         body: { user: this.user },
//       });
//       const authCookie = useCookie("access_token");
//       authCookie.value = response.value.token;
//       this.$router.push("/your_preferences");
//     },
//   },
// };
</script>
