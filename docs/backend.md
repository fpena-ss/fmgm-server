# Backend — Strapi

El backend usa **Strapi 5** como CMS headless. Expone una API REST automática consumida por el frontend.

- Código fuente: `fmgm-server/`
- Admin Panel: `http://localhost:1337/admin`
- API base: `http://localhost:1337/api`

---

## Content Types

Los content types se definen en `fmgm-server/src/api/<nombre>/content-types/<nombre>/schema.json`.

### Single Types

Los Single Types son páginas o configuraciones únicas (no colecciones).

---

#### `inicio` — Página de Inicio

Ruta de API: `GET /api/inicio`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `Body` | Dynamic Zone | Bloques de contenido de la página (ver [Dynamic Zones](../../fmgm-ui/docs/dynamic-zones.md)) |

---

#### `tienda` — Configuración de la Tienda

Ruta de API: `GET /api/tienda`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `titulo` | String (requerido) | Título de la tienda |
| `descripcion` | Rich Text (Blocks) | Descripción introductoria |
| `whatsappNumero` | String (requerido) | Número de WhatsApp para contacto (con código de país, ej: `573001234567`) |
| `whatsappMensaje` | String | Mensaje por defecto al contactar por WhatsApp |
| `vista` | Enum (`grid`, `compacto`, `lista`) | Vista por defecto del catálogo de productos |
| `Body` | Dynamic Zone | Bloques de contenido adicionales |

---

#### `about-us` — Nosotros

Ruta de API: `GET /api/about-us`

Contiene información institucional con secciones configurables mediante Dynamic Zone en el campo `Body`.

---

#### `contact-us` — Contacto

Ruta de API: `GET /api/contact-us`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `image` | Media | Imagen principal de la página |
| `contactInfo` | Componente `forms.contact-info` | Datos de contacto (dirección, teléfono, imagen) |
| `Body` | Dynamic Zone | Bloques adicionales |

---

#### `footer` — Pie de Página

Ruta de API: `GET /api/footer`

Configura el footer del sitio: logo, información legal, redes sociales y links de pie de página.

---

#### `header-menu` — Menú de Navegación

Ruta de API: `GET /api/header-menu`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `logo` | Media | Logo del sitio |
| `links` | Componente `menu.link` (repetible) | Ítems del menú de navegación |

---

#### `theme` — Tema Visual

Ruta de API: `GET /api/theme`

Define los colores del tema del sitio (color primario, secundario, fondo, etc.) que se aplican como variables CSS.

---

### Collection Types

Los Collection Types son colecciones de registros, cada uno con su propia entrada.

---

#### `linea` — Líneas de Proyectos

Ruta de API: `GET /api/lineas`, `GET /api/lineas?filters[slug][$eq]=<slug>`

Representa una línea estratégica de la fundación. Cada línea puede tener múltiples proyectos asociados.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | String (requerido) | Nombre de la línea |
| `slug` | UID (auto, basado en `nombre`) | Identificador único para la URL |
| `descripcion` | Rich Text (Blocks) | Descripción de la línea |
| `imagen` | Media (imagen) | Imagen representativa |
| `orden` | Integer (default: 0) | Orden de aparición en listas |
| `proyectos` | Relación `oneToMany` → `proyecto` | Proyectos pertenecientes a esta línea |
| `Body` | Dynamic Zone | Contenido adicional configurable |

---

#### `proyecto` — Proyectos

Ruta de API: `GET /api/proyectos?filters[linea][slug][$eq]=<slug>`

Proyecto perteneciente a una línea.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | String | Nombre del proyecto |
| `descripcion` | Rich Text (Blocks) | Descripción del proyecto |
| `imagenes` | Media múltiple | Galería de imágenes del proyecto |
| `linea` | Relación `manyToOne` → `linea` | Línea a la que pertenece |
| `orden` | Integer | Orden dentro de la línea |

---

#### `producto` — Productos

Ruta de API: `GET /api/productos`

Productos disponibles en la tienda.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | String (requerido) | Nombre del producto |
| `descripcion` | Rich Text (Blocks, requerido) | Descripción del producto |
| `precio` | Decimal (requerido) | Precio en pesos colombianos (COP) |
| `imagenes` | Media múltiple (imágenes y videos) | Galería multimedia del producto |
| `destacado` | Boolean (default: `false`) | Si `true`, aparece primero en la lista |
| `slug` | UID (auto, basado en `nombre`) | Identificador único |
| `hayStock` | Boolean (default: `true`) | Si `false`, muestra badge "Sin stock" pero el producto sigue visible |
| `disponible` | Boolean (default: `true`) | Si `false`, el producto queda completamente oculto en la UI |

> **Lógica de visibilidad**: `disponible: false` oculta el producto del catálogo. `hayStock: false` lo muestra pero con un indicador visual de "Sin stock" y deshabilitado para comprar.

---

#### `pagina` — Páginas Genéricas

Ruta de API: `GET /api/paginas?filters[slug][$eq]=<slug>`

