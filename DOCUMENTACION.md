# Documentación del Proyecto MediCare Plus

## 1. Información General

| Campo | Valor |
|-------|-------|
| **Nombre del proyecto** | MediCare Plus |
| **Versión** | 1.0.0 |
| **Tipo** | Landing page demostrativa de consultorio médico ficticio |
| **Contexto académico** | Desarrollo web asistido por Inteligencia Artificial (IA) y Vibe Coding |
| **Licencia** | MIT |
| **Idiomas soportados** | Español (ES), Inglés (EN) |

## 2. Descripción del Proyecto

MediCare Plus es un proyecto académico de desarrollo web orientado a la construcción de una landing page para un consultorio médico ficticio. Su propósito es presentar información institucional, comunicar los servicios de atención y ofrecer una experiencia de navegación clara, adaptable a distintos dispositivos y accesible para los usuarios.

El proyecto se desarrolla en el contexto de una actividad de formación sobre desarrollo asistido por IA y Vibe Coding. En este modelo, el aprendiz define requisitos, formula instrucciones para herramientas de IA, revisa el código generado, identifica errores y solicita correcciones. La IA funciona como apoyo para acelerar tareas de diseño y programación, mientras que las decisiones de arquitectura, la validación y la comprensión del resultado siguen siendo responsabilidad del desarrollador.

## 3. Objetivos

- Presentar una landing page funcional y responsiva para un consultorio médico demostrativo.
- Implementar internacionalización (i18n) en español e inglés.
- Aplicar principios de accesibilidad web (skip link, focus visible, ARIA, contraste).
- Ofrecer un formulario de solicitud de cita simulado con validación del lado del cliente.
- Demostrar el flujo de trabajo Vibe Coding: requisitos, instrucciones a IA, revisión y corrección de código.

## 4. Alcance

### Incluido
- Página de inicio con secciones: Hero, Servicios, Equipo, Testimonios, Cita (redirección a vista dedicada), Contacto.
- Vista dedicada de solicitud de cita con formulario validado y resultado simulado.
- Navegación responsiva (menú desktop y móvil).
- Selector de idioma ES/EN con persistencia en `sessionStorage`.
- Carrusel de testimonios con autoplay y controles manuales.
- Estilos personalizados con variables CSS y Tailwind CDN.

### No incluido (pendiente o fuera de alcance)
- Backend o base de datos real.
- Reserva de citas reales (el formulario es demostrativo).
- Autenticación de usuarios.
- Pasarelas de pago.
- CMS o panel de administración.

## 5. Estructura del Proyecto

```
medicare-plus/
├── index.html              # Página principal (landing page)
├── appointment.html        # Vista dedicada de solicitud de cita
├── css/
│   └── styles.css          # Estilos personalizados (variables, tipografía, utilidades)
├── js/
│   ├── app.js              # Punto de entrada de la página principal
│   ├── pages/
│   │   └── appointment.js  # Lógica de la vista de citas
│   ├── components/
│   │   ├── appointment-form.js
│   │   ├── language-switcher.js
│   │   └── navigation.js
│   ├── config/
│   │   └── constants.js    # Constantes (idiomas, claves de almacenamiento)
│   ├── data/
│   │   ├── services.js     # Datos de servicios médicos
│   │   └── professionals.js # Datos del equipo médico (demo)
│   ├── i18n/
│   │   ├── es.js           # Traducciones en español
│   │   ├── en.js           # Traducciones en inglés
│   │   └── i18n.js         # Gestor de idiomas
│   ├── services/
│   │   └── appointment-service.js # Simulación de servicio de citas
│   └── utils/
│       └── validation.js   # Validaciones de formulario
├── assets/
│   ├── images/             # Imágenes (hero, servicios, equipo)
│   └── icons/              # Logotipo y otros íconos
├── package.json            # Configuración de Node y scripts
├── package-lock.json
├── .eslintrc.json          # Configuración de ESLint
├── .eslintignore
├── README.md               # Resumen del proyecto
└── DOCUMENTACION.md        # Este archivo
```

## 6. Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura semántica de las páginas |
| Tailwind CSS v3 (CDN) | Utilidades CSS para diseño responsivo |
| CSS3 (archivo `styles.css`) | Variables de color, tipografía, componentes personalizados |
| JavaScript (ES Modules) | Lógica de interactividad, i18n, validación, carrusel |
| ESLint | Linting y estilo de código JavaScript |
| Google Fonts (anteriormente) | Tipografías (actualmente pila sistema tipo Arial) |

## 7. Funcionalidades Detalladas

### 7.1 Navegación
- Barra fija (sticky) en la parte superior.
- Menú desktop con enlaces a Home, Servicios, Equipo, Cita y Contacto.
- Menú hamburguesa para dispositivos móviles.
- Cierre automático del menú móvil al hacer clic en un enlace o al redimensionar la ventana.

