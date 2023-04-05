<template>
  <div v-if="!findReviewIfExists">
    <h1 class="text-4xl font-semibold pb-2">All reviews</h1>
  </div>
  <div v-else>
    <h1 class="text-4xl font-semibold pb-2">Other reviews</h1>
  </div>

  <div v-if="reviews.length != 0">
    <div
      v-for="review in reviews"
      class="border bg-gray-50 shadow rounded p-3 my-3"
    >
      <article>
        <div class="flex items-center mb-4 space-x-4">
          <div class="space-y-1 font-semibold dark:text-white text-xl">
            <p>
              {{ review.user.first_name }} {{ review.user.last_name }}
              <!-- TODO Reset data, date created field -->
              <time
                datetime="2014-08-16 19:00"
                class="block text-sm text-gray-500 dark:text-gray-400"
                >Joined on
                {{ parseDateToStringJoinDate(review.user.date_created) }}</time
              >
            </p>
          </div>
        </div>
        <div class="flex items-center mb-1">
          <p
            class="bg-secondarylight text-white text-md font-semibold inline-flex items-center p-1.5 rounded"
          >
            <svg
              aria-hidden="true"
              class="w-5 text-white pt-0.5 pr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
            {{ review.score }} / 5
          </p>
        </div>
        <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Reviewed on
            <time :datetime="review.date_created">{{
              parseDateToStringReviewDate(review.date_created)
            }}</time>
          </p>
        </footer>
        <div class="text-lg">
          <p class="mb-2 text-gray-600">
            {{ review.content }}
          </p>
        </div>
      </article>
    </div>
  </div>
  <div v-else>
    <h5 class="text-5xl text-center p-14">No reviews posted</h5>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { is_user_logged_in } from "~~/middleware/auth.global";

const config = useRuntimeConfig();
const id = useRoute().params.id;
const user_verification = await is_user_logged_in();

const props = defineProps({ event_id: { type: Number } });
const emit = defineEmits(["reviewExists"]);

const reviews = ref([]);

function findReviewIfExists(user_id) {
  for (let i = 0; i < reviews.value.length; i++) {
    const review = reviews.value[i];
    console.log(review);
    console.log(user_verification.user.id);
    if (String(review.user_id) === String(user_id)) {
      reviews.value.splice(i, 1);
      console.log("pass");
      return true;
    }
  }
  return false;
}

onMounted(async () => {
  const { data: response } = await useFetch("/events/review/event=" + id, {
    baseURL: config.baseURL,
    method: "GET",
    headers: { api_key: config.api_key },
  });
  reviews.value = response.value;
  if (user_verification) {
    findReviewIfExists(user_verification.user.id);
  }
});

function parseDateToStringReviewDate(dateToParse) {
  const date = new Date(dateToParse);
  return date.toLocaleDateString("en-UK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function parseDateToStringJoinDate(dateToParse) {
  const date = new Date(dateToParse);
  return date.toLocaleDateString("en-UK", {
    year: "numeric",
    month: "long",
  });
}
</script>
