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

      <q-btn label="Register" type="submit" color="primary" class="q-mr-sm"/>

      <p>
        Are you a member? Click <router-link class="text-positive" to="/login">here</router-link> to login!
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
import { useRouter } from 'vue-router';

// Services
import userService from './../services/user.service';

export default defineComponent({
  name: 'Register',
  components: {
    Logo
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    function onSubmit (e: any) {
      e.preventDefault();

      return userService.create({ email: email.value, password: password.value })
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
