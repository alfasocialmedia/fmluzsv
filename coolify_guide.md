# Guía de Despliegue en VPS con Coolify

Esta guía explica paso a paso cómo desplegar la aplicación web **FM Luz San Vicente** en tu propio servidor VPS utilizando **Coolify**.

---

## Paso 1: Subir el Código a GitHub

Ya hemos vinculado tu repositorio remoto y guardado todos los cambios locales en un commit. Para subir el código a tu repositorio de GitHub, abre tu terminal local en esta carpeta y ejecuta:

```bash
git push -u origin main
```

*(Como tu terminal local está autenticada con tus credenciales de GitHub, subirá el código inmediatamente).*

---

## Paso 2: Crear la Base de Datos MySQL en Coolify

Coolify te permite crear y alojar bases de datos MySQL en contenedores Docker de forma muy sencilla:

1. Entra a tu panel de **Coolify**.
2. Dirígete a tu **Proyecto** (Project) y haz clic en **New** (Nuevo recurso).
3. Selecciona **Databases** ➔ **MySQL**.
4. Deja la configuración por defecto y haz clic en **Save** o **Deploy**.
5. Una vez que la base de datos esté activa, Coolify te mostrará varias cadenas de conexión:
   - Toma nota de la **Connection URI (Internal)**, que tiene este formato:
     `mysql://root:contraseña@mysql:3306/db_name`
     *(Usaremos esta dirección porque la conexión interna entre la app y la base de datos dentro del VPS es ultra rápida y no tiene latencia).*

---

## Paso 3: Crear la Base de Datos e Importar la Estructura (SQL)

Dado que es una base de datos nueva, necesitamos crear las tablas.

### Opción A (Recomendada - Sin instalar nada en el servidor):
Desde la terminal de tu computadora local, puedes configurar temporalmente tu archivo `.env` con la dirección de conexión **externa** de tu base de datos de Coolify y ejecutar:
```bash
npx prisma db push
```
*Esto creará la estructura completa en tu VPS al instante.*

### Opción B (Usando phpMyAdmin en Coolify):
Si añadiste phpMyAdmin como servicio en tu Coolify:
1. Accede a phpMyAdmin.
2. Ve a **Importar** y sube el archivo `prisma/mysql_schema.sql` que está en este proyecto.
3. Haz clic en **Importar** para crear las tablas de forma manual.

---

## Paso 4: Desplegar la Aplicación en Coolify

1. En el panel de **Coolify**, dentro de tu proyecto, haz clic en **New Resource** (Nuevo recurso).
2. Selecciona **Application** ➔ **GitHub Repository**.
3. Elige tu repositorio `alfasocialmedia/fmluzsv` y la rama `main`.
4. Coolify detectará que es un proyecto de **Next.js**.
5. Configura la aplicación con los siguientes parámetros:
   - **Build Pack**: Selecciona **Nixpacks** (es el predeterminado y funciona de forma automática con Next.js).
   - **Domains**: Escribe tu dominio o subdominio configurado (ej. `https://fmluzsanvicente.com.ar` o `https://radio.fmluz.com`).
6. Dirígete a la pestaña **Environment Variables** (Variables de entorno) de la aplicación y agrega estas tres variables indispensables:
   - `DATABASE_URL` ➔ Pega la URL de conexión **interna** de tu MySQL en Coolify (ej. `mysql://root:contraseña@mysql:3306/db_name`).
   - `JWT_SECRET` ➔ Escribe una clave aleatoria larga para firmar las sesiones de administrador de manera segura.
   - `NODE_ENV` ➔ `production`
7. Haz clic en **Deploy**.

Coolify compilará tu aplicación Next.js, creará el contenedor Docker, le asignará el dominio y configurará el certificado SSL (HTTPS) de Let's Encrypt automáticamente.

---

## Paso 5: Primer Inicio de Sesión y Configuración

Una vez que Coolify termine el despliegue y tu web esté activa:

1. Ve a `tu-dominio.com/ctrl-radio` en tu navegador.
2. Inicia sesión con la contraseña temporal por defecto:
   🔑 **`FMLuz107.5!`**
3. Ve a la pestaña **General** ➔ sección **Seguridad y Acceso** y cámbiala por una nueva clave segura inmediatamente.
