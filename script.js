/* ============================================
   ✿ AGREGA TUS PELÍCULAS AQUÍ ✿
   - portada: imagen dentro de la carpeta "portadas"
   - video:   archivo dentro de la carpeta "peliculas"
   Copia una línea, pega abajo y cambia los nombres.
   ============================================ */
const peliculas = [
  { titulo: "Hotel Rwan", portada: "HOTEL RWANDA.jpg", video: "https://pub-67e92576af6748749d549fd7c47bb66b.r2.dev/hotel.rwanda.bdrip.latino.mp4" },
  { titulo: "Ejemplo 2", portada: "portadas/ejemplo2.jpg", video: "peliculas/ejemplo2.mp4" },
  // { titulo: "Mi película", portada: "portadas/mi-peli.jpg", video: "peliculas/mi-peli.mp4" },
];

/* ---------- Lo de abajo no hace falta tocarlo ---------- */
const grid = document.getElementById("grid");
const vacio = document.getElementById("vacio");
const modal = document.getElementById("modal");
const video = document.getElementById("video");

if (peliculas.length === 0) vacio.hidden = false;

peliculas.forEach(p => {
  const tarjeta = document.createElement("div");
  tarjeta.className = "peli";
  tarjeta.setAttribute("role", "button");
  tarjeta.tabIndex = 0;
  tarjeta.setAttribute("aria-label", p.titulo);

  const img = document.createElement("img");
  img.src = p.portada;
  img.alt = p.titulo;
  img.onerror = () => {            // si no existe la portada, muestra un adorno
    img.remove();
    tarjeta.classList.add("sin-portada");
    tarjeta.textContent = "🎀";
  };
  tarjeta.appendChild(img);

  const abrir = () => reproducir(p.video);
  tarjeta.addEventListener("click", abrir);
  tarjeta.addEventListener("keydown", e => { if (e.key === "Enter") abrir(); });
  grid.appendChild(tarjeta);
});

function reproducir(ruta) {
  video.src = ruta;
  modal.classList.add("abierto");
  video.play().catch(() => {});
}

function cerrar() {
  video.pause();
  video.removeAttribute("src");
  video.load();
  modal.classList.remove("abierto");
}

document.getElementById("cerrar").addEventListener("click", cerrar);
modal.addEventListener("click", e => { if (e.target === modal) cerrar(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); });

/* Corazoncitos flotando de fondo */
const fondo = document.getElementById("fondo");
const adornos = ["♡", "✿", "★", "🌸", "✨", "🍓"];
for (let i = 0; i < 18; i++) {
  const s = document.createElement("span");
  s.className = "flota";
  s.textContent = adornos[i % adornos.length];
  s.style.left = Math.random() * 100 + "%";
  s.style.fontSize = 14 + Math.random() * 22 + "px";
  s.style.animationDuration = 10 + Math.random() * 14 + "s";
  s.style.animationDelay = -Math.random() * 20 + "s";
  fondo.appendChild(s);
}
