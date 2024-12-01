<template>
  <div>
    <!-- BARRA SUPERIOR -->
    <div class="bg-emerald-600 text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full shadow-md z-50">
      <div class="flex items-center space-x-4">
        <img src="../assets/logo.png" alt="Logo" class="h-10 w-10 rounded-full">
        <span class="text-xl font-semibold">Bookly</span>
      </div>
  
      <!-- BARRA DE BÚSQUEDA -->
      <div class="flex items-center bg-white text-black rounded-full px-4 py-2 w-1/3">
        <input type="text" placeholder="Buscar..." class="flex-grow bg-transparent outline-none px-2">
        <button class="text-emerald-600 hover:text-emerald-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zm-7 4a7 7 0 1114 0 7 7 0 01-14 0zm14.707 6.293a1 1 0 00-1.414 0l-2.83 2.829a1 1 0 001.415 1.415l2.83-2.829a1 1 0 000-1.415z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>    
      
      <nav>
        <ul>
          <li><router-link to="/sign-in">Sign In</router-link></li>
        </ul>
      </nav> 
    </div>
  
    <!-- BARRA IZQUIERDA -->
    <div class="bg-emerald-600 w-64 h-screen fixed top-0 left-0 text-white flex flex-col justify-between">
      <!-- Contenido superior -->
      <div class="mt-8 p-16">
        <h2 class="text-lg font-bold underline">CATEGORÍAS</h2>
        <ul class="mt-4 space-y-4">
          <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
            <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Libros de autoayuda</a>
          </li>
          <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
            <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Libros infantiles</a>
          </li>
          <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
            <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Fantasía</a>
          </li>
          <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
            <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Historia</a>
          </li>
          <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
            <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Libros prácticos</a>
          </li>
          <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
            <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Literatura</a>
          </li>
          <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
            <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Novedades</a>
          </li>
        </ul>
      </div>
  
      <!-- Contenido inferior -->
      <div class="p-4 flex justify-center">
        <p class="text-sm">© 2024 Mi Web</p>
      </div>
    </div>
  
    <!-- PANTALLA CENTRAL -->
    <div class="ml-64 mt-[17vh] px-8 flex flex-col items-center">
      <!-- Contenedor de Libros -->
      <div class="grid grid-cols-3 gap-8 mt-8">
        <!-- Itera sobre los libros obtenidos -->
        <div
          v-for="book in books"
          :key="book._id"
          class="flex items-center space-x-4 bg-white p-4 shadow-lg rounded-lg"
        >
          <!-- Imagen del libro -->
          <img
            :src="book.image"
            :alt="book.title"
            class="w-[100px] h-[150px] object-cover rounded-lg"
          />
          <!-- Información del libro -->
          <div>
            <h3 class="text-xl font-semibold text-blue-800">{{ book.title }}</h3>
            <p class="text-sm text-gray-700">{{ book.author }}</p>
            <p class="text-sm font-bold text-gray-800">{{ book.price.toFixed(2) }}€</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      books: [], // Lista de libros desde la base de datos
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get("http://localhost:3000/books");
        this.books = response.data; // Asigna los libros al array 'books'
      } catch (error) {
        console.error("Error al obtener los libros:", error.response || error.message);
      }
    },
  },
  async mounted() {
    this.fetchBooks(); // Obtiene los libros al cargar el componente
    const response = await axios.get('http://localhost:3000/user', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    console.log(response.data);
  },
  // async created() {

  // },
};
</script>
