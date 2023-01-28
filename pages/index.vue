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
    <div class="py-16 px-96 flex font-sans">
      <input
        type="text"
        id="first_name"
        class="bg-gray-100 text-black text-base w-full p-2.5"
        placeholder="E.g. Indie Rock"
        required
      />
      <button class="bg-secondary text-white px-10">Search</button>
    </div>
    <div class="px-96 container flex flex-row" v-for="n in 6">
      <div class="max-w-sm p-6 bg-white border border-gray-100 shadow text-black">
        <h5 class="mb-2 text-2xl font-bold tracking-tight">Chinese Food Event</h5>
        <p class="mb-3 font-normal">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in
          reverse chronological order.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
