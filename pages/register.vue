<template>
  <div class="flex flex-col min-h-screen">
    <NavigationTopBar />
    <div class="flex justify-center content-center mt-16">
      <AuthRegisterCard />
    </div>
    <HomeFooter />
  </div>
</template>

<script setup>
useHead({
  title: "OnEvent | Sign Up",
});
</script>

<style scoped></style>