Páginas completamente configurables desde el admin, sin necesidad de tocar código.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `titulo` | String (requerido) | Título de la página (se usa para generar el slug) |
| `slug` | UID (auto, basado en `titulo`) | Identificador en la URL: `/p/<slug>` |
| `Body` | Dynamic Zone | Todos los componentes de contenido disponibles |

---

## Componentes Strapi

Los componentes son bloques reutilizables que pueden usarse dentro de los content types. Se definen en `fmgm-server/src/components/`.

### `sections.*` — Secciones de contenido

Usados principalmente en el campo `Body` (Dynamic Zone) de todas las páginas.

| Componente | Descripción |
|------------|-------------|
| `sections.section` | Sección genérica: título, texto rich text, imágenes/videos y links de acción |
| `sections.silder-section` | Slider de tarjetas con imagen, texto y link |
| `sections.media-slider` | Slide de un único medio (imagen o video) con texto y link superpuestos |
| `sections.text-slider-section` | Slider de bloques solo texto |
| `sections.lista-productos` | Muestra el catálogo de productos con vista configurable |
| `sections.galeria-documentos` | Galería de documentos PDF descargables |
| `sections.formulario-embebido` | Formulario externo embebido (Google Forms, Microsoft Forms, etc.) |
| `sections.mapa` | Mapa interactivo (Leaflet/OpenStreetMap) o iframe embebido |

> Todos los componentes de sección admiten un campo `anchorId` para enlace directo desde el menú. Ver [Dynamic Zones](../../fmgm-ui/docs/dynamic-zones.md).

### `menu.*` — Menú de navegación

| Componente | Descripción |
|------------|-------------|
| `menu.link` | Ítem de menú: título, URL, tipo de navegación (`internal`, `anchor`, `external`, `dropdown`) |
| `menu.dropdown-item` | Sub-ítem para menús desplegables: título, URL, `openInNewTab` |

#### Tipos de navegación (`navType`) en `menu.link`

| Valor | Comportamiento |
|-------|---------------|
| `internal` | Navegación SPA interna usando TanStack Router |
| `anchor` | Scroll suave hacia un `#anchorId` en la misma página o navega a inicio y hace scroll |
| `external` | Abre en nueva pestaña (`target="_blank"`) |
| `dropdown` | Muestra un menú desplegable con los `subItems` configurados |

### `footer.*` — Pie de página

| Componente | Descripción |
|------------|-------------|
| `footer.footer` | Estructura principal del footer |
| `footer.info-link` | Link informativo en el footer |
| `footer.legal-info` | Información legal con links a políticas |

### `forms.*` — Formularios y datos de contacto

| Componente | Descripción |
|------------|-------------|
| `forms.contact-info` | Datos de contacto: dirección, teléfono, imagen |
| `forms.links` | Links asociados a un formulario |
| `forms.user-info` | Información de usuario para formularios |

### `about.*` — Secciones "Nosotros"

| Componente | Descripción |
|------------|-------------|
| `about.indexed-section` | Sección numerada para la página "Nosotros" |
| `about.video-embed` | Embed de video para la página "Nosotros" |

---

## API REST — Referencia de endpoints

Todos los endpoints siguen el patrón REST de Strapi 5. Los medios se sirven en `<VITE_API_URL>/uploads/...`.

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/inicio` | Página de inicio |
| `GET` | `/api/tienda` | Configuración de la tienda |
| `GET` | `/api/productos` | Lista de productos (con filtros, paginación) |
| `GET` | `/api/about-us` | Página "Nosotros" |
| `GET` | `/api/contact-us` | Página de contacto |
| `GET` | `/api/footer` | Configuración del footer |
| `GET` | `/api/header-menu` | Menú de navegación |
| `GET` | `/api/theme` | Tema visual |
| `GET` | `/api/lineas` | Lista de líneas de proyectos |
| `GET` | `/api/proyectos` | Lista de proyectos (filtrar por `linea.slug`) |
| `GET` | `/api/paginas` | Lista/búsqueda de páginas genéricas (filtrar por `slug`) |

### Parámetros comunes

```
# Populate de relaciones
?populate[logo][fields]=url,alternativeText

# Filtros
?filters[slug][$eq]=mi-slug
?filters[disponible][$ne]=false

# Ordenamiento
?sort=orden:asc,nombre:asc

# Paginación
?pagination[page]=1&pagination[pageSize]=25
```

---

## Plugin local: Color Picker

El proyecto incluye un plugin local en `fmgm-server/src/plugins/color-picker/` que agrega un campo de tipo "color picker" (`react-colorful`) al editor de Strapi. Se usa en el content type `Theme` para seleccionar colores visualmente.

---

## Agregar un nuevo content type

1. En el Admin Panel de Strapi, ve a **Content-Type Builder**.
2. Crea el nuevo tipo (Single Type o Collection Type) con sus campos.
3. Strapi genera automáticamente el schema en `src/api/<nombre>/content-types/<nombre>/schema.json`.
4. Habilita el permiso `find` para el rol `Public` en **Settings → Roles → Public**.
5. Crea el servicio, query hook e interfaces en el frontend. Ver [Guía de desarrollo](../../fmgm-ui/docs/guia-desarrollo.md).
