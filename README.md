# RouteGo 🚐💨 — Sistema de Transporte Universitario Inteligente

> Aplicación móvil desarrollada con **React Native**, **Expo Router v6** (Expo SDK 54) y **TypeScript**, implementando patrones avanzados de navegación File-based Routing: pestañas inferiores (*Tabs*), navegación jerárquica (*Stack*), vistas modales y rutas dinámicas con lectura de parámetros en tiempo real para el campus UniGuajira en Riohacha.

---

## 🎯 Objetivos de Aprendizaje

- [x] **File-based Routing**: Estructuración del árbol de navegación mediante el sistema de archivos en el directorio `app/`.
- [x] **Patrones Híbridos de Navegación**: Coexistencia armónica de pestañas inferiores (*Bottom Tabs*), navegación jerárquica con botón de regreso (*Stack*) y ventanas modales (*Modals*).
- [x] **Rutas Dinámicas (`[id].tsx`)**: Paso y captura de identificadores únicos entre pantallas mediante el hook `useLocalSearchParams`.
- [x] **Navegación Declarativa y Programática**: Uso del componente `<Link>` y del hook `useRouter` con `router.push()`.
- [x] **Análisis Crítico de Arquitectura**: Comparativa técnica asistida por Inteligencia Artificial evaluando la separación de conceptos frente al patrón *Feature-First*.

---

## 🚀 Fase 1: Diseño y Wireframe de Navegación

### Captura de Estructura del Proyecto
A continuación se presenta la evidencia de la organización de archivos en el entorno de desarrollo:

![Estructura del Proyecto en el Editor](./captura.png)

---

### Diagrama del Flujo de Navegación (Wireframe)

El siguiente mapa representa visualmente cómo interactúan el Stack raíz, las pestañas inferiores, la ventana modal y las rutas dinámicas:

```mermaid
flowchart TD
    subgraph RootStack ["app/_layout.tsx (Stack Principal)"]
        subgraph TabsGroup ["app/(tabs)/_layout.tsx (Tabs Navigator)"]
            TabHome["🏠 Inicio (index.tsx)\n- Estado de conexión\n- Próxima llegada shuttle\n- Accesos directos"]
            TabRoutes["🚌 Rutas (routes.tsx)\n- Catálogo Troncal/Circuito\n- Paradas en Riohacha\n- Frecuencia y estado"]
        end

        ModalScreen["🚐 Modal: Estado del Servicio (modal.tsx)\n- Flota activa (14 unidades)\n- Métricas de frecuencia (10-15m)\n- Botón Volver/Cerrar\npresentation: 'modal'"]

        DynamicStudent["🎓 Detalle Estudiante (student/[id].tsx)\n- Carné digital universitario\n- Extracción de ID dinámico\n- Código de barras interactivo\n- Botón Regresar"]

        DynamicRoute["🗺️ Detalle Ruta (route/[id].tsx)\n- Mapa interactivo de Riohacha\n- Paradas georreferenciadas\n- Telemetría en tiempo real\n- Botón Regresar"]
    end

    %% Conexiones
    TabHome -- "<Link href='/modal'>" --> ModalScreen
    TabHome -- "router.push('/student/ST-202688')" --> DynamicStudent
    TabHome -- "router.push('/student/ST-202714')" --> DynamicStudent
    TabRoutes -- "router.push('/route/R01')" --> DynamicRoute
    TabRoutes -- "router.push('/route/R02...')" --> DynamicRoute

    ModalScreen -.->|router.back()| TabHome
    DynamicStudent -.->|router.back()| TabHome
    DynamicRoute -.->|router.back()| TabRoutes
```

---

### Respuestas a las Preguntas de Diseño de Navegación

#### 1. ¿Cuáles serán las pantallas principales que vivirán en la barra inferior (Tabs)?
* **Inicio (`app/(tabs)/index.tsx`)**: Pantalla de entrada y tablero principal de control (*Dashboard*). Muestra el estado del sistema en línea, la información en tiempo real de la próxima llegada de transporte al campus y los puntos de acción rápida (acceso al modal de servicio y a credenciales de estudiantes).
* **Rutas (`app/(tabs)/routes.tsx`)**: Catálogo interactivo de las líneas de transporte activas en Riohacha (Troncal UniGuajira Express, Circuito Salud Los Remedios, Corredor Aeropuerto Padilla y Línea Nocturna Playas). Permite consultar paradas intermedias, estados de tráfico y frecuencias antes de acceder al mapa en vivo.

