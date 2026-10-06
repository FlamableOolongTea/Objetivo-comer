# Objetivo Comer — versión offline

App instalable en el celular (PWA). Todo se guarda **en el teléfono** y funciona sin internet:
cargar comidas, calcular calorías con la base de alimentos incluida, gráficos, medidas y tus alimentos propios.
Internet se usa **solo** para compartir los totales diarios con tus amigos, a través de Supabase (gratis).

## Qué hay en la carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La pantalla de la app |
| `app.js` | Toda la lógica: base de alimentos, cálculo, gráficos, guardado local y sincronización |
| `config.js` | **El único archivo que tenés que editar**: la URL y la clave de Supabase |
| `sw.js` | Service worker: guarda la app en el teléfono para que abra sin internet |
| `manifest.webmanifest`, `icon-*.png` | Nombre e ícono al instalarla |
| `supabase.js` | Librería de Supabase (incluida para que no dependa de internet) |
| `supabase.sql` | Las tablas para compartir con amigos |

---

## Paso 1 — Publicar la app (GitHub Pages, gratis)

La app necesita estar en una dirección `https://` para poder instalarse. GitHub Pages es lo más simple.

1. Creá una cuenta en https://github.com (si no tenés).
2. Arriba a la derecha: **+ → New repository**. Nombre: `objetivo-comer`. Marcalo **Public**. Tocá **Create repository**.
3. En el repositorio nuevo: **Add file → Upload files**. Arrastrá **todos los archivos de esta carpeta** (no la carpeta, los archivos sueltos). Tocá **Commit changes**.
4. Andá a **Settings → Pages**. En *Branch* elegí `main` y `/ (root)`. **Save**.
5. Esperá 1 o 2 minutos. Arriba aparece la dirección, algo como
   `https://TU-USUARIO.github.io/objetivo-comer/`

> Alternativa: Netlify Drop (https://app.netlify.com/drop) — arrastrás la carpeta y listo.

## Paso 2 — Instalarla en el celular

Abrí la dirección del paso anterior en el teléfono:

- **iPhone (Safari):** botón Compartir → **Agregar a inicio**.
- **Android (Chrome):** menú ⋮ → **Instalar app** (o *Agregar a pantalla principal*).

Abrila una vez con internet. Desde ahí funciona sin conexión.
Probalo: poné el teléfono en modo avión y abrí la app.

**Ya podés usarla.** Los pasos 3 y 4 son solo para compartir con amigos.

---

## Paso 3 — Crear la base para compartir (Supabase, gratis)

1. Entrá a https://supabase.com → **Start your project** → creá un proyecto
   (región: *South America (São Paulo)*; guardá la contraseña de la base en algún lado).
2. Menú izquierdo → **SQL Editor** → **New query**. Pegá todo el contenido de `supabase.sql` y tocá **Run**.
   Tiene que decir *Success*.
3. Menú izquierdo → **Authentication → Sign In / Providers → Email**:
   - Para no tener que confirmar mails, desactivá **Confirm email** (más cómodo entre amigos).
4. Menú izquierdo → **Project Settings → API** (o *API Keys*). Copiá:
   - **Project URL** (ej: `https://abcdefghijk.supabase.co`)
   - La clave **anon** o **publishable**. **Nunca** uses la `service_role` / `secret`: esa da acceso total.

## Paso 4 — Conectar la app

1. En GitHub, abrí `config.js` → ícono del lápiz (*Edit*) y completá:

   ```js
   window.OC_CONFIG = {
     supabaseUrl: "https://abcdefghijk.supabase.co",
     supabaseKey: "eyJhbGciOi...  (o sb_publishable_...)",
   };
   ```

2. **Commit changes**.
3. Abrí `sw.js`, cambiá `const VERSION = "oc-v1";` por `"oc-v2"` y hacé commit.
   (Cada vez que cambies algo, subí este número: así los teléfonos bajan la versión nueva.)
4. Cerrá y abrí la app dos veces en el teléfono para que tome el cambio.
5. Pestaña **Amigos** → poné tu nombre, email y contraseña → **Crear cuenta**.

Pasale la dirección a tus amigos: la instalan, crean su cuenta y aparecen en tu pestaña Amigos.

**Privacidad:** se suben solo tu nombre, tu meta y el total de kcal de cada día.
Lo que comiste en detalle, tus medidas y tus alimentos nunca salen del teléfono.
Cuando ya se hayan sumado todos, podés cerrar las altas nuevas en
*Authentication → Sign In / Providers → Allow new users to sign up* (desactivar).

---

## Cómo funciona sin internet

- Lo que cargás se guarda al instante en el teléfono.
- Si no hay internet, los totales quedan en cola. Cuando vuelve la conexión se suben solos
  (también cada 5 minutos o con **Actualizar ahora**).
- En Amigos ves los datos de la última vez que hubo conexión.

## Respaldo y pasar datos desde la versión de Claude

En **Alimentos → Tus datos**:
- **Descargar respaldo**: guarda todo en un archivo `.json`. Hacelo cada tanto: si borrás la app o los datos del navegador, se pierde lo guardado en el teléfono.
- **Importar respaldo**: suma los datos de un archivo. Sirve para pasar a otro teléfono
  o para traer lo que cargaste en la versión de Claude (allá también está **Descargar mis datos**).

## Para tocar el código (opcional)

- La base de alimentos está al principio de `app.js` (`BASE_FOODS`): `[nombre, kcal cada 100 g, "alias|alias", {unidad: gramos}, porción por defecto]`.
- Los datos locales están en `localStorage` con las claves `oc-data-v1` (comidas, medidas, alimentos) y `oc-meta-v1` (sincronización).
- Para probar en la compu: `python3 -m http.server 8000` dentro de la carpeta y abrir http://localhost:8000
- Consultas SQL útiles: hay una de ejemplo al final de `supabase.sql` (ranking semanal).
