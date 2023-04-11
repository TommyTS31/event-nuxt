<template>
  <div>
    <label class="block py-3 text-md font-semibold text-black">{{
      label
    }}</label>
    <div v-if="inputType === 'multi-text'">
      <textarea
        type="text"
        placeholder="Example description for the event"
        class="bg-gray-50 border border-gray-300 text-black text-sm block w-full p-2.5"
        required
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <p v-if="wordLimit" class="text-right text-xs text-gray-300">
        {{ wordCount }}/{{ wordLimit }}
      </p>
    </div>
    <div v-else>
      <input
        :type="inputType"
        name="title"
        class="bg-gray-50 border border-gray-300 text-black text-md block w-full p-2.5"
        :placeholder="placeholder"
        required
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <p v-if="wordLimit" class="text-right text-xs text-gray-300">
        {{ wordCount }}/{{ wordLimit }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modelValue", "placeholder", "label", "inputType", "wordLimit"],
  emits: ["update:modelValue"],
  computed: {
    wordCount() {
      return this.modelValue.length;
    },
  },
};
</script>