#### 2. ¿Qué pantalla requiere presentarse de manera jerárquica con botón de regreso (Stack)?
* **Credencial de Estudiante (`app/student/[id].tsx`)** y **Ruta en Vivo (`app/route/[id].tsx`)**: Ambas vistas forman parte de un flujo jerárquico secundario respecto al menú principal. Se registran en el `<Stack/>` de `app/_layout.tsx` con su cabecera activa (`headerShown: true`), título contextual y botón nativo de retorno (`headerBackTitle: "Atrás"` o `"Rutas"`), permitiendo al usuario regresar al punto exacto desde el que ingresó sin perder el estado ni recargar la pestaña previa.

#### 3. ¿Qué pantalla mostrará contenido dinámico dependiente de un identificador único (Ruta Dinámica `[id]`)?
* **`app/student/[id].tsx`**: Despliega el carné digital y el pase de transporte universitario exclusivo para el estudiante indicado en el parámetro (por ejemplo, `ST-202688` o `ST-202714`).
* **`app/route/[id].tsx`**: Carga de manera dinámica el trazado de coordenadas geográficas, paradas y telemetría del shuttle correspondiente al código de ruta consultado (por ejemplo, `R01`, `R02`, `R03`).

#### 4. ¿Qué flujo justifica una apertura de tipo Modal?
* **Estado del Servicio (`app/modal.tsx`)**: Muestra un reporte rápido del estado global de la flota de shuttles (unidades activas, frecuencias en horas pico, alertas de tráfico y líneas de asistencia). La apertura modal (`presentation: 'modal'`) está plenamente justificada porque se trata de información contextual de consulta momentánea; el usuario revisa el reporte y lo descarta deslizando hacia abajo o tocando "Entendido y Cerrar", volviendo inmediatamente a la tarea que estaba realizando sin cambiar de pantalla en el historial principal.

---

## 💻 Fase 2: Desarrollo Técnico (Implementación de Archivos)

La aplicación sigue la arquitectura File-based Routing obligatoria dentro del directorio `app/`:

```
app/
├── (tabs)/
│   ├── _layout.tsx         # Configuración del Tab Navigator (Inicio y Rutas)
│   ├── index.tsx           # Pestaña Principal 1: Dashboard y navegación a Modal/ID
│   └── routes.tsx          # Pestaña Principal 2: Catálogo de Rutas en Riohacha
├── route/
│   └── [id].tsx            # Ruta dinámica 1: Mapa en vivo y telemetría por ID de ruta
├── student/
│   └── [id].tsx            # Ruta dinámica 2: Carné y credencial digital por ID de estudiante
├── modal.tsx               # Pantalla Modal independiente (presentation: 'modal')
├── _layout.tsx             # Root Layout (Stack principal con configuración de rutas)
└── +not-found.tsx          # Pantalla 404 de respaldo para rutas no registradas
```

### Cumplimiento de Requisitos Técnicos Obligatorios

| Requisito Técnico | Archivo de Implementación | Descripción del Código |
| :--- | :--- | :--- |
| **Root Layout con `<Stack/>`** | `app/_layout.tsx` | Registra el grupo `(tabs)`, define `modal` con `presentation: 'modal'` y registra las rutas jerárquicas `student/[id]` y `route/[id]` con cabeceras nativas. |
| **Tabs Navigator** | `app/(tabs)/_layout.tsx` | Configura 2 pestañas funcionales (`index` y `routes`) con títulos en español, iconos representativos (🏠 y 🚌) y colores corporativos (`#000666`). |
| **Navegación Declarativa** | `app/(tabs)/index.tsx` | Utiliza `<Link href="/modal" asChild>` sobre un botón estilizado para desplegar la ventana modal de estado. |
| **Navegación Programática** | `app/(tabs)/index.tsx` | Utiliza el hook `useRouter()` y `router.push('/student/ST-202688')` al presionar las tarjetas de credencial. |
| **Lectura de Parámetros Dinámicos** | `app/student/[id].tsx` y `app/route/[id].tsx` | Importan `useLocalSearchParams<{ id: string }>()`, extraen la variable `id` y la renderizan visualmente dentro de un componente `<Text>` en la credencial y la telemetría. |
| **Pantalla 404** | `app/+not-found.tsx` | Provee pantalla de contingencia ante cualquier URL inexistente con enlace de regreso al home. |

