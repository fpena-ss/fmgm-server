# Inicio Rápido

Esta guía explica cómo poner en marcha el proyecto FMGM completo en un entorno de desarrollo local.

---

## Prerrequisitos

| Herramienta | Versión mínima | Verificar |
|-------------|----------------|-----------|
| Node.js | 20.x – 24.x | `node -v` |
| pnpm | cualquier versión reciente | `pnpm -v` |
| Git | cualquier versión | `git --version` |

> No se requiere ninguna base de datos adicional para desarrollo: Strapi usa SQLite por defecto.

---

## 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd FMGM
```

---

## 2. Configurar el backend (`fmgm-server`)

### 2.1 Instalar dependencias

```bash
cd fmgm-server
pnpm install
```

### 2.2 Crear el archivo `.env`

Copia el archivo de ejemplo y completa los valores:

```bash
cp .env.example .env
```

Edita `.env` y reemplaza los valores marcados como `toBeModified` o `tobemodified`:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="clave1aleatoria,clave2aleatoria"
API_TOKEN_SALT=unvalorrandom32chars
ADMIN_JWT_SECRET=otrosecretorandom
TRANSFER_TOKEN_SALT=otrosaltaleatorio
JWT_SECRET=secretparajwt
ENCRYPTION_KEY=clavecifrado
```

> Para generar claves seguras puedes usar: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

### 2.3 Iniciar el servidor en modo desarrollo

```bash
pnpm dev
```

Strapi estará disponible en:
- **Admin Panel**: `http://localhost:1337/admin`
- **REST API**: `http://localhost:1337/api`

La primera vez que inicia, Strapi solicitará crear una cuenta de administrador en el browser.

---

## 3. Configurar el frontend (`fmgm-ui`)

### 3.1 Instalar dependencias

Desde la raíz del monorepo:

```bash
cd ../fmgm-ui
pnpm install
```

### 3.2 Crear el archivo `.env`

```bash
cp .env.example .env
```

El archivo `.env` solo necesita una variable:

```env
VITE_API_URL=http://localhost:1337
```

> Asegúrate de que la URL **no tenga barra al final**.

### 3.3 Iniciar el servidor de desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en: `http://localhost:5173`

---

## 4. Configurar permisos en Strapi

Por defecto, Strapi no expone ningún endpoint públicamente. Debes habilitar los permisos para el rol `Public`.

1. Accede al Admin Panel: `http://localhost:1337/admin`
2. Ve a **Settings → Users & Permissions Plugin → Roles → Public**
3. Habilita el permiso `find` (y `findOne` donde aplique) para los siguientes content types:

| Content Type | Permisos requeridos |
|--------------|-------------------|
| `About-us` | `find` |
| `Contact-us` | `find` |
| `Footer` | `find` |
| `Header-menu` | `find` |
| `Inicio` | `find` |
| `Linea` | `find`, `findOne` |
| `Pagina` | `find`, `findOne` |
| `Producto` | `find`, `findOne` |
| `Proyecto` | `find`, `findOne` |
| `Theme` | `find` |
| `Tienda` | `find` |

4. Haz clic en **Save**.

---

## 5. Crear contenido inicial

Para que el frontend muestre algo, es necesario crear contenido en Strapi:

1. **Header Menu** — ve a *Content Manager → Header Menu* y crea el menú de navegación.
2. **Inicio** — crea la página de inicio con al menos un componente en el campo `Body`.
3. **Footer** — configura el pie de página.
4. **Theme** — define los colores del tema (primario, secundario, etc.).

> Recuerda hacer clic en **Publish** (no solo Save) en cada contenido para que sea visible en la API pública.

---

## 6. Flujo de trabajo típico

```bash
# Terminal 1 — Backend
cd fmgm-server && pnpm dev

# Terminal 2 — Frontend
cd fmgm-ui && pnpm dev
```

Ambos servidores soportan **hot reload**: los cambios en Strapi (excepto esquemas) se reflejan de inmediato; los cambios en el frontend también.

> Cuando modificas un schema de Strapi (añadir campo, nuevo content type), el servidor se reinicia automáticamente y regenera los tipos.

---

## 7. Comandos disponibles

### `fmgm-server`

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia en modo desarrollo con hot reload |
| `pnpm build` | Compila para producción |
| `pnpm start` | Inicia el servidor compilado (producción) |

### `fmgm-ui`

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo Vite |
| `pnpm build` | Compila para producción (`dist/`) |
| `pnpm preview` | Sirve el build de producción localmente |
| `pnpm lint` | Ejecuta ESLint |

---

## Solución de problemas frecuentes

### El frontend muestra "Error" o pantalla en blanco

- Verifica que Strapi esté corriendo en `localhost:1337`.
- Verifica que `VITE_API_URL` en el `.env` del frontend sea correcta y sin barra al final.
- Verifica que los permisos del rol `Public` estén habilitados (paso 4).

### 404 en algún endpoint de la API

- El content type probablemente no tiene el permiso `find` habilitado para el rol `Public`.
- El contenido podría no estar publicado (en estado borrador).

### El mapa de Leaflet no renderiza correctamente

- Es un problema conocido con los estilos de Tailwind. El proyecto ya incluye el fix en `src/index.css`.
- Si persiste, verifica que `src/index.css` se importe en `main.tsx`.
