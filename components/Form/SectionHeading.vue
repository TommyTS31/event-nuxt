<template>
  <div class="pb-1">
    <h5 class="text-4xl font-semibold text-black">{{ heading }}</h5>
    <p class="text-gray-400 text-sm">
      {{ note }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["heading", "note"],
};
</script>
