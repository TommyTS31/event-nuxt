<template>
  <div>
    <NavigationTopBar />
    <div class="flex justify-center content-center mt-16">
      <div class="w-full max-w-5xl p-4 bg-white sm:p-6 md:p-8 font-sans space-y-6">
        <h5 class="text-5xl font-semibold text-primary">Preferences</h5>
        <FormSectionHeading
          heading="Let us know what your preferences are!"
          note="Here you can choose what type of events you will attend and your average vailability so that we are able to find events more suited to your lifestyle!"
        />
        <!-- TODO Add max three categories -->
        <FormTagPreferences :displayOption="false" />
        <FormSectionSeparate />
        <FormAvailabilityCheck :inputVal="checkAv" :is-valid="checkIt" />
        <button
          class="bg-secondary text-white p-3 w-full rounded-xs"
          @click="checkAndSubmit"
        >
          Set Preferences
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const checkAv = ref(false);
function checkAndSubmit() {
  checkAv.value = true;
}
function checkIt(e) {
  console.log(e);
}
</script>
