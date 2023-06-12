import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import CoursesList from '../views/courses/CoursesListView.vue'
import CoursesDetails from '../views/courses/CoursesDetailView.vue'

import CoursesEdit from '../views/courses/CoursesEditView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }

  ,
  {
    path: '/courses',
    name: 'CourseList',
    component: CoursesList
  }

  ,

  {
    path: '/courses/:id',
    name: 'CoursesDetails',
    component: CoursesDetails

  }
  ,

  {
    path: '/courses/:id/edit',
    name: 'CoursesEdit',
    component: CoursesEdit

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
