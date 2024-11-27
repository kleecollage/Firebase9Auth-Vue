<template>
  <LoadingComponent v-if="loading" />
  <div v-else>
    <NavbarComponent />
    <div class="container my-4">
      <router-view/>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import LoadingComponent from './components/LoadingComponent.vue';
import NavbarComponent from './components/NavbarComponent.vue';
import { getCurrentUser } from './firebase';

const loading = ref(false)

onMounted( async() => {
  loading.value = true
  await getCurrentUser()
  loading.value = false
})

</script>