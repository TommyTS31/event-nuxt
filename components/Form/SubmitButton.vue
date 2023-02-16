<template>
  <button
    type="button"
    class="w-full text-white bg-secondary hover:bg-secondarylight focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonText: String,
  },
};
</script>
