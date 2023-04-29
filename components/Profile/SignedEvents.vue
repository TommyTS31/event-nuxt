<template>
  <div>
    <div class="mb-3">
      <div class="flex mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-12 text-green-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <FormSectionHeading
          heading="Active Events"
          note="These are the list of events you have chosen to go to"
        />
      </div>
      <div class="flex overflow-hidden overflow-x-scroll border-2 px-3 rounded">
        <div
          class="max-sm:w-10/12 w-1/5 bg-gray-50 border border-gray-100 shadow text-black my-6 hover:shadow-xl delay-50 hover:scale-105 transition mr-4"
          v-for="event in events"
        >
          <NuxtLink :to="'/event/' + event.id">
            <div class="h-full">
              <img
                class="w-full h-1/2 object-cover"
                src="../../assets/images/homepage5.jpg"
                alt="event"
              />
              <div class="p-3">
                <div>
                  <p class="text-gray-400">{{ event.location }}</p>
                  <h5
                    class="mb-2 text-2xl font-bold text-gray-600 tracking-tight truncate ..."
                  >
                    {{ event.title }}
                  </h5>
                  <span
                    id="badge-dismiss-default"
                    class="inline-flex items-center px-2 py-1 mr-2 mb-1 text-sm font-medium text-gray-400 bg-gray-100 rounded"
                    v-for="tag in event.tags"
                  >
                    {{ tag.name }}
                  </span>
                </div>
                <div>
                  <button class="bg-blue-200">View</button>
                  <button class="bg-red-200">Leave</button>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <FormSectionSeparate />
    <div class="pt-3">
      <div class="flex mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-12 text-red-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <FormSectionHeading
          heading="Expired Events"
          note="These are the list of events you have chosen to go to"
        />
      </div>
      <div class="flex overflow-hidden overflow-x-scroll border-2 px-3 rounded">
        <div
          class="max-sm:w-10/12 w-1/5 bg-gray-50 border border-gray-100 shadow text-black my-6 hover:shadow-xl delay-50 hover:scale-105 transition mr-4"
          v-for="event in events"
        >
          <NuxtLink :to="'/event/' + event.id">
            <div class="h-full">
              <img
                class="w-full h-1/2 object-cover"
                src="../../assets/images/homepage5.jpg"
                alt="event"
              />
              <div class="p-3">
                <p class="text-gray-400">{{ event.location }}</p>
                <h5
                  class="mb-2 text-2xl font-bold text-gray-600 tracking-tight truncate ..."
                >
                  {{ event.title }}
                </h5>
                <span
                  id="badge-dismiss-default"
                  class="inline-flex items-center px-2 py-1 mr-2 mb-1 text-sm font-medium text-gray-400 bg-gray-100 rounded"
                  v-for="tag in event.tags"
                >
                  {{ tag.name }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { is_user_logged_in } from "~~/middleware/auth.global";

const config = useRuntimeConfig();
const cookie = useCookie("access_token", { httpOnly: true });
const verification = await is_user_logged_in();
const events = ref();

const { data: response } = await useFetch("/auth/profile", {
  baseURL: config.public.baseURL,
  method: "GET",
  headers: { authorization: "Bearer " + cookie.value },
});
events.value = response.value;
</script>