---

## 🔄 Explicación del Flujo de Navegación

1. **Punto de Entrada (`app/(tabs)/index.tsx`)**: El usuario inicia en la pestaña *Inicio*. En ella tiene a su alcance un resumen del estado del sistema y dos tipos de interacción de navegación:
   - **Flujo Modal Declarativo**: Al tocar la tarjeta *"Ver Estado de Shuttles"*, el enlace `<Link href="/modal">` invoca la pantalla modal configurada en el Stack raíz con estilo de tarjeta superpuesta sobre la vista actual.
   - **Flujo Dinámico Programático**: Al tocar cualquiera de los botones de estudiante, se ejecuta `router.push('/student/ST-202688')`, empujando la pantalla `app/student/[id].tsx` al Stack de navegación.
2. **Pestaña de Rutas (`app/(tabs)/routes.tsx`)**: Al alternar a la segunda pestaña de la barra inferior, el usuario visualiza las líneas de transporte disponibles en Riohacha. Al presionar una ruta en específico, se invoca `router.push('/route/' + route.id)`, pasando el identificador hacia `app/route/[id].tsx` para renderizar el mapa interactivo correspondiente.
3. **Consumo de Parámetros Dinámicos**: Tanto en `app/student/[id].tsx` como en `app/route/[id].tsx`, el hook `useLocalSearchParams` intercepta el segmento dinámico de la URL, permitiendo consultar datos correspondientes (como el estudiante consultado o las coordenadas de la ruta) y mostrándolo claramente en pantalla.
4. **Retorno Jerárquico**: Mediante el botón nativo en el encabezado o mediante botones de acción que ejecutan `router.back()`, el usuario puede volver a la pestaña previa conservando su posición de scroll y estado general.

---

## 🧠 Fase 3: Análisis de Arquitectura con IA

### 1. Árbol de Directorios del Proyecto
Generado a 3 niveles de profundidad excluyendo `node_modules`, `.git` y `.expo`:

```text
routego-app
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── app
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── routes.tsx
│   ├── +not-found.tsx
│   ├── _layout.tsx
│   ├── modal.tsx
│   ├── route
│   │   └── [id].tsx
│   └── student
│       └── [id].tsx
├── app.json
├── assets
│   └── images
│       ├── android-icon-background.png
│       ├── android-icon-foreground.png
│       ├── android-icon-monochrome.png
│       ├── favicon.png
│       ├── icon.png
│       ├── partial-react-logo.png
│       ├── react-logo.png
│       ├── react-logo@2x.png
│       ├── react-logo@3x.png
│       └── splash-icon.png
├── babel.config.js
├── captura.png
├── components
│   ├── RiohachaMap.native.tsx
│   ├── RiohachaMap.tsx
│   ├── RiohachaMap.types.ts
│   ├── RiohachaMap.web.tsx
│   ├── external-link.tsx
│   ├── haptic-tab.tsx
│   ├── hello-wave.tsx
│   ├── parallax-scroll-view.tsx
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── ui
│       ├── collapsible.tsx
│       ├── icon-symbol.ios.tsx
│       └── icon-symbol.tsx
├── constants
│   └── theme.ts
├── eslint.config.js
├── global.css
├── hooks
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
├── metro.config.js
├── nativewind-env.d.ts
├── package-lock.json
├── package.json
├── scripts
│   └── reset-project.js
├── tailwind.config.js
└── tsconfig.json
```

---

### 2. Prompt de Arquitectura Ejecutado

