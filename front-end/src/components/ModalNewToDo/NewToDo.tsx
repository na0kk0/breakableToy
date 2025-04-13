import React from 'react';
import ModalNewToDo from "./ModalNewToDo";
import { IoAddCircleOutline } from "react-icons/io5";


function NewToDo(){
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const closeModal = () => {setIsModalOpen(false);}
    const addToDo = ()=>{console.log("Added")};
    return(
        <div className="flex mr-auto ml-2 z-50" data-testid="NewToDo">
            <button disabled={isModalOpen} className={isModalOpen ?"bg-green-900 text black text-xl font-bold flex items-center gap-1 px-2 py-1 rounded-md border-2 border-gray-500 z-40 z:-40":"bg-green-400 text-xl font-bold flex items-center gap-1 px-2 py-1 rounded-md border-2 border-white z-40 hover:bg-green-600 hover:text-white z:-40 transition duration-200"} onClick={()=>setIsModalOpen(true)}>{IoAddCircleOutline({})} New To Do</button>
                <ModalNewToDo isOpen={isModalOpen} closeModal={closeModal} addToDo={addToDo} />
        </div>
    )
}
export default NewToDo;
