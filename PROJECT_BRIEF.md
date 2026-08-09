# Brief de proyecto — TI.MO SOLUTIONS

> **Cómo usar este documento:** pégalo completo como primer mensaje en un chat
> nuevo de Claude Code, con esta carpeta (`TimoSolutions/`) como directorio de
> trabajo. Contiene todo el contexto necesario para construir un sitio web
> corporativo completo, con la misma arquitectura, calidad y nivel de detalle
> que el proyecto de referencia **Kate Joyería** (una tienda de joyería
> construida antes con este mismo método), pero adaptado 100% al nicho de
> **TI.MO SOLUTIONS**. No hace falta que quien lea esto haya visto el proyecto
> de Kate Joyería — todo lo relevante está explicado aquí.

---

## 1. Rol y objetivo

Actúa como Arquitecto de Software Senior, Diseñador UX/UI Senior, Desarrollador
Full Stack Senior y Especialista en SEO. El objetivo es construir una página
web corporativa **completa y lista para producción** (sin ejemplos, sin
pseudocódigo, sin páginas a medias) para:

- **Empresa:** TI.MO SOLUTIONS
- **Rubro:** mantenimiento, mejora, actualización (upgrade) y venta de
  software y hardware para computadores portátiles y de mesa.
- **Público objetivo:** personas y pequeñas empresas que necesitan reparar,
  optimizar o comprar equipos/repuestos/software, en Colombia.

El resultado debe sentirse **profesional, técnico y confiable** — no
"genérico" — como una empresa de tecnología seria en la que se puede confiar
el equipo de trabajo. Referencias de tono (sin copiar su diseño): páginas de
servicio técnico premium, tiendas de hardware boutique, consultoras IT
locales con buena imagen de marca.

---

## 2. Stack tecnológico (usar exactamente este, ya validado)

- **React 18** + **TypeScript** en modo estricto
- **Vite 5** como bundler
- **Tailwind CSS 3** para estilos
- **Framer Motion** para animaciones
- **React Router 6** para navegación
- **React Icons** para iconografía
- **react-helmet-async** para SEO por página
- **vite-plugin-pwa** para soporte PWA
- **Google Apps Script** como backend serverless para el formulario de
  contacto (guarda en Google Sheets) — sin backend tradicional
- **gh-pages** + **GitHub Actions** para publicar en GitHub Pages

`package.json` de referencia (mismas versiones que ya funcionaron):

```json
{
  "dependencies": {
    "framer-motion": "^11.2.10",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-helmet-async": "^2.0.5",
    "react-icons": "^5.2.1",
    "react-router-dom": "^6.24.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.13.1",
    "@typescript-eslint/parser": "^7.13.1",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "gh-pages": "^6.1.1",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.4.5",
    "vite": "^5.3.1",
    "vite-plugin-pwa": "^0.20.0"
  }
}
```

---

## 3. Estructura de carpetas (usar exactamente esta)

```
src/
  animations/     Variants reutilizables de Framer Motion (fadeUp, zoomIn, stagger...)
  components/
    common/       Button, Input, Textarea, Select, Loader, InitialLoader, Modal,
                   Toast, Breadcrumbs, Pagination, BackToTop, SEO, SectionHeading,
                   Badge, FAQAccordion
    layout/       Navbar (mega menú), Footer, MobileMenu
    shared/       WhatsAppButton, SocialLinks, GoogleMap, Newsletter
    home/         Secciones exclusivas de Inicio (Hero, Beneficios, Destacados...)
    product/      Card, Gallery, Filters, RelatedProducts (ver sección 6: catálogo)
  config/         site.ts (datos de marca, nav, whatsapp), catalog.ts (labels,
                   categorías activas, rango de precio)
  data/           JSON del catálogo y contenido (products.json, categories.json,
                   testimonials.json, faqs.json, benefits.json)
  hooks/          useDarkMode, useDebounce, useToast, useScrollPosition,
                   useScrollToTop, useLocalStorage, useOnClickOutside
  interfaces/     Contratos de componentes (navigation.ts, seo.ts, component-props.ts)
  layouts/        MainLayout (Navbar + Footer + Outlet + BackToTop + WhatsApp flotante)
  pages/          Home, About, Catalog, ProductDetail, Contact, NotFound
  services/       productRepository.ts (patrón repositorio), contactService.ts
  styles/         globals.css (variables de marca + estilos base)
  types/          Modelos de datos (product.ts, content.ts, contact.ts)
  utils/          cn.ts, whatsapp.ts, formatPrice.ts, validators.ts, assetUrl.ts,
                   shuffle.ts
public/
  images/         product/, categories/, hero/, banners/
  icons/          Íconos PWA (192, 512, apple-touch-icon)
  robots.txt, sitemap.xml, site.webmanifest, favicon.svg, 404.html
google-apps-script/
  Code.gs         Script que guarda el formulario en Google Sheets
  README.md       Guía paso a paso de configuración
.github/workflows/
  deploy.yml      Despliegue automático a GitHub Pages
```

