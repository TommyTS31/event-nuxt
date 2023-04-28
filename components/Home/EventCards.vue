<template>
  <client-only>
    <div class="w-full flex justify-center">
      <div v-if="eventOption === 2">
        <client-only>
          <div class="mt-3 mb-6">
            <HomeMapCard />
          </div>
        </client-only>
      </div>
      <div
        class="container flex flex-row justify-evenly w-8/12 max-md:w-10/12 flex-wrap"
        v-if="eventOption === 1 || eventOption === 0"
      >
        <div
          class="flex justify center flex-col"
          v-if="eventOption === 1 && !user_verification.logged"
        >
          <h1 class="text-3xl my-5">Sign in to view your recommendations!</h1>
          <NuxtLink to="/login">
            <button
              class="bg-secondary text-white text-lg p-2.5 rounded shadow font-semibold hover:scale-105 hover:bg-secondarylight transition duration-200 w-full"
            >
              Sign in
            </button>
          </NuxtLink>
        </div>
        <div
          class="max-sm:w-10/12 w-1/4 bg-gray-50 border border-gray-100 shadow text-black my-6 mx-2 hover:shadow-xl delay-50 hover:scale-105 transition"
          v-for="event in shownEvents"
          v-else
        >
          <NuxtLink :to="'/event/' + event.id">
            <div class="h-full">
              <img
                class="w-full h-1/2 object-cover"
                :src="images[Number(event.image_id) - 1]"
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
  </client-only>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { is_user_logged_in } from "~~/middleware/auth.global";

import img1 from "~/assets/images/cover/1.jpg";
import img2 from "~/assets/images/cover/2.jpg";
import img3 from "~/assets/images/cover/3.jpg";
import img4 from "~/assets/images/cover/4.jpg";
import img5 from "~/assets/images/cover/5.jpg";
import img6 from "~/assets/images/cover/6.jpg";
import img7 from "~/assets/images/cover/7.jpg";
import img8 from "~/assets/images/cover/8.jpg";
import img9 from "~/assets/images/cover/9.jpg";
import img10 from "~/assets/images/cover/10.jpg";
import img11 from "~/assets/images/cover/11.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

const cookie = useCookie("access_token", { httpOnly: true });
const config = useRuntimeConfig();

const prop = defineProps({ eventOption: { default: 0, type: Number } });
const shownEvents = ref();
const locationQuery = ref("");
const user_verification = await is_user_logged_in();

const { data: response } = await useFetch("/events/all", {
  baseURL: config.public.baseURL,
  method: "GET",
  headers: { api_key: config.public.api_key },
});
shownEvents.value = JSON.parse(JSON.stringify(response.value));

// Check Navigation state
watch(
  () => prop.eventOption,
  async () => {
    if (prop.eventOption === 0) {
      const { data: response } = await useFetch("/events/all", {
        baseURL: config.public.baseURL,
        method: "GET",
        headers: { api_key: config.public.api_key },
      });
      shownEvents.value = response.value;
    }
    if (prop.eventOption === 1) {
      if (user_verification.logged) {
        const { data: response } = await useFetch(
          "/events/recommendation/user=" + String(user_verification.user.id),
          {
            baseURL: config.public.baseURL,
            method: "GET",
            headers: { authorization: "Bearer " + cookie.value },
          }
        );
        shownEvents.value = response.value.events;
      }
    }
    if (prop.eventOption === 2) {
      const { data: response } = await useFetch("/events/all", {
        baseURL: config.public.baseURL,
        method: "GET",
        headers: { api_key: config.public.api_key },
      });
      shownEvents.value = response.value;
    }
  }
);
</script>
