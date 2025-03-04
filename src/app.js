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