**Patrón clave — repositorio de datos:** el catálogo se lee desde JSON local a
través de una interfaz `ProductRepository` (`getAll`, `getBySlug`,
`getFeatured`, `getBestSellers`, `getNewArrivals`, `getRelated`, `search`).
Esto dejará la puerta abierta para migrar a Firebase/Supabase más adelante
sin tocar ninguna página ni componente — solo se reemplaza la clase que
implementa la interfaz.

---

## 4. Identidad visual

### 4.1 Logo y paleta

En este proyecto todavía **no hay logo real**. Antes de generar la paleta de
colores:

1. Pregunta al usuario si tiene un logo (igual que en el proyecto de
   referencia, se coloca en una carpeta `resources/` en la raíz).
2. Si hay logo, analiza sus colores dominantes y basa la paleta en ellos.
3. Si NO hay logo todavía, propone una paleta profesional de tecnología —
   **no reutilices la paleta dorado/negro/rosa de Kate Joyería**, ese es un
   nicho de lujo/joyería y no encaja aquí. Sugerencia de partida para una
   empresa de servicios técnicos/IT (ajústala si el usuario da más contexto
   o un logo):

   | Token | Valor sugerido | Uso |
   |---|---|---|
   | `primary` | `#2563EB` (azul eléctrico) | Color de marca principal, CTAs |
   | `primary-dark` | `#1D4ED8` | Hover / estados activos |
   | `secondary` | `#0F172A` (azul-negro casi carbón) | Fondos oscuros, navbar, footer |
   | `accent` | `#22D3EE` (cian) | Acentos tecnológicos, badges, highlights |
   | `background` | `#FFFFFF` | Fondo |
   | `background-alt` | `#F1F5F9` | Fondo alterno (gris azulado claro) |
   | `border` | `#E2E8F0` | Bordes |
   | `success` / `error` / `warning` | verdes/rojo/ámbar estándar | Estados |

   Genera también la variante de modo oscuro para cada token, igual que en
   Kate Joyería (`globals.css` con `:root` y `:root.dark`, más los mismos
   tokens espejados en `tailwind.config.ts`).

### 4.2 Tipografías

En Kate Joyería se usó una combinación lujosa/serif (Playfair Display +
Cormorant Garamond + Poppins). Para TI.MO SOLUTIONS, que es una marca técnica
y de confianza (no de lujo), usa una combinación más moderna y "tech":

- **Encabezados:** `Space Grotesk` o `Sora` (geométrica, técnica, con
  carácter — mejor que una serif clásica para este nicho)
- **Texto general:** `Inter` o `Poppins` (ya se usó Poppins en el proyecto de
  referencia y funciona bien también aquí)

Ambas se cargan igual que antes: vía Google Fonts en `index.html` con
`preconnect`, y registradas en `tailwind.config.ts` como `font-display` y
`font-sans`.

### 4.3 Identidad a transmitir

Confianza, eficiencia, soporte técnico real, honestidad en precios,
garantía. Nada de imágenes "de stock" genéricas de gente sonriendo frente a
laptops — mejor fotografía/ilustración de equipos, componentes, diagnósticos,
y del propio taller/técnicos si el cliente los provee.

---

## 5. Páginas requeridas

Igual de completas que en el proyecto de referencia — cada una con SEO
(`<SEO>` + `react-helmet-async`), animaciones con Framer Motion, y 100%
responsive.

