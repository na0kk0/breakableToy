import * as React from "react";
import { TaskContext } from "../../context/taskContext";
import { TasksContextType, Task } from "../../@types/task";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    taskToEdit : Task;
}

function ModalEditToDo({ isOpen, closeModal, taskToEdit }: ModalProps){
    const { editTask } = React.useContext(TaskContext) as TasksContextType;
    const [animationClass, setAnimationClass] = React.useState("opacity-0 scale-90");

    const [formData, setFormData] = React.useState<Task>({
        id: taskToEdit.id,
        title: taskToEdit.title,
        dueDate: taskToEdit.dueDate,
        completed: taskToEdit.completed,
        doneDate: taskToEdit.doneDate,
        priority: taskToEdit.priority,
        createDate: taskToEdit.createDate
    });

    React.useEffect(() => {
        if (isOpen) {
            setTimeout(() => setAnimationClass("opacity-100 scale-100"), 10);
        } else {
            setAnimationClass("opacity-0 scale-90");
        }
    }, [isOpen]);

    const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        let value = e.target.value;
        if (e.target.type === "date" && value !== "") {
            value = new Date(value).toLocaleString();
        }
        setFormData(prev => ({
            ...prev,
            [e.target.id]: value
        }));
    };
    const resetData = () => {
        setFormData({
            id: taskToEdit.id,
            title: taskToEdit.title,
            dueDate: taskToEdit.dueDate,
            completed: taskToEdit.completed,
            doneDate: taskToEdit.doneDate,
            priority: taskToEdit.priority,
            createDate: taskToEdit.createDate
        });
    }

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, formData: Task) => {
        e.preventDefault();
        console.log("Edited Task:",formData);
        editTask(formData);
        closeModal();
    };

    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 duration-500 z-50">
            <div className={`fixed w-1/2 top-12  transform bg-gray-300 rounded-md border-4 border-white 
                transition-all duration-300 opacity-0 scale-90 ${animationClass} flex flex-col justify-center items-center pt-2 z-50`}>
                <div className="flex items-center justify-between w-full">
                    <button className="text-white bg-red-500 rounded-md px-2 border-2 border-white text-md hover:bg-red-800 ml-4 transition duration-200"
                            onClick={()=>{
                                resetData();
                                closeModal();
                            }}>
                        Cancel
                    </button>
                    <p className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2">Edit To Do</p>
                </div>
                <div className="flex w-full items-center justify-center px-5 py-2">
                    <form onSubmit={(e) => handleSubmit(e, formData)} className="w-full flex flex-col items-center justify-center rounded-md shadow-lg">
                        <div className="flex w-full bg-gray-400 items-center justify-between rounded-t-md pt-2 px-4">
                            <label htmlFor="new-to-do" className="text-2xl text-center w-1/3">Name</label>
                            <input onChange={handleForm} type="text" placeholder="New name" value={formData.title} maxLength={120} id="title" className="w-2/3 mr-4 text-2xl pl-1 rounded-md" required />
                            <label htmlFor="new-to-do" className="text-2xl pr-2">Priority</label>
                            <select name="priority" id="priority" value={formData.priority} onChange={handleForm} className="rounded-md text-xl">
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="flex w-full bg-gray-400 items-center justify-between px-4 py-4 rounded-b-md">
                            <div className="flex flex-row w-full">
                                <label htmlFor="new-to-do" className="text-2xl pr-2 text-center w-1/3">Due date</label>
                                <input onChange={handleForm} type="date" value={formData.dueDate !== "" ? (new Date(formData.dueDate).toISOString().split("T")[0]) : ("")} placeholder="New To Do" className="w-1/3 pl-1 rounded-md" id="dueDate" />
                            </div>
                            <div className="flex h-10 w-40">
                                <button type="submit" className="bg-yellow-400 px-1 py-1 text-lg font-semibold rounded-md border-2 border-white w-full hover:font-semibold hover:bg-yellow-500 hover:text-white transition duration-200">
                                    Edit To Do
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalEditToDo;