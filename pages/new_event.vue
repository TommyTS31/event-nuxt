<template>
  <div>
    <NavigationSideBar />
    <div class="flex justify-center content-center mt-16">
      <div class="w-full max-w-5xl p-4 bg-white sm:p-6 md:p-8 font-sans">
        <FormModal
          v-if="displayModal"
          @accept="createEvent"
          @close-modal="displayModal = false"
          type="info"
        />

        <div class="flex justify-between">
          <h5 class="text-5xl font-semibold text-primary-400">Create a new event</h5>
          <div class="pb-10">
            <button
              @click="openCloseAssistant"
              class="w-full text-white bg-primary-400 font-semibold hover:bg-primarylight text-md px-5 py-2.5 text-center rounded-sm shadow hover:scale-105 transition"
            >
              <div class="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                  />
                </svg>

                <p class="pl-2">OnEvent Assistant</p>
              </div>
            </button>
          </div>
        </div>
        <FormAssistant
          v-if="displayAssistant"
          :date="event.date"
          :time="event.time"
          :title="event.title"
          :current-tags="selectedTags"
          @update-tags="updateAssistantTags"
        />
        <div class="space-y-6">
          <div>
            <FormSectionHeading
              heading="Basic Details"
              note="Add some basic details to your event that will make it easier to find"
            />
            <FormInputBox
              label="Title"
              placeholder="New Event"
              inputType="text"
              v-model="event.title"
              wordLimit="70"
            />
            <FormInputBox
              label="Description"
              placeholder="Description for the new event"
              inputType="multi-text"
              v-model="event.description"
              wordLimit="300"
            />
            <div class="mt-6">
              <FormTagSearch
                :displayOption="display"
                @selected-change="setSelected"
                :assistantTags="assistantTags"
              />
            </div>
            <div class="mt-6">
              <FormImageSelector @send-index="setImageIndex" />
            </div>
          </div>
          <FormSectionSeparate />
          <div>
            <FormSectionHeading
              heading="When?"
              note="Select the date and time in which the event will take place"
            />
            <div>
              <FormInputBox
                label="Date"
                placeholder=""
                inputType="date"
                v-model="event.date"
              />
              <FormInputBox
                label="Time"
                placeholder=""
                inputType="time"
                v-model="event.time"
              />
            </div>
          </div>
          <FormSectionSeparate />
          <div>
            <FormSectionHeading
              heading="Where?"
              note="Select the location in which the event takes place"
            />
            <FormInputBox
              label="Where does this event take place?"
              placeholder="E.g. 32 Ashby Road, Loughborough, LE11 2PA"
              inputType="text"
              v-model="event.location"
            />
          </div>
          <div class="pb-2 pt-8">
            <FormSubmitButton buttonText="Create Event" @click="openModal" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const config = useRuntimeConfig();
const router = useRouter();
const event = ref({
  title: "",
  description: "",
  date: "",
  time: "",
  image_id: "1",
});
const tagSearch = ref("");
const dbTags = ref([]);
const selectedTags = ref([]);
const display = ref(false);
const displayModal = ref(false);
const displayAssistant = ref(false);
const assistantTags = ref();

useHead({
  title: "OnEvent | New Event",
});

async function createEvent() {
  const cookie = useCookie("access_token", { httpOnly: true });
  const { data: response } = await useFetch("/events/", {
    baseURL: config.baseURL,
    method: "POST",
    headers: { authorization: "Bearer " + cookie.value },
    body: {
      event: JSON.stringify(event.value),
      selectedTags: JSON.stringify(selectedTags.value),
    },
  });
  router.push("/dashboard");
}

function openModal() {
  displayModal.value = true;
}

function setSelected(s) {
  selectedTags.value = s;
  assistantTags.value = [];
}

function setImageIndex(n) {
  event.value.image_id = String(n);
}

function updateAssistantTags(s) {
  assistantTags.value = s;
}

function openCloseAssistant() {
  if (displayAssistant.value === true) {
    displayAssistant.value = false;
  } else {
    displayAssistant.value = true;
  }
}
</script>
