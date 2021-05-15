<template>
  <router-view />
</template>
<script lang="ts">
// Vue
import { defineComponent, onMounted, ref } from 'vue';

// Services
import userService from './services/user.service';

// Interfaces
import { IUser } from './intefaces';

export default defineComponent({
  name: 'App',
  setup () {
    onMounted(() => {
      const user = ref<null | IUser>(null);

      userService.getCurrentUser(u => {
        user.value = u;
      })

      return { user }
    })
  }
})
</script>
