# Prueba técnica Lebox

Desarrollado por Miguel Higuera - miguelhiguera.dev@gmail.com

Sistema de gestión de usuarios desarrollado con Laravel como API REST y Vue 3 + TypeScript con Composition API como frontend, utilizando patrón MVC.

Proporciona una API CRUD sencilla para listar, ver, agregar, modificar y eliminar usuarios, con una interfaz SPA.

## Instrucciones (backend)
1. Construir la aplicación usando el comando `docker-compose build` en el directorio raíz.
2. Ejecutar la aplicación usando `docker-compose up -d`.
3. Ejecutar `docker exec -it laravel_app php artisan migrate --seed` para realizar las migraciones e ingresar usuarios de prueba, además del usuario predeterminado.

NOTA: Dejé el archivo .env en el repositorio para que no tengan que generar la clave del JWT.

El backend se estará ejecutando en el puerto **8000**.

## Instrucciones (frontend)
1. Ir al directorio `frontend`.
2. Ejecutar el comando `npm install` para instalar las dependencias.
3. Ejecutar `npm run dev` para ejecutar el servidor de desarrollo.

El frontend será accesible en `http://localhost:5173`.

Ejecutar `npm run build` para hacer build para producción.

## Autenticación

> [!IMPORTANT]
> Asegúrese de realizar las migraciones con las instrucciones proporcionadas para que se genere el usuario predeterminado.

Hay un usuario predeterminado para iniciar sesión en el sistema:

Usuario: default@example.com

Contraseña: password

## Testing y cobertura

- Para ejecutar las pruebas de backend y ver información de cobertura, ejecutar en directorio raíz:

`docker exec -it laravel_app php artisan test --coverage`

- Para ejecutar las pruebas de frontend y ver información de cobertura, ejecutar en directorio `frontend`:

`npm run test:unit:coverage`

## Funcionamiento


### Backend

#### Usuario

Un CRUD con un controlador `UserController` que se encarga de hacer las cinco operaciones (Listar, Leer, Crear, Modificar y Eliminar). 

Se usa el validador de Laravel para validar requisitos de la contraseña usando la regex `/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/` que exige estos requisitos:

- 8-32 caracteres
- Una letra mayúscula
- Una letra minúscula
- Un número (0-9)
- Uno de los siguientes símbolos: # ? ! @ $ % ^ & * -

Además el email debe ser único y tener un formato de email.

Las eliminaciones son permanentes, no soft delete.

#### Autenticación

`AuthController` utiliza la biblioteca `firebase/php-jwt` para codificar y decodificar tokens JWT. Proporciona dos métodos:

1. Login: Recibe en el body el email y contraseña del usuario. Se verifica si estas credenciales son correctas, y en caso de serlas se genera el token con `createToken()` para retornarlo. En caso de credenciales incorrectas, se retorna un error 401.

2. CreateToken: Se encarga de obtener el `JWT_SECRET` de las variables de entorno y genera el token con el payload:

```json
{
    "iss": "lebox",
    "sub": 1, // ID del usuario
    "iat": 123456789, // Tiempo de generación del token
    "exp": 123412789 // Fecha de expiración del token
}
```

#### Rutas

Las rutas se encuentran en formato JSON para importar en Postman en el archivo LeboxApp.postman_collection.json.


### Frontend

La aplicación es una SPA con solo dos vistas, una para iniciar sesión y un dashboard para usar toda la funcionalidad. Se utilizan modals y componentes reutilizables.

#### fetchWrapper

La aplicación usa un wrapper para hacer todas las peticiones HTTP. Esto es para poder facilitar el proceso de adjuntar el JWT con las solicitudes, evitando la repetición.

El wrapper acepta un tipo genérico para poder especificar el tipo de respuesta, y retorna una promesa correspondiente al tipo indicado.

Si se realiza una petición y el token está vencido o esta retorna un error 401 o 403, se cierra la sesión del usuario de forma inmediata.

#### Stores

La aplicación usa **Pinia** para manejar diversos stores que centralizan la información relevante a toda la aplicación, para evitar mucho _prop drilling_ entre los componentes.

##### Notifications (stores/notifications.ts)

Se encarga de centralizar un array de notificaciones que pueden ser de tipo _success_ o _error_.
Proporciona métodos para agregar una nueva notificación, eliminar una específica y también eliminar todas las notificaciones.

Estas notificaciones aparecen en la esquina superior de la pantalla para informar al usuario del resultado de sus interacciones en el sistema.

##### Auth (stores/auth.ts)

Cuenta con un método login al que se le pasa el email y contraseña, y este hace un POST al endpoint de login. Si es exitoso, se guarda el JWT en localStorage y se redirige al usuario al dashboard.

También cuenta con un método logout que elimina el token de localStorage y redirige al usuario a la ruta `/login`.

##### Current User (stores/currentUser.ts)

Un store que simplemente sirve para facilitar los procesos de crear y modificar usuarios, almacenando los datos del usuario que está siendo creado/modificado en ese momento.

##### Users (stores/usersStore.ts)

Se encarga de almacenar toda la lista de usuarios paginados en el momento de forma centralizada. Proporciona métodos para realizar todas las operaciones CRUD y mantiene el estado consistente en todos los componentes. Además, envía las notificaciones acordes al éxito/fallo de un proceso.
