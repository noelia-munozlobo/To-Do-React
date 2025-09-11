import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import Footer from "../components/Footer";
import {
  obtenerTareas,
  agregarTarea,
  borrarTarea,
  editarTarea
} from "../services/services";

function App() {
  const [tareas, setTareas] = useState([]);
  const [tareasCompletadas, setTareasCompletadas] = useState([]);
  const [tareasPendientes, setTareasPendientes] = useState([]);
  const [recargar, setRecargar] = useState(false);

  useEffect(() => {
    cargarTareas();
  }, [recargar]);
// para cargar las tareas 
  async function cargarTareas() {
    const datos = await obtenerTareas();
    const filtroPendientes = datos.filter((tarea) => tarea.completada === false);
    const filtroCompletas = datos.filter((tarea) => tarea.completada === true);
    setTareasPendientes(filtroPendientes);
    setTareasCompletadas(filtroCompletas);
    setTareas(datos);
  }
// para añadir una nueva tarea
  async function agregar(texto) {
    if (!texto.trim()) {
      alert("Ingrese un texto");
      return;
    }
    await agregarTarea(texto);
    setRecargar(!recargar);
  }
// cambiar estado para pendientes y completadas
  async function cambiarEstado(id) {
    const tarea = tareas.find((t) => t.id === id);
    if (!tarea) return;

    const actualizada = {
      ...tarea,
      completada: !tarea.completada
    };

    try {
      await editarTarea(id, actualizada);
      setRecargar(!recargar);
    } catch (error) {
      console.error("Error al editar tarea:", error);
    }
  }
 // editar texto por id
  async function borrar(id) {
    try {
      await borrarTarea(id);
      setRecargar(!recargar);
    } catch (error) {
      console.error("Error al borrar tarea:", error);
    }
  }
   //editar texto por id
  async function editarTexto(id, nuevoTexto) {
    if (!nuevoTexto.trim()) {
      alert("Ingrese un texto");
      return;
    }
    await editarTarea(id, { texto: nuevoTexto });
    setRecargar(!recargar);
  }

  return (
    <div className="contenedor-app">
      <Header />
      <TaskInput agregarTarea={agregar} />
      {tareasPendientes.length === 0 ? (
        <p className="mensaje-vacio">No existen tareas</p>
      ) : (
        <TaskList
          tareas={tareasPendientes}
          cambiarEstado={cambiarEstado}
          borrarTarea={borrar}
          editarTexto={editarTexto}
        />
      )}

      <div>
        <header className="encabezado">
          <h1>Mi Lista de Tareas Completadas</h1>
          <p className="contador-completadas">
            Tareas completadas: {tareasCompletadas.length}
          </p>
          {tareasCompletadas.length === 0 ? (
            <p className="mensaje-vacio">No existen tareas</p>
          ) : (
            <TaskList
              tareas={tareasCompletadas}
              cambiarEstado={cambiarEstado}
              borrarTarea={borrar}
              editarTexto={editarTexto}
            />
          )}
        </header>
      </div>

      <Footer />
    </div>
  );
}

export default App;
