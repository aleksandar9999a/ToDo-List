<template>
  <div class="row items-center justify-evenly">
    <div class="col-10">
      <div v-if="lists.length <= 0" class="text-center">
        <h6>No Lists</h6>
      </div>

      <q-list v-else bordered separator>
        <q-item
          v-for="item in lists"
          :key="item.id"
          clickable
          v-ripple
        >
          <div class="row items-center" @click="handleClick(item)">
            {{ item.name }}
          </div>

          <div class="q-ml-md row items-center">
            <q-badge color="negative" @click="handleClick(item, 'notDone')">
              {{ item.items.filter(x => x.state !== 'done').length }} <q-icon name="close" color="white" class="q-ml-xs" />
            </q-badge>
          </div>

          <div class="q-mx-md row items-center">
            <q-badge color="positive" @click="handleClick(item, 'done')">
              {{ item.items.filter(x => x.state === 'done').length }} <q-icon name="check" color="white" class="q-ml-xs" />
            </q-badge>
          </div>

          <q-space @click="handleClick(item)" />

          <q-btn
            round
            color="negative"
            class="q-ml-md"
            icon="delete"
            @click="handleDelete(item)"
          />
        </q-item>
      </q-list>
    </div>

    <div class="absolute-bottom-left q-pl-md" style="bottom: 60px;">
      <q-btn round color="primary" icon="refresh" size="lg" @click="loadItems" />
    </div>

    <div class="absolute-bottom-right q-pr-md" style="bottom: 60px;">
      <q-btn round color="primary" icon="add" size="lg" @click="handleAddList" />
    </div>

    <q-dialog v-model="isOpen">
      <q-card style="min-width: 400px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            New List
          </div>

          <q-space />

          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="name"
            label="List name *"
            type="text"
            required
          />
        </q-card-section>

        <q-card-actions class="row item-center justify-center">
          <q-btn color="negative" label="Cancel" v-close-popup />

          <q-btn color="positive" label="Save" @click="handleSave" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
// Vue
import { defineComponent, ref, onMounted } from 'vue';

// Services
import listService from 'src/services/list.service';

// Interfaces
import { IList } from 'src/intefaces';

export default defineComponent({
  name: 'Lists',
  setup() {
    const lists = ref<IList[]>([]);
    const name = ref<string>('');
    const isOpen = ref<boolean>(false);

    function loadItems () {
      listService
        .getAll()
        .then(items => {
          lists.value = items as IList[];
        })
    }

    function handleClick (item: IList, filter: 'all' | 'done' | 'notDone' = 'all') {
      console.debug(item);
      console.debug(filter);
    }

    function handleDelete (item: IList) {
      return listService.delete(item.id)
        .then(() => {
          lists.value = lists.value.filter(({ id }) => id !== item.id);
        })
    }

    function handleAddList () {
      isOpen.value = true;
    }

    function handleSave () {
      return listService.create({ name: name.value, items: [] })
        .then(item => {
          if (!item) {
            return;
          }

          name.value = '';
          lists.value = [(item as IList), ...lists.value];
          handleClick(item as IList);
          isOpen.value = false;
        })
    }

    onMounted(() => {
      loadItems();
    })

    return { name, lists, isOpen, loadItems, handleClick, handleAddList, handleSave, handleDelete };
  }
});
</script>
