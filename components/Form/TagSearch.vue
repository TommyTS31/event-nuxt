<template>
  <div>
    <div>
      <label class="block mb-2 font-regular">Add tags that describe your event</label>
      <input
        type="text"
        name="title"
        v-model="tagSearch"
        class="bg-gray-50 border border-gray-300 text-black text-md block w-full p-2.5"
        placeholder="E.g. Videogames"
        autocomplete="off"
        required
        @input="openList"
      />
    </div>
    <div class="relative" v-if="displayList" @focusout="clickOutside" tabindex="0">
      <ul class="divide-y bg-gray-50 border border-gray-300 absolute w-full shadow">
        <li
          class="hover:bg-gray-100 p-2 text-sm"
          v-for="tag in availableTags"
          v-on:click="addTag(tag.name)"
        >
          {{ tag.name }}
          <span
            v-if="selectedTags.includes(tag.name)"
            id="badge-dismiss-default"
            class="inline-flex items-center px-1 py-1 ml-2 text-xs font-medium text-blue-800 bg-blue-200 rounded"
            >Added!</span
          >
        </li>
      </ul>
    </div>
    <div class="border border-gray-300 p-3">
      <span
        v-if="selectedTags.length === 0"
        id="badge-dismiss-default"
        class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-600 bg-gray-200 rounded"
        >No tags have been selected</span
      >
      <span
        id="badge-dismiss-default"
        class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded"
        v-for="tag in selectedTags"
        v-else
      >
        {{ tag }}
        <button
          type="button"
          class="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200"
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
</template>

<script>
const config = useRuntimeConfig();
export default {
  props: ["displayOption"],
  data() {
    return {
      tagSearch: "",
      availableTags: [], // Fetched from database in this component
      displayList: false,
      selectedTags: [],
    };
  },
  methods: {
    addTag(tag) {
      if (!this.selectedTags.includes(tag)) {
        this.selectedTags.push(tag);
        this.displayList = false;
        this.tagSearch = "";
        this.$emit("selectedChange", this.selectedTags);
      }
    },
    removeTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      this.selectedTags.splice(index, 1);
      this.$emit("selectedChange", this.selectedTags);
    },
    // Opening and closing the autocomplete
    async openList() {
      this.displayList = true;
      const { data: response } = await useFetch("/tags/search", {
        baseURL: config.baseURL,
        method: "POST",
        body: { search: this.tagSearch },
      });
      this.availableTags = response.value;
      if (!this.tagSearch) {
        this.displayList = false;
        this.availableTags = [];
      }
    },
    clickOutside() {
      this.displayList = false;
    },
  },
  computed: {
    async findTags() {
      const { data: response } = await useFetch("/tags/search", {
        baseURL: config.baseURL,
        method: "POST",
        body: { search: this.tagSearch },
      });
      const tags = response.value;
      return tags;
    },
  },
};
</script>
