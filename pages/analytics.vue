<template>
  <div>
    <NavigationSideBar />
    <div class="flex justify-center mt-16">
      <div class="w-1/2 flex flex-col justify-center">
        <h5 class="text-6xl font-semibold text-gray-500">
          Date and Time Model Predictor
        </h5>
        <FormSectionSeparate />
        <div class="mx-2 my-2">
          <FormSectionHeading
            heading="Success Ratio Per Day"
            note="This is the predicted success of an event by our model based on a specific time of day (Note: The success ratio predicted are just experimental value since there are several factors that have been left out)"
          />
          <AnalyticsTimeSuccessBarChart />
        </div>
        <div class="mx-2">
          <FormSectionHeading
            heading="Success Ratio Per Time"
            note="This is the predicted success of an event by our model based on a specific date (Note: At the moment, we only consider the day of the week so the year and month are not relevant to making predicitons)"
          />
          <AnalyticsDateSuccessLineChart />
        </div>
        <h5 class="text-6xl font-semibold text-gray-500 pt-16">
          Preference Analytics
        </h5>
        <FormSectionSeparate />
        <div class="flex my-2">
          <div class="mx-2">
            <FormSectionHeading
              heading="Availabiltiy Per Day"
              note="This is the predicted success of an event by our model based on a specific date (Note: At the moment, we only consider the day of the week so the year and month are not relevant to making predicitons)"
            />
            <AnalyticsAvailabilityPreferencePieChart type="week" />
          </div>
          <div class="mx-2">
            <FormSectionHeading
              heading="Availability Per Week"
              note="This is the predicted success of an event by our model based on a specific date (Note: At the moment, we only consider the day of the week so the year and month are not relevant to making predicitons)"
            />
            <AnalyticsAvailabilityPreferencePieChart type="day" />
          </div>
        </div>
        <div class="mx-2">
          <FormSectionHeading
            heading="User Preferences"
            note="This is the predicted success of an event by our model based on a specific date (Note: At the moment, we only consider the day of the week so the year and month are not relevant to making predicitons)"
          />
          <AnalyticsTagPreferenceBarChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script script>
import { ref, computed } from "vue";
</script>
