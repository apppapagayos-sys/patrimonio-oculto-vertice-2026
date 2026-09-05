# Patrimonio Oculto – Vértice 2026 · Beta

Prototipo funcional para validar navegación y experiencia de usuario del proyecto escolar.

## Qué demuestra

- Plataforma responsive pensada primero para celular.
- Inicio y acceso a las funciones principales.
- Selección de movilidad: a pie, bicicleta o vehículo.
- Selección de nivel de dificultad.
- Mapa conceptual del circuito con 5 estaciones.
- Flujo de escaneo QR (simulado en esta beta).
- Registro local de estaciones visitadas.
- Progreso del recorrido.
- Relatos basados en los 5 testimonios definidos en el proyecto.
- Audio y video como componentes de interfaz.
- Accesibilidad: audiodescripción, macrotipo, subtítulos y adaptación por movilidad.
- Recomendaciones preventivas y alertas por condiciones meteorológicas/crecidas.
- Funcionamiento básico sin conexión mediante Service Worker y datos embebidos.

## Importante para el jurado

Esta beta es una demostración de arquitectura, navegación y experiencia. No representa todavía el sistema productivo completo.

Las siguientes funciones quedan señaladas como desarrollo posterior:
- escaneo QR real con cámara en todos los dispositivos;
- GPS y cálculo real de distancias/tiempos;
- integración con datos meteorológicos;
- mapas y coordenadas reales;
- carga de audios, videos y fotografías definitivos;
- backend para sugerencias, testimonios y estadísticas.

## Publicación en GitHub Pages

1. Crear o abrir el repositorio.
2. Copiar el contenido de esta carpeta en la raíz del repositorio (o en una carpeta destinada al sitio).
3. En GitHub: Settings → Pages.
4. Seleccionar Deploy from a branch.
5. Elegir la rama principal y la carpeta `/root`.
6. Guardar y esperar la publicación.

Al estar servido por HTTPS, GitHub Pages permite que las funciones web que requieren un contexto seguro puedan evolucionar en versiones posteriores.

## Próxima etapa recomendada

Incorporar:
1. coordenadas reales de las 5 estaciones;
2. un mapa real;
3. QR reales por estación;
4. assets audiovisuales de los estudiantes;
5. almacenamiento de progreso más robusto;
6. modo offline con paquetes de contenido por circuito.
