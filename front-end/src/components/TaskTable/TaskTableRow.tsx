import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from 'react';
import ModalEditToDo from "../ModalEditToDo/ModalEditToDo";
import ModalDeleteToDo from "../ModalDelete/ModalDeleteToDo";
import {TasksContextType, Task} from "../../@types/task";
import {TaskContext} from "../../context/taskContext";

function TaskTableRow({task}:{task:Task}) {
    const { completeTask } = React.useContext(TaskContext) as TasksContextType;
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const closeEditModal = () => {setIsEditModalOpen(false);}
    const closeDeleteModal = () => {setIsDeleteModalOpen(false);}
    const priorityBackGround = (dueDate:string):string=>{
        if(dueDate==="") return "bg-white"
        else{
            const weekLater = new Date(Date.now());
            const twoWeekLater = new Date(Date.now());
            const dueD = new Date(dueDate);
            weekLater.setDate(weekLater.getDate()+7);
            twoWeekLater.setDate(twoWeekLater.getDate()+14);

            if(dueD <= weekLater){
                return "bg-red-200";
            }else if(dueD < twoWeekLater){
                return "bg-yellow-200";
            }else if(dueD > twoWeekLater){
                return "bg-green-200";
            }
        }
        return ""
    }
    const textComplete = (completed:boolean):string=>{
        return completed ? "line-through py-4 px-6 border-b border-gray-200 text-xl" : "py-4 px-6 border-b border-gray-200 text-xl";
    }
    return(
        <tr className={priorityBackGround(task.dueDate)}>
            <td className="py-4 px-6 border-b border-gray-200 text-center"><input className="transform scale-150 cursor-pointer" type="checkbox" checked={task.completed} onChange={()=>{
                completeTask(task.id, !task.completed)
            }}/></td>
            <td className={textComplete(task.completed)}>{task.title}</td>
            <td className="py-4 px-6 border-b border-gray-200 truncate text-xl">{task.priority}</td>
            {task.dueDate !== "" ? (
                <td className="py-4 px-6 border-b border-gray-200 text-xl">{new Date(task.dueDate).toISOString().split("T")[0]}</td>
            ) : (
                <td className="py-4 px-6 border-b border-gray-200 text-xl">No due date</td>
            )}
            <td className="py-4 px-6 border-b border-gray-200 flex gap-4">
                <button className="bg-yellow-500 text-white py-1 px-2 rounded-md text-xl hover:bg-yellow-700" onClick={()=>setIsEditModalOpen(true)}>Edit</button>
                <ModalEditToDo isOpen={isEditModalOpen} closeModal={closeEditModal} taskToEdit={task}/>
                <button className="bg-red-500 text-white py-1 px-2 ml-4 rounded-md text-xl hover:bg-red-700" onClick={()=>setIsDeleteModalOpen(true)}>Delete</button>
                <ModalDeleteToDo isOpen={isDeleteModalOpen} closeModal={closeDeleteModal} taskToDelete={task}/>
            </td>
        </tr>
    )
}

export default TaskTableRow;