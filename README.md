# ET-1-API


## Cambios

- Se adapto el modelo de estudiantes y profesores a una sola coleccion llamada usuarios.
- Se reconoce el tipo de usuario segun un campo "role", que cuenta con solo 2 valores validos.
- Se agregaron notas en modo de Marks, y se separo las asistencias en su propia collecion Attendances.

## Endpoints implementados

### Rutas usuario "/users"

- GET : "/students" : Devuelve a todos los estudiantes.
- GET : "/teachers" : Devuelve a todos los profesores.
- POST : "/" : Registrar un usuario, ya sea estudiante o profesor. (Se que no se evalua)
- DELETE : "/" : Eliminar usuarios
- PUT : "/:userId/password" : Cambiar la contraseña de un usuario
- PUT : "/:userId/email" : Cambiar el email de un usuario

### Rutas asignaturas

- POST : "/" : Crear asignaturas
- DELETE : "/" : Eliminar asignaturas
- PATCH : "/:courseId/students/add/:studentId" : Agregar estudiante a una asignatura
- PATCH : "/:courseId/students/remove/:studentId" : Eliminar estudiante de una asignatura
