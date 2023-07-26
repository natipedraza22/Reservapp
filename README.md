## ReservApp - Sistema de Gestión de Hoteles (Web)

https://mggp.pythonanywhere.com/

## Descripción

ReservApp es una aplicación web desarrollada para simplificar la gestión de reservas hoteleras. Permite a los usuarios visualizar un listado completo de todas las reservas existentes, así como crear nuevas reservas con fechas personalizadas y verificar la disponibilidad de habitaciones según el número de huéspedes. Esta aplicación está diseñada para ofrecer una experiencia intuitiva y eficiente tanto para los administradores como para los huéspedes.

## Características

- Ver un listado completo de todas las reservas con detalles como fechas, tipo de habitación, número de huéspedes, datos de contacto y más.
- Crear nuevas reservas seleccionando fechas de entrada y salida, número de huéspedes y tipo de habitación.
- Validación de número de huéspedes para mostrar solo habitaciones disponibles que se ajusten a la cantidad ingresada.
- Restricción de creación de reservas para fechas anteriores al 31 de diciembre de 2022.
- Actualización automática del número de habitaciones disponibles al crear nuevas reservas.

## Instalación y Ejecución



1. Se clona el repositorio : `git clone https://github.com/natipedraza22/reservapp.git`.
2. Asegurarse tener instalado Node.js y NPM.
3. Ejecución `npm ci` para instalar las dependencias del proyecto.
4. Se crea desde 0 repo de Cypress con su package.json
5. .gitignore : node_modules
6. Ejecutar `npm start` para iniciar Cypress.

## Testing Automatizado

Para garantizar la calidad del sistema, se han automatizado los casos de prueba con Cypress. Los casos de prueba y los resultados se encuentran en la carpeta `test`.

Para ejecutar los casos de prueba automatizados:

1. Asegúrarse de tener instalado Cypress en el proyecto.
2. Ejecutar `npm test` para abrir Cypress y ejecutar las pruebas automatizadas.
