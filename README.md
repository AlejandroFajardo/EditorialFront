# PrimeNG Serenity Upgraded

Este proyecto está basado en la plantilla Serenity para Angular, cuya versión se actualizo a 17.18.0 (PrimeNG) para tener las últimas características disponibles

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Descripcion

La presente es la plantilla Serenity en Angular 18 para usar en los proyectos de desarrollo.

Se incluye la autenticación con keycloack-js 15.2.1 listo para conectar a un servidor de autenticación de Keycloack 24+.

Para configurar el proyecto en un ambiente de desarrollo local se debe descargar el proyecto en su workspace y luego ejecutar `npm i --legacy-peer-deps` ya que falta por actualizar a angular 18:

keycloack-js
angular@calendar

Sin embargo no hay ningún problema de compatibilidad relacionado.

Los estilos están pre compilados en la plantilla pero si tienen problemas con el renderizado de los mismos instalar sass con el comando `npm install -g sass` luego ejecutar `sass src\assets\layout\css\layout-yellow.scss src\assets\layout\css\layout-yellow.css`, `sass src\assets\theme\yellow\theme-dark.scss`  `src\assets\theme\yellow\theme-dark.css` y 
`sass src\assets\theme\yellow\theme-light.scss  src\assets\theme\yellow\theme-light.css`. 

## Iconos

Los componentes de la plantilla están definidos bajo los lineamientos de Material. Si es necesario agregar iconos se deben obtener de `https://primeng.org/icons`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
Desarrolló David Nuñez para DTIC UPTC.
