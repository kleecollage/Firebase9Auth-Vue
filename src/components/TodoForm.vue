<template>
  <form @submit.prevent="processForm">
    <input
      type="text"
      placeholder="Enter todo"
      class="form-control my-3"
      v-model.trim="text"
    >
  </form>
</template>

<script setup>
import { useDb } from '@/composables/useDb';
import { inject, ref } from 'vue';

const { addTodo } = useDb();
const text = ref('')
const todos = inject('todos')
const error = inject('error')

const processForm = async() => {
  if (!text.value.trim()) {
    console.log('Empty text')
    return;
  }
  const newTodo = await addTodo(text.value)

  if (newTodo.res) {
    error.value = newTodo.error
    text.value = ''

    return
  }

  todos.value = [...todos.value, newTodo]
  text.value = ''
}
</script>