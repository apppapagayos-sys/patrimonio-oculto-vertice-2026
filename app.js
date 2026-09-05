const stations = [
  {
    id: 1, title: "La bola de luz blanca", place: "Paraje El Recuerdo",
    icon: "◉", visited: true,
    text: "En el invierno de 2023, dos amigos que viajaban desde Papagayos hacia una jineteada en Río Cuarto relataron haber visto una bola de luz blanca sobre el camino. La presencia habría seguido al vehículo durante varios kilómetros hasta desaparecer cerca de Palo Verde.",
    source: "Testimonio recopilado por estudiantes. Relato presentado como patrimonio oral y experiencia de misterio, no como hecho comprobado."
  },
  {
    id: 2, title: "La mujer de blanco", place: "Barranca de Palo Colorado",
    icon: "♢", visited: true,
    text: "En 2008, un vecino que viajaba a caballo hacia El Recuerdo contó que una mujer vestida de blanco habría aparecido detrás de él, sobre el anca del animal. Al llegar al paraje, la figura había desaparecido.",
    source: "Testimonio oral investigado por estudiantes y situado territorialmente."
  },
  {
    id: 3, title: "Luz amarilla en La Academia", place: "Entrada de La Academia · Ruta 40",
    icon: "✦", visited: true,
    text: "El 6 de mayo de 2025, poco después de las 20:30, un vecino que regresaba a caballo de su campo relató haber visto una intensa luz amarilla detrás de él, que desapareció al girarse.",
    source: "Testimonio entrevistado por estudiantes. Fecha y ubicación forman parte del registro del proyecto."
  },
  {
    id: 4, title: "El camino del cementerio", place: "Camino próximo al cementerio de Papagayos",
    icon: "✚", visited: true,
    text: "Después de una jineteada, un joven que regresaba a caballo relató que su yegua se alteró repentinamente al pasar frente al cementerio. El episodio quedó asociado por el relato local a un tramo donde también existen cruces de personas fallecidas en accidentes.",
    source: "Relato oral recopilado durante la investigación estudiantil."
  },
  {
    id: 5, title: "El perro negro", place: "Tramo de las cruces",
    icon: "●", visited: false,
    text: "Un hombre y su amigo viajaban en moto de noche cuando uno de ellos relató haber visto un perro negro enorme corriendo junto al camino, con ojos rojos. Al regresar de día no encontraron huellas.",
    source: "Testimonio oral incorporado al proyecto. Se conserva como relato de misterio de la comunidad."
  }
];

const state = {
  screen: "home",
  mobility: localStorage.getItem("mobility") || "pie",
  difficulty: localStorage.getItem("difficulty") || "basico",
  currentStation: 3,
  visited: JSON.parse(localStorage.getItem("visitedStations") || "[1,2,3,4]"),
  offline: !navigator.onLine
};

const screen = document.getElementById("screen");
const toast = document.getElementById("toast");

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function setNav(active) {
  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.nav === active));
}

function render() {
  setNav(state.screen === "home" ? "home" : state.screen === "map" ? "map" : state.screen === "visited" ? "visited" : "info");
  const views = {home, map, visited, info, mobility, difficulty, scan, station, audio, video, accessibility, route};
  (views[state.screen] || home)();
  screen.focus({preventScroll:true});
}

