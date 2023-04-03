<template>
  <div>
    <NavigationSideBar />
    <div class="flex justify-center content-center mt-16">
      <div class="w-full max-w-5xl p-4 bg-white sm:p-6 md:p-8 font-sans">
        <form class="space-y-6">
          <FormModal
            v-if="displayModal"
            @accept="createEvent"
            @close-modal="displayModal = false"
            type="info"
          />
          <h5 class="text-5xl font-semibold text-primary">
            Create a new event
          </h5>
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
              />
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
          <div class="pb-10 pt-8">
            <FormSubmitButton buttonText="Create Event" @click="openModal" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const config = useRuntimeConfig();
export default {
  data() {
    return {
      event: {
        title: "",
        description: "",
        date: "",
        time: "",
      },
      tagSearch: "",
      dbTags: [],
      selectedTags: [],
      display: false,
      displayModal: false,
    };
  },
  methods: {
    async createEvent() {
      const cookie = useCookie("access_token", { httpOnly: true });
      const { data: response } = await useFetch("/events/", {
        baseURL: config.baseURL,
        method: "POST",
        headers: { authorization: "Bearer " + cookie.value },
        body: {
          event: JSON.stringify(this.event),
          selectedTags: JSON.stringify(this.selectedTags),
        },
      });
      this.$router.push("/dashboard");
    },

    openModal() {
      this.displayModal = true;
    },
    removeTag(tag) {
      const index = this.tags.indexOf(tag);
      this.tags.splice(index, 1);
    },
    addTag(tag) {
      this.tags.push(tag);
    },
    handleInput() {
      this.display = true;
    },
    clickedOutside() {
      this.display = false;
    },
    setSelected(s) {
      this.selectedTags = s;
    },
  },
};
</script>
