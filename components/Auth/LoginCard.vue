<template>
  <div
    class="w-full max-w-sm p-4 bg-white border border-gray-200 shadow sm:p-6 md:p-8 font-sans"
  >
    <form class="">
      <FormSectionHeading
        heading="Sign In"
        note="Enter your login details to be able to manage or partake in events"
      />
      <div class="mb-5">
        <div>
          <FormInputBox
            label="Email Address"
            placeholder="name@company.com"
            inputType="email"
            v-model="user.email"
          />
        </div>
        <div>
          <FormInputBox
            label="Password"
            placeholder="•••••••••••"
            inputType="password"
            v-model="user.password"
          />
        </div>
      </div>
      <div class="text-sm font-medium text-gray-400 my-3">
        Already have an account?
        <NuxtLink href="/register" class="text-secondary hover:underline"
          >Sign Up</NuxtLink
        >
      </div>
      <FormSubmitButton buttonText="Sign In" v-on:click="login" />
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
    async login() {
      const config = useRuntimeConfig();
      try {
        const { data: response } = await useFetch("/auth/login", {
          baseURL: config.baseURL,
          credentials: "include",
          method: "POST",
          body: { user: this.user },
        });
        console.log(response.value);
        const authCookie = useCookie("access_token");
        authCookie.value = response.value.token;
        this.$router.push("/dashboard");
      } catch (err) {}
    },
  },
};
</script>
