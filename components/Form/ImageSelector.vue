<template>
  <div class="container">
    <button
      class="text-center bg-gray-300 shadow p-2.5 w-full font-semibold text-gray-600"
      @click="openCloseHandler"
    >
      <div class="flex justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>

        <div class="flex">
          <p>Select an Image as Cover</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-6 h-6 transition duration-300"
          :class="{ 'rotate-90': openDropdown }"
        >
          <path
            fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </button>
    <div class="flex flex-wrap border" v-if="openDropdown">
      <div class="flex w-1/5 flex-wrap" v-for="n in 12">
        <div class="w-full p-3">
          <img
            v-if="imageIndex != n - 1"
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center cursor-pointer shadow hover:shadow-xl hover:scale-105 transition"
            :src="images[n - 1]"
            @click="selectImage(n - 1)"
          />
          <img
            v-else
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center cursor-pointer shadow-xl border-blue-400 border-4"
            :src="images[n - 1]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import img1 from "~/assets/images/cover/1.jpg";
import img2 from "~/assets/images/cover/2.jpg";
import img3 from "~/assets/images/cover/3.jpg";
import img4 from "~/assets/images/cover/4.jpg";
import img5 from "~/assets/images/cover/5.jpg";
import img6 from "~/assets/images/cover/6.jpg";
import img7 from "~/assets/images/cover/7.jpg";
import img8 from "~/assets/images/cover/8.jpg";
import img9 from "~/assets/images/cover/9.jpg";
import img10 from "~/assets/images/cover/10.jpg";
import img11 from "~/assets/images/cover/11.jpg";
import img12 from "~/assets/images/cover/12.jpg";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];

const emit = defineEmits(["sendIndex"]);

const imageIndex = ref(-1);
const openDropdown = ref(false);

function selectImage(n) {
  imageIndex.value = n;
  emit("sendIndex", imageIndex.value);
}

function openCloseHandler() {
  if (openDropdown.value === false) {
    openDropdown.value = true;
  } else {
    openDropdown.value = false;
  }
}
</script>
