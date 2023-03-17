<template>
  <div>
    <NavigationTopBar />
    <div>
      <img
        class="object-cover w-full h-96"
        src="../assets/images/homepage3.jpg"
        alt="event"
      />
    </div>
    <div class="flex justify-center">
      <div class="pt-16 pb-6 w-8/12 max-md:w-11/12 flex font-sans">
        <input
          type="text"
          id="first_name"
          class="bg-gray-100 text-black text-base w-full p-2.5"
          placeholder="E.g. Indie Rock"
          required
        />
        <button class="bg-secondary text-white px-10 max-md:px-3 max-md:text-sm">
          Search
        </button>
      </div>
    </div>
    <HomeNavigationTabs @event-option="(e) => (eventType = e)" />
    <HomeEventCards :eventOption="eventType" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const eventType = ref(0);
</script>
