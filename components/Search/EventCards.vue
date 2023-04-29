<template>
  <div
    v-if="foundEvents.length > 0"
    class="bg-gray-50 border shadow text-gray-700 mb-8 rounded-sm md:ml-6 mx-6 hover:bg-white transition hover:scale-105 duration-300"
    v-for="event in foundEvents"
  >
    <NuxtLink :to="'/event/' + event.id">
      <div class="flex">
        <!-- <img
          class="object-cover w-52 h-52 rounded-l-lg"
          src="../../assets/images/homepage4.jpg"
          alt=""
        /> -->
        <img
          class="object-cover w-52 h-52 rounded-l-sm"
          :src="images[Number(event.image_id) - 1]"
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
import img12 from "~/assets/images/cover/11.jpg";
const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];
const prop = defineProps({
  query: { default: "", type: String },
  tags: { default: "", type: String },
});
const foundEvents = ref([]);
const filter_tags = ref([]);
const config = useRuntimeConfig();

const { data: response } = await useFetch("/events/query=" + prop.query, {
  baseURL: config.public.baseURL,
  method: "GET",
  headers: { api_key: config.public.api_key },
});
foundEvents.value = response.value;

watch(
  () => [prop.query, prop.tags],
  async () => {
    if (filter_tags.value.length === 0) {
      const { data: response } = await useFetch(
        "/events/query=" + prop.query + "/tags=" + prop.tags,
        {
          baseURL: config.public.baseURL,
          method: "GET",
          headers: { api_key: config.public.api_key },
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
