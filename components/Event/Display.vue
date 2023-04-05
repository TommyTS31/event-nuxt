<template>
  <div class="flex justify-center content-center mt-8" v-if="event">
    <div
      class="w-full max-w-7xl p-4 bg-white border-gray-200 sm:p-6 md:p-8 font-sans"
    >
      <div class="w-full h-80 overflow-hidden">
        <img src="../../assets/images/homepage1.jpg" alt="" />
      </div>
      <div class="flex flex-row mt-6 md:justify-between h-fit max-md:flex-col">
        <div class="w-4/5 zmr-6 max-md:w-full">
          <h1 class="text-5xl font-semibold">{{ event.title }}</h1>
          <p class="text-gray-300 text-md pt-2">
            Event by: {{ event.creator.first_name }}
            {{ event.creator.last_name }}
          </p>
          <div class="my-3">
            <span
              id="badge-dismiss-default"
              class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-400 bg-gray-100 rounded"
              v-for="tag in event.tags"
            >
              {{ tag.name }}
            </span>
          </div>
          <FormSectionSeparate />
          <p class="my-4 text-justify pr-4">
            {{ event.description }}
          </p>
        </div>
        <!-- Extra Data Card + Attend Button -->

        <div
          class="w-1/5 p-3 bg-white shadow border-gray-200 sm:p-6 md:p-4 font-sans flex flex-col justify-between max-md:w-full"
        >
          <dl class="max-w-md text-black divide-y divide-gray-200">
            <div class="flex flex-col pb-3">
              <dt class="mb-1 text-gray-500 md:text-lg font-semibold">Date</dt>
              <dd class="text-lg font-semibold">{{ event.date }}</dd>
            </div>
            <div class="flex flex-col py-3">
              <dt class="mb-1 text-gray-500 md:text-lg font-semibold">Time</dt>
              <dd class="text-lg font-semibold">
                {{ event.time }}
              </dd>
            </div>
            <div class="flex flex-col pt-3 max-md:mb-3">
              <dt class="mb-1 text-gray-500 md:text-lg font-semibold">
                Location
              </dt>
              <dd class="text-md font-semibold">{{ event.location }}</dd>
            </div>
          </dl>
          <div v-if="!user_verification.user">
            <FormSubmitButton
              class="mt-16"
              buttonText="Join Event"
              type="secondary"
              v-if="user_verification.logged"
              @click="joinEvent"
            />
            <NuxtLink v-else="user_verification.logged" to="/login">
              <FormSubmitButton
                class="mt-16"
                buttonText="Log In to join"
                type="secondary"
              />
            </NuxtLink>
          </div>
          <div v-else>
            <FormSubmitButton
              class="mt-16"
              buttonText="Manage Event"
              type="secondary"
            />
          </div>
        </div>
      </div>
      <FormSectionSeparate />
      <EventWriteReview :event_id="event.id" />

      <EventReviewList :event_id="event.id" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { is_user_logged_in } from "~~/middleware/auth.global";
const config = useRuntimeConfig();
const id = useRoute().params.id;
const cookie = useCookie("access_token", { httpOnly: true });
const event = ref();
const user_verification = await is_user_logged_in();

onMounted(async () => {
  const { data: response } = await useFetch("/events/event=" + id, {
    baseURL: config.baseURL,
    method: "GET",
    headers: { api_key: config.api_key },
  });
  event.value = response.value;
});

async function joinEvent() {
  const { data: response } = await useFetch(
    "http://localhost:5000/events/" + "/user/" + id,
    {
      method: "POST",
      headers: { authorization: "Bearer " + cookie.value },
      body: { event_id: parseInt(id.id) },
    }
  );
  console.log(response.value);
}
</script>