> *"Actúa como un Arquitecto Senior de Software en React Native. Analiza la estructura de archivos que utilicé para mi aplicación en Expo Router:*
>
> *[ÁRBOL DE CARPETAS PEGADO]*
>
> *Por favor:*
> 1. *Evalúa si mi separación de conceptos entre rutas y lógica de negocio es adecuada.*
> 2. *Propón una arquitectura alternativa profesional basada en el patrón Feature-First (creando una carpeta /src fuera de /app).*
> 3. *Explica 2 ventajas y 2 desventajas de migrar mi proyecto a esa arquitectura sugerida."*

---

### 3. Respuesta del Arquitecto Senior de Software

#### A. Evaluación de la Separación de Conceptos Actual
> *"En la estructura actual observamos un patrón común en proyectos iniciales de Expo Router: las pantallas dentro de `app/` actúan como **'Fat Routes'** (rutas sobrecargadas), donde los archivos de ruta (`index.tsx`, `routes.tsx`, `route/[id].tsx` y `student/[id].tsx`) no solo declaran el punto de entrada de la navegación, sino que además contienen directamente la definición de interfaces gráficas completas, mockups de datos estáticos (`SAMPLE_ROUTES`, `RIOHACHA_STOPS`), lógica de presentación y hojas de estilos extensas (`StyleSheet.create`).*
>
> *Aunque se apoya en carpetas externas como `components/`, `constants/` y `hooks/`, estos corresponden a un patrón puramente técnico (*Layer-First*) heredado del template de Expo, lo que provoca que la lógica del dominio de transporte y estudiantes esté dispersa y altamente acoplada al sistema de enrutamiento. Para un prototipo educativo o un MVP esto es rápido y funcional, pero en un entorno corporativo o de producción genera deuda técnica al impedir reutilizar pantallas en otros navegadores o probar la lógica de negocio sin montar el contexto de navegación de Expo Router."*

---

#### B. Propuesta de Arquitectura Alternativa: *Feature-First* con `/src`

En esta propuesta, la carpeta `app/` se reduce a una capa ultra-delgada de enrutamiento (*Thin Route Wrappers*), delegando toda la lógica de negocio, componentes, llamadas a API y estado a módulos organizados por dominio dentro de `src/features/`:

```text
routego-app/
├── app/                                 # Capa delgada de Enrutamiento (Thin Routes)
│   ├── (tabs)/
│   │   ├── _layout.tsx                  # Enlaza con src/shared/components/TabsLayout
│   │   ├── index.tsx                    # Renderiza <HomeScreen /> de features/transport
│   │   └── routes.tsx                   # Renderiza <RoutesScreen /> de features/transport
│   ├── route/
│   │   └── [id].tsx                     # Extrae id y renderiza <RouteMapScreen routeId={id} />
│   ├── student/
│   │   └── [id].tsx                     # Extrae id y renderiza <StudentPassScreen studentId={id} />
│   ├── modal.tsx                        # Renderiza <ServiceStatusModal />
│   ├── _layout.tsx                      # Root Stack Navigator
│   └── +not-found.tsx
│
├── src/                                 # Núcleo de la Aplicación y Lógica de Negocio
│   ├── features/                        # Módulos organizados por Dominio de Negocio
│   │   ├── transport/                   # Dominio de Rutas y Shuttles
│   │   │   ├── components/              # RiohachaMap, RouteCard, ShuttleTelemetry
│   │   │   ├── hooks/                   # useLiveShuttle, useRiohachaRoutes
│   │   │   ├── screens/                 # HomeScreenView, RoutesListView, RouteMapView
│   │   │   ├── services/                # transportApi.ts (o mocks geoespaciales)
│   │   │   └── types/                   # route.types.ts, geo.types.ts
│   │   │
│   │   ├── students/                    # Dominio de Carnetización y Estudiantes
│   │   │   ├── components/              # StudentIdCard, BarcodeView
│   │   │   ├── hooks/                   # useStudentVerification
│   │   │   ├── screens/                 # StudentPassScreenView
│   │   │   └── types/                   # student.types.ts
│   │   │
│   │   └── service-status/              # Dominio de Alertas y Operatividad
│   │       ├── components/              # MetricBadge, ScheduleInfo
│   │       ├── screens/                 # ServiceStatusModalView
│   │       └── types/                   # status.types.ts
│   │
│   └── shared/                          # Recursos Transversales Reutilizables
│       ├── components/                  # Botones comunes, tipografía, layouts
│       ├── constants/                   # theme.ts, appConfig.ts
│       ├── hooks/                       # useNetworkStatus.ts, useThemeColor.ts
│       └── styles/                      # tailwind/estilos globales
```

