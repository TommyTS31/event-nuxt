<template>
  <div>
    <NavigationTopBar />
    <!-- TODO User guard, if registered or is creator, don't join -->
    <EventDisplay />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
const config = useRuntimeConfig();
const id = useRoute().params.id;
const cookie = useCookie("access_token", { httpOnly: true });
const event = ref();
const address = "/events/event=" + id;

useHead({
  title: "OnEvent | Event " + id,
});

onBeforeMount(async () => {
  const { data: response } = await useFetch(address, {
    baseURL: config.baseURL,
    method: "GET",
  });
  event.value = JSON.parse(JSON.stringify(response.value));
});

async function joinEvent() {
  const { data: response } = await useFetch(
    "http://localhost:5000/events/register_user",
    {
      method: "POST",
      headers: { authorization: "Bearer " + cookie.value },
      body: { event_id: parseInt(id.id) },
    }
  );
  console.log(response.value);
}
</script>
