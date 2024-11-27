<template>
  <div class="card shadow-sm mb-2">
    <div class="card-body">
      <p :class="{'text-decoration-line-through' : todo.state}"  class="m-0">{{ todo.text }}</p>
      <div class="mt-2">
        <button
          @click="onFinish(todo)"
          :disabled="block"
          class="btn"
          :class="todo.state ? 'btn-warning' : 'btn-success'"
        >
          {{ todo.state ? 'Pending' : 'Finish' }}</button>

        <button @click="remove(todo.id)" :disabled="block" class="btn btn-danger mx-2">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDb } from '@/composables/useDb';
import { inject, ref } from 'vue';
// eslint-disable-next-line no-undef
defineProps({
  todo: Object,
})

const { deleteTodo, finishTodo } = useDb();
const error = inject('error');
const todos = inject('todos');
const block = ref(false)

const onFinish = async(todo) => {
  block.value = true
  const response = await finishTodo(todo)
  if (response.res) {
    error.value = response.error
    block.value = false

    return
  }

  todos.value = todos.value.map(item => (
    item.id === todo.id ? {...item, state: !todo.state} : item
  ))

  block.value = false
}

const remove = async (id) => {
  block.value = true
  const response = await deleteTodo(id)
  if (response.res) {
    error.value = response.error

    return
  }

  todos.value = todos.value.filter((item) => item.id !== id)
  block.value = false
}
</script>