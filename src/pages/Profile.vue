<template>
  <div class="row items-center justify-evenly">
    <q-btn color="negative" @click="logout" label="LogOut" />
  </div>
</template>

<script lang="ts">
// Vue
import { defineComponent } from 'vue';

// Router
import { useRouter } from 'vue-router'

// Services
import userService from 'src/services/user.service';

export default defineComponent({
  name: 'Profile',
  setup() {
    const router = useRouter();

    function logout () {
      userService
        .logout()
        .then(() => {
          router.push('/login');
        })
    }

    return { logout };
  }
});
</script>
