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

  // Cargar tareas al iniciar
  useEffect(() => {
    cargarTareas();
  }, []);

  async function cargarTareas() {
    const datos = await obtenerTareas();
    setTareas(datos);
  }

  // Agregar tarea
  async function agregar(texto) {
    if (!texto.trim()) {
      alert("Ingrese un texto");
      return;
    }
    const nueva = await agregarTarea(texto);
    setTareas([...tareas, nueva]);
  }

  // Cambiar estado completada
  async function cambiarEstado(id) {
    const tarea = tareas.find((t) => t.id === id);
    const actualizada = {
      ...tarea,
      completada: !tarea.completada
    };
    const resultado = await editarTarea(id, actualizada);
    const nuevas = tareas.map((t) => (t.id === id ? resultado : t));
    setTareas(nuevas);
  }

  // Borrar tarea
  async function borrar(id) {
    await borrarTarea(id);
    const nuevas = tareas.filter((t) => t.id !== id);
    setTareas(nuevas);
  }

  // Editar texto
  async function editarTexto(id, nuevoTexto) {
    if (!nuevoTexto.trim()) {
      alert("Ingrese un texto");
      return;
    }
    const resultado = await editarTarea(id, { texto: nuevoTexto });
    const nuevas = tareas.map((t) => (t.id === id ? resultado : t));
    setTareas(nuevas);
  }

  return (
    <div className="contenedor-app">
      <Header />
      <TaskInput agregarTarea={agregar} />
      {tareas.length === 0 ? (
        <p className="mensaje-vacio">No existen tareas</p>
      ) : (
        <TaskList
          tareas={tareas}
          cambiarEstado={cambiarEstado}
          borrarTarea={borrar}
          editarTexto={editarTexto}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
