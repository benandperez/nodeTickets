# TicketAPI

TicketAPI es una API de gestión de tickets desarrollada en Node. Permite la creación, recuperación, actualización y eliminación de tickets, y proporciona funcionalidades de paginación y filtrado. La API es accesible a través de HTTP RESTful.

## Requisitos

Asegúrate de tener las siguientes herramientas instaladas antes de ejecutar la aplicación:

- Node version Minima v19.3.0
- Servidor web (por ejemplo, Apache(2.4) o Nginx, si es necesario)
- Tener instalado Mongo DB (https://www.mongodb.com/docs/compass/current/install/)
- Base de datos (por defecto, se Mongo DB)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/benandperez/nodeTickets.git
   - cd nodeTickets
2. Ejecutar estos dos comandos de node:
    - npm install
    - node app.js

### NOTA: Se recuerda que despues de tener instalado Mongo DB al ejecutar el primer POST el crea todo lo pértinente para su uso

La aplicación estará disponible por defecto en http://localhost:3000. 

## Uso
La API proporciona las siguientes rutas como ejemplo, ademas, hay una carpeta en el proyecto que se llama 
'collectionPostman' donde encontraras el archivo para que lo importes en tu postman local y puedas hacer las pruebas pertinentes
### NOTA: Se recomienda primero hacer las pruebas creando usuarios para que los ticket se puedan utilizar bien

- POST /tickets: Crea un nuevo ticket.
- GET /tickets/filter?name=usuario&page=1&limit=10: Recupera todos los Usuarios con opciones de paginación.
- GET /tickets/:id: Recupera un Usuario específico por su ID.
- PUT /tickets/:id: Actualiza un Usuario existente.
- DELETE /tickets/:id: Elimina un Usuario existente

Asegúrate de incluir los datos necesarios en las solicitudes (por ejemplo, usuario y estatus) 
según la ruta que estés utilizando, de todas formas, en el archivo estan con ejemplos.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir al desarrollo de TicketAPI, sigue estos pasos:

Haz un fork del repositorio.
Crea una rama para tu contribución: git checkout -b mi-contribucion
Realiza tus cambios y haz commit de ellos: git commit -m "Agrega nueva funcionalidad"
Haz push a tu rama: git push origin mi-contribucion
Crea una solicitud de extracción en GitHub.

Proyecto desarrollado por Benjamín Pérez

