<template>
  <div class="flex flex-col min-h-screen">
    <NavigationTopBar />
    <div class="flex justify-center content-center mt-16">
      <AuthLoginCard />
    </div>
    <HomeFooter />
  </div>
</template>

<script setup>
useHead({
  title: "OnEvent | Sign In",
});
</script>

<style scoped></style>
