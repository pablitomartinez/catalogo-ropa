# 🛠️ API de Catálogo de Ropa

Este proyecto es una API REST creada con **Next.js** y **Prisma** para gestionar un catálogo de productos. Permite realizar operaciones CRUD sobre los productos.

---

## 🚀 Instalación y Configuración

### **Requisitos previos**
- Node.js (v18+)
- PostgreSQL instalado y corriendo

### **Pasos de instalación**
1. Clona el repositorio:
   git clone https://github.com/pablitomartinez/catalogo-ropa.git

   cd catalogo-ropa

2. Instala las dependencias:

npm install

3. Configura las variables de entorno en el archivo .env:

    DATABASE_URL="postgresql://postgres:admin@localhost:5433/catalogo_ropa"


4. Genera el esquema de la base de datos con Prisma:

    npx prisma migrate dev --name init


5. Inicia el servidor
    npm run dev

## 📋 Uso de la API
1. Crear un producto
    Método: POST
    Endpoint: /api/productos
    Body (JSON):
    json
 

    {
    "nombre": "Remera",
    "descripcion": "Remera de algodón",
    "precio": 20.99
    }

Respuesta:
json

    {
    "id": 1,
    "nombre": "Remera",
    "descripcion": "Remera de algodón",
    "precio": 20.99,
    "createdAt": "2024-06-08T12:34:56Z"
    }
2. Obtener un producto por ID
Método: GET
Endpoint: /api/productos/[id]
3. Actualizar un producto
Método: PUT
Endpoint: /api/productos/[id]
Body (JSON):
json

    {
    "nombre": "Pantalón",
    "descripcion": "Pantalón vaquero",
    "precio": 45.50
    }
4. Eliminar un producto
Método: DELETE
Endpoint: /api/productos/[id]


## 🗂️ Estructura del proyecto
plaintext
Copiar código
src/
│-- app/
│   ├── api/
│   │   └── productos/
│   │       ├── route.ts   # Ruta principal para POST
│   │       └── [id]/      # Rutas GET, PUT, DELETE
│-- prisma/
│   ├── schema.prisma      # Definición del modelo de datos
│-- .env                   # Variables de entorno
│-- package.json           # Dependencias del proyecto
│-- README.md              # Documentación principal

## 💻 Comandos útiles
Iniciar servidor:

bash
Copiar código
npm run dev
Generar migraciones:

bash
Copiar código
npx prisma migrate dev --name <nombre_migracion>
Abrir Prisma Studio (visor de BD):


npx prisma studio

## 🐛 Errores comunes
Problema	Solución
Error de conexión a PostgreSQL	Revisa las credenciales en .env.
ID no encontrado en PUT o DELETE	Asegúrate de que el producto exista en la BD.
Prisma no genera la base de datos	Ejecuta npx prisma migrate dev.

## 🤝 Contribuciones
Si quieres contribuir a este proyecto, realiza un fork, crea una nueva rama y envía un pull request.

