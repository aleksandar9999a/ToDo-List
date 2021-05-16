<template>
  <div class="text-center">
    <logo />

    <q-form
      @submit="onSubmit"
      class="q-gutter-md q-mt-md"
    >
      <q-input
        filled
        v-model="email"
        label="Your email *"
        type="email"
        autocomplete="email"
        required
      />

      <q-input
        filled
        type="password"
        v-model="password"
        autocomplete="current-password"
        required
      />

      <q-btn label="Login" type="submit" color="primary" class="q-mr-sm"/>

      <p>
        Not a member yet? Click <router-link class="text-positive" to="/register">here</router-link> to register!
      </p>
    </q-form>
  </div>
</template>

<script lang="ts">
// Vue
import { defineComponent, ref } from 'vue';

// Components
import Logo from 'src/components/Logo.vue';

// Router
import { useRouter } from 'vue-router'

// Services
import userService from './../services/user.service'

export default defineComponent({
  name: 'Login',
  components: {
    Logo
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    function onSubmit (e: Event) {
      e.preventDefault();

      return userService.login(email.value, password.value)
        .then(() => {
          router.push('/')
        })
    }

    return {
      email,
      password,
      onSubmit
    };
  }
});
</script>
