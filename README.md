# Alicia Fortachona 💪

PWA móvil de entretenimiento + hábitos para Alicia: entrenamiento en casa, dieta práctica, recetas, objetivo, control de peso y progreso con humor.

## Qué incluye

- Portada con la foto original de Alicia.
- Pantalla de transformación `Alicia Debilucha → Alicia Fortachona`.
- 3 entrenamientos semanales sin material, adaptados de forma conservadora a diástasis abdominal.
- Fase 2 opcional con bandas elásticas.
- Estimador de calorías (Mifflin-St Jeor) cuando se añaden edad y actividad.
- 3 comidas + 1 merienda opcional (o 3 comidas), con reparto orientativo.
- 12 recetas creadas con los alimentos aportados para Alicia.
- Generador de menú diario aproximado.
- Objetivo de peso editable, pesaje semanal y gráfica de evolución.
- Logros y humor con guiños a Pablo y Ángel.
- Persistencia local en el teléfono (`localStorage`).
- Exportación/importación de copia de seguridad JSON.
- PWA instalable y caché offline tras la primera carga.
- Diseño responsive y preparado para iPhone/Android.

## Publicar en GitHub Pages

1. Crea un repositorio, por ejemplo `alicia-fortachona`.
2. Sube **todo el contenido de esta carpeta a la raíz del repositorio**.
3. En GitHub abre `Settings → Pages`.
4. En `Build and deployment`, selecciona `Deploy from a branch`.
5. Selecciona la rama `main` y la carpeta `/ (root)`.
6. Guarda. GitHub mostrará la URL publicada cuando termine el despliegue.

La app usa rutas relativas, por lo que funciona tanto en `usuario.github.io/alicia-fortachona/` como en otros hostings estáticos.

## Instalar en el móvil

### iPhone / iPad
Abre la URL con **Safari** → botón Compartir → **Añadir a pantalla de inicio**.

### Android
Abre la URL con Chrome. Si el navegador ofrece instalación, acepta; si no, menú → **Instalar aplicación** o **Añadir a pantalla de inicio**.

## Datos y privacidad

Esta versión no tiene backend ni cuenta de usuario: peso, entrenamientos y ajustes se guardan en el navegador del dispositivo. Se puede exportar una copia desde `Más → Datos`.

⚠️ Las fotografías incluidas son familiares y muestran menores. Si el repositorio o la web son públicos, esas imágenes también pueden quedar públicamente accesibles. Para uso privado, conviene desplegar en un hosting con control de acceso o sustituir las fotos antes de publicar en abierto.

## Personalización pendiente

La altura, peso inicial y objetivo ya vienen precargados. Para obtener una estimación de calorías faltan dos datos reales de Alicia: **edad** y **nivel de actividad diaria**. La app los pide en `Más → Perfil` y no inventa esos valores.

## Seguridad

La app es de entretenimiento y apoyo de hábitos; no sustituye consejo médico, nutricional ni fisioterapéutico. La parte de diástasis prioriza respiración, control de presión y variantes sencillas. Si aparece abombamiento/coning marcado, dolor o síntomas de suelo pélvico, se debe reducir o detener el ejercicio y valorar consulta profesional.

Fuentes de referencia incorporadas en la app:
- Cleveland Clinic: diástasis abdominal.
- Frimley Health NHS: ejercicios de core y diástasis.
- CDC: pérdida de peso gradual y sostenible.
