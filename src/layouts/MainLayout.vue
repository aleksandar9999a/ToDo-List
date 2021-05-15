<template>
  <q-layout view="lHh Lpr lFf" class="bg-light">
    <div class="row flex-center q-py-lg no-padding-sm">
      <div class="col-12 col-md-5 q-py-lg no-padding-sm">
        <q-card class="app-card">
          <q-card-section class="text-center q-pt-xs q-pb-none">
            <h1 class="text-h4">Todo App</h1>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="app-card__content">
            <router-view />

            <q-fab color="secondary" icon="keyboard_arrow_up" class="absolute-bottom-right q-px-md" style="margin-bottom: 60px;" direction="up">
              <q-fab-action color="negative" icon="delete" />

              <q-fab-action color="positive" icon="add" />
            </q-fab>
          </q-card-section>

          <q-card-actions class="absolute-bottom row items-center q-pa-none justify-center bg-indigo">
            <q-tabs v-model="tab" class="text-white" no-caps inline-label>
              <q-tab name="user" icon="person" label="Profile" />

              <q-tab name="todos" icon="check" label="Todos" />

              <q-tab name="lists" icon="movie" label="Lists" />
            </q-tabs>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup () {
    const tab = ref('user')

    return { tab }
  }
})
</script>
