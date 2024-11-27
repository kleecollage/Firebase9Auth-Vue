<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        FIREBASE - {{ userName }}
      </router-link>
      <div>
        <div >
          <button v-if="!isAuthenticated" class="btn btn-info" @click="signIn">Access</button>
          <div v-else>
            <router-link to="/crud" class="btn btn-primary">CRUD</router-link>
            <router-link to="/profile" class="btn btn-primary mx-2">Profile</router-link>
            <button class="btn btn-danger" @click="signOut">Exit</button>
          </div>
        </div >
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