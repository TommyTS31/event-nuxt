<template>
  <div v-if="events">
    <NavigationSideBar />
    <div class="flex justify-center content-center mt-16">
      <div class="w-full max-w-5xl p-4 bg-white sm:p-6 md:p-8 font-sans container">
        <h5 class="text-5xl font-semibold text-primary-400 pb-10">Your Events</h5>
        <FormSectionHeading
          heading="Current Events"
          note="These are the events that you have created and that are going to happen"
        />
        <div class="flex flex-wrap justify-between mt-6">
          <div
            class="bg-gray-50 border shadow text-gray-700 mb-8 rounded-sm hover:bg-white transition hover:scale-105 duration-300 w-5/12 mx-0.5"
            v-for="event in current"
          >
            <NuxtLink :to="'/event/' + event.id">
              <div class="flex">
                <img
                  class="object-cover w-32 h-32 rounded-l-sm"
                  :src="images[Number(event.image_id) - 1]"
                  alt=""
                />
                <div class="ml-3 my-5 flex flex-col justify-between w-3/4">
                  <div>
                    <h5 class="text-2xl font-semibold truncate pr-12">
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
        </div>
        <FormSectionSeparate />
        <div>
          <FormSectionHeading
            heading="Expired Events"
            note="These are the events that you have created and that are going to happen"
          />
          <div class="flex flex-wrap justify-between mt-6">
            <div
              class="bg-gray-50 border shadow text-gray-700 mb-8 rounded-sm hover:bg-white transition hover:scale-105 duration-300 w-5/12 mx-0.5"
              v-for="event in expired"
            >
              <NuxtLink :to="'/event/' + event.id">
                <div class="flex">
                  <img
                    class="object-cover w-32 h-32 rounded-l-sm"
                    :src="images[Number(event.image_id) - 1]"
                    alt=""
                  />
                  <div class="ml-3 my-5 flex flex-col justify-between w-3/4">
                    <div>
                      <h5 class="text-2xl font-semibold truncate pr-12">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
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

const config = useRuntimeConfig();
const events = ref();
const expired = ref([]);
const current = ref([]);

const cookie = useCookie("access_token", { httpOnly: true });

onMounted(async () => {
  const { data: response } = await useFetch("/events/all/user", {
    baseURL: config.public.baseURL,
    method: "GET",
    headers: { authorization: "Bearer " + cookie.value },
  });
  events.value = JSON.parse(JSON.stringify(response.value));
  filterByDate(events.value);
});

function filterByDate(events) {
  const today = new Date();
  for (let i = 0; i < events.length; i++) {
    const eventDate = new Date(events[i].date);
    if (eventDate < today) {
      expired.value.push(events[i]);
    } else {
      current.value.push(events[i]);
    }
  }
}

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
