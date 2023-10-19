
# PlayPalace - Reto tecnico

El sistema PlayPalace es una aplicación destinada a administrar de manera eficiente el proceso de alquiler de videojuegos en una tienda de videojuegos. Este sistema proporciona un conjunto de funcionalidades clave para el propietario de la tienda, permitiéndole realizar un seguimiento completo de las operaciones relacionadas con los videojuegos y sus clientes.


## características

- El sistema permite almacenar y gestionar información básica de los clientes, lo que facilita el seguimiento de los videojuegos alquilados y la comunicación con los clientes cuando se vence el período de alquiler.

- Ofrece la flexibilidad de definir precios de alquiler, los cuales pueden cambiar periódicamente para títulos de juegos específicos.

- Permite identificar y mantener un registro de los clientes más frecuentes, lo que facilita la fidelización de los mismos.

- Facilita la gestión de alquileres de videojuegos, incluyendo la generación de pruebas de compra para los clientes.

- Permite a los propietarios consultar las ventas diarias, proporcionando información esencial sobre el rendimiento del negocio.

-  Los propietarios pueden buscar videojuegos por atributos clave, como director, protagonistas, productor/marca y fecha de lanzamiento.

Este proyecto busca optimizar la administración de una tienda de videojuegos, proporcionando a los propietarios las herramientas necesarias para llevar un control eficaz de su inventario, la relación con los clientes y las operaciones diarias. La implementación de estas características contribuirá a mejorar la eficiencia y la satisfacción tanto de los propietarios como de los clientes.



## Instalacion

Para instalar el proyecto debes tener instalado vite js, node js, tener activo sql y tener todos los modulos de ASP .net instalado correctamente, si lo tienes todo instalado, primero entraremos a la carpeta de frontend y ejecutaremos el siguiente comando para instalar todos los módulos

```bash
    npm install
```

Ahora deberan crear en esta misma carpeta un archivo .env y poner VITE_API_URL=http://localhost:5092/api

Aunque si no desea hacerlo, el proyecto buscara la api que se encuentra ya en la nube, despues para correr la aplicacion web ejecute el siguiente comando:

```bash
    npm run dev
```

Despues para ejecutar el backend de manera local, debemos encontrarnos dentro de la carpeta de Backend y dentro de esta entramos a la carpeta llamada PlayPalace_backend.

Aqui dentro podemos descargar todas las dependencias del proyecto con el comando:

```bash
   dotnet restore
```

Despues para crear la base de datos, podemos escribir el comando en la consola de administracion de paquetes de Visual Studio 2022:

```bash
    add-migration migracioninicial
```

Y despues ejecutamos:

```bash
    update-database
```
Otra opcion de crear la base de datos es ejecutando el siguiente script, aunque recomiendo la forma anterior mediante Visual Studio 

```bash
   sqlcmd -S server_name -U your_username -P your_password -d your_database_name -i createDatabaseOP.sql

```

Y para poblar la base de datos, podemos hacerlo de una manera muy facil, mediante SQL Server managment studio y ejecutamos el script llamado **SeedDatabaseGameDB.sql**

O una manera alternativa y mas compleja es ejecutando el siguiente comando:

```bash
   sqlcmd -S server_name -U your_username -P your_password -d gameDB -i SeedDatabaseGameDB.sql

```

Ya con todo instalado, base de datos creada y poblada, podemos ejecutar el programa en el mismo Visual Studio 2022


## Capturas

Adjunto captura de las principales pantallas de la aplicacio:

![App Screenshot](https://raw.githubusercontent.com/luisda190519/Sophos_RetoTecnico/main/images/image1.png?token=GHSAT0AAAAAACIP267Y6NIVQ4KY2ZJOKOCAZJRLQSQ)

![App Screenshot](https://raw.githubusercontent.com/luisda190519/Sophos_RetoTecnico/main/images/image2.png?token=GHSAT0AAAAAACIP267Y7F2N55JMTDNPWKHYZJRLRKA)

![App Screenshot](https://raw.githubusercontent.com/luisda190519/Sophos_RetoTecnico/main/images/image3.png?token=GHSAT0AAAAAACIP267ZBUPFGX7GTL2EO42CZJRLROQ)

![App Screenshot](https://raw.githubusercontent.com/luisda190519/Sophos_RetoTecnico/main/images/image4.png?token=GHSAT0AAAAAACIP267ZTBOO7VAFGGFLGMUIZJRLRVA)

![App Screenshot](https://raw.githubusercontent.com/luisda190519/Sophos_RetoTecnico/main/images/image5.png?token=GHSAT0AAAAAACIP267Y6NS6ZPYZ5L6DID6MZJRLR3Q)
## Tech Stack

**API:** ASP .net, C#

**Frontend:** React, HTML, CSS, JavaScript

## Authors

- [@Luis Fuentes](https://github.com/luisda190519)


## Support

For support, email licerol@uninorte.edu.co

