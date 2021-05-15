<template>
  <div>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
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

      <div class="text-center">
        <q-btn label="Login" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
// Vue
import { defineComponent, ref } from 'vue';

// Router
import { useRouter } from 'vue-router'

// Services
import userService from './../services/user.service'

export default defineComponent({
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    function onSubmit (e: any) {
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
