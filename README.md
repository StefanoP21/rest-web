# Proyecto RestWeb

Aplicación RESTful para la gestión de tareas.

### Instalación

Clona el repositorio y navega hasta el directorio:

```bash
git clone https://github.com/StefanoP21/rest-web.git
```

### Instala las dependencias:

```bash
npm install
```

### Variables de Entorno

Cree un archivo .env y .env.test en la carpeta raíz de su proyecto y añada sus variables. Consulte .env.template para obtener ayuda.

### Levantar las Bases de Datos

Para levantar las bases de datos, ejecute:

```bash
docker-compose up -d
```

### Prisma Migrate

Para aplicar las migraciones de la base de datos, ejecute:

```bash
npx prisma migrate dev --name init
```

### Ejecución en modo de desarrollo

Para iniciar la aplicación en modo de desarrollo, ejecuta:

```bash
npm run dev
```

### Ejecución de las pruebas

Para iniciar las pruebas de la aplicación, ejecuta:

```bash
npm run test
# or with watch
npm run test:watch
# or with coverage
npm run test:coverage
```

### Ejecución en modo de producción

Para construir la aplicación para producción, ejecuta:

```bash
npm run build
# and then
npm start
```

### Tecnologías

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)

### Autor

- [Stefano Palomino](https://github.com/StefanoP21)

### Licencia

Este proyecto está disponible para su uso bajo la Licencia MIT.
