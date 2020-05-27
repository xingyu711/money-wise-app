import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/signin', component: '@/pages/signin' },
    { path: '/register', component: '@/pages/register' },
    { path: '/transactions', component: '@/pages/transactions' },
    { path: '/reports', component: '@/pages/reports' },
    { path: '/settings', component: '@/pages/settings' },
    { path: '/contactus', component: '@/pages/contactus'}
  ],
  theme: {
    "primary-color": "#846267"
  },
});
