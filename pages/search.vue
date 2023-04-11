<template>
  <div class="flex flex-col min-h-screen">
    <NavigationTopBar />
    <div class="flex justify-center content-center mt-16 h-full">
      <div class="w-1/4 mx-6">
        <input
          type="text"
          class="bg-gray-100 text-black text-lg w-full p-2.5"
          placeholder="E.g. Indie Rock"
          required
          v-model="searchQuery"
          @input="searchEvents"
        />
        <button
          class="bg-secondary text-white text-lg px-10 w-full my-2 p-1 rounded-sm transition hover:scale-105 hover:bg-secondarylight shadow"
          @click="searchEvents"
        >
          Search
        </button>
        <SearchTagFilter @send-tags="(n) => (filterTags = n)" />
      </div>
      <!-- Event cards -->
      <div class="w-6/12 border-l">
        <p v-if="!searchQuery" class="text-gray-400 text-md pl-6 pb-3">
          Showing most recent events
        </p>
        <SearchEventCards :query="searchQuery" :tags="filterTags" />
      </div>
    </div>
    <HomeFooter />
  </div>
</template>

<script setup>
import { ref } from "vue";
const config = useRuntimeConfig();

useHead({
  title: "OnEvent | Search",
});

const searchQuery = ref("");
const foundEvents = ref([]);
const filterTags = ref("");

async function searchEvents() {
  const { data: response } = await useFetch(
    "/events/query=" + searchQuery.value,
    {
      baseURL: config.baseURL,
      method: "GET",
      headers: { api_key: config.api_key },
    }
  );
  foundEvents.value = response.value;
}
</script>
