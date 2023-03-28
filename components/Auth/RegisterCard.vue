<template>
  <div
    class="w-full max-w-sm p-4 bg-white border border-gray-200 shadow sm:p-6 md:p-8 font-sans"
  >
    <FormSectionHeading
      heading="Sign Up"
      note="Enter your details to create an account"
    />
    <form>
      <div class="mb-5">
        <div>
          <FormInputBox
            label="First Name"
            placeholder="John"
            inputType="text"
            v-model="user.first_name"
          />
        </div>
        <div>
          <FormInputBox
            label="Last Name"
            placeholder="Doe"
            inputType="text"
            v-model="user.last_name"
          />
        </div>
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
        <div>
          <FormInputBox
            label="Confirm Password"
            placeholder="•••••••••••"
            inputType="password"
            v-model="user.password"
          />
        </div>
      </div>
      <div class="text-sm font-medium text-gray-400 my-3">
        Already have an account?
        <NuxtLink href="/login" class="text-secondary hover:underline">Sign In</NuxtLink>
      </div>
      <FormSubmitButton buttonText="Create an Account" v-on:click="register" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      const config = useRuntimeConfig();

      const { data: response } = await useFetch("/auth/register", {
        baseURL: config.baseURL,
        method: "POST",
        body: { user: this.user },
      });
      const authCookie = useCookie("access_token");
      authCookie.value = response.value.token;
      this.$router.push("/your_preferences");
    },
  },
};
</script>
