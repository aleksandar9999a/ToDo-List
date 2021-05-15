<template>
  <div class="row items-center justify-evenly">
    <q-fab color="secondary" icon="keyboard_arrow_up" class="absolute-bottom-right q-px-md" style="margin-bottom: 60px;" direction="up">
      <q-fab-action color="negative" icon="delete" />

      <q-fab-action color="positive" icon="add" />
    </q-fab>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'List',
  setup() {
    return {};
  }
});
</script>
