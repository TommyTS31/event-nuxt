<template>
  <div v-if="event">
    <NavigationTopBar />
    <!-- TODO User guard, if registered or is creator, don't join -->
    <div class="flex justify-center content-center mt-8">
      <div class="w-full max-w-7xl p-4 bg-white border-gray-200 sm:p-6 md:p-8 font-sans">
        <div class="w-full h-80 overflow-hidden">
          <img src="../../assets/images/homepage1.jpg" alt="" />
        </div>
        <div class="flex flex-row mt-6 md:justify-between h-3/4 max-md:flex-col">
          <div class="w-4/5 mr-6 max-md:w-full">
            <h1 class="text-5xl font-semibold">{{ event.title }}</h1>
            <p class="text-gray-300 text-md pt-2">
              Event by: {{ event.creator.first_name }} {{ event.creator.last_name }}
            </p>
            <div class="my-3">
              <span
                id="badge-dismiss-default"
                class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-400 bg-gray-100 rounded"
                v-for="tag in event.tags"
              >
                {{ tag.name }}
              </span>
            </div>
            <FormSectionSeparate />
            <p class="my-4 text-justify">
              {{ event.description }}
            </p>
          </div>
          <!-- Extra Data Card + Attend Button -->

          <div
            class="w-1/5 p-4 bg-white shadow border-gray-200 sm:p-6 md:p-4 font-sans flex flex-col justify-between max-md:w-full"
          >
            <dl class="max-w-md text-black divide-y divide-gray-200">
              <div class="flex flex-col pb-3">
                <dt class="mb-1 text-gray-500 md:text-lg font-semibold">Date</dt>
                <dd class="text-lg font-semibold">{{ event.date }}</dd>
              </div>
              <div class="flex flex-col py-3">
                <dt class="mb-1 text-gray-500 md:text-lg font-semibold">Time</dt>
                <dd class="text-lg font-semibold">
                  {{ event.time }}
                </dd>
              </div>
              <div class="flex flex-col pt-3 max-md:mb-3">
                <dt class="mb-1 text-gray-500 md:text-lg font-semibold">Location</dt>
                <dd class="text-md font-semibold">{{ event.location }}</dd>
              </div>
            </dl>
            <FormSubmitButton
              buttonText="Join Event"
              type="secondary"
              @click="joinEvent"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const id = useRoute().params;
const cookie = useCookie("access_token", { httpOnly: true });
const { data: response } = await useFetch("http://localhost:5000/events/find", {
  method: "POST",
  body: { id: parseInt(id.id) },
});
const event = response.value;
async function joinEvent() {
  const { data: response } = await useFetch(
    "http://localhost:5000/events/register_user",
    {
      method: "POST",
      headers: { authorization: "Bearer " + cookie.value },
      body: { event_id: parseInt(id.id) },
    }
  );
  console.log(response.value);
}
</script>
