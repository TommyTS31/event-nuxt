<template>
  <div class="my-2">
    <p class="p-1 text-gray-500">Out of 5, what would you rate this event?</p>
    <div class="flex items-center">
      <div v-for="(n, index) in 5">
        <button
          @mouseover="set_temp_rating(index)"
          @mouseleave="revert_rating"
          @click="
            set_rating(index);
            $emit('ratingValue', index + 1);
          "
        >
          <svg
            aria-hidden="true"
            class="w-8 text-primarylight"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            v-if="index < rating_value"
          >
            <title>5/5</title>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <svg
            aria-hidden="true"
            class="w-8 text-gray-300 hover:text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            v-else
          >
            <title>5/5</title>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
        </button>
      </div>
      <p class="font-bold pb-1.5 text-lg ml-3">{{ rating_value }} / 5</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const rating_value = ref(1);
const back_up_rating = ref(1);
const temp_rating_value = ref(0);

function set_temp_rating(index) {
  rating_value.value = index + 1;
}

function revert_rating() {
  rating_value.value = back_up_rating.value;
}

function set_rating(index) {
  rating_value.value = index + 1;
  back_up_rating.value = rating_value.value;
}
</script>
