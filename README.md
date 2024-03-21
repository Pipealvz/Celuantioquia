# Descripción de la necesidad

La empresa CeluAntioquia siendo una empresa que vende tecnologías principalmente celulares, accesorios para estos y algunos periféricos para computador, prestando sus servicios de venta de forma física desde sus inicios, en los últimos dos años han incursionado en redes sociales para ir pasando a prestar sus servicios de venta en redes sociales. Actualmente cuenta con un manejo de su información y la exposición de sus productos, cuenta redes sociales Instagram, Facebook, WhatsApp y buscan potenciar un nuevo canal web.

A causa de la pandemia tuvieron que migrar su negocio a la venta por redes sociales, lograron un aumento en sus ventas debido al incremento del volumen de mensajes en las diferentes redes creando la necesidad de ampliarse a la web para brindarle un mayor rango de cobertura a los clientes nuevos y antiguos. El volumen de sus productos es tan alto, que no se pueden mostrar en su totalidad en una red social, por lo tanto, se requiere una página web que les permita mostrar sus productos y potenciar el canal de ventas en la web, con módulos que les permitan almacenar y llevar un conteo de sus productos, enseñar sus productos disponibles para la venta y dar a conocer información de la empresa.

# Descripción del problema

Podrá encontrar la descripción del problema representada en una espina de pescado, conociendo sus causas y efectos.

# Objetivos del proyecto

## Objetivo general

Desarrollar un aplicativo web que permita dar exposición a los productos y servicios ofrecidos por la empresa CeluAntioquia.

## Objetivos específicos
1. Analizar la problemática de la empresa CeluAntioquia para brindarle una solución.
2. Diseñar un plan de trabajo que permita una solución efectiva del problema.
3. Desarrollar el plan de trabajo planteado para solucionar puntualmente la necesidad.
4. Probar las actividades realizadas durante varios periodos, que identifique los puntos críticos de la solución.
5. Implementar el producto final para uso del cliente.

## Objetivos del sistema

### Objetivo general
Desarrollar un aplicativo web para dar exposición de los productos y servicios, aumentando la presencia web de la empresa.

### Objetivos específicos
1. Diseñar prototipos funcionales y no funcionales del aplicativo.
2. Desarrollar la estructura visual del aplicativo en la tecnología establecida.
3. Probar el aplicativo para verificar su correcto funcionamiento.
4. Implementar con la tecnología y los servicios establecidos en el aplicativo un producto final.

# Delimitación y alcance

Se desarrollará un aplicativo web que cuente con dos interfaces diferentes, una para los usuarios que harán uso del aplicativo desde la web y otra como administrativo de la cual hará uso el cliente, es decir que se implementarán dos tipos de usuario, los cuales son administrador y Cliente, el administrador tendrá acceso al módulo empleado, módulo catálogo, módulo Productos, módulo inventario, módulo Cliente, módulo categoría, módulo Venta y módulo servicio tecnico y garantias. Mientras que el usuario tendrá acceso a los módulos de catálogo, los clientes estarán limitados en ciertas funcionalidades y módulo servicio técnico y garantía.

Haciendo uso de las siguientes tecnologías se desarrollará el aplicativo en React para el Frontend de la página (vista del cliente), para el diseño se implementará utilizar la herramienta de Bootstrap con CSS y para el Backend se hará uso de los lenguajes JavaScript.

Para ejecución del desarrollo del aplicativo web se dividirá por módulos realizados en tres semestres:

Nota: los siguiente módulos ya están construidos se realizará una mejora de estos módulos más los siguientes módulos explicados.

- Módulo Categoría
- Módulo Productos
- Módulo Cliente.
- Módulo Empleado
- Módulo Rol
- Módulo Venta.
- Módulo Inventario.

Las actividades desarrolladas para el quinto semestre serán las siguientes:

- Módulo servicio técnico.
- Módulo garantizado.

Las actividades desarrolladas para el sexto semestre serán las siguientes:

- Desarrollo de pruebas técnicas del aplicativo web.
- Reportes de módulos.

Las actividades desarrolladas para el séptimo semestre serán las siguientes:

