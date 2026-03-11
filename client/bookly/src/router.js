import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import SignIn from './components/Sign-In.vue';
import SignUp from './components/Sign-Up.vue';
import Book from './components/Book.vue';
import BookList from './components/BookList.vue';
import ListDetails from './components/ListDetails.vue';
import MyReviews from './components/MyReviews.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import CategoryView from './components/CategoryView.vue';
import keycloak from './keycloak';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sign-in',
    name: 'Sign-In',
    component: SignIn,
  },
  {
    path: '/sign-up',
    name: 'Sign-Up',
    component: SignUp,
  },
  {
    path: '/book/:id',
    name: 'Book',
    component: Book,
  },
  {
    path: '/book-list',
    name: 'BookList',
    component: BookList,
    meta: { requiresAuth: true },
  },
  {
    path: '/list/:id',
    name: 'ListDetails',
    component: ListDetails,
    meta: { requiresAuth: true },
  },
  {
    path: '/my-reviews',
    name: 'MyReviews',
    component: MyReviews,
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: ShoppingCart,
    meta: { requiresAuth: true },
  },
  {
    path: '/category/:category',
    name: 'CategoryView',
    component: CategoryView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !keycloak.authenticated) {
    keycloak.login({ redirectUri: window.location.origin + to.fullPath });
    return false;
  }
});

export default router;
