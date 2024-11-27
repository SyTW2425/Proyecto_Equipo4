import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'; // Vista principal
import SignIn from './components/Sign-In.vue';
import SignUp from './components/Sign-Up.vue';
import Book from './components/Book.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home, // Página principal
  },
  {
    path: '/sign-in',
    name: 'Sign-In',
    component: SignIn, // Página del formulario
  },
  {
    path: '/sign-up',
    name: 'Sign-Up',
    component: SignUp
  },
  {
    path: '/book',
    name: 'Book',
    component: Book
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;