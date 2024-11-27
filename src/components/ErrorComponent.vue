<template>
  <div class="alert alert-warning" role="alert">
    <strong>Something went wrong: </strong>
    {{ error }}
    <button @click="error = null" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</template>

<script setup>
import { inject } from 'vue';
// CONSTANTS
const error = inject('error')
// METHODS //
</script>