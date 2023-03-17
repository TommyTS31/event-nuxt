<template>
  <div>
    <p class="text-xl">When are you usually available:</p>
    <p v-if="!inputVal" class="text-rose-600 font-semibold text-sm">
      *Choose at least one of the week and day options
    </p>
    <div class="flex space-x-8">
      <div>
        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            class="w-4 h-4 text-secondary bg-gray-100 border-gray-600 rounded focus:ring-secondary focus:ring-1"
          />
          <label class="ml-2 text-2xl font-semibold text-black">Morning</label>
        </div>
        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            class="w-4 h-4 text-secondary bg-gray-100 border-gray-600 rounded focus:ring-secondary focus:ring-1"
          />
          <label class="ml-2 text-2xl font-semibold text-black">Afternoon</label>
        </div>
        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            class="w-4 h-4 text-secondary bg-gray-100 border-gray-600 rounded focus:ring-secondary focus:ring-1"
          />
          <label class="ml-2 text-2xl font-semibold text-black">Evening</label>
        </div>
      </div>
      <FormSectionVerticalSeparate />
      <div>
        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            class="w-4 h-4 text-secondary bg-gray-100 border-gray-600 rounded focus:ring-secondary focus:ring-1"
          />
          <label class="ml-2 text-2xl font-semibold text-black">Week-ends</label>
        </div>
        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            class="w-4 h-4 text-secondary bg-gray-100 border-gray-600 rounded focus:ring-secondary focus:ring-1"
          />
          <label class="ml-2 text-2xl font-semibold text-black">Week-days</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const prop = defineProps({ inputVal: { default: false, type: Boolean } });

watch(
  () => prop.inputVal,
  async () => {
    console.log("change");
  }
);
</script>
