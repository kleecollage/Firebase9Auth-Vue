<template>
  <div v-if="isAuthenticated">
    <h1>PROFILE</h1>
    <pre>{{ user }}</pre>
  </div>
</template>

<script setup>
import { auth } from '@/firebase';
import { useAuth } from '@vueuse/firebase';

const { user, isAuthenticated } = useAuth(auth)
</script>