<template>
  <div>
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
        <tr class="bg-white border-b" v-for="att in attendees">
          <td class="p-2">{{ att.date_created }}</td>
          <td class="p-2">{{ att.user.first_name }} {{ att.user.last_name }}</td>
          <td class="p-2">{{ att.user.email }}</td>
          <td class="p-2">{{ att.event.title }}</td>
          <td class="pr-4">
            <button
              class="w-full text-white bg-secondary font-regular hover:bg-secondarylight text-xs rounded-sm text-center p-1"
            >
              View Event
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const attendees = ref();
const config = useRuntimeConfig();

const cookie = useCookie("access_token", { httpOnly: true });
onMounted(async () => {
  const { data: response } = await useFetch("/events/find_attendees_for_creator", {
    baseURL: config.baseURL,
    method: "POST",
    headers: { authorization: "Bearer " + cookie.value },
  });
  attendees.value = response.value;
});
</script>