### 5.1 Inicio (`/`)

- Hero grande con imagen/fondo de marca, título fuerte, botón "Ver catálogo"
  y botón WhatsApp.
- **Carrusel circular de productos/servicios aleatorios** en el hero (patrón
  ya construido en Kate Joyería: `HeroProductCarousel.tsx` — rota cada ~4s
  entre ítems aleatorios de categorías activas, solo imagen + nombre, marco
  circular elegante). Adaptar el motivo decorativo (círculo+diamante en Kate
  Joyería) a algo más técnico: por ejemplo un hexágono o círculo con un
  ícono de circuito.
- Presentación de la empresa (quiénes somos, resumida).
- Beneficios/diferenciales: ejemplos para este nicho — "Diagnóstico sin
  costo", "Técnicos certificados", "Repuestos originales o compatibles con
  garantía", "Servicio a domicilio / recogida y entrega", "Garantía por
  escrito en cada servicio".
- Productos/servicios destacados (grid de cards).
- Categorías (grid con navegación a catálogo filtrado).
- Banner promocional.
- Testimonios de clientes.
- Preguntas frecuentes.
- Call To Action final.
- Footer completo.

### 5.2 Nosotros (`/nosotros`)

Historia, misión, visión, valores, compromiso, calidad, garantía — mismas
secciones que Kate Joyería (`About.tsx`), pero el copy debe hablar de
experiencia técnica, tiempos de respuesta, certificaciones, y confianza en
el manejo de los equipos de los clientes (dato sensible: sus archivos y
equipos).

### 5.3 Catálogo (`/catalogo`)

Este es el punto donde más diverge del proyecto de referencia porque el
"catálogo" de TI.MO mezcla **servicios** (mantenimiento, formateo,
actualización de RAM/SSD, instalación de software, limpieza física,
diagnóstico) y **productos** (laptops, PCs de escritorio, repuestos,
periféricos, licencias de software).

Recomendación de modelo de datos — extiende el `Product` de referencia así:

```ts
export type ItemType = "servicio" | "producto";

export type ServiceCategory =
  | "mantenimiento"
  | "reparacion"
  | "actualizacion-hardware"
  | "instalacion-software"
  | "formateo-y-optimizacion"
  | "recuperacion-de-datos";

export type ProductCategory =
  | "laptops"
  | "computadores-de-escritorio"
  | "repuestos"
  | "perifericos"
  | "software-y-licencias"
  | "accesorios";

// Unión de ambas para el filtro de "categoría" en el catálogo
export type CatalogCategory = ServiceCategory | ProductCategory;

export interface CatalogItem {
  id: string;
  slug: string;
  type: ItemType;              // servicio | producto
  category: CatalogCategory;
  name: string;
  brand?: string;               // HP, Dell, Lenovo, Kingston, etc. (solo productos)
  price: number;                 // precio fijo o "desde"
  priceType: "fijo" | "desde" | "cotizar"; // servicios muchas veces son "desde" o "a cotizar"
  compareAtPrice?: number;
  description: string;
  shortDescription: string;
  features: string[];            // qué incluye / especificaciones técnicas
  duration?: string;              // solo servicios: "30-45 min", "1-2 días hábiles"
  warranty?: string;               // "3 meses de garantía", "Garantía de fábrica 12 meses"
  images: string[];
  available: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  stock?: number;                  // solo aplica a productos físicos
  createdAt: string;
  sku: string;
  relatedIds?: string[];
}
```

Filtros del catálogo (adaptar `ProductFilters.tsx`):

- **Tipo:** Servicios / Productos (o ambos)
- **Categoría:** según `CatalogCategory` (solo mostrar categorías con
  `enabled: true`, ver sección 7)
- **Marca:** para productos (HP, Dell, Lenovo, Asus, Kingston, etc.) —
  generar dinámicamente desde los productos existentes, no hardcodeado
- **Precio máximo:** igual que antes (slider)
- **Búsqueda:** por nombre/descripción
- **Ordenar por:** Más vendidos, Más recientes, Menor precio, Mayor precio

