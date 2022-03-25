import {createRouter, createWebHistory} from 'vue-router';
import projectApp from '../views/project-app.vue';
import projectEdit from '../views/project-edit.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/app',
      name: 'home',
      component: projectApp,
    },
    {
      path: '/edit/:projectId?', //can also be add project , soo we put '?' after the projectId
      component: projectEdit,
    },
  ],
});

export default router;
