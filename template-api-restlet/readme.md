# NetSuite REST API Boilerplate

## Descripción

Este proyecto implementa una arquitectura basada en capas para el desarrollo de APIs REST en NetSuite utilizando SuiteScript 2.1.

El objetivo es separar responsabilidades entre controladores, servicios y repositorios para mantener el código organizado, escalable y fácil de mantener.

---

# Estructura del Proyecto

```text
SuiteScripts/
└── my_api/
    │
    ├── entry-points/
    │   └── restlet.js
    │
    ├── api/
    │   └── controllers/
    │       ├── get_controller.js
    │       ├── post_controller.js
    │       ├── put_controller.js
    │       └── delete_controller.js
    │
    ├── services/
    │   └── sales_order_service.js
    │
    ├── repositories/
    │   └── sales_order_repository.js
    │
    └── utils/
        ├── errors.js
        └── handle_response.js
```

---

# Arquitectura

La aplicación sigue el siguiente flujo:

```text
RESTlet
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
NetSuite Record/Search API
```

Cada capa tiene una responsabilidad específica.

---

# Entry Point

Ubicación:

```text
entry-points/restlet.js
```

Es el único punto de entrada de NetSuite.

Su responsabilidad es delegar las peticiones HTTP al controlador correspondiente.

Ejemplo:

```javascript
const get = (requestParams) => {
    return GetController.execute(requestParams);
};

const post = (requestParams) => {
    return PostController.execute(requestParams);
};
```

No debe contener lógica de negocio.

No debe contener consultas a registros.

No debe contener validaciones.

---

# Controllers

Ubicación:

```text
api/controllers/
```

Responsabilidades:

- Recibir los parámetros de la petición.
- Resolver la acción solicitada.
- Invocar el servicio correspondiente.
- Delegar el manejo de errores al `handleResponse`.

Ejemplo:

```javascript
const ACTIONS = {
    crear_orden: SalesOrderService.create,
    obtener_orden: SalesOrderService.get,
};
```

```javascript
return handleResponse(() => {
    return ACTIONS[action](requestParams);
});
```

Los controladores NO deben:

- Consultar registros.
- Ejecutar búsquedas.
- Contener lógica de negocio.

---

# Services

Ubicación:

```text
services/
```

Responsabilidades:

- Implementar la lógica de negocio.
- Validar reglas funcionales.
- Coordinar llamadas a repositorios.
- Formatear la información antes de devolverla.

Ejemplos:

- Validar que exista un cliente.
- Validar parámetros obligatorios.
- Validar reglas de negocio.
- Transformar datos.

Los servicios deben devolver siempre:

```javascript
return {
    data,
    message,
};
```

Ejemplo:

```javascript
return {
    data: salesOrder,
    message: "Orden creada correctamente",
};
```

Los servicios NO deben:

- Manejar respuestas HTTP.
- Construir estructuras de error.
- Interactuar directamente con el controlador.

---

# Repositories

Ubicación:

```text
repositories/
```

Responsabilidades:

- Interactuar con NetSuite.
- Utilizar módulos nativos como:

```javascript
N / record;
N / search;
N / query;
```

Ejemplos:

```javascript
record.load(...)
```

```javascript
record.create(...)
```

```javascript
search.create(...)
```

Los repositorios NO deben:

- Contener lógica de negocio.
- Validar reglas funcionales.
- Construir respuestas API.

Deben limitarse al acceso de datos.

---

# Manejo de Errores

Ubicación:

```text
utils/errors.js
```

Todos los errores de la aplicación deben definirse aquí.

Errores soportados actualmente:

```javascript
BadRequestError;
UnauthorizedError;
NotFoundError;
InternalError;
```

Ejemplo:

```javascript
throw new Errors.BadRequestError("El customerId es obligatorio");
```

Ejemplo:

```javascript
throw new Errors.NotFoundError("Cliente no encontrado");
```

---

# Handle Response

Ubicación:

```text
utils/handle_response.js
```

Responsabilidad:

Centralizar el manejo de respuestas exitosas y errores.

Los controladores deben ejecutar sus acciones mediante este wrapper.

Ejemplo:

```javascript
return handleResponse(() => {
    return Service.execute(requestParams);
});
```

Formato de respuesta exitoso:

```json
{
    "success": true,
    "statusCode": 200,
    "data": {},
    "message": "Success"
}
```

Formato de respuesta con error:

```json
{
    "success": false,
    "statusCode": 400,
    "error": {
        "code": "BAD_REQUEST"
    },
    "message": "Parámetro inválido"
}
```

---

# Convenciones

## SuiteScript

```javascript
@NApiVersion 2.1
```

---

## Módulos

AMD mediante:

```javascript
define([], () => {});
```

---

## Archivos

Formato:

```text
snake_case
```

Ejemplos:

```text
sales_order_service.js
sales_order_repository.js
handle_response.js
```

---

## Carpetas

Formato:

```text
kebab-case
```

Ejemplos:

```text
api/controllers
entry-points
repositories
services
```

---

## Formato de retorno de Servicios

Todos los servicios deben devolver:

```javascript
{
    (data, message);
}
```

---

## Formato de errores

Todos los errores deben lanzarse mediante:

```javascript
throw new Errors.BadRequestError(...);
```

o

```javascript
throw new Errors.NotFoundError(...);
```

Nunca utilizar:

```javascript
throw "Error";
```

o

```javascript
throw {};
```

---

# Principios

- Controllers únicamente coordinan.
- Services contienen lógica de negocio.
- Repositories acceden a NetSuite.
- Errors centraliza excepciones.
- HandleResponse centraliza respuestas.
- RESTlet únicamente enruta peticiones.

Cada capa debe tener una única responsabilidad.
