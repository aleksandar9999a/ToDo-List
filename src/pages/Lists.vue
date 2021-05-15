<template>
  <div class="row items-center justify-evenly">
    <div class="col-11">
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
            <div class="row items-center">
              {{ item.name }}
            </div>

            <div class="q-ml-md row items-center">
              <q-badge color="negative">
                {{ item.items.filter(x => x.state !== 'done').length }} <q-icon name="close" color="white" class="q-ml-xs" />
              </q-badge>
            </div>

            <div class="q-mx-md row items-center">
              <q-badge color="positive">
                {{ item.items.filter(x => x.state === 'done').length }} <q-icon name="check" color="white" class="q-ml-xs" />
              </q-badge>
            </div>
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
      <q-card class="app-item-card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{ item.id ? 'Edit List' : 'New List' }}
          </div>

          <q-space />

          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="item.name"
            label="List name *"
            type="text"
            required
          />
        </q-card-section>

        <q-card-section style="max-height: 280px; overflow: auto;">
          <q-list bordered separator>
            <q-item
              v-for="item in item.items"
              :key="item.id"
              clickable
              v-ripple
            >
              <div class="q-py-xs">
                <q-item-label>{{ item.text }}</q-item-label>

                <q-item-label caption>{{ item.state === 'done' ? 'Done' : 'Not Done' }}</q-item-label>
              </div>

              <q-space />

              <q-btn
                v-if="item.state === 'done'"
                round
                color="negative"
                class="q-ml-md"
                icon="close"
                @click="setTodoState(item, 'notDone')"
              />

              <q-btn
                v-else
                round
                color="positive"
                class="q-ml-md"
                icon="check"
                @click="setTodoState(item, 'done')"
              />

              <q-btn
                round
                color="negative"
                class="q-ml-md"
                icon="delete"
                @click="handleDeleteTodo(item)"
              />
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-section>
          <q-input filled bottom-slots v-model="text" label="New Todo" class="q-mt-sm">
            <template v-slot:after>
              <q-btn round dense flat icon="send" @click="handleAddTodo" />
            </template>
          </q-input>
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
import { IList, INewList, ITodoItem } from 'src/intefaces';

// Plugins
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  name: 'Lists',
  setup() {
    const lists = ref<IList[]>([]);
    const isOpen = ref<boolean>(false);
    const text = ref<string>('');

    const item = ref<IList | INewList>({ name: '', items: [] });

    function loadItems () {
      listService
        .getAll()
        .then(items => {
          lists.value = items as IList[];
        })
    }

    function handleClick (list: IList) {
      item.value = list;
      isOpen.value = true
    }

    function handleDelete (item: IList) {
      return listService.delete(item.id)
        .then(() => {
          lists.value = lists.value.filter(({ id }) => id !== item.id);
        })
    }

    function handleAddList () {
      item.value = { name: '', items: [] };
      isOpen.value = true;
    }

    function handleSave () {
      if (item.value.id) {
        return update(item.value as IList);
      }

      return create(item.value as INewList);
    }

    function update (list: IList) {
      return listService.update(list.id, { name: list.name, items: list.items })
        .then(() => {
          lists.value = lists.value.map(x => {
            return list.id === x.id
              ? list
              : x
          });

          item.value = { name: '', items: [] };
          isOpen.value = false;
        })
    }

    function create (list: INewList) {
      return listService.create(list)
        .then(list => {
          if (!list) {
            return;
          }

          lists.value = [(list as IList), ...lists.value];
          isOpen.value = false;
          item.value = { name: '', items: [] }
        })
    }

    function handleAddTodo () {
      if (text.value.length <= 0) {
        return;
      }

      item.value = {
        ...item.value,
        items: [
          { id: uuidv4(), text: text.value, state: 'notDone' },
          ...item.value.items
        ]
      }

      text.value = ''
    }

    function setTodoState (todo: ITodoItem, state: 'done' | 'notDone') {
      item.value.items = item.value.items.map(x => {
        if (x.id === todo.id) {
          x.state = state;
        }

        return x;
      })
    }

    function handleDeleteTodo (todo: ITodoItem) {
      item.value.items = item.value.items.filter(val => val.id !== todo.id);
    }

    onMounted(() => {
      loadItems();
    })

    return { item, text, lists, isOpen, loadItems, handleClick, handleAddList, handleSave, handleDelete, handleDeleteTodo, handleAddTodo, setTodoState };
  }
});
</script>
