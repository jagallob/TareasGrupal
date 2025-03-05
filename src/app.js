const input = document.querySelector("input");
const button = document.querySelector("#agregarBtn");
const ul = document.querySelector("#listaTareas");

document.addEventListener("DOMContentLoaded", cargarTareas);

button.addEventListener("click", agregar);
ul.addEventListener("click", gestionTarea);

function agregar(e) {
  e.preventDefault();
  const tarea = input.value.trim();
  if (tarea === "") {
    return alert("Debes escribir una tarea");
  }
  const li = document.createElement("li");
  li.textContent = tarea;

  const botonBorrar = document.createElement("button");
  botonBorrar.textContent = "x";
  botonBorrar.classList.add("borrar");

  const botonEditar = document.createElement("button");
  botonEditar.textContent = "Editar";
  botonEditar.classList.add("editar");

  li.appendChild(botonBorrar);
  li.appendChild(botonEditar);

  ul.appendChild(li);
  input.value = "";

  guardarTareasEnLocalStorage();
}

function gestionTarea(e) {
  if (e.target.tagName === "BUTTON") {
    if (e.target.classList.contains("borrar")) {
      e.target.parentElement.remove();
    } else if (e.target.classList.contains("editar")) {
      editarTarea(e.target.parentElement);
    }
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("tachado");
  }

  guardarTareasEnLocalStorage();
}

function editarTarea(li) {
  // Obtener el texto actual de la tarea (eliminamos los botones y espacios)
  const textoActual = li.textContent.replace("x", "").replace("Editar", "").trim();
  
  // Colocar el texto de la tarea en el campo de entrada
  input.value = textoActual;

  // Cambiar el botón de "Editar" a "Guardar"
  const botonGuardar = document.createElement("button");
  botonGuardar.textContent = "Guardar";
  botonGuardar.classList.add("guardar");

  // Reemplazar el botón de "Editar" por el de "Guardar"
  const botonEditar = li.querySelector(".editar");
  li.replaceChild(botonGuardar, botonEditar);

  // Añadir el evento para guardar la tarea editada
  botonGuardar.addEventListener("click", function() {
    const nuevaTarea = input.value.trim();
    if (nuevaTarea === "") {
      return alert("Debes escribir una tarea");
    }

    li.firstChild.textContent = nuevaTarea; // Actualizar el texto de la tarea
    li.replaceChild(botonEditar, botonGuardar);
    guardarTareasEnLocalStorage();
  });
}

function cargarTareas() {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.forEach(tarea => {
    const li = document.createElement("li");
    li.textContent = tarea;

    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "x";
    botonBorrar.classList.add("borrar");

    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.classList.add("editar");

    li.appendChild(botonBorrar);
    li.appendChild(botonEditar);

    ul.appendChild(li);
  });
}

function guardarTareasEnLocalStorage() {
  const tareas = [];
  ul.querySelectorAll("li").forEach(li => {
    tareas.push(li.firstChild.textContent);
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
