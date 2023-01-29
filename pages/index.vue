<template>
  <div>
    <NavigationBar />
    <div>
      <img
        class="object-cover w-full h-96"
        src="../assets/images/homepage3.jpg"
        alt="event"
      />
    </div>
    <div class="pt-16 pb-6 px-80 flex font-sans">
      <input
        type="text"
        id="first_name"
        class="bg-gray-100 text-black text-base w-full p-2.5"
        placeholder="E.g. Indie Rock"
        required
      />
      <button class="bg-secondary text-white px-10">Search</button>
    </div>
    <HomeNavigationTabs />
    <div class="w-full flex justify-center">
      <div class="container flex flex-row justify-evenly w-4/6 flex-wrap">
        <div
          class="w-96 bg-white border border-gray-100 shadow text-black my-6"
          v-for="n in 18"
        >
          <img class="w-full" src="../assets/images/homepage2.jpg" alt="event" />
          <h5 class="mb-2 text-2xl font-bold tracking-tight">Chinese Food Event</h5>
          <p class="mb-3 font-normal">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in
            reverse chronological order.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
