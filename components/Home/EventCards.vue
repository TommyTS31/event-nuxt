<template>
  <div class="w-full flex justify-center">
    <div class="container flex flex-row justify-evenly w-8/12 max-md:w-10/12 flex-wrap">
      <div
        class="max-sm:w-10/12 w-1/4 bg-white border border-gray-100 shadow text-black my-6 mx-2"
        v-for="event in shownEvents"
      >
        <NuxtLink :to="'/event/' + event.id">
          <div class="h-full hover:shadow-xl">
            <img
              class="w-full h-1/2 object-cover"
              src="../../assets/images/homepage2.jpg"
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
</template>

<script setup>
import { ref, computed, watch } from "vue";

const cookie = useCookie("access_token", { httpOnly: true });
const config = useRuntimeConfig();

const prop = defineProps({ eventOption: { default: 0, type: Number } });
const shownEvents = ref();

const { data: response } = await useFetch("/events/all", {
  baseURL: config.baseURL,
  method: "GET",
  headers: { api_key: config.api_key },
});
shownEvents.value = response.value;

watch(
  () => prop.eventOption,
  async () => {
    console.log(prop.eventOption);
    if (prop.eventOption === 0) {
      const { data: response } = await useFetch("/events/all", {
        baseURL: config.baseURL,
        method: "GET",
        headers: { api_key: config.api_key },
      });
      shownEvents.value = response.value;
    }
    if (prop.eventOption === 1) {
      const { data: response } = await useFetch("/events/all", {
        baseURL: config.baseURL,
        method: "GET",
        headers: { api_key: config.api_key },
      });
      shownEvents.value = response.value;
    }
    if (prop.eventOption === 2) {
      const { data: response } = await useFetch("/events/all", {
        baseURL: config.baseURL,
        method: "GET",
        headers: { api_key: config.api_key },
      });
      shownEvents.value = response.value;
    }
  }
);
</script>
