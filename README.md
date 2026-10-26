# Consultorio-Medico-mediante-Flujos-Asistidos-por-IA-y-Vibe-Coding
construir un landing page moderna, responsiva y funcional (Proyecto abierto), integrando un ecosistema de herramientas de IA locales y en la nube para generación de prompts, asistencia de código, síntesis visual y orquestación de modelos.

Matriz del Ecosistema Tecnológico  

Herramienta 
Rol en el Flujo de  Trabajo 
Entregable / Función
ChatGPT
Meta-Prompting y  Especificación  
Técnica
Redactar el System Prompt, el PRD  (Documento de Requisitos) y las  directrices arquitectónicas.
OpenCode /  IDE AI
Editor Asistido y  Generador de  Código
Entorno de desarrollo para  autocompletado contextual y generación  de componentes en tiempo real.
Ollama 
Inferencia Local de  LLMs
Ejecutar modelos locales (ej. Qwen2.5- Coder o DeepSeek-Coder) para  refactorización privada y pruebas sin  consumo de API.
OpenRouter
Gateway  
Multimodelo y  Fallback
Acceder a modelos de vanguardia vía  API unificada para tareas complejas de  layout y lógica interactiva.
Gemini 
Generación de  Activos Visuales
Crear imágenes contextuales de alta  resolución (logo, hero banner, íconos de  servicios, etc).

1.Fase 1: Especificación y Meta-Prompting:Tiempo estimado: 1 hora.
El aprendiz utilizará ChatGPT para definir la arquitectura funcional y estética de la
landing page médica antes de generar código.

• Consigna: Formular un System Prompt estructurado que defina el rol, stack
tecnológico con Node JS(HTML5 semántico, Tailwind CSS y Vanilla JS), paleta de
colores clínicos (azul médico #0284c7, verde salud #10b981, fondos neutros
claros) y secciones requeridas:
1. Barra de navegación con botón de llamada a la acción (CTA).
2. Sección Hero con titular de valor y formulario rápido de agendamiento.
3. Cuadrícula de especialidades médicas con tarjetas interactivas.
4. Sección de testimonios de pacientes y credenciales médicas.
5. Formulario de contacto con validación de datos en cliente.
6. Pie de página institucional con horarios y geolocalización simulada.
2.Fase 2: Generación de Activos Visuales y Marca:Tiempo estimado: 1 hora.
El aprendiz empleará Gemini para sintetizar los recursos gráficos necesarios para el
consultorio.
• Consigna: Diseñar prompts visuales con parámetros de realismo, iluminación
clínica cálida y encuadre fotográfico profesional.
• Entregables gráficos:
o Banner principal: Interior de clínica moderna, iluminación diurna y
ambiente de bienvenida.
o Retratos de doctores: Especialistas médicos con vestimenta institucional
y expresión de confianza.
o Ilustraciones o renders de servicios: Equipos de diagnóstico no invasivo
y salas de atención.

3.Fase 3: Configuración del Entorno Local y Gateway:Tiempo estimado: 1.5
horas.
Asegurar la infraestructura de modelos para asistir la codificación.
• Ollama (Local): Desplegar un modelo especializado en código (por ejemplo,
ollama run qwen2.5-coder:7b o llama3.2). Se usará para generación de funciones
específicas y refactorización rápida offline.
• OpenRouter: Configurar una API Key dentro del entorno de desarrollo o
extensiones para evaluar respuestas de modelos de frontera cuando se
requieran patrones de diseño más complejos.
• OpenCode / Editor AI: Vincular el endpoint local de Ollama
(http://localhost:11434/v1) y la llave de OpenRouter para alternar entre inferencia
local y remota según la complejidad del componente.
4.Fase 4: Desarrollo Mediante Vibe Coding:Tiempo estimado: 3 horas.
Construcción iterativa orientada a dirección y supervisión arquitectónica.

• Enfoque de trabajo: Los aprendices no escriben el código base desde cero;
dirigen al asistente mediante prompts modulares paso a paso:
1. Estructura y Layout: Ensamblar el layout responsive con Tailwind CSS vía
CDN o Vite.
2. Integración Visual: Incorporar las imágenes generadas con Gemini
asegurando atributos alt descriptivos y dimensiones adaptables.
3. Interactividad (JS): Implementar el modal de agendamiento de citas
médicas, cálculo de disponibilidad simulada y validación de campos
(cédula/DNI, correo, teléfono y especialidad).

• Auditoría continua: Cada fragmento generado debe probarse en el navegador
inmediatamente. Si el código falla o rompe el diseño, el aprendiz debe corregir
el prompt o aplicar un rollback guiado.
5.Fase 5: Auditoría, Refactorización y Pruebas:Tiempo estimado: 1.5 horas.
Validación de calidad técnica y buenas prácticas de ingeniería de software.
• Verificación de Accesibilidad y Semántica: Asegurar contraste de colores WCAG
AA, etiquetas ARIA en formularios y navegación por teclado.
• Despliegue rápido: Publicar la landing page en una plataforma de hosting
estático (GitHub Pages, Vercel o Netlify).
Rúbrica de Evaluación

Criterio

Desempeño
Sobresaliente (4.5 -
5.0)

Desempeño
Básico (3.0 - 4.4)

Desempeño No
Aprobado (0.0 -
2.9)

Dirección de
IA (Vibe
Coding)

Formula prompts
técnicos precisos,
utiliza contexto
adecuado y audita
cada bloque de
código sin aceptar
alucinaciones.

Genera código
funcional, pero
requiere
múltiples
intentos por
formulación vaga
de prompts.

Copia y pega
código sin
entender la
estructura ni
corregir errores
evidentes.

Uso del
Ecosistema
de
Herramientas

Articula
adecuadamente
ChatGPT, Gemini,
Ollama, OpenRouter
y OpenCode en sus

Utiliza al menos 3
de las
herramientas

Depende
exclusivamente
de una
herramienta y
omite la

Criterio

Desempeño
Sobresaliente (4.5 -
5.0)

Desempeño
Básico (3.0 - 4.4)

Desempeño No
Aprobado (0.0 -
2.9)

etapas
correspondientes.

exigidas de forma
efectiva.

configuración
local/gateway.

Calidad de la
Landing Page

Diseño clínico
profesional,
responsive,
accesible, con
interactividad fluida
y activos visuales
coherentes.

Funcional, pero
con detalles
menores en
responsive o
contraste de
interfaz médica.

Interfaz rota, sin
validación de
formularios ni
adaptación a
pantallas
móviles.

Entregables y
Sustentación

Repositorio
documentado con
historial de prompts
utilizados, capturas
de pantalla y demo
desplegada en vivo.

Repositorio
completo, pero
con
documentación
escasa sobre el
flujo de prompts.

No presenta
repositorio o el
proyecto no
ejecuta en
entorno
local/web.
