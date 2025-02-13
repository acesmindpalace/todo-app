import { useState, useCallback } from 'react'
import './App.css'
import TaskItem from './components/TaskItem'

function App() {
  const [task, setTask] = useState({ name: '', description: '' })
  const [taskList, setTaskList]  = useState([])
  const [toEdit, setToEdit] = useState(null)

  const handleInput = (e) => {
    const { name, value } =   e.target
    setTask({...task, [name]: value})
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    setTaskList((tasks) => {
      if(toEdit !== null) {
        const toUpdateTaskList = [...tasks]
        toUpdateTaskList[toEdit] = task
        setToEdit(null)
        return toUpdateTaskList
      }
      return [...tasks, task]
    })
    setTask({ name: '', description: '' })
  },[task,toEdit])

  const handleEdit = useCallback((id) => {
    setToEdit(id)
    setTask(taskList[id])
  },[taskList])

  const handleDelete = useCallback((id) => {
    setTaskList((tasks) => tasks.filter((task,i) => i !== id))
  },[])

  return (
    <>
      <h1>Simple React To do App</h1>
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" onChange={handleInput} value={task.name} />
          </div>
          <div className="inputGroup">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" onChange={handleInput} value={task.description} />
          </div>
          <div className="buttonWrapper">
            <button type="submit">Save Task</button>
          </div>
        </form>
      </div>
      <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((item, index)=> {
              return <TaskItem key={index} item={item} index={index} handleEdit={handleEdit} handleDelete={handleDelete} />
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