### 7.2 Internacionalización (i18n)
- Soporte para español e inglés.
- Persistencia del idioma seleccionado en `sessionStorage`.
- Traducción dinámica de: navegación, héroe, servicios, equipo, testimonios, cita, contacto, validaciones y footer.
- Selector visual con banderas de España y Reino Unido.

### 7.3 Servicios
- Grid responsivo de tarjetas de servicios con imagen, nombre y descripción.
- Contenido inyectado dinámicamente desde `js/data/services.js`.
- Nombres y descripciones traducidos según el idioma activo.

### 7.4 Equipo
- Tarjetas del equipo médico con foto, nombre y especialidad.
- Contenido demostrativo desde `js/data/professionals.js`.

### 7.5 Testimonios
- Carrusel horizontal con slides automáticos cada 5 segundos.
- Controles manuales (anterior/siguiente) e indicadores por puntos.
- Pausa al pasar el cursor sobre el carrusel.

### 7.6 Solicitud de Cita
- Vista dedicada en `appointment.html`.
- Formulario con campos: nombre, cédula/DNI, correo, teléfono, especialidad, fecha y hora.
- Validación del lado del cliente con mensajes de error contextuales.
- Simulación de envío con demora de 1.2 segundos y generación de referencia demo.
- Mensajes de éxito y error con iconos y scroll automático.

### 7.7 Contacto
- Información institucional simulada (dirección, teléfono, correo).
- Mapa embebido de Google Maps (datos ilustrativos).
- Redes sociales (Facebook, Instagram) como enlaces demostrativos.

### 7.8 Accesibilidad
- Skip link para ir al contenido principal.
- Navegación por teclado funcional.
- Estados de enfoque visibles (`focus-visible`).
- Atributos ARIA en menús, botones y formularios.
- Contraste de colores adecuado.
- Texto alternativo en imágenes.

## 8. Guía de Ejecución

1. Clonar o descargar el repositorio.
2. Abrir `index.html` directamente en un navegador web (no requiere servidor local).
3. Opcional: instalar dependencias de desarrollo para linting:
   ```bash
   npm install
   npm run lint
   ```

## 9. Referencias y Espacio para Imágenes (Normas APA 7ma Edición)

Esta sección está reservada para incluir las referencias bibliográficas y las citas de imágenes utilizadas en el proyecto, siguiendo las normas APA 7ma edición.

### Formato general para citar una imagen (APA 7)

> Autor, A. A. (Año). Título de la obra [Tipo de obra]. Nombre del sitio web. URL

### Ejemplos de referencia para imágenes (APA 7)

1. Imagen de hero (médico atendiendo a una familia en una clínica):
   > Autor desconocido. (s.f.). Médico atendiendo a una familia en una clínica moderna [Fotografía]. Sitio web de imágenes de stock. https://ejemplo.com/hero.jpg

2. Imagen de servicio (Consulta General):
   > Autor desconocido. (s.f.). Consulta médica general [Fotografía]. Sitio web de imágenes de stock. https://ejemplo.com/consulta-general.jpg

3. Imagen del logotipo:
   > Equipo de diseño MediCare Plus. (2026). Logotipo sanitario MediCare Plus [Gráfico]. Archivo local del proyecto. assets/icons/Logotipo sanitario MediCare Plus.png

4. Iconos sociales (Facebook e Instagram):
   > Feather Icons. (s.f.). Iconos de redes sociales [Iconografía]. Feather Icons. https://feathericons.com

### Plantilla para agregar nuevas imágenes

Complete la siguiente tabla a medida que se añadan imágenes al proyecto:

| Imagen | Ubicación | Autor | Año | Título | Tipo | URL / Origen | Referencia APA 7 |
|--------|-----------|-------|-----|--------|------|--------------|------------------|
| Hero | assets/images/hero.jpg | | | | Fotografía | | |
| Servicio 1 | assets/images/services/consulta-general.jpg | | | | Fotografía | | |
| Servicio 2 | assets/images/services/pediatria.jpg | | | | Fotografía | | |
| Equipo 1 | assets/images/team/doctor-1.jpg | | | | Fotografía | | |
| Logotipo | assets/icons/Logotipo sanitario MediCare Plus.png | | 2026 | Logotipo sanitario MediCare Plus | Gráfico | Local | |

### Nota importante sobre derechos de autor

Todas las imágenes, íconos y datos utilizados en este proyecto son ilustrativos y forman parte de una demostración académica. No representan una clínica real ni personas reales. Al publicar o distribuir este proyecto, asegúrese de tener los derechos de uso de los recursos multimedia o reemplácelos por contenido con licencia adecuada.

## 10. Créditos

Desarrollado como proyecto académico en el contexto de desarrollo asistido por IA y Vibe Coding. Todos los datos son ilustrativos y no representan una entidad real.