---

#### C. Ventajas y Desventajas de la Migración

##### 🟢 Ventajas:
1. **Alta Escalabilidad y Trabajo Concurrente sin Fricción**: Al aislar cada funcionalidad en su propio módulo (`transport`, `students`, `service-status`), diferentes desarrolladores o células de trabajo pueden modificar modelos de datos, servicios o componentes sin provocar conflictos de combinación (*merge conflicts*) en los archivos de navegación de `app/`.
2. **Testabilidad Desacoplada y Mantenibilidad**: La lógica de negocio y las vistas residen en componentes puros de React Native fuera del router. Esto permite redactar pruebas unitarias y de integración con Jest y React Native Testing Library sin necesidad de simular (*mockear*) el árbol de navegación completo de Expo Router ni sus parámetros de URL.

##### 🔴 Desventajas:
1. **Sobrecarga de Código Inicial (*Boilerplate* y *Overengineering*)**: Para proyectos pequeños, MVPs o entregas académicas, crear múltiples subcarpetas (`components/`, `hooks/`, `types/`, `screens/`) para un par de pantallas triplica la cantidad de archivos y ralentiza la velocidad inicial de iteración.
2. **Indirección y Salto Mental en la Navegación de Archivos**: Al separar la ruta (`app/student/[id].tsx`) de su implementación visual (`src/features/students/screens/StudentPassScreenView.tsx`), el desarrollador debe mantener abiertos múltiples archivos para un solo cambio visual, lo que añade fricción en comparación con el modelo compacto de archivo único que ofrece Expo Router por defecto.

---

### 4. Conclusión Personal (Reflexión Crítica)

> **Evaluación Crítica:**
> Aplicar la arquitectura *Feature-First* con separación estricta en una carpeta `/src` es la decisión más sensata y rentable en proyectos de React Native a gran escala o de nivel empresarial. Cuando una aplicación supera las diez pantallas, gestiona múltiples orígenes de datos y es mantenida por equipos multidisciplinarios, concentrar la lógica en las rutas de `app/` genera cuellos de botella severos, inconsistencias y fragilidad en las pruebas automatizadas. Aunque para un prototipo rápido implica una sobrecarga de *boilerplate*, en el largo plazo el patrón *Feature-First* protege la salud del código, garantiza un bajo acoplamiento, permite que los módulos crezcan de forma predecible y mantiene a Expo Router enfocado exclusivamente en lo que mejor sabe hacer: resolver el enrutamiento y la experiencia de transición nativa.

---

## 🛠️ Tecnologías y Librerías

- **Framework**: [React Native 0.81](https://reactnative.dev/) / [Expo SDK 54](https://docs.expo.dev/versions/v54.0.0/)
- **Enrutador**: [Expo Router v6](https://docs.expo.dev/router/introduction/) (Typed Routes activado)
- **Mapas Nativos**: `react-native-maps` con soporte multiplataforma (.native y .web)
- **Estilos**: Tailwind CSS con [NativeWind v4](https://www.nativewind.dev/) y React Native `StyleSheet`
- **Gestión de Áreas Seguras**: `react-native-safe-area-context`

---

## 📲 Guía de Instalación y Ejecución

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo Expo**:
   ```bash
   npx expo start
   ```

3. **Ejecutar en la plataforma deseada**:
   - Presiona `a` para abrir en un emulador Android o dispositivo conectado con USB.
   - Presiona `i` para abrir en el simulador de iOS (macOS).
   - Presiona `w` para abrir en el navegador web.
   - O escanea el código QR desde la app **Expo Go** en tu dispositivo móvil.

---
*Desarrollado para el taller práctico de navegación avanzada con Expo Router.*
