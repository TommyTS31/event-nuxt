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
    <HomeEventCards />
  </div>
</template>

<script setup></script>

<style scoped></style>
