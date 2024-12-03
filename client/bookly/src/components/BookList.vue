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

      <!-- Usuario y menú -->
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

    <!-- CONTENIDO -->
    <div class="pt-16 px-8">
      <h1 class="text-3xl font-bold text-center mt-8">Mis Listas de Libros</h1>

      <!-- Botón para crear una nueva lista -->
      <div class="text-center mt-4">
        <button
          class="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          @click="showCreateListModal = true"
        >
          Crear Nueva Lista
        </button>
      </div>

      <!-- Mensaje de éxito -->
      <div v-if="successMessage" class="mt-4 text-center text-green-600 font-semibold">
        {{ successMessage }}
      </div>

      <!-- Modal para crear una nueva lista -->
      <div
        v-if="showCreateListModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-white p-6 rounded shadow-lg w-[400px]">
          <h2 class="text-xl font-bold mb-4">Crear Nueva Lista</h2>
          <input
            v-model="newList.title"
            type="text"
            placeholder="Nombre de la lista"
            class="border border-gray-300 w-full p-2 rounded mb-4"
          />
          <div class="flex justify-end">
            <button
              class="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
              @click="showCreateListModal = false"
            >
              Cancelar
            </button>
            <button
              class="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
              @click="createList"
            >
              Crear
            </button>
          </div>
        </div>
      </div>

      <!-- Listas -->
      <div v-if="isLoading" class="text-center mt-8">
        <p class="text-gray-600">Cargando listas...</p>
      </div>
      <div v-else class="grid grid-cols-3 gap-6 mt-8">
        <div
          v-for="list in lists"
          :key="list._id"
          class="border border-gray-300 p-4 rounded shadow"
        >
          <h3 class="text-xl font-bold">{{ list.title }}</h3>
          <p class="text-sm text-gray-600 mt-2">
            Libros: {{ list.history ? list.history.length : 0 }}
          </p>
          <div class="flex justify-between mt-4">
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              @click="viewList(list._id)"
            >
              Ver Lista
            </button>
            <button
              class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              @click="deleteList(list._id)"
            >
              Borrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BookList",
  data() {
    return {
      lists: [],
      newList: {
        title: "",
      },
      user: null,
      isLoading: true,
      showCreateListModal: false,
      showMenu: false,
      successMessage: "", // Mensaje de éxito
    };
  },
  methods: {
    async fetchLists() {
  try {
    const userId = this.user._id; // Obtén el ID del usuario autenticado
    const response = await axios.get(`http://localhost:3000/lists/user/${userId}`);
    this.lists = response.data;
    this.isLoading = false;
  } catch (error) {
    console.error("Error al obtener las listas:", error.response || error.message);
    this.isLoading = false;
  }
},
    async createList() {
      try {
        const requestBody = {
          title: this.newList.title,
          username: this.user.username,
        };

        const response = await axios.post("http://localhost:3000/lists", requestBody);
        const newList = response.data;

        // Agregar la nueva lista al estado local
        this.lists = [...this.lists, newList];
        this.newList.title = "";
        this.showCreateListModal = false;
        this.successMessage = "Lista creada correctamente.";
     window.location.reload();
  } catch (error) {
    console.error("Error al crear la lista:", error.response || error.message);
  }
    },
    async deleteList(listId) {
      if (!confirm("¿Estás seguro de que quieres eliminar esta lista?")) return;

      try {
        await axios.delete(`http://localhost:3000/lists/${listId}`);
        this.lists = this.lists.filter((list) => list._id !== listId);
        this.successMessage = "Lista eliminada correctamente.";
        setTimeout(() => (this.successMessage = ""), 3000);
      } catch (error) {
        console.error("Error al eliminar la lista:", error.response || error.message);
        alert("Hubo un error al eliminar la lista.");
      }
    },
    viewList(listId) {
      this.$router.push(`/list/${listId}`);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      localStorage.removeItem("authToken");
      this.user = null;
      this.showMenu = false;
      this.$router.push("/sign-in");
    },
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:3000/user", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      this.user = response.data.user;
      await this.fetchLists();
    } catch (error) {
      console.error("Error al obtener el usuario:", error.response || error.message);
      this.user = null;
      this.isLoading = false;
    }
  },
};
</script>

<style>
/* Estilos personalizados */
</style>
