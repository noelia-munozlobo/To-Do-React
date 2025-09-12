import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import PagRegistro from '../pages/PagRegistro'
import Inicio from '../pages/Inicio'
import App from '../pages/App'
const Routing = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<PagRegistro/>}/>
            <Route path='/inicio' element={<Inicio/>}/>
            <Route path='/tareas' element={<App/>}/>
        </Routes>
    </Router>
  )
}

export default Routing