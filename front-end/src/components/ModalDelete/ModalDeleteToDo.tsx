import * as React from "react";
import { TaskContext } from "../../context/taskContext";
import { TasksContextType, Task } from "../../@types/task";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    taskToDelete : Task;
}

function ModalDeleteToDo({ isOpen, closeModal, taskToDelete }: ModalProps){
    const { deleteTask } = React.useContext(TaskContext) as TasksContextType;
    const [animationClass, setAnimationClass] = React.useState("opacity-0 scale-90");

    React.useEffect(() => {
        if (isOpen) {
            setTimeout(() => setAnimationClass("opacity-100 scale-100"), 10);
        } else {
            setAnimationClass("opacity-0 scale-90");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 duration-500 z-50">
            <div className={`fixed w-1/2 top-12  transform bg-gray-300 rounded-md border-4 border-white 
                transition-all duration-300 opacity-0 scale-90 ${animationClass} flex flex-col justify-center items-center pt-2 z-50`}>
                <div className="flex items-center justify-between w-full">
                    <button className="text-white bg-red-500 rounded-md px-2 border-2 border-white text-md hover:bg-red-800 ml-4 transition duration-200"
                            onClick={()=>{
                                closeModal();
                            }}>
                        Cancel
                    </button>
                    <p className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2">Delete To Do</p>
                </div>
                <div className="flex flex-col w-full items-center justify-center px-5 py-2">
                        <div className="flex flex-col w-full bg-gray-400 items-center justify-between rounded-t-md pt-2 px-4 gap-4">
                            <p className="text-2xl text-center w-full">Are you sure you want to delete the task:</p>
                            <p className="text-3xl text-center font-bold">{taskToDelete.title}</p>
                        </div>
                        <div className="flex w-full bg-gray-400 items-center justify-center px-4 py-4 rounded-b-md">
                            <div className="flex h-10 w-40">
                                <button onClick={()=>{
                                    deleteTask(taskToDelete.id)
                                    closeModal()
                                }} className="bg-red-500 px-1 text-lg font-bold rounded-md border-2 border-white w-full hover:font-semibold hover:bg-red-600 hover:text-white transition duration-200">
                                    Delete To Do
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDeleteToDo;