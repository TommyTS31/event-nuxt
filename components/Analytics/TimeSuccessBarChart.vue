<template>
  <div>
    <div class="w-1/4">
      <label class="block py-3 text-lg font-semibold text-black">Choose a Time</label>
      <div class="relative mb-6">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <input
          type="time"
          class="bg-gray-50 border border-gray-300 rounded text-gray-900 text-lg block w-full pl-10 p-2.5"
          v-model="time"
        />
      </div>
    </div>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" class="my-3" />
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "TimeSuccessBarChart",
  components: { Bar },
  async setup() {
    const config = useRuntimeConfig();
    const cookie = useCookie("access_token", { httpOnly: true });
    const time = ref("10:00");
    const data = ref();
    const { data: response } = await useFetch("/analytics/predict/time=" + time.value, {
      baseURL: config.public.baseURL,
      method: "GET",
      headers: { authorization: "Bearer " + cookie.value },
    });
    data.value = response.value;

    const chartData = computed(() => {
      return {
        labels: [
          "Monday",
          "Tuesdsay",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [{ data: data.value, label: "Success %" }],
      };
    });

    const chartOptions = reactive({
      backgroundColor: "rgba(38, 70, 83, 0.8)",
      // borderColor: "rgba(9, 176, 237, 0.7)",
      // borderWidth: 2,
      responsive: true,
      scales: {
        y: {
          suggestedMax: 100,
        },
      },
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 16,
            },
          },
        },
      },
    });

    watch(time, async (newTime) => {
      const { data: response } = await useFetch("/analytics/predict/time=" + newTime, {
        baseURL: config.public.baseURL,
        method: "GET",
        headers: { authorization: "Bearer " + cookie.value },
      });
      data.value = response.value;
    });

    return {
      time,
      chartData,
      chartOptions,
    };
  },
};
</script>
