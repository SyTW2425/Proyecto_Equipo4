<template>
  <div>
    <!-- BARRA SUPERIOR -->
    <div class="bg-emerald-600 text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full shadow-md z-50">
      <div class="flex items-center space-x-4">
        <router-link to="/" class="flex items-center">
          <img src="../assets/logo.png" alt="Logo" class="h-10 w-10 rounded-full" />
          <span class="text-xl font-semibold ml-2">Bookly</span>
        </router-link>
      </div>

      <!-- BARRA DE BÚSQUEDA -->
      <div class="flex items-center bg-white text-black rounded-full px-4 py-2 w-1/3 justify-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar..."
          class="flex-grow bg-transparent outline-none px-2"
          @keyup.enter="searchBook"
        />
        <button @click="searchBook" class="text-emerald-600 hover:text-emerald-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zm-7 4a7 7 0 1114 0 7 7 0 01-14 0zm14.707 6.293a1 1 0 00-1.414 0l-2.83 2.829a1 1 0 001.415 1.415l2.83-2.829a1 1 0 000-1.415z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- MENÚ DEL USUARIO -->
      <nav>
        <ul>
          <li v-if="!user">
            <router-link to="/sign-in">Sign In</router-link>
          </li>
          <li v-else class="relative">
            <button
              @click="toggleMenu"
              class="flex items-center space-x-2 text-white focus:outline-none"
            >
              <span>{{ user.username }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Menú desplegable -->
            <div
              v-if="showMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <router-link
                to="/cart"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Carrito de Compra
              </router-link>
              <router-link
                to="/book-list"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Mis Listas
              </router-link>
              <router-link
                to="/my-reviews"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Mis Reseñas
              </router-link>
              <button
                @click="logout"
                class="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </div>

    <!-- BARRA IZQUIERDA -->
    <div class="bg-emerald-600 w-64 h-screen fixed top-0 left-0 text-white flex flex-col justify-between">
      <div class="mt-16 p-8">
        <h2 class="text-lg font-bold underline">Categorías</h2>
        <ul class="mt-4 space-y-4">
          <li
            v-for="category in categories"
            :key="category"
            class="transition-transform ease-in-out duration-300 hover:translate-x-2"
          >
            <router-link
              :to="`/category/${category}`"
              class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg"
            >
              {{ category }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- PANTALLA CENTRAL -->
    <div class="ml-64 pt-[70px] px-8">
      <!-- Encabezado de Categoría -->
      <h2 class="text-4xl font-bold text-gray-800 mt-4 mb-8 underline text-center">
        Categoría: {{ category }}
      </h2>

      <!-- Contenedor de Libros -->
      <div v-if="filteredBooks.length === 0" class="text-gray-600 text-center">
        <p>No hay libros disponibles en esta categoría.</p>
      </div>
      <div class="grid grid-cols-3 gap-8 mt-8">
        <div
          v-for="book in filteredBooks"
          :key="book._id"
          class="relative group bg-white p-4 shadow-lg rounded-lg"
        >
          <div class="relative w-[150px] h-[200px] mx-auto">
            <img
              :src="book.image"
              :alt="book.title"
              class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <!-- Opciones flotantes -->
            <div class="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <button
                @click="addToCart(book)"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Comprar
              </button>
              <router-link
                :to="`/book/${book._id}`"
                class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-center"
              >
                Ver Reseñas
              </router-link>
              <button
                @click="openListMenu(book._id)"
                class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Añadir a Lista
              </button>
            </div>
          </div>
          <div class="mt-4 text-center">
            <h3 class="text-xl font-semibold text-blue-800">{{ book.title }}</h3>
            <p class="text-sm text-gray-700">{{ book.author }}</p>
            <p class="text-sm font-bold text-gray-800">{{ book.price.toFixed(2) }}€</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para seleccionar lista -->
    <div v-if="showListMenu" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-[400px]">
        <h2 class="text-xl font-bold mb-4">Selecciona una lista</h2>
        <ul>
          <li
            v-for="list in lists"
            :key="list._id"
            class="border-b py-2 hover:bg-gray-100 cursor-pointer"
            @click="addBookToList(list._id)"
          >
            {{ list.title }}
          </li>
        </ul>
        <button
          @click="closeListMenu"
          class="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancelar
        </button>
      </div>
    </div>

    <!-- Notificación -->
    <div
      v-if="notification.message"
      :class="[
        'fixed bottom-4 right-4 p-4 rounded shadow-lg',
        notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
      ]"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["category"], // Categoría seleccionada
  data() {
    return {
      books: [],
      filteredBooks: [],
      categories: [
        "Manga",
        "Misterio",
        "Detectives",
        "Clásicos",
        "Drama",
        "Ciencia Ficción",
        "Romance",
        "Fantasía",
        "Juvenil",
        "Aventura",
      ],
      searchQuery: "",
      user: null,
      showMenu: false,
      showListMenu: false,
      selectedBookId: null,
      lists: [],
      notification: { message: "", type: "" },
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get("http://localhost:3000/books");
        this.books = response.data;
        this.filteredBooks = this.books.filter((book) =>
          book.categories.includes(this.category)
        );
      } catch (error) {
        console.error("Error al obtener los libros:", error.response || error.message);
      }
    },
    async fetchLists() {
      try {
        const response = await axios.get(`http://localhost:3000/lists/user/${this.user._id}`);
        this.lists = response.data;
      } catch (error) {
        console.error("Error al obtener las listas:", error.response || error.message);
      }
    },
    async addToCart(book) {
      try {
        if (!this.user || !this.user._id) {
          this.showNotification("Por favor, inicia sesión para añadir al carrito.", "error");
          return;
        }

        await axios.post(`http://localhost:3000/cart/${this.user._id}/add`, {
          bookId: book._id,
          quantity: 1,
        });
        this.showNotification("Libro añadido al carrito.", "success");
      } catch (error) {
        this.showNotification("Error al añadir al carrito.", "error");
        console.error(error.message);
      }
    },
    openListMenu(bookId) {
      this.selectedBookId = bookId;
      this.showListMenu = true;
    },
    closeListMenu() {
      this.selectedBookId = null;
      this.showListMenu = false;
    },
    async addBookToList(listId) {
      try {
        await axios.post(`http://localhost:3000/lists/add-book`, {
          listId,
          bookId: this.selectedBookId,
        });
        this.showNotification("Libro añadido a la lista correctamente.", "success");
        this.closeListMenu();
      } catch (error) {
        this.showNotification("Error al añadir el libro a la lista.", "error");
        console.error(error.message);
      }
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    async searchBook() {
      const result = this.books.find((book) =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      if (result) {
        this.$router.push(`/book/${result._id}`);
      } else {
        this.showNotification("No se encontraron resultados.", "error");
      }
    },
    showNotification(message, type) {
      this.notification = { message, type };
      setTimeout(() => {
        this.notification = { message: "", type: "" };
      }, 3000);
    },
    async fetchUser() {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          headers: { authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        this.user = response.data.user;

        await this.fetchLists();
      } catch (error) {
        console.error("Error al obtener el usuario:", error.response || error.message);
      }
    },
    logout() {
      localStorage.removeItem("authToken");
      this.user = null;
      this.showMenu = false;
      this.$router.push("/sign-in");
    },
  },
  watch: {
    category: {
      immediate: true,
      handler() {
        this.fetchBooks();
      },
    },
  },
  async mounted() {
    await this.fetchUser();
    await this.fetchBooks();
  },
};
</script>

<style>
/* Personaliza los estilos */
</style>
