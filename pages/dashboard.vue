<template>
  <div>
    <NavigationSideBar />
    <div class="flex justify-center content-center">
      <div class="flex justify-center content-center mt-16 flex-col w-7/12">
        <!-- Data Cards -->
        <!-- normal=blue, danger=red, good=green, warning=yellow, notif=purple -->
        <div class="flex space-x-4">
          <DashboardDataCard dataType="Total" computedData="14" iconType="good" />
          <DashboardDataCard dataType="Active" computedData="2" iconType="normal" />
          <DashboardDataCard dataType="Expired" computedData="12" iconType="danger" />
          <DashboardDataCard
            dataType="Participants"
            computedData="56"
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

<script setup></script>
