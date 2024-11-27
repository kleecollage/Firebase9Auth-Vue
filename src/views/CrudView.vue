<template>
  <div v-if="isAuthenticated">
    <h1>CRUD</h1>
    <LoadingComponent v-if="loading" />
    <div v-else>
      <ErrorComponent v-if="showError" />
      <TodoForm />
      <TodoComponent v-for="todo in todos" :key="todo.id" :todo="todo" />
      <p v-if="todos.length == 0">
        No things to do for now
      </p>
    </div>
  </div>
</template>

<script setup>
import ErrorComponent from '@/components/ErrorComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import TodoComponent from '@/components/TodoComponent.vue';
import TodoForm from '@/components/TodoForm.vue';
import { useDb } from '@/composables/useDb';
import { auth } from '@/firebase';
import { useAuth } from '@vueuse/firebase';
import { computed, onMounted, provide, ref } from 'vue';

const { isAuthenticated } = useAuth(auth);
const { getTodos, loading } = useDb();
const todos = ref([])
const error = ref(null)

provide('error', error)
provide('todos', todos)

const showError = computed( () => error.value ? true : false )

onMounted(async() => {
  todos.value = await getTodos()
  if (todos.value.res) {
    console.log(todos.value.error)
    error.value = todos.value.error
  }
})

</script>