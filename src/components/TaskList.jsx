import TaskItem from "./TaskItem";

function TaskList({ tareas, cambiarEstado, borrarTarea, editarTexto }) {
  return (
    <ul className="lista-tareas">
      {tareas.map((t) => (
        <TaskItem
          key={t.id}
          tarea={t}
          cambiarEstado={cambiarEstado}
          borrarTarea={borrarTarea}
          editarTexto={editarTexto} 
        />
      ))}
    </ul>
  );
}

export default TaskList;
