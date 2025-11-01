import './App.module.css'
import { TasksProvider } from './Provider/TasksProvider'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <TasksProvider>
      <AppRoutes />
    </TasksProvider>
  )
}

export default App
