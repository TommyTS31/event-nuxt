<template>
  <div>
    <button
      class="text-center bg-gray-300 shadow p-2.5 w-full font-semibold text-gray-600"
      @click="openCloseHandler"
    >
      <div class="flex justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
          />
        </svg>

        <div class="flex">
          <p>Filter By Tags</p>
          <p
            class="ml-3 px-1.5 rounded bg-gray-400 text-gray-800"
            v-if="selectedTags.length > 0"
          >
            {{ selectedTags.length }}
          </p>
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
    <div class="bg-gray-100 h-96 transition shadow border" v-if="openDropdown">
      <div class="p-2">
        <div>
          <input
            v-model="tagSearch"
            class="bg-gray-50 border border-gray-300 text-black text-lg block w-full p-2.5"
            placeholder="E.g. Videogames"
            autocomplete="off"
            @input="openList"
          />
        </div>
        <div class="relative" v-if="displayList" @focusout="clickOutside" tabindex="0">
          <ul class="divide-y bg-gray-50 border border-gray-300 absolute w-full shadow">
            <li
              class="hover:bg-gray-100 p-2 text-md"
              v-for="tag in availableTags"
              v-on:click="addTag(tag.name)"
            >
              {{ tag.name }}
              <span
                v-if="selectedTags.includes(tag.name)"
                id="badge-dismiss-default"
                class="inline-flex items-center px-1 py-1 ml-2 text-sm font-medium text-blue-800 bg-blue-200 rounded"
                >Added!</span
              >
            </li>
          </ul>
        </div>
        <div class="pt-2">
          <span
            v-if="selectedTags.length === 0"
            id="badge-dismiss-default"
            class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-600 bg-gray-200 rounded"
            >Select tags to start filtering</span
          >
          <span
            id="badge-dismiss-default"
            class="inline-flex items-center px-2 py-1 mr-2 text-md font-medium text-blue-800 bg-blue-200 rounded"
            v-for="tag in selectedTags"
            v-else
          >
            {{ tag }}
            <button
              type="button"
              class="inline-flex items-center p-0.5 ml-2 text-md text-blue-400 bg-transparent rounded-sm hover:bg-blue-200"
              v-on:click="removeTag(tag)"
            >
              <svg
                aria-hidden="true"
                class="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["sendTags"]);

const openDropdown = ref(false);
const tagSearch = ref("");
const availableTags = ref([]);
const displayList = ref(false);
const selectedTags = ref([]);

function addTag(tag) {
  if (!selectedTags.value.includes(tag)) {
    selectedTags.value.push(tag);
    displayList.value = false;
    tagSearch.value = "";
    let parsedTags = JSON.parse(JSON.stringify(selectedTags.value)).join(",");
    emit("sendTags", parsedTags);
  }
}

function removeTag(tag) {
  const index = selectedTags.value.indexOf(tag);
  selectedTags.value.splice(index, 1);
  let parsedTags = JSON.parse(JSON.stringify(selectedTags.value)).join(",");
  emit("sendTags", parsedTags);
}
// Opening and closing the autocomplete
async function openList() {
  const config = useRuntimeConfig();
  displayList.value = true;
  const { data: response } = await useFetch("/tags/search", {
    baseURL: config.public.baseURL,
    method: "POST",
    body: { search: tagSearch },
  });
  availableTags.value = response.value;
  if (!tagSearch) {
    displayList.value = false;
    availableTags.value = [];
  }
}
function clickOutside() {
  displayList.value = false;
}

function openCloseHandler() {
  if (openDropdown.value === false) {
    openDropdown.value = true;
  } else {
    openDropdown.value = false;
  }
}
</script>
