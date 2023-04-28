<template>
  <div class="flex flex-col min-h-screen">
    <NavigationTopBar />
    <div class="h-64 bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center">
      <div class="translate-y-32 w-3/4">
        <img
          src="../assets/images/blank-profile.webp"
          class="h-64 rounded-full border-4 border-white shadow"
        />
        <div class="flex text-gray-300 pt-1">
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
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          Loughborough, United Kingdom
        </div>
        <h5 class="text-4xl font-semibold my-3">Tommy Tam</h5>
      </div>
    </div>
    <div class="h-56"></div>
    <FormSectionSeparate />
    <div class="flex justify-center mt-6 mb-16">
      <div class="w-3/4">
        <ProfileSignedEvents />
      </div>
    </div>

    <HomeFooter />
  </div>
</template>
