<template>
  <div>
    <NavigationSideBar />
    <div class="flex justify-center content-center mt-16">
      <div
        class="w-full max-w-5xl p-4 bg-white border border-gray-200 shadow sm:p-6 md:p-8 font-sans"
      >
        <form class="space-y-6">
          <h5 class="text-2xl font-regular text-black">Create a new event</h5>
          <FormInputBox
            label="Title"
            placeholder="New Event"
            inputType="text"
            v-model="event.title"
          />
          <FormInputBox
            label="Description"
            placeholder="Description for the new event"
            inputType="multi-text"
            v-model="event.description"
          />
          <div class="">
            <label class="block mb-2 text-xl font-regular text-black"
              >When does this event take place?</label
            >
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
          <div>
            <FormInputBox
              label="Where does this event take place?"
              placeholder="E.g. 32 Ashby Road, Loughborough, LE11 2PA"
              inputType="text"
              v-model="event.location"
            />
          </div>
          <FormSubmitButton buttonText="Create Event" v-on:click="show" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        title: "",
        description: "",
        date: "",
        time: "",
      },
    };
  },
  methods: {
    async show() {
      console.log(this.event.title);
      const { data: response } = await useFetch("http://localhost:5000/events/create", {
        method: "POST",
        body: { event: this.event },
      });
      console.log(response.value);
    },
  },
};
</script>
