<template>
  <div
    class="w-full max-w-sm p-4 bg-white border border-gray-200 shadow sm:p-6 md:p-8 font-sans"
  >
    <form class="space-y-6">
      <h5 class="text-xl font-medium text-black">Sign in</h5>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-black">Email</label>
        <input
          type="email"
          name="email"
          v-model="user.email"
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
          v-model="user.password"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-black text-sm block w-full p-2.5"
          required
        />
      </div>
      <button
        type="button"
        v-on:click="show"
        class="w-full text-white bg-secondary hover:bg-secondarylight focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center"
      >
        Create an account
      </button>
      <div class="text-sm font-medium text-gray-500">
        Already have an account?
        <a href="/login" class="text-primary hover:underline">Sign in</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async show() {
      console.log(this.user.email);
      const { data: response } = await useFetch("http://localhost:5000/auth/login", {
        credentials: "include",
        method: "POST",
        body: { user: this.user },
      });
      console.log(response.value);
    },
  },
};
</script>
