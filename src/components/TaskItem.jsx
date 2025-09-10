import { useState } from "react";

function TaskItem({ tarea, cambiarEstado, borrarTarea, editarTexto }) {
  const [editando, setEditando] = useState(false);
  const [nuevoTexto, setNuevoTexto] = useState(tarea.texto);

  const guardarEdicion = () => {
    if (!nuevoTexto.trim()) return;
    editarTexto(tarea.id, nuevoTexto);
    setEditando(false);
  };

  return (
    <li className={`tarea ${tarea.completada ? "completada" : ""}`}>
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => cambiarEstado(tarea.id)}
      />

      {editando ? (
        <>
          <input
            type="text"
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
          />
          <button onClick={guardarEdicion}>Guardar cambios</button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <span>{tarea.texto}</span>
          <div>
            <button onClick={() => setEditando(true)}>Editar</button>
            <button onClick={() => borrarTarea(tarea.id)}>Eliminar</button>
          </div>
        </>
      )}
    </li>
  );
}
export default TaskItem;
