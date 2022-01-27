# Buscador de ciudades

Esta API busca el nombre de una ciudad con latitud y longitud.

## Requisitos

Instrucciones para copiar y correr el proyecto en un ambiente local para propositos de desarrollo y testing

```
* Clona este repositorio.
* Crear cuenta en https://www.geonames.org
* Docker y docker-compose

* Ingresar a la carpeta del repositorio
    Crear .env con usuario de geonames
    Ejecutar el siguiente comando: docker-compose up
```
### Modulo npm

* [GeoNames client](https://github.com/kinotto/geonames.js/)

## Consultar API
Cuando la aplicacion este corriendo localmente, hacer una llamada Get al siguiente EP: 
```
http://localhost:${port}/api/search?q=Londo&latitude=43.70011&longitude=-79.4163
```
