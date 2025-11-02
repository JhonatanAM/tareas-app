import './App.module.css'
import { TasksProvider } from './Provider/TasksProvider'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <TasksProvider>
      <div className="app-container">
        <AppRoutes />
      </div>
    </TasksProvider>
  )
}

export default App
