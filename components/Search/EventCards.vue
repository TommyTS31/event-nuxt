<template>
  <div
    v-if="foundEvents.length > 0"
    class="bg-gray-50 border shadow text-gray-700 mb-8 rounded-lg md:ml-6 mx-6 hover:bg-white transition hover:scale-105 duration-300"
    v-for="event in foundEvents"
  >
    <NuxtLink :to="'/event/' + event.id">
      <div class="flex">
        <img
          class="object-cover w-52 h-52 rounded-l-lg"
          src="../../assets/images/homepage4.jpg"
          alt=""
        />
        <div class="ml-3 my-5 flex flex-col justify-between w-3/4">
          <div>
            <h5 class="text-4xl font-semibold truncate">
              {{ event.title }}
            </h5>
            <p class="text-gray-300">
              {{ parseCreatedDate(event.date) }} at {{ formatTime(event.time) }}
            </p>
            <p class="text-gray-300">
              {{ event.location }}
            </p>
          </div>
          <!-- Use v-for -->
          <div>
            <span
              id="badge-dismiss-default"
              class="inline-flex items-center px-2 py-1 mr-2 mb-1 text-sm font-medium text-blue-600 bg-blue-200 rounded"
              v-for="tag in event.tags"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
  <div v-else>
    <p class="pt-12 text-6xl text-center">No events found!</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
const prop = defineProps({
  query: { default: "", type: String },
  tags: { default: "", type: String },
});
const foundEvents = ref([]);
const filter_tags = ref([]);
const config = useRuntimeConfig();

const { data: response } = await useFetch("/events/query=" + prop.query, {
  baseURL: config.baseURL,
  method: "GET",
  headers: { api_key: config.api_key },
});
console.log(response.value);
foundEvents.value = response.value;

watch(
  () => [prop.query, prop.tags],
  async () => {
    console.log(prop.query);
    console.log(prop.tags);
    if (filter_tags.value.length === 0) {
      const { data: response } = await useFetch(
        "/events/query=" + prop.query + "/tags=" + prop.tags,
        {
          baseURL: config.baseURL,
          method: "GET",
          headers: { api_key: config.api_key },
        }
      );
      foundEvents.value = response.value;
    }
  }
);

function formatTime(time) {
  const parts = time.split(":");
  return parts[0] + ":" + parts[1];
}

function parseCreatedDate(date) {
  const toParse = new Date(date);
  return toParse.toLocaleDateString("en-UK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>
