<template>
  <div>
    <Pie :options="chartOptions" :data="chartData" class="my-3" />
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "AvailabilityPreferencePieChart",
  components: { Pie },
  props: {
    type: String,
  },
  async setup(props) {
    const config = useRuntimeConfig();
    const cookie = useCookie("access_token", { httpOnly: true });
    const data = ref();

    const { data: response } = await useFetch(
      "/analytics/preference/availability",
      {
        baseURL: config.baseURL,
        method: "GET",
        headers: { authorization: "Bearer " + cookie.value },
      }
    );
    data.value = response.value;

    const parsedObj = Object.entries(data.value).reduce((acc, [key, value]) => {
      acc[key] = parseInt(value, 10);
      return acc;
    }, {});

    const chartData = computed(() => {
      if (props.type === "day") {
        return {
          labels: ["Morning", "Afternoon", "Evening"],
          datasets: [
            {
              backgroundColor: ["#28536B", "#FFB703", "#8ecae6"],
              data: [
                parsedObj.morning_count,
                parsedObj.afternoon_count,
                parsedObj.evening_count,
              ],
            },
          ],
        };
      } else {
        return {
          labels: ["Weekend", "Weekday"],
          datasets: [
            {
              backgroundColor: ["#219ebc", "#588157"],
              data: [parsedObj.weekend_count, parsedObj.weekday_count],
            },
          ],
        };
      }
    });

    const chartOptions = reactive({
      responsive: true,
    });

    return {
      chartData,
      chartOptions,
    };
  },
};
</script>
