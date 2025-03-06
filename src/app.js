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
  const textoActual = li.textContent
    .replace("x", "")
    .replace("Editar", "")
    .trim();

  const inputEdit = document.createElement("input");
  inputEdit.type = "text";
  inputEdit.value = textoActual;

  li.textContent = "";
  li.appendChild(inputEdit);

  inputEdit.focus();

  function guardarCambios() {
    const nuevoTexto = inputEdit.value.trim();
    if (nuevoTexto === "") {
      li.remove();
    } else {
      li.textContent = nuevoTexto;

      const botonEditar = document.createElement("button");
      botonEditar.textContent = "Editar";
      botonEditar.classList.add("editar");

      const botonBorrar = document.createElement("button");
      botonBorrar.textContent = "x";
      botonBorrar.classList.add("borrar");

      li.appendChild(botonBorrar);
      li.appendChild(botonEditar);
    }

    guardarTareasEnLocalStorage();
  }

  inputEdit.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      guardarCambios();
    }
  });

  inputEdit.addEventListener("blur", guardarCambios);
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