Cada card de catálogo (`ProductCard.tsx` adaptado): imagen, nombre, tipo
(badge "Servicio" o "Producto"), precio (con prefijo "Desde" cuando
`priceType === "desde"`, o "Cotizar" cuando `priceType === "cotizar"` en vez
de un número), descripción corta, disponibilidad, botón WhatsApp y botón
"Ver más".

### 5.4 Detalle de producto/servicio (`/producto/:slug` o `/servicio/:slug`)

Puedes usar una sola ruta `/catalogo/:slug` para ambos tipos y renderizar
condicionalmente. Debe incluir:

- Galería con zoom (igual que `ProductGallery.tsx`)
- Descripción completa
- Características / qué incluye
- Si es servicio: duración estimada, garantía, qué se necesita llevar
  (ej. "trae tu equipo y el cargador")
- Si es producto: marca, especificaciones técnicas, disponibilidad/stock
- Productos o servicios relacionados (mismo patrón `RelatedProducts.tsx`)
- Botón grande "Cotizar/Comprar por WhatsApp" con mensaje contextual

### 5.5 Contacto (`/contacto`)

Formulario elegante con validaciones completas → Google Sheets (idéntico al
patrón de Kate Joyería, ver sección 8). Campos sugeridos: Nombre, Apellido,
Correo, Celular, Ciudad, **Tipo de equipo** (opcional: portátil/escritorio),
Mensaje. Mapa de Google Maps con la ubicación del taller/oficina. Redes
sociales. Debe mostrar "Mensaje enviado correctamente." al enviar.

### 5.6 404

Igual que en Kate Joyería: página elegante con enlace de vuelta al inicio.

---

## 6. WhatsApp — mensajes contextuales

Mismo patrón que el proyecto de referencia: un botón de WhatsApp flotante
global + botones contextuales en cada sección, cada uno con un mensaje
distinto pre-armado (`buildWhatsAppUrl` + `WHATSAPP_MESSAGES` en
`config/site.ts`). Ejemplos para este nicho:

```ts
export const WHATSAPP_MESSAGES = {
  general: "Hola, quiero información sobre los servicios de TI.MO SOLUTIONS.",
  catalogo: "Hola, quiero conocer el catálogo de productos y servicios.",
  servicio: (nombre: string) =>
    `Hola, quiero cotizar este servicio: ${nombre}.`,
  producto: (nombre: string) =>
    `Hola, deseo información sobre este producto: ${nombre}.`,
  compra: (nombre: string) =>
    `Hola, quiero comprar: ${nombre}. ¿Me ayudas con el proceso?`,
  soporteUrgente: "Hola, tengo un problema urgente con mi equipo, ¿me pueden ayudar?",
  contacto: "Hola, vi la página de TI.MO SOLUTIONS y quiero más información.",
};
```

Pide al usuario el número real de WhatsApp de la empresa antes de
implementar (en Kate Joyería el número real era +57 311 301 5301 — **no
asumas que es el mismo para TI.MO SOLUTIONS**, pregúntalo).

---

## 7. Patrón de categorías activas/inactivas (muy importante)

Este fue uno de los patrones más útiles del proyecto de referencia: dejar
**todas** las categorías/productos definidos en el código desde el día uno,
pero controlar cuáles se muestran con un solo booleano por categoría.

En `src/data/categories.json`, cada categoría tiene:

```json
{
  "id": "c1",
  "name": "Mantenimiento",
  "slug": "mantenimiento",
  "image": "/images/categories/mantenimiento.jpg",
  "description": "...",
  "enabled": true
}
```

Un helper centralizado en `src/config/catalog.ts` (`ENABLED_CATEGORIES`,
`ENABLED_CATEGORY_SLUGS`, `isCategoryEnabled()`) filtra **todo**: el menú de
navegación (mega menú dinámico, no hardcodeado), la sección de categorías
del inicio, los checkboxes de filtro del catálogo, y — el punto más
importante — el propio `productRepository`, que debe filtrar TODOS sus
métodos (`getAll`, `search`, `getFeatured`, etc.) por categorías activas
antes de devolver cualquier resultado. Así, un producto de una categoría
desactivada nunca aparece en ningún lado del sitio, sin importar sus otros
campos.

Pregúntale al usuario **qué servicios/productos están realmente activos y a
la venta hoy** y deja el resto con `"enabled": false`, listo para activar
después cambiando un solo valor.

