<template>
  <div
    class="w-full max-w-sm p-4 bg-white border border-gray-200 shadow sm:p-6 md:p-8 font-sans"
  >
    <form class="">
      <FormSectionHeading
        heading="Sign In"
        note="Enter your login details to be able to manage or partake in events"
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
      <div class="mb-5">
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
      </div>
      <div class="text-sm font-medium text-gray-400 my-3">
        Already have an account?
        <NuxtLink href="/register" class="text-secondary hover:underline"
          >Sign Up</NuxtLink
        >
      </div>
      <FormSubmitButton buttonText="Sign In" @click="login" />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const config = useRuntimeConfig();
const user = ref({ email: "", password: "" });
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
}

async function login() {
  validateInput();
  if (validationArray.value.length != 0) {
    return;
  } else {
    try {
      const { data: response } = await useFetch("/auth/login", {
        baseURL: config.public.baseURL,
        credentials: "include",
        method: "POST",
        body: { user: user.value },
      });
      const authCookie = useCookie("access_token");
      authCookie.value = response.value.token;
      router.push("/dashboard");
    } catch (error) {
      validationArray.value.push("Wrong Email or Password");
    }
  }
}
</script>
