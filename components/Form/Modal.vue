<template>
  <div
    class="fixed flex justify-center content-center place-content-center inset-y-0 w-full p-4 md:inset-0 md:h-full bg-gray-200 bg-opacity-50"
  >
    <div class="relative w-full h-full max-w-2xl md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            @click="$emit('closeModal')"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {{ description }}
          </p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 justify-end"
        >
          <button
            type="button"
            @click="$emit('closeModal')"
            class="text-gray-500 bg-white hover:bg-gray-100 rounded-sm border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-gray-900"
          >
            {{ secondary }}
          </button>
          <button
            type="button"
            @click="$emit('accept')"
            v-if="type === 'info'"
            class="text-white bg-secondary hover:bg-secondarylight font-semibold rounded-sm text-sm px-5 py-2.5 text-center"
          >
            {{ primary }}
          </button>
          <button
            type="button"
            v-if="type === 'danger'"
            @click="$emit('accept')"
            class="text-white bg-red-600 hover:bg-red-800 font-semibold rounded-sm text-sm px-5 py-2.5 text-center"
          >
            {{ primary }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { checkCompatEnabled } from "@vue/compiler-core";
import { ref, watch } from "vue";

const props = defineProps({
  type: { default: "info", type: String },
  primary: { default: "Accept", type: String },
  secondary: { default: "Close", type: String },
  title: { default: "Confirm", type: String },
  description: {
    default: "Are you sure you want oto continue with this action?",
    type: String,
  },
});

// TODO Improve documentation of component
// MODAL GUIDE
// Use v-if to open
// Accepting and closing: @accept , @close-modal
</script>
