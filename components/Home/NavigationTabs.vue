<template>
  <div
    class="pb-6 text-md font-semibold text-center text-gray-500 border-gray-200 flex justify-center"
  >
    <ul class="flex flex-wrap -mb-px">
      <li class="mr-2" v-if="currentPage === 0">
        <button
          class="inline-block p-4 text-primary-400 border-b-2 border-primary-400 rounded-t-lg"
        >
          Popular
        </button>
      </li>
      <li class="mr-2" v-else>
        <button
          class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-secondary"
          @click="
            $emit('eventOption', 0);
            currentPage = 0;
          "
        >
          Popular
        </button>
      </li>
      <li class="mr-2" v-if="currentPage === 1">
        <button
          class="inline-block p-4 text-primary-400 border-b-2 border-primary-400 rounded-t-lg"
        >
          Recommended
        </button>
      </li>
      <li class="mr-2" v-else>
        <button
          class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-secondary"
          @click="
            $emit('eventOption', 1);
            currentPage = 1;
          "
        >
          Recommended
        </button>
      </li>
      <li class="mr-2" v-if="currentPage === 2">
        <button
          class="inline-block p-4 text-primary-400 border-b-2 border-primary-400 rounded-t-lg"
        >
          Near me
        </button>
      </li>
      <li class="mr-2" v-else>
        <button
          class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-secondary"
          @click="
            $emit('eventOption', 2);
            currentPage = 2;
          "
        >
          Near me
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentPage = ref(0);
</script>
