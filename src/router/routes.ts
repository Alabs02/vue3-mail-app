import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'AppLayout',
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'IndexPage',
        component: () => {},
        meta: {
          requiresAuth: false
        },
        beforeEnter(to, from) {
          return { name: 'InboxPage' };
        }
      },
      {
        path: '/inbox',
        name: 'InboxPage',
        component: () =>
          import(/* webpackChunkName: "mainRoute" */ '@/pages/InboxPage.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/archive',
        name: 'ArchivePage',
        component: () =>
          import(/* webpackChunkName: "mainRoute" */ '@/pages/ArchivePage.vue'),
        meta: {
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFoundPage',
    component: () =>
      import(
        /* webpackChunkName: "ErrorRoute" */ '@/pages/NotFoundPage.vue'
      )
  }
];
