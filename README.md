# tasks-app

## Setup
1. `npm install`
2. `npm run start:api` (arranca json-server en http://localhost:4000)
3. `npm run dev` (arranca Vite en http://localhost:5173)

## Scripts útiles
- `npm run lint`
- `npm run format`
- `npm run test`

## Used hooks
- `useCatApi/customhook`
- `useState`
- `useContext`
- `useEffect`
- `useEffect`


## Task Provider
- **tasks** → Lista actual de tareas.  
- **totalPages** → Número total de páginas.  
- **currentPage** → Página actual.  
- **fetchTasks(page?)** → Obtiene las tareas desde `TaskService` y actualiza el estado.  
- **toggleComplete(id)** → Cambia el estado de completado de una tarea.  
- **deleteTask(id)** → Elimina una tarea y recarga la lista.  


## Task service
- `to initialize correctly is necessary execute npm run start:api`
- **getTasks()** → Obtiene la lista completa de tareas.  
- **getTask(id)** → Obtiene una tarea específica por su ID.  
- **createTask(task)** → Crea una nueva tarea.  
- **updateTask(id, updates)** → Actualiza parcialmente una tarea existente.  
- **deleteTask(id)** → Elimina una tarea por su ID.