import { getCurrentUser } from '@/firebase'
import CrudView from '@/views/CrudView.vue'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/crud',
    name: 'crud',
    component: CrudView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( async(to, from, next) => {
  const requiresAuth = to.matched.some( record => record.meta.requiresAuth)
  if ( requiresAuth && !(await getCurrentUser()) ) {
    next('/')
  } else {
    next()
  }
})

export default router