---

## 8. Formulario de contacto → Google Sheets (Google Apps Script)

Mismo patrón exacto que Kate Joyería, reutilizable casi sin cambios:

- `src/services/contactService.ts`: hace `fetch` con
  `Content-Type: text/plain` (evita preflight CORS) a la URL de un Google
  Apps Script publicado como Web App. Incluye fecha, hora, y la IP del
  visitante (vía `api.ipify.org`, con fallback silencioso si falla).
- `google-apps-script/Code.gs`: recibe el POST, y con `appendRow` guarda la
  fila en una pestaña de Google Sheets (creándola con encabezados si no
  existe). Soporta también un segundo "tipo" de submission para newsletter
  si se agrega un formulario de suscripción.
- `google-apps-script/README.md`: guía paso a paso para el usuario (crear
  hoja de cálculo → Extensiones → Apps Script → pegar código → Implementar
  como aplicación web → "Cualquier usuario" → copiar URL → pegarla en
  `.env` como `VITE_GOOGLE_SHEETS_ENDPOINT`).
- `.env.example` con `VITE_GOOGLE_SHEETS_ENDPOINT` y `VITE_WHATSAPP_NUMBER`.

---

## 9. SEO

- Meta tags, Open Graph y Twitter Cards en `index.html` (estáticos) y por
  página vía el componente `SEO.tsx` + `react-helmet-async`.
- `robots.txt` y `sitemap.xml` en `public/`.
- Datos estructurados JSON-LD. Para este nicho, el tipo de schema.org más
  adecuado es `LocalBusiness` (genérico y muy soportado) o, si se quiere más
  específico, combinar con `ElectronicsStore` para la parte de venta de
  hardware. Ejemplo:

  ```json
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "TI.MO SOLUTIONS",
    "image": "https://.../logo.png",
    "url": "https://...",
    "telephone": "+57...",
    "priceRange": "$$",
    "address": { "@type": "PostalAddress", "addressCountry": "CO" }
  }
  ```

- URLs canónicas por página, `noindex` disponible vía prop en `<SEO>`.

---

## 10. Publicación en GitHub Pages — leer con atención

Esta sección documenta problemas reales que aparecieron al desplegar el
proyecto de referencia, para no repetirlos.

### 10.1 Primero decide el tipo de repositorio

Antes de tocar `vite.config.ts`, pregúntale al usuario (o revisa) **cómo se
llama el repositorio de GitHub que va a usar**:

- Si el repo se llama **exactamente** `tu-usuario.github.io` (repositorio de
  usuario/organización): GitHub Pages publica en la **raíz** del dominio
  (`https://tu-usuario.github.io/`), **sin subcarpeta**.
- Si el repo tiene **cualquier otro nombre** (ej. `timosolutions`):
  GitHub Pages publica bajo un subpath
  (`https://tu-usuario.github.io/timosolutions/`).

Esto cambia dos archivos, y equivocarse rompe silenciosamente todas las
imágenes y rutas en producción (pasó en el proyecto de referencia — el sitio
cargaba pero todas las imágenes daban 404):

**`vite.config.ts`:**
```ts
// Repo tipo "usuario.github.io" (raíz, sin subpath):
export default defineConfig(() => ({
  base: "/",
  ...
}));

// Repo con nombre propio (con subpath):
const REPO_NAME = "timosolutions";
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? `/${REPO_NAME}/` : "/",
  ...
}));
```

**`public/404.html`** (técnica de redirección SPA para GitHub Pages, ver
`rafgraph/spa-github-pages`): la variable `pathSegmentsToKeep` debe ser
`0` para repos tipo "raíz", o `1` para repos con subpath. Debe ir acompañada
de un script equivalente en `index.html` que restaura la ruta con la
History API antes de que React Router se inicialice. **Copiar el patrón
completo tal como está en el proyecto de referencia** (`public/404.html` +
el script en el `<body>` de `index.html`) — es un mecanismo delicado y ya
está probado.

### 10.2 Regla de oro para imágenes referenciadas como texto

