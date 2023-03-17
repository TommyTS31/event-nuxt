<template>
  <div v-if="attendees" class="pb-24">
    <table class="w-full text-lg text-left text-gray-500 shadow rounded-sm my-3">
      <thead class="text-xl text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="p-2">Date & Time</th>
          <th class="p-2">Name</th>
          <th class="p-2">Email</th>
          <th class="p-2">Event</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b" v-for="att in pageAttendees">
          <td class="p-2">{{ att.date_created }}</td>
          <td class="p-2">{{ att.user.first_name }} {{ att.user.last_name }}</td>
          <td class="p-2">{{ att.user.email }}</td>
          <td class="p-2">{{ att.event.title }}</td>
          <td class="pr-4">
            <!-- TODO Go to event -->
            <button
              class="w-full text-white bg-secondary font-regular hover:bg-secondarylight text-xs rounded-sm text-center p-1"
            >
              View Event
            </button>
            <!-- TODO Add pagination -->
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between" v-if="attendees.length > pages">
      <div class="text-gray-400 text-md font-semibold">
        Page {{ Math.round(start / pages) + 1 }} /
        {{ Math.ceil(attendees.length / pages) }}
      </div>
      <div class="flex justify-end">
        <button
          class="inline-flex items-center px-4 py-2 mr-1 text-sm font-semibold text-gray-500 rounded shadow bg-gray-200 hover:bg-gray-400"
          @click="previousPage"
          :disabled="start === 0"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Previous
        </button>
        <button
          class="inline-flex items-center px-4 py-2 ml-1 text-sm font-semibold text-gray-500 rounded shadow bg-gray-200 hover:bg-gray-400"
          @click="nextPage"
          :disabled="end >= attendees.length"
        >
          Next
          <svg
            aria-hidden="true"
            class="w-5 h-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const attendees = ref();
const config = useRuntimeConfig();
const pages = ref(5);
const start = ref(0);
const end = ref(5);

const cookie = useCookie("access_token", { httpOnly: true });
onMounted(async () => {
  const { data: response } = await useFetch("/events/attendees/creator", {
    baseURL: config.baseURL,
    method: "GET",
    headers: { authorization: "Bearer " + cookie.value },
  });
  attendees.value = response.value;
});

function nextPage() {
  start.value += pages.value;
  end.value += pages.value;
}

function previousPage() {
  start.value -= pages.value;
  end.value -= pages.value;
}

const pageAttendees = computed(() => {
  return attendees.value.slice(start.value, end.value);
});
</script>
