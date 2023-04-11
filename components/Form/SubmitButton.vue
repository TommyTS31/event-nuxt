<template>
  <button
    type="button"
    v-if="type === 'primary'"
    class="w-full text-white bg-primary font-semibold hover:bg-primarylight focus:ring-4 focus:outline-none focus:ring-blue-300 text-md px-5 py-2.5 text-center rounded-sm shadow hover:scale-105 transition"
  >
    {{ buttonText }}
  </button>
  <button
    type="button"
    v-else
    class="w-full text-white bg-secondary font-semibold hover:bg-secondarylight focus:ring-4 focus:outline-none focus:ring-blue-300 text-md px-5 py-2.5 text-center rounded-sm shadow hover:scale-105 transition"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonText: String,
    type: String,
  },
};
</script>
