<template>
  <div>
    <label class="block mb-2 ext-sm font-medium text-black">{{ label }}</label>
    <textarea
      type="text"
      placeholder="Example description for the event"
      class="bg-gray-50 border border-gray-300 text-black text-sm block w-full p-2.5"
      required
      v-if="inputType === 'multi-text'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <input
      :type="inputType"
      name="title"
      class="bg-gray-50 border border-gray-300 text-black text-md block w-full p-2.5"
      :placeholder="placeholder"
      v-else
      required
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: ["modelValue", "placeholder", "label", "inputType"],
  emits: ["update:modelValue"],
};
</script>
