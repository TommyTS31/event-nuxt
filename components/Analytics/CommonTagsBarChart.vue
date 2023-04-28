<template>
  <div v-if="data">
    <Bar :options="chartOptions" :data="chartData" class="my-3" />
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

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "CommonTagsBarChart",
  components: { Bar },
  async setup() {
    const config = useRuntimeConfig();
    const cookie = useCookie("access_token", { httpOnly: true });
    const data = ref({});

    const { data: response } = await useFetch("/analytics/commontags", {
      baseURL: config.public.baseURL,
      method: "GET",
      headers: { authorization: "Bearer " + cookie.value },
    });
    data.value = response.value;

    const chartData = computed(() => {
      return {
        labels: data.value.names,
        datasets: [{ data: data.value.count, label: "No. Occurences" }],
      };
    });

    const chartOptions = reactive({
      backgroundColor: "rgba(230, 162, 46, 0.8)",
      responsive: true,
      scales: {
        y: {
          suggestedMax: data.value.count[0] + 0.5,
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
    return {
      data,
      chartData,
      chartOptions,
    };
  },
};
</script>
