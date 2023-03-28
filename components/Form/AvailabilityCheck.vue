<template>
  <div>
    <p class="text-xl">When are you usually available:</p>
    <p v-if="!valid" class="text-rose-600 font-semibold text-sm">
      *Choose at least one of the week and day options
    </p>
    <div class="flex space-x-8">
      <div>
        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            v-model="availability.is_morning"
            class="w-4 h-4 text-secondary bg-gray-100 border-gray-600 rounded focus:ring-secondary focus:ring-1"
          />
          <label class="ml-2 text-2xl font-semibold text-black">Morning</label>
        </div>
        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            v-model="availability.is_afternoon"
            class="w-4 h-4 text-secondary bg-gray-100 border-gray-600 rounded focus:ring-secondary focus:ring-1"
          />
          <label class="ml-2 text-2xl font-semibold text-black">Afternoon</label>
        </div>
        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            v-model="availability.is_evening"
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
            v-model="availability.is_weekend"
            class="w-4 h-4 text-secondary bg-gray-100 border-gray-600 rounded focus:ring-secondary focus:ring-1"
          />
          <label class="ml-2 text-2xl font-semibold text-black">Week-ends</label>
        </div>
        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            v-model="availability.is_weekday"
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
const emit = defineEmits(["isValid", "setSelected"]);
const valid = ref(true);
const availability = ref({
  is_weekend: false,
  is_weekday: false,
  is_morning: false,
  is_afternoon: false,
  is_evening: false,
});

watch(availability.value, () => {
  if (!availability.value.is_weekend && !availability.value.is_weekday) {
    valid.value = false;
    emit("isValid", false);
  } else if (
    !availability.value.is_morning &&
    !availability.value.is_afternoon &&
    !availability.value.is_evening
  ) {
    emit("isValid", false);
    valid.value = false;
  } else {
    emit("isValid", true);
    emit("setSelected", availability.value);
    valid.value = true;
  }
});
</script>
