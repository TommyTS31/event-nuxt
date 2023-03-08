<template>
  <nav class="bg-white px-2 w-full z-20 top-0 left-0 border-b border-gray-100">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <NuxtLink to="/" class="flex items-center p-4">
        <span
          class="self-center text-3xl font-serif whitespace-nowrap text-primary font-bold"
          >OnEvent</span
        >
      </NuxtLink>
      <button
        data-collapse-toggle="navbar-dropdown"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="navbar-dropdown"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
        <ul
          class="flex flex-col border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white"
        >
          <li>
            <NuxtLink
              to="/"
              class="block py-2 pl-3 pr-4 text-base text-gray-500 hover:text-black font-semibold"
              aria-current="page"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="#"
              class="block py-2 pl-3 pr-4 text-base text-gray-500 hover:text-black font-semibold"
              aria-current="page"
              >Search</NuxtLink
            >
          </li>
          <li v-if="!isLoggedIn">
            <NuxtLink
              to="/login"
              class="block py-2 pl-3 pr-4 text-base text-gray-500 hover:text-black font-semibold"
              aria-current="page"
              >Sign In</NuxtLink
            >
          </li>
          <li v-if="!isLoggedIn">
            <NuxtLink
              to="/register"
              class="block py-2 pl-3 pr-4 text-base text-gray-500 hover:text-black font-semibold"
              aria-current="page"
              >Sign Up</NuxtLink
            >
          </li>
          <li v-if="isLoggedIn">
            <NuxtLink
              to="/dashboard"
              class="block py-2 pl-3 pr-4 text-base text-gray-500 hover:text-black font-semibold"
              aria-current="page"
              >Dashboard</NuxtLink
            >
          </li>
          <li v-if="isLoggedIn">
            <NuxtLink
              to="/dashboard"
              class="block py-2 pl-3 pr-4 text-base text-gray-500 hover:text-black font-semibold"
              aria-current="page"
              >Profile</NuxtLink
            >
          </li>
          <li v-if="isLoggedIn">
            <button
              @click="logout"
              class="block py-2 pl-3 pr-4 text-base text-gray-500 hover:text-black font-semibold"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isLoggedIn = computed(() => {
  const cookie = useCookie("access_token", { httpOnly: true });
  if (cookie.value) {
    return true;
  } else {
    return false;
  }
});

function logout() {
  const cookie = useCookie("access_token");
  cookie.value = null;
  router.go();
}
</script>

<style></style>
