import * as React from "react";
import { TaskContext } from "../../context/taskContext";
import { TasksContextType, Task } from "../../@types/task";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    addToDo: (todo: string) => void;
}

function ModalNewToDo({ isOpen, closeModal, addToDo }: ModalProps) {
    const { saveTask } = React.useContext(TaskContext) as TasksContextType;
    const [formData, setFormData] = React.useState<Task>({
        id: 0,
        title: "",
        dueDate: "",
        completed: false,
        doneDate: "",
        priority: "High",
        createDate: ""
    });

    const [animationClass, setAnimationClass] = React.useState("opacity-0 scale-90");

    React.useEffect(() => {
        if (isOpen) {
            setTimeout(() => setAnimationClass("opacity-100 scale-100"), 10);
        } else {
            setAnimationClass("opacity-0 scale-90");
        }
    }, [isOpen]);

    const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        let value = e.target.value;
        if (e.target.type === "date") {
            value = new Date(value).toLocaleString();
        }
        setFormData(prev => ({
            ...prev,
            [e.target.id]: value
        }));
    };

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, formData: Task) => {
        e.preventDefault();
        saveTask(formData);
        setFormData({
            id: 0,
            title: "",
            dueDate: "",
            completed: false,
            doneDate: "",
            priority: "High",
            createDate: ""
        });
        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 duration-500">
            <div className={`fixed w-1/2 top-12  transform bg-gray-300 rounded-md border-4 border-white 
                transition-all duration-300 opacity-0 scale-90 ${animationClass} flex flex-col justify-center items-center pt-2`}>

                <div className="flex items-center justify-between w-full">
                    <button className="text-white bg-red-500 rounded-md px-2 border-2 border-white text-md hover:bg-red-800 ml-4 transition duration-200"
                            onClick={closeModal}>
                        Cancel
                    </button>
                    <p className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2">New To Do</p>
                </div>

                <div className="flex w-full items-center justify-center px-5 py-2">
                    <form onSubmit={(e) => handleSubmit(e, formData)} className="w-full flex flex-col items-center justify-center rounded-md shadow-lg">
                        <div className="flex w-full bg-gray-400 items-center justify-between rounded-t-md pt-2 px-4">
                            <label htmlFor="new-to-do" className="text-2xl text-center w-1/3">Name</label>
                            <input autoFocus onChange={handleForm} type="text" placeholder="New To Do" maxLength={120} id="title" className="w-2/3 mr-4 text-2xl pl-1 rounded-md" required />
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
                                <input onChange={handleForm} type="date" placeholder="New To Do" className="w-1/3 pl-1 rounded-md" id="dueDate" />
                            </div>
                            <div className="flex h-10 w-40">
                                <button type="submit" className="bg-green-400 px-1 py-1 text-lg font-semibold rounded-md border-2 border-white w-full hover:font-semibold hover:bg-green-600 hover:text-white transition duration-200">
                                    Add To Do
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalNewToDo;
