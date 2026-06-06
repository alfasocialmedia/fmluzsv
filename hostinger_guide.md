# Guía de Despliegue en Hosting Compartido de Hostinger

Esta guía explica paso a paso cómo subir y configurar la aplicación web **FM Luz San Vicente** (desarrollada en Next.js con Prisma ORM) a un hosting compartido de **Hostinger** utilizando una base de datos **MySQL**.

---

## Requisitos Previos

1. Un plan de Hostinger que soporte **Node.js** (planes **Business** o **Cloud Startup** administrados mediante hPanel).
2. Haber configurado un dominio en tu cuenta de Hostinger.

---

## Paso 1: Configurar la Base de Datos MySQL en Hostinger

1. Inicia sesión en el **hPanel** de Hostinger.
2. Dirígete a **Bases de datos** ➔ **Bases de datos MySQL**.
3. Crea una nueva base de datos y un usuario:
   - **Nombre de la base de datos**: (Ejemplo: `u123456789_fmluz`)
   - **Usuario de MySQL**: (Ejemplo: `u123456789_admin`)
   - **Contraseña**: Escribe una contraseña segura y anótala.
4. Haz clic en **Crear**.
5. Copia los datos creados y toma nota del **Host de MySQL** (generalmente es `localhost`, pero a veces Hostinger provee una dirección como `mysql-server.hostinger.com`).

---

## Paso 2: Importar la Estructura de la Base de Datos

Hemos generado automáticamente el archivo SQL con la estructura exacta de la base de datos compatible con MySQL (incluyendo la nueva tabla para usuarios administradores). Está ubicado en:
📁 `prisma/mysql_schema.sql`

Para importarlo:
1. En la página de bases de datos de tu hPanel, desplázate hasta tu base de datos y haz clic en **Entrar a phpMyAdmin**.
2. Una vez dentro de phpMyAdmin, haz clic en la pestaña **Importar** (en la parte superior).
3. Selecciona el archivo `prisma/mysql_schema.sql` de tu computadora.
4. Deja las opciones por defecto y haz clic en **Importar** (o **Continuar**) al final de la página.
5. Verás un mensaje de éxito y se crearán las tablas: `AdminUser`, `SiteSetting`, `Testimony` y `ScheduleProgram`.

---

## Paso 3: Construir el Proyecto para Producción

Para generar los archivos optimizados listos para subir al servidor:

1. Ejecuta en la terminal de tu máquina local:
   ```bash
   npm run build
   ```
2. Esto generará la carpeta `.next/standalone` que contiene únicamente los archivos de servidor necesarios y los recursos estáticos copiados de forma automática por nuestro script.

---

## Paso 4: Preparar y Subir los Archivos a Hostinger

1. Entra a la carpeta `.next/standalone/`.
2. Selecciona **todo el contenido interno** de esta carpeta:
   - La carpeta `.next`
   - La carpeta `node_modules`
   - La carpeta `public`
   - El archivo `package.json`
   - El archivo `server.js`
3. Comprime estos archivos en un único archivo **.zip** (llámalo por ejemplo `app.zip`).
   > ⚠️ **IMPORTANTE**: Asegúrate de comprimir los archivos *dentro* de la carpeta `standalone`, no la carpeta `standalone` en sí, para que al descomprimir queden en la raíz del directorio de tu hosting.
4. En el hPanel de Hostinger, ve a **Archivos** ➔ **Administrador de archivos**.
5. Entra a la carpeta de tu dominio (normalmente `public_html` o un subdirectorio si configuraste una ruta para la aplicación Node.js).
6. Sube el archivo `app.zip` y descomprímelo ahí mismo.

---

## Paso 5: Configurar la Aplicación Node.js en Hostinger

1. En tu hPanel, ve a **Sitio Web** ➔ **Node.js** (o busca "Node.js" en la barra de búsqueda).
2. Haz clic en **Crear aplicación** (o configura la existente):
   - **Directorio de la aplicación**: La ruta donde descomprimiste el zip (ej. `/public_html` o la subcarpeta correspondiente).
   - **Versión de Node.js**: Selecciona **Node.js 20.x** (o 18.x como mínimo).
   - **Archivo de inicio**: Escribe `server.js`.
   - **URL de la aplicación**: Elige tu dominio.
3. Configura las siguientes **Variables de entorno** en la misma sección de Node.js (haz clic en "Configurar variables de entorno" o similar en hPanel):
   - `DATABASE_URL`: `mysql://tu_usuario:tu_contraseña@tu_host_mysql:3306/tu_base_datos`
     *(Reemplaza los valores con los creados en el Paso 1)*
   - `JWT_SECRET`: Escribe una clave aleatoria larga y segura para firmar las cookies de sesión (ej. `mi_firma_secreta_para_fmluz_2026`).
   - `NODE_ENV`: `production`
   - `PORT`: Puedes dejarlo por defecto o usar el puerto que Hostinger te asigne para redirigir el tráfico.
   - `HOSTNAME`: `0.0.0.0`
4. Guarda la configuración.
5. Haz clic en **Iniciar aplicación** (o **Reiniciar** si ya estaba corriendo).

---

## Paso 6: Primer Inicio de Sesión y Cambio de Contraseña

Hemos implementado un sistema de seguridad para proteger el Panel de Administración (`/ctrl-radio`). La primera vez que accedas:

1. Ve a `tu-dominio.com/ctrl-radio` en tu navegador.
2. Verás la nueva pantalla de **Acceso Privado**.
3. Ingresa la contraseña temporal por defecto:
   🔑 **`FMLuz107.5!`**
4. Selecciona **"Mantener sesión iniciada"** si deseas que la sesión se guarde en tu navegador por 30 días. Haz clic en **Ingresar**.
5. Al iniciar sesión por primera vez con esta clave temporal, el sistema la registrará y protegerá de forma automática en la base de datos MySQL.
6. Ve a la pestaña **General** del panel de administración, desplázate hasta la sección **Seguridad y Acceso** y cambia la contraseña temporal por una nueva contraseña personal y segura de inmediato.

---

## Resumen de Variables de Entorno (`.env`)

Si decides subir un archivo `.env` en lugar de configurar las variables en la interfaz de Hostinger, crea un archivo llamado `.env` en la raíz de tu proyecto en el servidor con este contenido:

```env
DATABASE_URL="mysql://u123456789_admin:tu_contraseña_aqui@localhost:3306/u123456789_fmluz"
JWT_SECRET="escribe_una_clave_larga_y_aleatoria_aqui"
NODE_ENV="production"
HOSTNAME="0.0.0.0"
```

*Nota: Asegúrate de que el usuario de la base de datos tenga permisos completos (LECTURA, ESCRITURA, MODIFICACIÓN).*