function home() {
  screen.innerHTML = `
    <section class="hero">
      <div class="palms">♣</div>
      <span class="kicker">Papagayos · San Luis</span>
      <h1>Patrimonio<br>Oculto</h1>
      <p>VÉRTICE 2026 · Entre leyendas, sombras y memorias.</p>
      <p class="muted">Un producto turístico de misterio/paranormal, accesible y desestacionalizador, basado en la recuperación del patrimonio oral de Papagayos.</p>
      <div class="actions">
        <button class="cta" onclick="go('mobility')">COMENZAR EXPERIENCIA</button>
        <button class="secondary" onclick="go('map')">Ver mapa</button>
      </div>
    </section>

    <h2 class="section-title">Explorá la experiencia</h2>
    <div class="grid">
      <button class="card" onclick="go('map')"><div class="emoji">⌖</div><h3>Mapa interactivo</h3><p>Estaciones, recorrido y progreso.</p></button>
      <button class="card" onclick="go('scan')"><div class="emoji">▣</div><h3>Escanear QR</h3><p>Accedé al contenido de cada estación.</p></button>
      <button class="card" onclick="go('accessibility')"><div class="emoji">◉</div><h3>Accesibilidad</h3><p>Audio, macrotipo y subtítulos.</p></button>
      <button class="card" onclick="go('route')"><div class="emoji">⚠</div><h3>Seguridad</h3><p>Alertas y recomendaciones preventivas.</p></button>
    </div>

    <div class="alert" style="margin-top:14px">
      <strong>${state.offline ? "Modo sin conexión activo" : "Conectividad disponible"}</strong><br>
      El prototipo está preparado para conservar la información esencial del circuito en el dispositivo.
    </div>
  `;
}

function mobility() {
  screen.innerHTML = `
    <button class="secondary" onclick="go('home')">← Volver</button>
    <h2>¿Cómo vas a recorrerlo?</h2>
    <p class="muted">Elegí el medio de transporte para recibir sugerencias de recorrido adecuadas.</p>
    ${choice("pie","🚶","A pie","Recorrido recomendado · 2,8 km")}
    ${choice("bici","🚲","En bicicleta","Recorrido recomendado · 8,4 km")}
    ${choice("vehiculo","🚗","En vehículo","Recorrido recomendado · 12,6 km")}
    <button class="cta" style="width:100%;margin-top:10px" onclick="go('difficulty')">CONTINUAR</button>
  `;
}
function choice(value, icon, title, desc) {
  return `<button class="choice ${state.mobility===value?'selected':''}" onclick="state.mobility='${value}';localStorage.setItem('mobility','${value}');render()">
    <span class="big">${icon}</span><span><strong>${title}</strong><small>${desc}</small></span>
    ${state.mobility===value ? '<span style="margin-left:auto">✓</span>':''}
  </button>`;
}

function difficulty() {
  screen.innerHTML = `
    <button class="secondary" onclick="go('mobility')">← Volver</button>
    <h2>¿Cuál es tu nivel de movilidad?</h2>
    <p class="muted">La plataforma utiliza esta selección para sugerir el recorrido más adecuado.</p>
    ${difficultyChoice("basico","Básico","Terrenos fáciles y menor exigencia.")}
    ${difficultyChoice("moderado","Moderado","Algunas subidas y terrenos irregulares.")}
    ${difficultyChoice("avanzado","Avanzado","Mayor distancia, exigencia y desnivel.")}
    <button class="cta" style="width:100%;margin-top:10px" onclick="go('map')">VER RECORRIDO SUGERIDO</button>
  `;
}
function difficultyChoice(v,t,d) {
  return `<button class="choice ${state.difficulty===v?'selected':''}" onclick="state.difficulty='${v}';localStorage.setItem('difficulty','${v}');render()">
    <span class="big">▮</span><span><strong>${t}</strong><small>${d}</small></span>
    ${state.difficulty===v ? '<span style="margin-left:auto">✓</span>':''}
  </button>`;
}

