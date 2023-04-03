<template>
  <div>
    <NavigationSideBar />
    <div class="flex justify-center content-center">
      <div class="flex justify-center content-center mt-16 flex-col w-7/12">
        <!-- Data Cards -->
        <!-- normal=blue, danger=red, good=green, warning=yellow, notif=purple -->
        <div class="flex space-x-4" v-if="dashboardStats">
          <DashboardDataCard
            dataType="Total"
            :computedData="dashboardStats.all"
            iconType="good"
          />
          <DashboardDataCard
            dataType="Active"
            :computedData="dashboardStats.current"
            iconType="normal"
          />
          <DashboardDataCard
            dataType="Expired"
            :computedData="dashboardStats.expired"
            iconType="danger"
          />
          <DashboardDataCard
            dataType="Participants"
            :computedData="dashboardStats.attendees"
            iconType="warning"
          />
        </div>
        <div class="mt-16">
          <FormSectionHeading
            heading="Your Meetings"
            note="These are the events you have created"
          />
          <DashboardEventTable />
          <FormSectionHeading
            heading="Your Attendees"
            note="These are the users that have registered to join your events"
          />
          <DashboardAttendeeTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
const config = useRuntimeConfig();
const dashboardStats = ref();
const cookie = useCookie("access_token", { httpOnly: true });
useHead({
  title: "OnEvent | Dashboard",
});

onMounted(async () => {
  const { data: response } = await useFetch("/analytics/dashboard_statistics", {
    baseURL: config.baseURL,
    method: "GET",
    headers: { authorization: "Bearer " + cookie.value },
  });
  dashboardStats.value = response.value;
});
</script>
