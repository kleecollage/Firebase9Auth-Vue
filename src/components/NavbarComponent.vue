<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        FIREBASE - {{ userName }}
      </router-link>
      <div>
        <button class="btn btn-info" @click="signIn" v-if="!isAuthenticated">Access</button>
        <button class="btn btn-danger" @click="signOut" v-else>Exit</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useUser } from '@/composables/useUser';
import { auth } from '@/firebase';
import { useAuth } from '@vueuse/firebase';
import { computed } from 'vue';
// CONSTANTS
const { signIn, signOut } = useUser();
const { isAuthenticated, user } = useAuth(auth)
// COMPUTED
const userName = computed(() => {
  return isAuthenticated.value ? user.value.displayName : 'no Auth'
})
// METHODS
</script>