<template>
  <div>
    <NavigationSideBar />
    <div class="flex justify-center mt-16">
      <div class="w-1/2 flex flex-col justify-center">
        <h5 class="text-6xl font-semibold text-gray-500">Your Events</h5>
        <FormSectionSeparate />
        <FormSectionHeading
          heading="Most Successful Tags"
          note="These are the most common tags that appeared in your most successful past events"
        />
        <AnalyticsRecentAttendeesBarChart />
        <FormSectionHeading
          heading="Most Successful Tags"
          note="These are the most common tags that appeared in your most successful past events"
        />
        <AnalyticsCommonTagsBarChart />
        <h5 class="text-6xl font-semibold text-gray-500 pt-16">
          Date and Time Model Predictor
        </h5>
        <FormSectionSeparate />
        <div class="mx-2 my-2">
          <FormSectionHeading
            heading="Attendance Rate Per Day"
            note="This is the predicted attendance rate of an event by our model based on a specific time of day (Note: The attendance rate predicted are just experimental value since there are several factors that have been left out)"
          />
          <AnalyticsTimeSuccessBarChart />
        </div>
        <div class="mx-2">
          <FormSectionHeading
            heading="Attendance Rate Per Time"
            note="This is the predicted attendance rate of an event by our model based on a specific date (Note: At the moment, we only consider the day of the week so the year and month are not relevant to making predicitons)"
          />
          <AnalyticsDateSuccessLineChart />
        </div>
        <h5 class="text-6xl font-semibold text-gray-500 pt-16">Preference Analytics</h5>
        <FormSectionSeparate />
        <div class="flex my-2">
          <div class="mx-2">
            <FormSectionHeading heading="Availabiltiy Per Day" />
            <AnalyticsAvailabilityPreferencePieChart type="week" />
          </div>
          <div class="mx-2">
            <FormSectionHeading heading="Availability Per Week" />
            <AnalyticsAvailabilityPreferencePieChart type="day" />
          </div>
        </div>
        <div class="mx-2">
          <FormSectionHeading heading="User Preferences" />
          <AnalyticsTagPreferenceBarChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script script>
import { ref, computed } from "vue";

useHead({
  title: "OnEvent | Analytics",
});
</script>
