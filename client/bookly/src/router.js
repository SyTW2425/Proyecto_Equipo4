import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'; // Vista principal
import SignIn from './components/Sign-In.vue';
import SignUp from './components/Sign-Up.vue';
import Book from './components/Book.vue';
import BookList from './components/BookList.vue';
import ListDetails from './components/ListDetails.vue';
import MyReviews from './components/MyReviews.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import CategoryView from './components/CategoryView.vue';

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
  },
  {
    path: '/list/:id',
    name: 'ListDetails',
    component: ListDetails,
  },  
  {
    path: "/my-reviews",
    name: "MyReviews",
    component: MyReviews,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: ShoppingCart,
  },
  {
    path: "/category/:category",
    name: "CategoryView",
    component: CategoryView,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;