function map() {
  const done = state.visited.length;
  screen.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div><h2 style="margin:0">Mapa del circuito</h2><p class="muted" style="margin:4px 0">Recorrido sugerido · ${labelMobility()}</p></div>
      <button class="secondary" onclick="go('scan')">▣ QR</button>
    </div>
    <div class="map" style="margin-top:15px">
      <div class="route"></div>
      ${stations.map((s,i)=>`<button class="pin ${state.visited.includes(s.id)?'done':''} p${i+1}" onclick="openStation(${s.id})" aria-label="${s.title}">${s.id}</button>`).join("")}
      <div class="pin me">●</div>
    </div>
    <div class="legend">
      <span>🟣 Estación</span><span>🟢 Visitada</span>
      <span>🔵 Tu ubicación</span><span>🟡 Ruta sugerida</span>
    </div>
    <div class="stat-grid" style="margin-top:12px">
      <div class="stat"><strong>${done}/5</strong><small>estaciones</small></div>
      <div class="stat"><strong>${done*1.7}</strong><small>km aprox.</small></div>
      <div class="stat"><strong>${done*24} min</strong><small>transcurridos</small></div>
    </div>
    <div class="alert" style="margin-top:12px"><strong>Prevención:</strong> antes de iniciar o continuar, consultá las condiciones meteorológicas. En sectores próximos al arroyo puede existir riesgo de crecidas.</div>
    <button class="cta" style="width:100%;margin-top:12px" onclick="go('route')">Ver recomendaciones</button>
  `;
}
function labelMobility(){ return ({pie:"a pie",bici:"en bicicleta",vehiculo:"en vehículo"})[state.mobility]; }

function scan() {
  screen.innerHTML = `
    <button class="secondary" onclick="go('map')">← Volver al mapa</button>
    <h2>Escanear estación</h2>
    <p class="muted">En la versión final, la aplicación utilizará la cámara del teléfono para reconocer el QR del tótem.</p>
    <div class="card" style="text-align:center;margin-top:14px;padding:28px">
      <div style="font-size:70px">▣</div>
      <h3>Escáner QR</h3>
      <p>Modo demostración para validar el flujo de usuario sin depender de una biblioteca externa.</p>
      <div class="actions" style="justify-content:center">
        ${stations.map(s=>`<button class="secondary" onclick="openStation(${s.id})">Simular QR · ${s.id}</button>`).join("")}
      </div>
    </div>
    <div class="alert safe" style="margin-top:12px"><strong>Diseño previsto:</strong> tótem de aproximadamente 1 m de altura, con el código QR inclinado a 45° para facilitar el escaneo.</div>
  `;
}

function openStation(id) {
  state.currentStation = id;
  if (!state.visited.includes(id)) {
    state.visited.push(id);
    localStorage.setItem("visitedStations", JSON.stringify(state.visited));
    showToast("Estación registrada como visitada");
  }
  state.screen = "station";
  render();
}

function station() {
  const s = stations.find(x=>x.id===state.currentStation) || stations[0];
  screen.innerHTML = `
    <button class="secondary" onclick="go('map')">← Volver al mapa</button>
    <div class="station-card card" style="margin-top:12px">
      <div class="station-art">${s.icon}</div>
      <div class="station-body">
        <span class="tag">ESTACIÓN ${s.id} DE 5</span>
        <h2 style="margin:10px 0 4px">${s.title}</h2>
        <p class="muted">⌖ ${s.place}</p>
        <hr style="border-color:#302b37;border-width:1px 0 0;margin:15px 0">
        <p style="line-height:1.65">${s.text}</p>
        <div class="actions">
          <button class="cta" onclick="go('audio')">▶ Reproducir audio</button>
          <button class="secondary" onclick="go('video')">▣ Ver contenido audiovisual</button>
        </div>
        <div class="card" style="margin-top:12px">
          <strong>Fuente del relato</strong>
          <p style="margin-top:6px">${s.source}</p>
        </div>
      </div>
    </div>
  `;
}

function audio() {
  const s = stations.find(x=>x.id===state.currentStation) || stations[0];
  screen.innerHTML = `
    <button class="secondary" onclick="go('station')">← Volver a la estación</button>
    <h2>Audio guía</h2>
    <div class="audio-player">
      <div class="cover">♬</div>
      <span class="tag">AUDIOGUÍA DRAMATIZADA</span>
      <h3>${s.title}</h3>
      <input class="range" type="range" value="18" min="0" max="100" aria-label="Progreso del audio">
      <div style="display:flex;justify-content:space-between;color:var(--muted);font-size:11px"><span>01:36</span><span>06:48</span></div>
      <div class="actions" style="justify-content:center">
        <button class="secondary">↶ 15s</button><button class="cta" style="border-radius:50%;width:58px;height:58px">▶</button><button class="secondary">15s ↷</button>
      </div>
      <div class="actions">
        <button class="secondary" onclick="showToast('Velocidad ajustable en la versión final')">Velocidad 1x</button>
        <button class="secondary" onclick="showToast('El contenido podrá descargarse para uso sin conexión')">⇩ Descargar</button>
        <button class="secondary" onclick="go('accessibility')">◉ Audiodescripción</button>
      </div>
    </div>
    <div class="alert safe" style="margin-top:12px"><strong>Accesibilidad:</strong> los textos del circuito podrán escucharse mediante audiodescripción y la interfaz contempla lectura ampliada.</div>
  `;
}

function video() {
  const s = stations.find(x=>x.id===state.currentStation) || stations[0];
  screen.innerHTML = `
    <button class="secondary" onclick="go('station')">← Volver a la estación</button>
    <h2>Contenido audiovisual</h2>
    <div class="video"><div class="play">▶</div></div>
    <h3>${s.title}</h3>
    <p class="muted">Video del lugar con subtítulos. En la beta se representa el componente de interfaz; los materiales audiovisuales reales se incorporarán en la producción.</p>
    <button class="secondary" style="width:100%" onclick="showToast('Subtítulos activados')">CC Subtítulos · ON</button>
    <button class="secondary" style="width:100%;margin-top:8px" onclick="showToast('Transcripción disponible en la versión final')">▤ Ver transcripción</button>
  `;
}

function visited() {
  const pct = Math.round((state.visited.length / stations.length) * 100);
  screen.innerHTML = `
    <h2>Mi recorrido</h2>
    <div class="stat-grid">
      <div class="stat"><strong>${state.visited.length}/${stations.length}</strong><small>visitadas</small></div>
      <div class="stat"><strong>${(state.visited.length*1.7).toFixed(1)} km</strong><small>recorridos</small></div>
      <div class="stat"><strong>${state.visited.length*24} min</strong><small>transcurridos</small></div>
    </div>
    <div class="card" style="margin-top:12px">
      <div style="display:flex;justify-content:space-between"><strong>Progreso del circuito</strong><strong>${pct}%</strong></div>
      <div class="progress" style="margin-top:9px"><div style="width:${pct}%"></div></div>
    </div>
    <div class="list" style="margin-top:12px">
      ${stations.map(s=>`<button class="list-item" onclick="openStation(${s.id})"><span class="${state.visited.includes(s.id)?'check':'pending'}">${state.visited.includes(s.id)?'✓':'○'}</span><span style="text-align:left"><strong>${s.title}</strong><small style="display:block;color:var(--muted);margin-top:3px">${state.visited.includes(s.id)?'Estación visitada':'Pendiente'}</small></span></button>`).join("")}
    </div>
    <button class="secondary" style="width:100%;margin-top:12px" onclick="showToast('En la versión final podrás compartir tu experiencia')">↗ Compartir experiencia</button>
  `;
}

function route() {
  screen.innerHTML = `
    <h2>Recomendaciones y seguridad</h2>
    <div class="alert"><strong>Alerta meteorológica preventiva</strong><br>Antes de recorrer sectores próximos al arroyo, verificá las condiciones del tiempo y posibles crecidas. No continúes si las condiciones no son seguras.</div>
    <h3>Tu configuración</h3>
    <div class="card"><strong>Movilidad:</strong> ${labelMobility()}<br><strong>Nivel:</strong> ${state.difficulty}<br><span class="muted">El sistema utiliza estos datos para orientar las recomendaciones.</span></div>
    <h3>Antes de salir</h3>
    <div class="list">
      <div class="list-item">✓ <span>Revisar clima y alertas</span></div>
      <div class="list-item">✓ <span>Llevar agua y elementos adecuados al recorrido</span></div>
      <div class="list-item">✓ <span>Respetar señalización y lugares de acceso permitido</span></div>
      <div class="list-item">✓ <span>Ante una situación de riesgo, priorizar siempre la seguridad</span></div>
    </div>
  `;
}

function accessibility() {
  screen.innerHTML = `
    <h2>Accesibilidad</h2>
    <p class="muted">La propuesta busca que distintas personas puedan acceder a los relatos y recorrer el producto turístico con apoyos adaptados.</p>
    <div class="grid">
      <div class="card"><div class="emoji">🔊</div><h3>Audiodescripción</h3><p>Opción para escuchar los contenidos escritos.</p></div>
      <div class="card"><div class="emoji">A+</div><h3>Macrotipo</h3><p>Lectura ampliada para mejorar la legibilidad.</p></div>
      <div class="card"><div class="emoji">CC</div><h3>Subtítulos</h3><p>Videos preparados con subtítulos.</p></div>
      <div class="card"><div class="emoji">♿</div><h3>Recorridos</h3><p>Selección de movilidad y dificultad para recibir sugerencias.</p></div>
    </div>
    <div class="card" style="margin-top:12px">
      <strong>Modo de lectura</strong>
      <div class="actions"><button class="secondary" onclick="document.body.classList.toggle('large-text')">Aumentar texto</button><button class="secondary" onclick="showToast('Preferencia guardada')">Guardar preferencia</button></div>
    </div>
  `;
}

function info() {
  screen.innerHTML = `
    <h2>Sobre Vértice 2026</h2>
    <div class="card">
      <span class="tag">PATRIMONIO OCULTO</span>
      <h3>Entre leyendas, sombras y memorias</h3>
      <p class="muted">El proyecto propone recuperar relatos y testimonios de la comunidad de Papagayos para convertir ese patrimonio oral en un producto turístico de misterio/paranormal, accesible y desestacionalizador.</p>
    </div>
    <h3>¿Cómo funciona?</h3>
    <div class="list">
      <div class="list-item"><b>1</b><span>El visitante descubre el proyecto y configura su recorrido.</span></div>
      <div class="list-item"><b>2</b><span>La plataforma sugiere circuito según movilidad y dificultad.</span></div>
      <div class="list-item"><b>3</b><span>En territorio, el visitante encuentra el tótem y escanea el QR.</span></div>
      <div class="list-item"><b>4</b><span>Accede al relato, audio, video y recursos accesibles.</span></div>
      <div class="list-item"><b>5</b><span>La estación queda registrada y el progreso se actualiza.</span></div>
    </div>
    <div class="alert safe" style="margin-top:12px"><strong>Prototipo beta educativo:</strong> esta versión demuestra arquitectura, navegación y experiencia de usuario. Algunas funciones se representan como simulación para validar el concepto antes del desarrollo completo.</div>
  `;
}

function go(target) {
  state.screen = target;
  render();
  window.scrollTo({top:0, behavior:"smooth"});
}

document.querySelectorAll("[data-nav]").forEach(btn => btn.addEventListener("click", () => {
  go(btn.dataset.nav);
  document.getElementById("drawer").classList.add("hidden");
}));
document.getElementById("menuBtn").onclick = () => document.getElementById("drawer").classList.remove("hidden");
document.getElementById("closeDrawer").onclick = () => document.getElementById("drawer").classList.add("hidden");
document.getElementById("alertBtn").onclick = () => go("route");

window.addEventListener("online", () => { state.offline=false; showToast("Conectividad disponible"); render(); });
window.addEventListener("offline", () => { state.offline=true; showToast("Modo sin conexión activado"); render(); });

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});

render();
