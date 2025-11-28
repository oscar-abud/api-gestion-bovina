---
IMPORTANTE SI QUIERE EJECUTAR LOS COMANDOS PARA CORRER EL BACK ESTAN MAS ABAJO
---

# 🐮 API REST — Gestión Bovina

Este proyecto corresponde a una API RESTful desarrollada con Node.js y Express.js, diseñada para administrar información de ganado bovino. La API permite registrar, consultar, actualizar y desactivar vacas, además de gestionar usuarios mediante autenticación basada en JSON Web Tokens (JWT).

El sistema utiliza middleware personalizados y de terceros para manejar solicitudes, respuestas y validaciones de autenticación. El middleware next() se emplea para verificar si un usuario está autenticado antes de permitir el acceso a los endpoints protegidos.

---

## 🚀 Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- bcrypt (encriptación de contraseñas)
- jsonwebtoken (generación de tokens JWT)
- express-jwt (validación de tokens)
- cors
- Swagger UI Express
- swagger-jsdoc

---

## 🔐 Autenticación

Toda la API relacionada con vacas está protegida mediante JWT.

Flujo de autenticación:

1. El usuario inicia sesión mediante el endpoint /login.
2. Si las credenciales son válidas, se genera un token JWT.
3. El cliente debe enviar este token en el header:

Authorization: Bearer <token>

4. El middleware isAuthenticated valida el token.
5. Si el token es inválido o no existe, se responde con:

{ "message": "No estás autorizado. Token inválido o ausente." }

---

## 📦 Instalación y Configuración

### 1. Clonar el repositorio

git clone <url-del-repo>
cd <carpeta-del-proyecto>

### 2. Instalar dependencias

npm install

Dependencias utilizadas:

express
mongoose
cors
bcrypt
jsonwebtoken
express-jwt

Si alguna falta:

npm install express mongoose cors bcrypt jsonwebtoken express-jwt

---

## ▶️ Ejecución del Proyecto

Para iniciar el servidor:

npm start

El archivo api.js contiene la configuración del servidor, la conexión a MongoDB y todos los endpoints del sistema.

Al iniciar se mostrará:

Listen on port: 3000
Swagger: http://localhost:3000/api-docs\n
Conectado a MongoDB

---

## 📌 Endpoints Principales

### Autenticación

POST /login — Iniciar sesión
POST /register — Registrar nuevo usuario

---

### Vacas (Protegidos con JWT)

Todos requieren enviar "Authorization: Bearer <token>"

GET /vacas — Listar vacas activas
GET /vacas/all — Listar todas las vacas activas e inactivas
GET /vacas/desactivadas — Listar vacas eliminadas
GET /vacas/:id — Obtener vaca por ID
POST /vacas — Crear vaca
PUT /vacas/:id — Actualizar vaca
DELETE /vacas/:id — Dar de baja una vaca (baja lógica)

---

## 📘 Notas Finales

- La API implementa baja lógica en vez de eliminar registros.
- Toda la funcionalidad de vacas está protegida mediante JWT.
- El proyecto está estructurado de forma simple y escalable.

---
