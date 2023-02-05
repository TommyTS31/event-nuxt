<template>
  <div
    class="w-full max-w-sm p-4 bg-white border border-gray-200 shadow sm:p-6 md:p-8 font-sans"
  >
    <form class="space-y-6" action="#">
      <h5 class="text-xl font-medium text-black">Sign in</h5>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-black">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-black text-sm block w-full p-2.5"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-black"
          >Password</label
        >
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-black text-sm block w-full p-2.5"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full text-white bg-secondary hover:bg-secondarylight focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center"
      >
        Login to your account
      </button>
      <div class="text-sm font-medium text-gray-500">
        Not registered?
        <a href="/register" class="text-primary hover:underline">Create account</a>
      </div>
    </form>
  </div>
</template>

<script></script>
