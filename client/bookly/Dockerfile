# Usa la imagen base de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Expone el puerto
EXPOSE 8080

# Comando para arrancar el frontend
CMD ["npm", "run", "serve"]
