<template>
  <div class="border border-gray-300 rounded-md p-5">
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
    <!-- <div class="mt-3">
      <button
        class="bg-red-500 p-1 rounded shadow text-white text-sm"
        @click="disclaimer = true"
      >
        <div class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-white self-center"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <p class="pt-0.5 pl-0.5">Disclaimer</p>
        </div>
      </button>
    </div> -->
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
        Disclaimer: The optimal settings provided by this experimental feature
        are based on certain assumptions and may not always be accurate or
        appropriate for every event. Users should exercise caution and use their
        own judgement when applying these settings.
      </p>
    </div>
    <div>
      <h5 class="mt-1 text-xl font-semibold">Title Recommendation</h5>
      <p>
        Your title
        <b>Chess GM Meetup for Beginners and Advanced individuals</b> is longer
        than the average event title. Make sure to mention main related tags in
        your title
      </p>
      <h5 class="mt-1 text-xl font-semibold">Date & Time Recommendation</h5>
      <p>
        For
        <b>Monday 17:00</b> our model predicts a <b>78%</b> success rate. This
        is very good, however some options could be to move the event to a lter
        time. <b>18:00</b> for a potential <b>86%</b> success rate.
      </p>
      {{ date }}
      {{ time }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const config = useRuntimeConfig();
const props = defineProps({ date: String, time: String });

watch(
  () => [props.date, props.time],
  async () => {
    if (!props.date || !props.time) {
    } else {
      const { data: response } = await useFetch("/assistant/modeltest", {
        baseURL: config.baseURL,
        method: "POST",
        body: {
          date: props.date,
          time: props.time,
        },
      });
      console.log(response.value);
    }
  }
);
</script>
