document.getElementById("lightButton").addEventListener("click", () => {
  document.body.className = "claro";
});

document.getElementById("darkButton").addEventListener("click", () => {
  document.body.className = "oscuro";
});

document.getElementById("pastelButton").addEventListener("click", () => {
  document.body.className = "pastel";
});

function actualizarContador() {
  const pendienteCount = document.querySelectorAll("#pendiente .tarea").length;
  const progresoCount = document.querySelectorAll("#en-progreso .tarea").length;
  const completadoCount = document.querySelectorAll("#completado .tarea").length;

  document.getElementById("pendiente-count").textContent = `(${pendienteCount})`;
  document.getElementById("progreso-count").textContent = `(${progresoCount})`;
  document.getElementById("completado-count").textContent = `(${completadoCount})`;
}

const nuevaTarea = document.getElementById("nuevaTarea");
const agregarTarea = document.getElementById("agregarTarea");
const columnas = {
  pendiente: document.querySelector("#pendiente .lista"),
  progreso: document.querySelector("#en-progreso .lista"),
  completado: document.querySelector("#completado .lista"),
};

function crearTarea(texto) {
  const tarea = document.createElement("div");
  tarea.classList.add("tarea");
  tarea.draggable = true;

  tarea.innerHTML = `
      <span>${texto}</span>
      <div>
          <button class="editar">✏️</button>
          <button class="eliminar">🗑️</button>
      </div>
  `;

  tarea.querySelector(".eliminar").addEventListener("click", () => {
      tarea.remove();
      actualizarContador();
  });

  tarea.querySelector(".editar").addEventListener("click", () => {
    const textoElemento = tarea.querySelector(".texto");
    const nuevoTexto = prompt("Edita tu tarea:", textoElemento.textContent);
    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        textoElemento.textContent = nuevoTexto;
    }
  });

  tarea.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", tarea.id);
      tarea.classList.add("arrastrando");
  });

  tarea.addEventListener("dragend", () => {
      tarea.classList.remove("arrastrando");
      actualizarContador();
  });

  return tarea;
}

agregarTarea.addEventListener("click", () => {
  const texto = nuevaTarea.value.trim();
  if (texto !== "") {
      const tarea = crearTarea(texto);
      tarea.id = "tarea-" + Date.now();
      columnas.pendiente.appendChild(tarea);
      nuevaTarea.value = "";
      actualizarContador();
  }
});

Object.values(columnas).forEach((columna) => {
  columna.addEventListener("dragover", (e) => {
      e.preventDefault();
  });

  columna.addEventListener("drop", (e) => {
      e.preventDefault();
      const tareaId = e.dataTransfer.getData("text");
      const tarea = document.getElementById(tareaId);

      if (!columna.contains(tarea)) {
          columna.appendChild(tarea);
      }

      actualizarContador();
  });
});

actualizarContador();
