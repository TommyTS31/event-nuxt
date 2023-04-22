<template>
  <div class="flex flex-col min-h-screen">
    <NavigationTopBar />
    <div class="flex justify-center content-center mt-16">
      <div
        class="w-full max-w-5xl p-4 bg-white sm:p-6 md:p-8 font-sans space-y-6"
      >
        <FormModal
          v-if="openModal"
          @close-modal="openModal = false"
          @accept="checkAndSubmit"
          title="Set Preferences"
          description="Are you sure you want to set these preferences, you can change these later on and we will use these to give you more personalised event recommendations."
        />
        <h5 class="text-5xl font-semibold text-primary-400">Preferences</h5>
        <FormSectionHeading
          heading="Let us know what your preferences are!"
          note="Here you can choose what type of events you will attend and your average vailability so that we are able to find events more suited to your lifestyle!"
        />
        <!-- TODO Add max three categories -->
        <FormTagPreferences
          :displayOption="false"
          @selected-change="setSelectedTags"
        />
        <p v-if="!tagValid" class="text-rose-600 font-semibold text-sm">
          *Choose at least one of the week and day options
        </p>
        <FormSectionSeparate />
        <FormAvailabilityCheck
          :inputVal="checkAv"
          @is-valid="(e) => checkAvailability(e)"
          @set-selected="setSelectedAvailability"
        />
        <button
          class="bg-secondary text-white p-3 w-full rounded-xs"
          @click="openModalOnSubmit"
        >
          Set Preferences
        </button>
      </div>
    </div>
    <HomeFooter />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const config = useRuntimeConfig();
const checkAv = ref(false);
const openModal = ref(false);
const availabilityValid = ref(false);
const tagValid = ref(true);
const availability = ref();
const tags = ref([]);

useHead({
  title: "OnEvent | Preferences",
});

async function checkAndSubmit() {
  if (tags.value.length < 3) {
    tagValid.value = false;
  } else if (availabilityValid === false) {
    return;
  } else {
    const cookie = useCookie("access_token", { httpOnly: true });
    try {
      const { data: response } = await useFetch("/auth/preferences", {
        baseURL: config.baseURL,
        method: "POST",
        headers: { authorization: "Bearer " + cookie.value },
        body: {
          tags: tags.value,
          availability: availability.value,
        },
      });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }
}

function openModalOnSubmit() {
  openModal.value = true;
}

function setSelectedTags(e) {
  tags.value = e;
}

function setSelectedAvailability(e) {
  availability.value = e;
}

function checkAvailability(e) {
  availabilityValid.value = e;
}
</script>
