<template>
  <div>
    <NavigationSideBar />
    <div class="flex justify-center content-center mt-16">
      <div class="w-5/12 p-6 space-y-6">
        <h5 class="text-5xl font-semibold text-primary-400">Manage Access</h5>
        <div>
          <FormSectionHeading
            heading="Generate An API Key"
            note="You can generate an API key that will let you access some data from this application without being inside the application. You will be able to access data to use in your own use cases such as specific event data or finding events."
          />
          <FormSectionSeparate />
          <p class="text-lg text-justify mb-2">
            If you haven't generated a key you can generate a new key by
            clicking the 'generate' button below. You will only get to view your
            API key once, so make sure to save the API key. If you forget the
            key you will have to generate a new key.
          </p>
          <FormSectionSeparate />
          <p class="text-lg text-justify">You will be able to access:</p>
          <ul class="pl-8 text-lg list-decimal font-bold">
            <li>Find Events</li>
            <li>Get Specific Event Data</li>
            <li>Access General Data Analytics</li>
          </ul>
          <FormSectionSeparate />
          <input
            :disabled="true"
            class="bg-gray-50 border border-gray-300 text-black text-lg font-bold block w-full p-2.5 mb-2 text-center"
            placeholder="Key generated here"
            v-model="fetchedKey"
          />
          <button
            class="text-md font-bold px-4 py-2 w-full bg-secondary text-white rounded"
            :disabled="generated"
            @click="generateKey"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const cookie = useCookie("access_token", { httpOnly: true });
const fetchedKey = ref();
const generated = ref(false);
const config = useRuntimeConfig();

useHead({
  title: "OnEvent | Get API Key",
});

async function generateKey() {
  const { data: response } = await useFetch("/api/generate_api_key", {
    baseURL: config.baseURL,
    method: "POST",
    headers: { authorization: "Bearer " + cookie.value },
  });
  fetchedKey.value = response.value.api_key;
  generated.value = true;
}
</script>
