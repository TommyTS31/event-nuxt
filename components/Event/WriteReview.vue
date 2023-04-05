<template>
  <div class="flex justify-center content-center my-6" v-if="!existing_review">
    <div class="w-full max-w-7xl bg-white border-gray-200 font-sans">
      <p class="text-gray-400 text-md pt-2">Have you attended this event?</p>
      <h1 class="text-4xl font-semibold">Rate and Write a review</h1>
      <EventRating @rating-value="(n) => (score = n)" />
      <textarea
        class="bg-gray-50 border border-gray-300 text-black text-lg block w-full p-2.5 my-2"
        v-model="content"
        placeholder="(Optional) Write your overall thoughts of this events: Venue, Hospitality, Organization, etc."
        :disabled="!user_verification"
      ></textarea>
      <div class="align-right">
        <FormSubmitButton
          buttonText="Submit Review"
          class="w-1/6"
          @click="submitReview"
          v-if="user_verification"
        />
        <FormSubmitButton
          buttonText="Sign in to review"
          disabled
          class="w-1/6"
          v-else
        />
      </div>
    </div>
  </div>
  <div class="mb-8" v-else>
    <h1 class="text-4xl font-semibold pb-2">Your Review</h1>
    <div class="border bg-gray-50 shadow rounded p-3">
      <article>
        <div class="flex items-center mb-4 space-x-4">
          <div class="space-y-1 font-semibold dark:text-white text-xl">
            <p>
              {{ existing_review.user.first_name }}
              {{ existing_review.user.last_name }}
              <!-- TODO Reset data, date created field -->
              <time
                datetime="2014-08-16 19:00"
                class="block text-sm text-gray-500 dark:text-gray-400"
                >Joined on
                {{
                  parseDateToStringJoinDate(existing_review.user.date_created)
                }}</time
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
            {{ existing_review.score }} / 5
          </p>
        </div>
        <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Reviewed on
            <time :datetime="existing_review.date_created">{{
              parseDateToStringReviewDate(existing_review.date_created)
            }}</time>
          </p>
        </footer>
        <div class="text-lg">
          <p class="mb-2 text-gray-600">
            {{ existing_review.content }}
          </p>
        </div>
        <div class="mt-4 text-gray-400">
          <button class="hover:underline mr-2">Delete</button>
          <button class="hover:underline ml-2">View Profile</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { is_user_logged_in } from "~~/middleware/auth.global";
const cookie = useCookie("access_token", { httpOnly: true });
const id = useRoute().params.id;
const config = useRuntimeConfig();
const user_verification = await is_user_logged_in();
const score = ref(1);
const content = ref("");
const props = defineProps({ event_id: { type: Number } });
const existing_review = ref();

onMounted(async () => {
  if (user_verification) {
    const { data: response } = await useFetch(
      "/events/review/event=" + id + "/user=" + user_verification.user.id,
      {
        baseURL: config.baseURL,
        method: "GET",
        headers: { api_key: config.api_key },
      }
    );
    existing_review.value = response.value;
  }
});

async function submitReview() {
  const { data: response } = await useFetch(
    "/events/review/event=" + String(props.event_id),
    {
      baseURL: config.public.baseURL,
      method: "POST",
      headers: { authorization: "Bearer " + cookie.value },
      body: { score: score.value, content: content.value },
    }
  );
}

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
