import * as React from "react";
import {TasksContextType, Task} from "../@types/task";
import {useEffect} from "react";

export const TaskContext = React.createContext<TasksContextType | null>(null);
const TaskProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [tasks, setTasks] = React.useState<Task[]>([]);
    useEffect(() => {
        fetch("http://localhost:9090/todos")
            .then(res => res.json())
            .then(data => {
                setTasks(data);
            })
            .catch(err => console.error(err));
    }, [])
    const getIds = ():number[]=>{
        return tasks.map((task) => task.id);
    }
    //This method is used to save the task directly on the api
    const saveTask = (task: Task) => {
        let id:number = Math.floor(Math.random() * 1000);
        while(getIds().includes(id))
        {
            id = Math.floor(Math.random() * 1000);
        }
        const newTask:Task = {
            id: id,
            title: task.title,
            dueDate: task.dueDate,
            completed: task.completed,
            doneDate: task.doneDate,
            priority: task.priority,
            createDate: task.createDate,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "id": newTask.id,
                    "title": newTask.title,
                    "dueDate": newTask.dueDate,
                    "completed": false,
                    "doneDate": "",
                    "priority": newTask.priority,
                    "createDate": new Date().toLocaleString()
                }
            )
        };
        fetch('http://localhost:9090/todos', requestOptions)
            .then(response => response.json())
            .then(data => setTasks(data));
        console.log("This is the new Task:",newTask);
    }

    const sortPriorityUp = ()=>{
        fetch("http://localhost:9090/todos/sortPriorityUp")
            .then(res => res.json())
            .then(data => {
                setTasks(data);
            })
            .catch(err => console.error(err));
    }

    const sortPriorityDown = ()=>{
        fetch("http://localhost:9090/todos/sortPriorityDown")
            .then(res => res.json())
            .then(data => {
                setTasks(data);
            })
            .catch(err => console.error(err));
    }

    const sortDueDateUp = ()=>{
        fetch("http://localhost:9090/todos/sortDueDateUp")
            .then(res => res.json())
            .then(data => {
                setTasks(data);
            })
            .catch(err => console.error(err));
    }

    const sortDueDateDown = ()=>{
        fetch("http://localhost:9090/todos/sortDueDateDown")
            .then(res => res.json())
            .then(data => {
                setTasks(data);
            })
            .catch(err => console.error(err));
    }

    const editTask = (taskEdited:Task)=>{
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "id": taskEdited.id,
                    "title": taskEdited.title,
                    "dueDate": taskEdited.dueDate !== "" ? taskEdited.dueDate : "",
                    "completed": taskEdited.completed,
                    "doneDate": taskEdited.doneDate,
                    "priority": taskEdited.priority,
                    "createDate": taskEdited.createDate,
                }
            )
        };
        fetch('http://localhost:9090/todos/'+taskEdited.id+'', requestOptions)
            .then(response => response.json())
            .then(data => setTasks(data));
    }

    const deleteTask = (id:number)=>{
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "id": id
                }
            )
        };
        fetch('http://localhost:9090/todos/delete/'+id+'', requestOptions)
            .then(response => response.json())
            .then(data => setTasks(data));
    }

    const searchTask = (title:string, priority:string, state:string)=>{
        const params = new URLSearchParams();
        if(title)params.append("title", title);
        if(priority)params.append("priority", priority);
        if(state)params.append("state", state);
        fetch("http://localhost:9090/todos/search?"+params.toString())
            .then(res => res.json())
            .then(data => {
                setTasks(data);
            })
            .catch(err => console.error(err));
    }

    const getTasks=()=>{
        fetch("http://localhost:9090/todos")
            .then(res => res.json())
            .then(data => {
                setTasks(data);
            })
            .catch(err => console.error(err));
    }

    const completeTask =(id:number, completed:boolean)=>{//Actually it can also mark as un-complete
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "id": id
                }
            )
        };
        if (!completed)
        {
            fetch('http://localhost:9090/todos/'+id+'/undone', requestOptions)
                .then(response => response.json())
                .then(data => setTasks(data));
        }else
        {
            fetch('http://localhost:9090/todos/'+id+'/done', requestOptions)
                .then(response => response.json())
                .then(data => setTasks(data));
        }
    }

    const checkPage= async(allDone:boolean, setAllDone:(value:boolean)=>void, page:number)=>{
        if(allDone)
        {
            if(tasks.length > 0){
                await Promise.all(tasks.slice((page*10)-10, (page*10)).map((task: Task) => {completeTask(task.id, false)}))
            }
            const res = await fetch("http://localhost:9090/todos");
            const updatedTasks = await res.json();
            setTasks(updatedTasks);

            setAllDone(false);
        }else if(!allDone)
        {
            if(tasks.length > 0){
                await Promise.all(tasks.slice((page*10)-10, (page*10)).map((task: Task) => {completeTask(task.id, true)}))
            }
            const res = await fetch("http://localhost:9090/todos");
            const updatedTasks = await res.json();
            setTasks(updatedTasks);

            setAllDone(true);
        }
    }

    return(
        <TaskContext.Provider value={{tasks, setTasks, saveTask, getIds, sortPriorityUp, sortPriorityDown, sortDueDateUp, sortDueDateDown, editTask, deleteTask, searchTask, getTasks, completeTask, checkPage}}>
            {children}
        </TaskContext.Provider>
    );
}
export default TaskProvider;