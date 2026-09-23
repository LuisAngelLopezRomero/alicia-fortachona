# Despliegue rápido

## Opción A — GitHub Pages

Esta es la opción más sencilla para pasarle un enlace a Alicia.

1. Sube la carpeta al repositorio.
2. Activa GitHub Pages desde `Settings → Pages`.
3. Publica desde `main / root`.
4. Abre la URL generada en el móvil.
5. En iPhone: Safari → Compartir → Añadir a pantalla de inicio.

## Opción B — mantener las fotos fuera de una web pública

Si no quieres que las fotos de Alicia y sus hijos queden accesibles públicamente, no publiques este paquete tal cual en un repositorio/sitio público. Mantén el repositorio privado y usa un despliegue con autenticación o sustituye las imágenes por versiones que sí puedan hacerse públicas.

## No hace falta un webhook para usar la app

Un webhook no es necesario para que Alicia abra, instale o use la PWA. Para la primera versión basta con alojar los archivos estáticos. Un webhook o integración con GitHub solo sería útil después para automatizar despliegues o permitir acciones sobre el repositorio.
