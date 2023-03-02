<template>
  <div>
    <NavigationSideBar />
    <div class="flex justify-center content-center mt-16">
      <!-- Data Cards -->
      <!-- normal=blue, danger=red, good=green, warning=yellow, notif=purple -->
      <div class="flex">
        <DashboardDataCard dataType="Total" computedData="14" iconType="good" />
        <DashboardDataCard dataType="Active" computedData="2" iconType="normal" />
        <DashboardDataCard dataType="Expired" computedData="12" iconType="danger" />
        <DashboardDataCard dataType="Participants" computedData="56" iconType="warning" />
      </div>
    </div>
    <FormSubmitButton buttonText="Test" />
  </div>
</template>

<script>
export default {
  async mounted() {
    const cookie = useCookie("access_token", { httpOnly: true });
    console.log(cookie.value);
    const { data: response } = await useFetch("http://localhost:5000/events/test", {
      credentials: "include",
      headers: { authorization: "Bearer " + cookie.value },
      method: "POST",
      body: {},
    });
    console.log(response.value);
  },
};
</script>
