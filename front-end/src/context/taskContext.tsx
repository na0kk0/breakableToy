import * as React from "react";
import {TasksContextType, Task} from "../@types/task";
import {useEffect} from "react";

const BASE_URL = 'http://localhost:9090/todos';

export const TaskContext = React.createContext<TasksContextType | null>(null);
const TaskProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [averageTime, setAverageTime] = React.useState<string>("");
    const [averageTimePriority, setAverageTimePriority] = React.useState<{low:string, med:string, hi:string}>({low:"", med:"", hi:""});
    useEffect(() => {
        fetchTasks();
    }, [])
    const getIds = ():number[]=>{
        return tasks.map((task) => task.id);
    }

    const saveTask = async (task: Task) => {
        const newTask:Task = {
            ...task,
            id: 0,
            completed: false,
            doneDate: "",
            createDate: new Date().toISOString(),
        };

        try{
            const response = await fetch(BASE_URL, {
               method: "POST",
                headers:{
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });
            if(!response.ok){
                const errorData = await response.json();
                console.error("Error saving the task", errorData);
                return;
            }
            await fetchTasks();
        }catch (error){
            console.error("Error connecting to the backend", error);
        }
    }

    const sortPriorityUp = async(page:number = 0)=>{
        try {
            const res = await fetch(`${BASE_URL}/sortPriorityUp?page=${page}&size=10`);
            const data = await res.json();
            setTasks(data.content);
            setTotalPages(data.totalPages);
        }catch (error){
            console.error("Error sorting tasks by priority (up): ", error);
        }
    }

    const sortPriorityDown = async(page:number = 0)=>{
        try {
            const res = await fetch(`${BASE_URL}/sortPriorityDown?page=${page}&size=10`);
            const data = await res.json();
            setTasks(data.content);
            setTotalPages(data.totalPages);
        }catch (error){
            console.error("Error sorting tasks by priority (down): ", error);
        }
    }

    const sortDueDateUp = async (page:number = 0)=>{
        try {
            const res = await fetch(`${BASE_URL}/sortDueDateUp?page=${page}&size=10`);
            const data = await res.json();
            setTasks(data.content);
            setTotalPages(data.totalPages);
        }catch (error){
            console.error("Error sorting tasks by due date (up): ", error);
        }
    }

    const sortDueDateDown = async(page:number = 0)=>{
        try {
            const res = await fetch(`${BASE_URL}/sortDueDateDown?page=${page}&size=10`);
            const data = await res.json();
            setTasks(data.content);
            setTotalPages(data.totalPages);
        }catch (error){
            console.error("Error sorting tasks by due date (down): ", error);
        }
    }

    const editTask = async(taskEdited:Task, page:number)=>{
        try{
            const response = await fetch(`${BASE_URL}/${taskEdited.id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(taskEdited),
            });
            if(!response.ok){
                throw new Error("Error updating task");
            }

            const updatedTask = await response.json();
            fetchTasks(page-1);
        }catch (error){
            console.error("Error editing task: ", error);
        }
    }

    const deleteTask = async(id:number, page:number)=>{
        try{
            const response = await fetch(`${BASE_URL}/delete/${id}`, {
                method: "DELETE",
            });
            if(!response.ok){
                throw new Error("Error deleting the task");
            }
            await fetchTasks(page-1);
        }catch (error){
            console.error("Error deleting task", error);
        }
    }

    const searchTask = async(
        title:string,
        priority:string,
        state:string,
        page:number = 0,
        size:number = 10
    )=>{
        try{
            const params = new URLSearchParams();
            if(title) params.append("title", title);
            if(priority) params.append("priority", priority);
            if(state) params.append("state", state);
            params.append("page", page.toString());
            params.append("size", size.toString());

            const response = await fetch(`${BASE_URL}/search?${params.toString()}`);
            if(!response.ok){
                throw new Error("Error fetching search results");
            }

            const data = await response.json();
            setTasks(data.content);
            setTotalPages(data.totalPages);
        }catch (error){
            console.error("Search error: ", error);
        }
    }

    const completeTask = async(id:number, completed:boolean): Promise<void> =>{
        try{
            await fetch(`${BASE_URL}/${id}/complete?completed=${completed}`,{
                method: 'PATCH',
            });
        }catch(error){
            console.error("Error updating task completion: ", error);
        }
    }

    const checkPage= async(
        allDone:boolean,
        setAllDone:(value:boolean)=>void,
        page:number
    )=>{
        if (tasks.length === 0) return;

        const newCompletedStatus = !allDone;

        await Promise.all(
            tasks.map((task:Task) => completeTask(task.id, newCompletedStatus))
        );

        fetchTasks(page - 1, 10);
        setAllDone(newCompletedStatus);
    }

    const fetchTasks = async(page = 0, size = 10) =>{
        try{
            const res = await fetch(`${BASE_URL}?page=${page}&size=${size}`);
            const data = await res.json();

            setTasks(data.content);
            setTotalPages(data.totalPages);
        }catch (error){
            console.error("Error fetching tasks", error);
        }
    }

    const fetchMetrics = async() => {
        try {
            const res = await fetch(`${BASE_URL}/metrics`);
            if(!res.ok) throw new Error("Error fetching metrics");
            const data = await res.json();

            setAverageTime(data.averageTimeFormatted);
            setAverageTimePriority({
                low: data.lowPriorityFormatted,
                med: data.mediumPriorityFormatted,
                hi: data.highPriorityFormatted,
            })
        }catch (error){
            console.error("Error fetching metrics: ", error);
        }
    }

    return(
        <TaskContext.Provider value={{
            tasks,
            setTasks,
            saveTask,
            getIds,
            sortPriorityUp,
            sortPriorityDown,
            sortDueDateUp,
            sortDueDateDown,
            editTask,
            deleteTask,
            searchTask,
            completeTask,
            checkPage,
            fetchTasks,
            fetchMetrics,
            totalPages,
            averageTime,
            averageTimePriority,
        }}>
            {children}
        </TaskContext.Provider>
    );
}
export default TaskProvider;