**Cualquier imagen referenciada como string** en un componente React o en un
JSON de datos (no vía `import`) — logo, hero, fotos de catálogo — **rompe en
producción si el sitio se publica bajo un subpath**, porque Vite solo
reescribe automáticamente las rutas de `public/` dentro de `index.html`, no
las que están en componentes o JSON.

Solución obligatoria desde el inicio: crear `src/utils/assetUrl.ts`

```ts
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}
```

y envolver **todo** `src={...}` de imágenes de `public/` con `assetUrl(...)`
desde el primer componente que se escriba (logo en Navbar/Footer, hero,
categorías, cards de producto, galería). No dejarlo para el final — en el
proyecto de referencia se detectó tarde, tras probar el build de producción,
y hubo que corregir ~10 archivos.

**Verificación obligatoria antes de dar el proyecto por terminado:**
`npm run build && npm run preview`, y probar navegando exactamente bajo el
mismo `base` con el que se publicará (usar Playwright o el navegador, no
asumir que si funciona en `npm run dev` funciona en producción — no es lo
mismo).

### 10.3 GitHub Actions

Reutilizar tal cual `.github/workflows/deploy.yml` del proyecto de
referencia: build con `npm ci && npm run build` (pasando los secrets
`VITE_GOOGLE_SHEETS_ENDPOINT` y `VITE_WHATSAPP_NUMBER` como env vars),
`actions/configure-pages`, `actions/upload-pages-artifact`,
`actions/deploy-pages`. El usuario debe activar en GitHub
`Settings → Pages → Source: GitHub Actions`.

### 10.4 Cuentas de GitHub — problema real que puede repetirse

Si el `git push` falla con `403 Permission denied to <otro-usuario>`, no es
un problema de código: Windows guarda una credencial cacheada de Git para
`github.com` (visible con `cmdkey /list`) asociada a una cuenta distinta a
la del repositorio. Dos soluciones, sin tocar el proyecto:
1. Agregar la cuenta que aparece en el error como colaboradora del repo
   (Settings → Collaborators, aceptar la invitación), o
2. Borrar la credencial cacheada (`cmdkey /delete:git:https://github.com`) y
   volver a iniciar sesión con la cuenta correcta en el próximo `git push`.

---

## 11. Errores ya vistos y cómo evitarlos desde el inicio

Checklist de bugs reales encontrados construyendo el proyecto de
referencia — implementar ya con la corrección aplicada, no como "arreglo
posterior":

1. **Framer Motion `whileInView` + listas que cambian (paginación, filtros,
   "relacionados" al navegar entre fichas):** si un `motion.div` usa
   `whileInView="visible"` con `viewport={{ once: true }}` y luego sus hijos
   cambian de `key` (nueva página, nuevo producto), el contenido nuevo
   puede quedar invisible (opacity 0) porque la animación "ya se gastó" en
   el primer render y no se repite para hijos nuevos montados después. En
   cualquier grid cuyo contenido pueda cambiar después del montaje inicial
   (catálogo paginado, "productos relacionados"), usar
   `initial="hidden" animate="visible"` (sin `whileInView`) y agregar un
   `key` al contenedor atado al estado que cambia (página, filtros, slug del
   producto), para forzar un remonte limpio y que la animación se dispare
   cada vez. Reservar `whileInView` solo para secciones estáticas que no
   cambian tras el montaje (beneficios, testimonios, etc.).

2. **Campos tipo "enum" (categoría, material/marca) con texto libre:** si el
   modelo de datos define un campo como unión estricta de TypeScript (ej.
   `ProductMaterial = "oro" | "plata" | ...`) y luego el JSON de datos usa un
   valor que no está en esa unión (typo, texto libre, mayúscula distinta),
   TypeScript no lo va a atrapar en un archivo `.json` (solo en `.ts`), y en
   runtime cualquier `Record<Enum, string>[valor]` devuelve `undefined` en
   silencio — el campo se ve vacío en la UI sin ningún error en consola. Es
   peor todavía si el campo mal escrito es la **categoría**, porque también
   controla el filtro de categorías activas (sección 7): un producto con
   `category` mal escrita desaparece de **todo** el sitio sin ningún error.
   Mitigación: al escribir cada entrada nueva de catálogo, verificar los
   valores contra las uniones de `types/product.ts` antes de guardar: correr
   un chequeo rápido (ej. un script que valide cada `category`/`material`
   contra el `Record` de labels) después de cualquier edición grande del
   JSON de datos.

