<template>
  <q-layout view="lHh Lpr lFf" class="bg-amber-10">
    <div class="row flex-center items-center q-py-lg no-padding-sm">
      <div v-if="isLoading" class="col-12 col-md-3 row items-center" style="min-height: 100vh;">
        <q-card class="text-center col-12 row items-center justify-center" style="min-height: 80vh;">
          <q-spinner-cube color="orange" size="5.5em" />
        </q-card>
      </div>

      <div v-else class="col-12 col-md-5 q-py-lg no-padding-sm">
        <q-card class="app-card">
          <q-card-section class="text-center q-pt-xs q-pb-none">
            <h1 class="text-h4">Todo App</h1>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="app-card__content">
            <router-view />
          </q-card-section>

          <q-card-actions v-if="!meta.hideToolbar" class="absolute-bottom row items-center q-pa-none justify-center bg-indigo">
            <q-tabs v-model="tab" class="text-white" no-caps inline-label>
              <q-route-tab name="profile" icon="person" label="Profile" to="/profile" />

              <q-route-tab name="todos" icon="check" label="Todos" to="/list" />

              <q-route-tab name="lists" icon="movie" label="Lists" to="/" />
            </q-tabs>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>

<script lang="ts">
// Vue
import { defineComponent, ref, computed } from 'vue'

// Router
import { useRoute } from 'vue-router'

// Interfaces
import { IMeta } from 'src/components/models'

// Services
import userService from 'src/services/user.service';

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const route = useRoute();
    const tab = ref('profile');
    const isLoading = ref(userService.loading.value);

    userService.loading.subscribe(value => {
      isLoading.value = value;
    })

    const meta = computed(() => {
      return route.meta as IMeta
    })

    return {
      meta,
      tab,
    }
  }
})
</script>
