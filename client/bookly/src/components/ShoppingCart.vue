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

    <!-- CONTENIDO DEL CARRITO -->
    <div class="pt-16 px-8 mt-8">
      <h1 class="text-3xl font-bold text-center mb-8">Carrito de Compra</h1>
      <div v-if="cartItems.length === 0" class="text-center text-gray-600">
        <p>No tienes productos en el carrito.</p>
        <router-link to="/" class="text-emerald-600 hover:underline">Explorar libros</router-link>
      </div>
      <div v-else>
        <!-- Lista de productos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="item in cartItems"
            :key="item.book._id"
            class="border border-gray-300 p-4 rounded shadow-lg flex flex-col justify-between"
          >
            <img :src="item.book.image" :alt="item.book.title" class="w-full h-48 object-cover rounded-md" />
            <h3 class="text-xl font-semibold mt-4">{{ item.book.title }}</h3>
            <p class="text-gray-600">Autor: {{ item.book.author }}</p>
            <p class="text-gray-800 font-bold mt-2">{{ item.book.price.toFixed(2) }} €</p>
            <div class="flex items-center mt-4 space-x-2">
              <button @click="decreaseQuantity(item)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
            </div>
            <button
              @click="removeItem(item.book._id)"
              class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>

        <!-- Resumen del carrito -->
        <div class="mt-8 bg-white p-6 rounded shadow-lg max-w-md mx-auto">
          <h2 class="text-2xl font-bold mb-4">Resumen del Pedido</h2>
          <p class="text-gray-700 text-lg">Total: <span class="font-bold">{{ totalPrice.toFixed(2) }} €</span></p>
          <button
            @click="checkout"
            class="mt-4 w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cartItems: [], // Productos en el carrito
      user: null, // Usuario logueado
      showMenu: false, // Estado del menú desplegable
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + (item.book?.price || 0) * item.quantity, 0);
    },
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    async fetchCartItems() {
      try {
        const response = await axios.get(`http://localhost:3000/cart/${this.user._id}`);
        const cart = response.data.items || [];

        const bookPromises = cart.map(async (item) => {
          const bookResponse = await axios.get(`http://localhost:3000/books/${item.book}`);
          return {
            ...item,
            book: bookResponse.data,
          };
        });

        this.cartItems = await Promise.all(bookPromises);
      } catch (error) {
        console.error("Error al obtener el carrito:", error.response || error.message);
        this.cartItems = [];
      }
    },
    async saveCart() {
      try {
        await axios.post(`http://localhost:3000/cart/${this.user._id}`, {
          items: this.cartItems.map((item) => ({ book: item.book._id, quantity: item.quantity })),
        });
      } catch (error) {
        console.error("Error al guardar el carrito:", error.response || error.message);
      }
    },
    async increaseQuantity(item) {
      item.quantity += 1;
      await this.saveCart();
    },
    async decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        await this.saveCart();
      }
    },
    async removeItem(bookId) {
      try {
        await axios.post(`http://localhost:3000/cart/${this.user._id}/remove`, { bookId });
        this.cartItems = this.cartItems.filter((item) => item.book._id !== bookId);
      } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error.response || error.message);
      }
    },
    async checkout() {
      if (this.cartItems.length === 0) {
        alert("El carrito está vacío.");
        return;
      }
      alert("Gracias por tu compra. ¡Procesaremos tu pedido!");
      try {
        await axios.post(`http://localhost:3000/cart/${this.user._id}/clear`);
        this.cartItems = [];
      } catch (error) {
        console.error("Error al vaciar el carrito:", error.response || error.message);
      }
    },
    async logout() {
      try {
        localStorage.removeItem("authToken");
        this.user = null;
        this.cartItems = [];
        this.$router.push("/sign-in");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },
    async fetchUser() {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          headers: { authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        this.user = response.data.user;
        await this.fetchCartItems();
      } catch (error) {
        console.error("Error al obtener el usuario:", error.response || error.message);
      }
    },
  },
  async mounted() {
    await this.fetchUser();
  },
};
</script>

<style>
/* Personaliza los estilos */
</style>