3. **Imágenes de cámara/celular sin optimizar:** fotos subidas directo desde
   el celular pueden pesar 600-900 KB en resoluciones de 3000x3000px o más.
   Esto se percibe como "la imagen no carga" en conexiones lentas, aunque el
   archivo esté perfectamente bien. Redimensionar todo a un máximo razonable
   (~1600px en el lado más largo) y comprimir (JPEG calidad ~80-85) antes de
   subir cualquier foto real al catálogo.

4. **Overlap de contenido con el navbar fijo:** el `Navbar` es
   `position: fixed`. Páginas que no tienen un hero de imagen completa detrás
   (Catálogo, Contacto, ficha de producto) necesitan padding-top explícito
   (`pt-32` aprox.) en su primera sección para que el título/breadcrumb no
   quede tapado por el navbar. Verificarlo visualmente en cada página nueva,
   no asumir que el mismo layout que funciona en el Inicio (con hero) funciona
   en las demás.

5. **Probar SIEMPRE con el build de producción**, no solo con `npm run dev`.
   Varios de los bugs anteriores (rutas de imágenes, base path) solo
   aparecen en `npm run build && npm run preview`, nunca en desarrollo.

---

## 12. Verificación antes de entregar

Igual que en el proyecto de referencia, antes de dar el trabajo por
terminado:

1. `npm run build` sin errores de TypeScript.
2. `npm run lint` sin errores ni warnings.
3. Levantar el sitio (dev o preview) y navegar con un navegador automatizado
   (Playwright vía `npx playwright install chromium`, o el navegador real)
   por **todas** las páginas, revisando la consola en busca de errores.
4. Probar específicamente: paginación del catálogo ida y vuelta, cambio de
   filtros/orden, navegación entre fichas de producto/servicio relacionados,
   envío del formulario de contacto, menú móvil, modo oscuro, y el build de
   producción bajo el `base` real de despliegue (ver sección 10.2).
5. Capturar pantallas (desktop y mobile) para revisión visual — no dar por
   bueno un componente solo porque compila.

---

## 13. Información que debes pedirle al usuario antes/durante el desarrollo

No asumas estos datos — pregúntalos (igual que se preguntó el número de
WhatsApp real y se descubrió el handle de Instagram real en el proyecto de
referencia a partir de fotos de empaque):

- [ ] Logo de la empresa (colocarlo en `resources/`) o, si no hay, confirmar
      que se debe proponer una paleta desde cero (ver sección 4.1).
- [ ] Número de WhatsApp real de la empresa.
- [ ] Nombre exacto del repositorio de GitHub que va a usar (define el tipo
      de despliegue, ver sección 10.1).
- [ ] Redes sociales reales (Instagram, Facebook, TikTok) — confirmar
      handles exactos, no asumir que coinciden con el nombre de la empresa.
- [ ] Correo de contacto real.
- [ ] Dirección / ciudad(es) donde prestan servicio, y si hacen recogida y
      entrega a domicilio.
- [ ] Listado real de servicios y productos activos hoy (con precios,
      fotos, duración estimada de cada servicio, garantías) — el resto se
      deja cargado en el código pero desactivado (sección 7) hasta que el
      cliente confirme que están listos para publicarse.
- [ ] Horario de atención.
- [ ] Si ya tienen una cuenta de Google (Gmail) para conectar el formulario
      de contacto a Google Sheets.

---

## 14. Qué NO hacer

- No reutilices la paleta dorado/negro/rosa ni las tipografías serif de Kate
  Joyería — este es un nicho distinto y debe sentirse distinto.
- No dejes componentes o páginas a medio hacer "para después".
- No generes URLs, handles de redes sociales o números de teléfono
  inventados — pregúntalos o dilos explícitamente como placeholders que el
  usuario debe reemplazar.
- No publiques nada a GitHub (push, creación de repos) sin que el usuario lo
  pida explícitamente.
- No asumas el nombre del repositorio — confírmalo antes de configurar
  `vite.config.ts` y `404.html` (sección 10.1), para no repetir el bug de
  rutas rotas en producción.
