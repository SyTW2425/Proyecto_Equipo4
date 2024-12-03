import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'; // Vista principal
import SignIn from './components/Sign-In.vue';
import SignUp from './components/Sign-Up.vue';
import Book from './components/Book.vue';
import BookList from './components/BookList.vue';

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
    path: '/book/:id',
    name: 'Book',
    component: Book
  },
  {
    path: '/book-list',
    name: 'BookList',
    component: BookList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;