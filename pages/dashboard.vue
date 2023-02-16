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
  </div>
</template>

<script></script>
