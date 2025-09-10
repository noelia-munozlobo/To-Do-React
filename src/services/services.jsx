const API_URL = "http://localhost:3001/tareas";

export async function obtenerTareas() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function agregarTarea(texto) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto, completada: false })
  });
  return await res.json();
}

export async function borrarTarea(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

export async function editarTarea(id, cambios) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cambios)
  });
  return await res.json();
}
