import {createRouter, createWebHistory} from 'vue-router';
import photoApp from '../views/photo-app.vue';
import photoEdit from '../views/photo-edit.vue';
import userPage from '../views/user-page.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: photoApp,
    },
    {
      path: '/edit/:photoId?', //can also be add photo , soo we put '?' after the photoId
      component: photoEdit,
    },
    {
      path: '/user',
      component: userPage,
    },
  ],
});

export default router;
