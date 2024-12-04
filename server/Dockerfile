# Usa la imagen base de Node.js
FROM node:20-alpine

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Instala TypeScript de forma global (opcional si está en package.json)
RUN npm install -g typescript

# Copia el resto del código
COPY . .

# Compila el código TypeScript
RUN tsc

# Expone el puerto que el backend usará
EXPOSE 3000

# Comando para ejecutar el backend
CMD ["npm", "start"]
