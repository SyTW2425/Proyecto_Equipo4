<template>
  <!-- BARRA SUPERIOR -->
  <div class="bg-emerald-600 text-white py-4 px-6 flex justify-between items-start fixed top-0 left-0 w-full shadow-md z-50">
    <div class="flex items-start space-x-4">
      <img src="../assets/logo.png" alt="Logo" class="h-10 w-10 rounded-full">
      <span class="text-xl font-semibold"><router-link to="/">Bookly</router-link></span>
    </div>
    <!-- BARRA DE BÚSQUEDA -->
    <div class="flex items-start bg-white text-black rounded-full px-4 py-2 w-1/3">
      <input type="text" placeholder="Buscar..." class="flex-grow bg-transparent outline-none px-2">
      <button class="text-emerald-600 hover:text-emerald-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zm-7 4a7 7 0 1114 0 7 7 0 01-14 0zm14.707 6.293a1 1 0 00-1.414 0l-2.83 2.829a1 1 0 001.415 1.415l2.83-2.829a1 1 0 000-1.415z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>    
    
    <nav>
      <ul class="flex space-x-6">
        <li><a href="index.html" class="hover:text-gray-400">Inicio</a></li>
        <li><a href="sign_in.html" class="hover:text-gray-400">Login</a></li>
        <li><a href="#" class="hover:text-gray-400">Contacto</a></li>
      </ul>
    </nav>
  </div>
  
  <!-- BARRA IZQUIERDA -->
  <div class="bg-emerald-600 w-64 h-screen fixed top-0 left-0 text-white flex flex-col justify-between">
    <!-- Contenido superior -->
    <div class="mt-8 p-16">
      <h2 class="text-lg font-bold underline">Categorías</h2>
      <ul class="mt-4 space-y-2">
        <li><a href="#" class="hover:text-gray-400">Libros de autoayuda</a></li>
        <li><a href="#" class="hover:text-gray-400">Libros infantiles</a></li>
        <li><a href="#" class="hover:text-gray-400">Fantasía</a></li>
        <li><a href="#" class="hover:text-gray-400">Historia</a></li>
        <li><a href="#" class="hover:text-gray-400">Libros prácticos</a></li>
        <li><a href="#" class="hover:text-gray-400">Literatura</a></li>
        <li><a href="#" class="hover:text-gray-400">Novedades</a></li>
      </ul>
    </div>
    <!-- Contenido inferior -->
    <div class="p-4 flex justify-start">
      <p class="text-sm">© 2024 Mi Web</p>
    </div>
  </div>
 <!-- PANTALLA CENTRAL -->
<div class="ml-64 mt-32 px-8 flex flex-col items-center">
    <div class="w-screen flex justify-center">
      <video class="w-[1200px] h-[150px] rounded-lg" autoplay loop muted>
        <source src="../assets/clip_cabecera_inicio.mp4" type="video/mp4">
      </video>
    </div>  
  
    <div class="flex justify-start space-x-32 w-full mt-2">
      
      <!-- Carrusel -->
      <div class="flex flex-col items-start space-y-4">
        <div class="flex items-start space-x-4">
          <!-- Contenedor con opciones hover y detalles del libro -->
          <div class="relative group w-[230px] h-[360px]">
            <!-- Imagen del libro -->
            <img src="../assets/books/book_1.jpg" alt="Libro 1" class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer" id="bookImage" onclick="openModal()">
  
            <!-- Título, autor, estrellas y detalles -->
            <div class="absolute top-4 right-4 text-white space-y-2 z-10">
              <h3 class="font-semibold text-xl">Título del Libro 1</h3>
              <p class="text-sm">Autor 1</p>
              <div class="flex space-x-1 text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
              </div>
            </div>
  
            <!-- Detalles del libro -->
            <div class="absolute bottom-4 right-4 bg-white bg-opacity-80 p-4 rounded-lg w-[200px]">
              <p class="text-sm text-gray-800">Este es el resumen del libro o detalles del contenido.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>