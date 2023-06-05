<template>
  <div class="border border-gray-300 rounded-md py-6 px-5 my-6">
    <div class="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-10 w-10 bg-primary-100 text-primary-600 rounded-lg p-1"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <div class="mt-1 ml-3 text-2xl font-semibold">Optimal Settings</div>
    </div>
    <div class="p-2 my-3 border border-red-200 rounded flex bg-red-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-red-700 self-center"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <p class="w-11/12 pl-2 text-sm">
        Disclaimer: The optimal settings provided by this experimental feature are based
        on certain assumptions and may not always be accurate or appropriate for every
        event. Users should exercise caution and use their own judgement when applying
        these settings.
      </p>
    </div>
    <div>
      <h5 class="mt-2 text-xl font-semibold">Recommended Tags</h5>
      <p v-if="title.length > 1 && foundTags.length > 0" class="text-lg">
        Based on the title you have written, we recommend that you add the following tags
        help people identify your event:
      </p>
      <p v-if="title.length < 1" class="text-lg">
        Please enter a suitable title so that we can give you suggestions
      </p>
      <p
        v-if="title.length > 1 && foundTags.length === 0 && updatedTags.length === 0"
        class="text-lg"
      >
        Sorry but we couldn't extract any (more) tags from your title that are present in
        our system. Please use the search function to find suitable tags.
      </p>
      <div class="my-3">
        <span
          id="badge-dismiss-default"
          class="inline-flex items-center px-2 py-1 mr-2 text-md font-medium text-blue-800 bg-blue-100 rounded"
          v-for="tag in foundTags"
        >
          {{ tag }}
          <button
            type="button"
            @click="addTag(tag)"
            class="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-4 text-blue-800"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </span>
        <span
          class="inline-flex items-center px-2 py-1 mr-2 text-md font-medium text-gray-600 bg-gray-200 rounded"
          v-if="foundTags.length === 0"
        >
          No more tags found
        </span>
      </div>
      <div class="mb-6">
        <h5 class="mt-2 text-xl font-semibold">Date & Time Recommendation</h5>
        <div v-if="!predicted_ratio">
          <p class="text-lg">
            Please enter a date and time so that we can provide predicitons
          </p>
        </div>
        <div v-else>
          <p class="text-lg">Our models have predicted an attendance rate of:</p>
          <div class="flex">
            <p class="text-4xl font-bold text-primary-400">
              {{ Math.round(predicted_ratio["0"] * 100) }}%
            </p>
            <p class="text-2xl pl-2 pt-1.5">
              for a {{ parseCreatedDate(date) }} at {{ formatTime(time) }}
            </p>
          </div>
          <p class="text-md text-red-600">
            *This prediction only takes into account date and time, and no other
            contextual information.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const config = useRuntimeConfig();
const props = defineProps({
  date: String,
  time: String,
  title: String,
  currentTags: Array,
});
const emit = defineEmits(["updateTags"]);
const foundTags = ref([]);
const chosenTags = ref([]);
const updatedTags = ref([]);

const predicted_ratio = ref(0);

function addTag(tag) {
  const index = foundTags.value.indexOf(tag);
  foundTags.value.splice(index, 1);
  chosenTags.value.push(tag);
  emit("updateTags", chosenTags.value);
}

const { data: title_tags } = await useFetch("/assistant/titletags", {
  baseURL: config.public.baseURL,
  method: "POST",
  body: {
    title: props.title,
  },
});
foundTags.value = title_tags.value;

const { data: predict_response } = await useFetch("/assistant/date_time", {
  baseURL: config.public.baseURL,
  method: "POST",
  body: {
    date: props.date,
    time: props.time,
  },
});
predicted_ratio.value = predict_response.value;

// Watch Prop Change to recalculate success ratio
watch(
  () => [props.date, props.time],
  async () => {
    if (!props.date || !props.time) {
    } else {
      const { data: response } = await useFetch("/assistant/date_time", {
        baseURL: config.public.baseURL,
        method: "POST",
        body: {
          date: props.date,
          time: props.time,
        },
      });
      predicted_ratio.value = response.value;
    }
  }
);

// Watch title changew to suggest new titles.
watch(
  () => [props.title],
  async () => {
    if (!props.title) {
    } else {
      const { data: response } = await useFetch("/assistant/titletags", {
        baseURL: config.public.baseURL,
        method: "POST",
        body: {
          title: props.title,
        },
      });
      foundTags.value = response.value;
    }
  }
);

watch(
  () => [props.currentTags],
  () => {
    updatedTags.value = props.currentTags;
    chosenTags.value = [];
  }
);

function formatTime(time) {
  const parts = time.split(":");
  return parts[0] + ":" + parts[1];
}

function parseCreatedDate(date) {
  const toParse = new Date(date);
  return toParse.toLocaleDateString("en-UK", {
    weekday: "long",
  });
}
</script>
