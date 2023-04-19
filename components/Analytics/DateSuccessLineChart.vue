<template>
  <div>
    <div class="w-1/4">
      <label class="block py-3 text-lg font-semibold text-black"
        >Choose a Date</label
      >
      <div class="relative mb-6">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        ></div>
        <input
          type="date"
          class="bg-gray-50 border border-gray-300 rounded text-gray-900 text-lg block w-full p-2.5"
          v-model="date"
        />
      </div>
    </div>
    <Line :options="chartOptions" :data="chartData" class="my-3" />
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "DateSuccessLineChart",
  components: { Line },
  async setup() {
    const config = useRuntimeConfig();
    const cookie = useCookie("access_token", { httpOnly: true });
    const date = ref("2023-04-10");
    const data = ref();
    const { data: response } = await useFetch(
      "/analytics/predict/date=2023-04-10",
      {
        baseURL: config.baseURL,
        method: "GET",
        headers: { authorization: "Bearer " + cookie.value },
      }
    );
    data.value = response.value;
    const chartData = computed(() => {
      return {
        labels: [
          "05:00",
          "05:30",
          "06:00",
          "06:30",
          "07:00",
          "07:30",
          "08:00",
          "08:30",
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
          "12:30",
          "13:00",
          "13:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
          "17:00",
          "17:30",
          "18:00",
          "18:30",
          "19:00",
          "19:30",
          "20:00",
          "20:30",
          "21:00",
          "21:30",
          "22:00",
          "22:30",
          "23:00",
          "23:30",
          "00:00",
        ],
        datasets: [{ data: data.value, label: "Success %" }],
      };
    });

    const chartOptions = reactive({
      backgroundColor: "rgba(38, 70, 83, 0.7)",
      borderColor: "rgba(38, 70, 83, 0.8)",
      borderWidth: 2,
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

    watch(date, async (newDate) => {
      const { data: response } = await useFetch(
        "/analytics/predict/date=" + newDate,
        {
          baseURL: config.baseURL,
          method: "GET",
          headers: { authorization: "Bearer " + cookie.value },
        }
      );
      data.value = response.value;
    });

    return {
      date,
      chartData,
      chartOptions,
    };
  },
};
</script>
