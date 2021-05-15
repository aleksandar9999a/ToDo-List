import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Lists.vue') },
      { path: '/list/:id', component: () => import('src/pages/List.vue') },
      { path: '/list', component: () => import('src/pages/List.vue') },
      { path: '/profile', component: () => import('pages/Profile.vue'), meta: { hideFab: true } },
      { path: '/login', component: () => import('pages/Login.vue'), meta: { hideToolbar: true, hideFab: true } },
      { path: '/register', component: () => import('pages/Register.vue'), meta: { hideToolbar: true, hideFab: true } },
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
