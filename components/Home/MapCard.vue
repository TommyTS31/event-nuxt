<template>
  <client-only>
    <div>
      <div class="flex justify-center">
        <div class="flex pb-2">
          <div class="flex space-x-10 divide-x-2 shadow rounded p-1.5 w-fit px-5">
            <div>
              <h5 class="text-md font-bold text-gray-400">City</h5>
              <input
                class="text-lg p-1 rounded border"
                placeholder="Loughborough"
                v-model="locationQuery"
              />
            </div>
            <div class="pl-6 pr-3">
              <h5 class="text-md font-bold text-gray-400">Events</h5>
              <p class="text-lg">Showing {{ eventCount }} Events</p>
            </div>
          </div>
          <button
            class="bg-gray-200 px-6 font-semibold rounded shadow"
            @click="setLocation"
          >
            <div>Search</div>
          </button>
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin fill-secondary self-center ml-3"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            v-if="loadingStatus"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
      <div id="map" ref="mapElement" style="width: 1400px; height: 750px"></div>
    </div>
  </client-only>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import { ref, onMounted } from "vue";
// import L from "leaflet";

const config = useRuntimeConfig();
const mapElement = ref(null);
const locationQuery = ref("");
const loadingStatus = ref(false);
const eventCount = ref(0);
let map;

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css",
    },
  ],
});

onMounted(async () => {
  const { data: response } = await useFetch(
    "https://nominatim.openstreetmap.org/?addressdetails=1&q=Leicester&format=json&limit=1",
    {
      method: "GET",
    }
  );
  const { lat, lon } = response.value[0];
  map = L.map(mapElement.value).setView([Number(lat), Number(lon)], 16);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
});

async function setLocation() {
  loadingStatus.value = true;
  const { data: location } = await useFetch(
    "https://nominatim.openstreetmap.org/?addressdetails=1&q=" +
      locationQuery.value +
      "&format=json&limit=1",
    {
      method: "GET",
    }
  );
  const { lat, lon } = location.value[0];
  map.flyTo([Number(lat), Number(lon)], 14);
  const { data: events } = await useFetch("/events/location=" + locationQuery.value, {
    baseURL: config.public.baseURL,
    method: "GET",
    headers: { api_key: config.public.api_key },
  });
  const eventMarkerArray = [];
  for (const event of events.value) {
    const { data: marker } = await useFetch(
      "https://nominatim.openstreetmap.org/?addressdetails=1&q=" +
        event.location +
        "&format=json&limit=1",
      {
        method: "GET",
      }
    );
    if (marker.value[0]) {
      const { lat, lon } = marker.value[0];
      const eventMarker = L.marker([Number(lat), Number(lon)]).bindPopup(
        "<p class='font-semibold text-lg'>" +
          event.title +
          "</p><p class='font-semibold text-sm text-gray-400'>" +
          event.location +
          "</p><a href='/event/" +
          event.id +
          "'><div><button class='bg-secondary py-2 px-3 rounded shadow text-lg font-semibold text-white hover:bg-secondarylight'>View event</button></div></a>"
      );
      eventMarkerArray.push(eventMarker);
    } else {
      continue;
    }
  }
  eventCount.value = eventMarkerArray.length - 1;
  const eventMarkerLayer = L.layerGroup(eventMarkerArray);
  map.removeLayer(eventMarkerLayer);
  eventMarkerLayer.addTo(map);
  loadingStatus.value = false;
}
</script>

<style></style>
