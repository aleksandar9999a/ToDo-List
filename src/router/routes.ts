import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Lists.vue') },
      { path: '/list/:id', component: () => import('src/pages/List.vue') },
      { path: '/list', component: () => import('src/pages/List.vue') },
      { path: '/lists', component: () => import('pages/Lists.vue') },
      { path: '/profile', component: () => import('pages/Profile.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/register', component: () => import('pages/Register.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
