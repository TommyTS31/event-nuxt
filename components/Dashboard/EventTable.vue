<template>
  <div>
    <table class="w-full text-lg text-left text-gray-500 shadow rounded-sm my-3">
      <thead class="text-xl text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="p-2">ID</th>
          <th class="p-2">Title</th>
          <th class="p-2">Date</th>
          <th class="p-2">Time</th>
          <th class="p-2">Attendees</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b" v-for="event in events">
          <th class="p-2">{{ event.id }}</th>
          <td class="p-2">{{ event.title }}</td>
          <td class="p-2">{{ event.date }}</td>
          <td class="p-2">{{ event.time }}</td>
          <td class="p-2">{{ event.title.length }}</td>
          <td class="pr-4">
            <button
              class="w-full text-white bg-secondary font-regular hover:bg-secondarylight text-xs rounded-sm text-center p-1"
            >
              Manage
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const events = ref();
const cookie = useCookie("access_token", { httpOnly: true });
onMounted(async () => {
  const { data: response } = await useFetch(
    "http://localhost:5000/events/find_all_by_user",
    {
      method: "POST",
      headers: { authorization: "Bearer " + cookie.value },
    }
  );
  events.value = response.value;
});
</script>