- Documentación técnica del aplicativo.
- Manual de usuario del aplicativo.

# Requisitos funcionales del sistema

| Id requisito | Nombre requisito          | Descripción                                                            | Usuario     |
|--------------|---------------------------|------------------------------------------------------------------------|-------------|
| RF-01        | Registro de usuario       | El sistema debe permitir crear un usuario.                             | Administrador, Cliente |
| RF-02        | Autentificación de usuario| El sistema debe permitir autenticar al usuario.                        | Administrador, Cliente |
| RF-03        | Crear empleado            | El sistema debe permitir crear un empleado al usuario administrador.   | Administrador |
| RF-04        | Compra de productos       | El sistema debe permitir comprar los productos disponibles por el usuario. | Administrador |
| RF-05        | Modificar empleado        | El sistema debe permitir modificar un empleado ya registrado al usuario administrador. | Administrador |
| RF-06        | Eliminar empleado         | El sistema debe permitir eliminar un empleado ya registrado al usuario administrador. | Administrador |
| RF-07        | Crear categoría           | El sistema debe permitir crear una categoría al usuario administrador. | Administrador |
| RF-08        | Consultar catálogo        | El sistema debe permitir consultar el catálogo de productos disponible por el usuario. | Administrador, Cliente |
| RF-09        | Modificar categoría       | El sistema debe permitir modificar una categoría al usuario administrador. | Administrador |
| RF-10        | Eliminar categoría        | El sistema debe permitir eliminar una categoría al usuario administrador. | Administrador |
| RF-11        | Crear proveedor           | El sistema debe permitir crear un proveedor al usuario administrador.  | Administrador |
| RF-12        | Modificar proveedor       | El sistema debe permitir modificar un proveedor al usuario administrador. | Administrador |
| RF-13        | Eliminar un proveedor     | El sistema debe permitir al eliminar un proveedor al usuario administrador. | Administrador |
| RF-14        | Vista personal del producto | El sistema debe permitir ver todo el detalle del producto al cliente. | Cliente |
| RF-15        | Carrito de compra         | El sistema debe permitir al cliente agregar productos al carrito de compra. | Cliente |
| RF-16        | Enlace de asesoría en chat | El sistema debe permitir al cliente poder acceder a la asesoría en chat por parte de la empresa. | Cliente |
| RF-17        | Actualización de empleado | El sistema debe permitir actualizar el empleado una vez creado.        | Administrador |
| RF-18        | Actualizar proveedor      | El sistema debe permitir actualizar un proveedor una vez creado.       | Administrador |
| RF-19        | Actualizar categoría      | El sistema debe permitir actualizar una categoría una vez creado.      | Administrador |
| RF-20        | Actualizar producto       | El sistema debe permitir actualizar un producto una vez creado.        | Administrador |
| RF-21        | Actualizar cliente        | El sistema debe permitir actualizar un cliente una vez creado.         | Cliente, Administrador |
| RF-22        | Registrar un rol          | El sistema debe permitir registrar un nuevo rol.                      | Administrador |
| RF-23        | Eliminar un rol           | El sistema debe permitir eliminar un rol ya existente en el sistema.   | Administrador |
| RF-24        | Modificar un rol          | El sistema debe permitir modificar un rol previamente registrado en el sistema. | Administrador |
| RF-25        | Ver roles                 | El sistema debe permitir mostrar los roles registrados en el sistema.  |             |
| RF-26        | Actualización de inventario | El sistema debe permitir actualizar el inventario una vez creados los productos. | Administrador |
| RF-27        | Actualizar carrito de compra | El sistema debe permitir actualizar al cliente su carrito de compra.  | Cliente |
| RF-28        | Eliminar carrito de compra   | El sistema debe permitir eliminar al cliente objetos de su carrito de compra. | Cliente |
| RF-29        | Modificar carrito de compra  | El sistema debe permitir modificar al cliente objetos de su carrito de compra. | Cliente |
| RF-30        | Actualizar catálogo         | El sistema debe permitir actualizar el catálogo general de productos continuamente para el cliente. | Administrador |
